import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import os from "os";


dotenv.config();

const app = express();
const PORT = 3000;

// Mutex to serialize all database operations and prevent race conditions
class Mutex {
  private queue: (() => Promise<any>)[] = [];
  private locked = false;

  async run<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
      this.dequeue();
    });
  }

  private async dequeue() {
    if (this.locked || this.queue.length === 0) return;
    this.locked = true;
    const fn = this.queue.shift()!;
    try {
      await fn();
    } finally {
      this.locked = false;
      this.dequeue();
    }
  }
}

const dbMutex = new Mutex();

// Lazy initialize Gemini clients with hot-swapping capability
let aiClient: GoogleGenAI | null = null;
let cachedApiKey: string | null = null;

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set. Please set it in Settings > Secrets.");
  }
  if (!aiClient || cachedApiKey !== apiKey) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    cachedApiKey = apiKey;
  }
  return aiClient;
}

app.use(express.json());

// Stable ESM/CJS relative path resolution for the local database
let tasksDirectory = process.cwd();
try {
  if (typeof import.meta.url === "string") {
    tasksDirectory = path.dirname(fileURLToPath(import.meta.url));
  }
} catch (e) {
  if (typeof __dirname === "string") {
    tasksDirectory = __dirname;
  }
}

// If running from production dist folder, step up to the project root
if (path.basename(tasksDirectory) === "dist") {
  tasksDirectory = path.dirname(tasksDirectory);
}

const TASKS_FILE_PATH = path.join(tasksDirectory, "todo.json");

// Backup location in user's permanent App Data Directory
const BACKUP_DIR = path.join(os.homedir(), ".gemini", "antigravity");
const BACKUP_FILE_PATH = path.join(BACKUP_DIR, "todo_backup.json");

// Helper: Atomic File Writer to prevent JSON truncation/corruption
async function atomicWriteFile(filePath: string, data: string): Promise<void> {
  const tempPath = `${filePath}.tmp`;
  await fs.writeFile(tempPath, data, "utf-8");
  try {
    await fs.rename(tempPath, filePath);
  } catch (err) {
    // Windows fallback in case of locking issues
    await fs.copyFile(tempPath, filePath);
    await fs.unlink(tempPath);
  }
}



// Helper to read tasks with safe recovery from backup (fixed empty-task false-positive)
async function readTasks(): Promise<any[]> {
  let workspaceTasks: any[] = [];
  let workspaceReadSuccess = false;

  // 1. Try to read from project workspace todo.json
  try {
    const data = await fs.readFile(TASKS_FILE_PATH, "utf-8");
    workspaceTasks = JSON.parse(data);
    workspaceReadSuccess = true;
  } catch (err) {
    console.warn("Workspace todo.json not found or failed to parse. Attempting backup recovery...");
  }

  // 2. ONLY attempt backup recovery if the workspace read genuinely failed (missing/corrupted)
  if (!workspaceReadSuccess) {
    try {
      const backupData = await fs.readFile(BACKUP_FILE_PATH, "utf-8");
      const backupTasks = JSON.parse(backupData);
      
      if (Array.isArray(backupTasks)) {
        console.log(`Successfully recovered ${backupTasks.length} tasks from AppData backup! Syncing to workspace.`);
        await atomicWriteFile(TASKS_FILE_PATH, JSON.stringify(backupTasks, null, 2));
        return backupTasks;
      }
    } catch (backupErr) {
      console.warn("No backup found or backup file is empty/corrupt.");
    }
  }

  return workspaceTasks;
}

// Helper to write tasks with dual-write replication and atomic safety
async function writeTasks(tasks: any[]): Promise<boolean> {
  try {
    if (process.env.NODE_ENV === "production") {
      console.warn("Attempted to write tasks in production mode. Prevented.");
      return false;
    }

    // 1. Write atomically to the workspace todo.json
    await atomicWriteFile(TASKS_FILE_PATH, JSON.stringify(tasks, null, 2));

    // 2. Replication: Write duplicate copy atomically to permanent backup
    try {
      await fs.mkdir(BACKUP_DIR, { recursive: true });
      await atomicWriteFile(BACKUP_FILE_PATH, JSON.stringify(tasks, null, 2));
    } catch (backupErr) {
      console.error("Failed to write tasks to permanent backup path:", backupErr);
    }

    return true;
  } catch (err) {
    console.error("Error writing tasks file:", err);
    return false;
  }
}

// Express Endpoints for Dev Tasks wrapped in database Mutex to prevent race conditions

app.get("/api/dev/tasks", async (req, res) => {
  const tasks = await dbMutex.run(async () => readTasks());
  res.json(tasks);
});

app.post("/api/dev/tasks", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "No permitido en producción" });
  }
  try {
    const { title, description, tab, x, y, w, h, selector, rx, ry, rw, rh, priority, status } = req.body;
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "El título de la tarea es obligatorio." });
    }

    const newTask = await dbMutex.run(async () => {
      const tasks = await readTasks();
      const createdTask = {
        id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
        title: title.trim(),
        description: (description || "").trim(),
        tab: tab || "general",
        x: typeof x === "number" ? x : undefined,
        y: typeof y === "number" ? y : undefined,
        w: typeof w === "number" ? w : undefined,
        h: typeof h === "number" ? h : undefined,
        selector: typeof selector === "string" ? selector : undefined,
        rx: typeof rx === "number" ? rx : undefined,
        ry: typeof ry === "number" ? ry : undefined,
        rw: typeof rw === "number" ? rw : undefined,
        rh: typeof rh === "number" ? rh : undefined,
        priority: priority || "medium",
        status: status || "todo",
        createdAt: new Date().toISOString(),
      };

      tasks.push(createdTask);
      const success = await writeTasks(tasks);
      if (!success) {
        throw new Error("No se pudo guardar la tarea en el archivo.");
      }
      return createdTask;
    });

    res.status(201).json(newTask);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/dev/tasks", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "No permitido en producción" });
  }
  try {
    const tasks = req.body;
    if (!Array.isArray(tasks)) {
      return res.status(400).json({ error: "Se requiere un array de tareas válido." });
    }
    
    // Validate that each item has a title
    for (const task of tasks) {
      if (!task.title || typeof task.title !== "string" || !task.title.trim()) {
        return res.status(400).json({ error: "Todas las tareas importadas deben contener un título válido." });
      }
    }
    
    const success = await dbMutex.run(async () => writeTasks(tasks));
    if (!success) {
      throw new Error("No se pudieron guardar las tareas importadas.");
    }
    
    res.json({ message: `Se importaron ${tasks.length} tareas correctamente.` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/dev/tasks/:id", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "No permitido en producción" });
  }
  
  // Route ID Sanitization
  const { id } = req.params;
  if (!id || typeof id !== "string" || /[^a-zA-Z0-9_-]/.test(id)) {
    return res.status(400).json({ error: "ID de tarea inválido o inseguro." });
  }

  try {
    const { title, description, priority, status, selector, rx, ry, rw, rh } = req.body;

    const updated = await dbMutex.run(async () => {
      const tasks = await readTasks();
      const taskIndex = tasks.findIndex((t) => t.id === id);
      if (taskIndex === -1) {
        return null;
      }

      const updatedTask = {
        ...tasks[taskIndex],
        title: title !== undefined ? title.trim() : tasks[taskIndex].title,
        description: description !== undefined ? description.trim() : tasks[taskIndex].description,
        priority: priority !== undefined ? priority : tasks[taskIndex].priority,
        status: status !== undefined ? status : tasks[taskIndex].status,
        selector: selector !== undefined ? selector : tasks[taskIndex].selector,
        rx: rx !== undefined ? rx : tasks[taskIndex].rx,
        ry: ry !== undefined ? ry : tasks[taskIndex].ry,
        rw: rw !== undefined ? rw : tasks[taskIndex].rw,
        rh: rh !== undefined ? rh : tasks[taskIndex].rh,
      };

      tasks[taskIndex] = updatedTask;
      const success = await writeTasks(tasks);
      if (!success) {
        throw new Error("No se pudo guardar la tarea actualizada.");
      }
      return updatedTask;
    });

    if (!updated) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/dev/tasks/:id", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "No permitido en producción" });
  }
  
  const { id } = req.params;
  if (!id || typeof id !== "string" || /[^a-zA-Z0-9_-]/.test(id)) {
    return res.status(400).json({ error: "ID de tarea inválido o inseguro." });
  }

  try {
    const deleted = await dbMutex.run(async () => {
      const tasks = await readTasks();
      const filteredTasks = tasks.filter((t) => t.id !== id);

      if (tasks.length === filteredTasks.length) {
        return false;
      }

      const success = await writeTasks(filteredTasks);
      if (!success) {
        throw new Error("No se pudo eliminar la tarea.");
      }
      return true;
    });

    if (!deleted) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }
    res.json({ message: "Tarea eliminada correctamente." });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --- BACKUP & RESTORE SYSTEM ENDPOINTS ---
const BACKUPS_DIR = path.join(tasksDirectory, "backups");

app.get("/api/dev/tasks/backups", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "No permitido en producción" });
  }
  try {
    await fs.mkdir(BACKUPS_DIR, { recursive: true });
    const files = await fs.readdir(BACKUPS_DIR);
    const backupFiles = files.filter(f => f.startsWith("todo_backup_") && f.endsWith(".json"));
    
    const backups = await Promise.all(
      backupFiles.map(async (filename) => {
        const filePath = path.join(BACKUPS_DIR, filename);
        const stats = await fs.stat(filePath);
        return {
          filename,
          size: stats.size,
          createdAt: stats.mtime.toISOString(),
        };
      })
    );
    
    // Sort backups from newest to oldest
    backups.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    res.json(backups);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/dev/tasks/backup", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "No permitido en producción" });
  }
  try {
    await fs.mkdir(BACKUPS_DIR, { recursive: true });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFilename = `todo_backup_${timestamp}.json`;
    const backupFilePath = path.join(BACKUPS_DIR, backupFilename);
    
    // Read the current tasks
    const tasks = await dbMutex.run(async () => readTasks());
    
    // Write atomically to the backups folder
    await atomicWriteFile(backupFilePath, JSON.stringify(tasks, null, 2));
    
    res.status(201).json({ 
      message: "Copia de seguridad creada correctamente.",
      filename: backupFilename,
      createdAt: new Date().toISOString()
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/dev/tasks/restore", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "No permitido en producción" });
  }
  const { backupFilename } = req.body;
  if (!backupFilename || typeof backupFilename !== "string" || /[^a-zA-Z0-9_.-]/.test(backupFilename)) {
    return res.status(400).json({ error: "Nombre de archivo de copia de seguridad no válido o peligroso." });
  }
  
  try {
    const backupFilePath = path.join(BACKUPS_DIR, backupFilename);
    
    // Check if backup file exists
    try {
      await fs.access(backupFilePath);
    } catch {
      return res.status(404).json({ error: "Copia de seguridad no encontrada." });
    }
    
    // Read from backup and write to main todo.json
    await dbMutex.run(async () => {
      const data = await fs.readFile(backupFilePath, "utf-8");
      const tasks = JSON.parse(data);
      if (!Array.isArray(tasks)) {
        throw new Error("El archivo de copia de seguridad no contiene una lista de tareas válida.");
      }
      const success = await writeTasks(tasks);
      if (!success) {
        throw new Error("No se pudo escribir la base de datos restaurada.");
      }
    });
    
    res.json({ message: "Tablero restaurado correctamente desde la copia de seguridad." });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});




// API routes FIRST
app.post("/api/analyze-argument", async (req, res) => {
  try {
    const { argument, mode } = req.body;
    if (!argument || typeof argument !== "string" || !argument.trim()) {
      return res.status(400).json({ error: "El argumento ingresado está vacío o no es válido." });
    }

    const ai = getAiClient();
    let systemPrompt = `Eres la Inteligencia Artificial "Sintiens Dialéctica", un motor de análisis filosófico-científico en español. Tu objetivo es realizar una deconstrucción socrática, científica y bioética laica de los argumentos, reflexiones, dudas o justificaciones que utiliza el ser humano para consumir y explotar animales no humanos.
Analiza la premisa o pregunta introducida aplicando conceptos de neurobiología de la sintiencia, termodinámica de sistemas de recursos y lógica filosófica laica.
Devuelve tu diagnóstico EXACTAMENTE en formato JSON conforme a la estructura de esquema solicitada. Todo el contenido generado en el JSON debe estar en idioma Español.

`;

    if (mode === "socratic") {
      systemPrompt += `MODO SOCRÁTICO PURO: Tu tono debe ser extremadamente socrático e inquisitivo. Conduce a la reflexión a través de ironías dialécticas implícitas. Pon especial énfasis en la contradicción interna de la justificación, haciéndole preguntas incisivas y breves. El análisis científico debe deconstruir las premisas erróneas exponiendo sus contradicciones lógicas fundamentales de forma ágil y perspicaz.`;
    } else if (mode === "empathic") {
      systemPrompt += `MODO DIVULGACIÓN EMPÁTICA: Tu tono debe ser cálido, sumamente comprensivo, pedagógico y educador, evitando sonar clínico o confrontativo. Utiliza analogías cotidianas y accesibles. Apela al potencial empático humano y la compasión natural, estructurando los argumentos científicos de manera muy clara, divulgativa y libre de jerga obtusa.`;
    } else if (mode === "thermodynamic") {
      systemPrompt += `MODO TERMODINÁMICA RADICAL: Tu enfoque debe ser de física aplicada e ingeniería ecológica pura. Analiza la premisa desde las leyes de la física, la entropía de los sistemas cerrados, la drástica ineficiencia del paso trófico de calorías (pérdida de hasta un 90% por metabolismo animal), el uso de suelo y agua, y los límites biosféricos. Tu tono debe ser de una sobriedad matemática implacable y fría.`;
    } else {
      // Default: Clinical
      systemPrompt += `MODO DIALÉCTICA CLÍNICA: Mantén un tono clínico, profundo, altamente intelectual, respetuoso pero rigurosamente analítico, objetivo y académico. No utilices adjetivos floridos, sentimentalismos ni halagos comerciales. Utiliza conceptos sólidos de neurobiología, ética laica formal y ecología de sistemas complejos.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analiza y deconstruye críticamente la siguiente premisa: "${argument}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "argumentSummary",
            "axioms",
            "scientificAccuracy",
            "logicalFailures",
            "impactAnalysis",
            "alternativeReflection"
          ],
          properties: {
            argumentSummary: {
              type: Type.STRING,
              description: "Resumen breve, descriptivo e impactante de 3 a 7 palabras del argumento examinado."
            },
            axioms: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 2 a 4 verdades absolutas o dogmas implícitos e inconscientes que asume este argumento sin examinarlos."
            },
            scientificAccuracy: {
              type: Type.OBJECT,
              required: ["rating", "analysis"],
              properties: {
                rating: {
                  type: Type.STRING,
                  description: "Una calificación técnica corta en mayúsculas (ej. 'INEXACTITUD BIOLÓGICA', 'DISONANCIA TERMOLÓGICA', 'FALACIA NATURALISTA', 'PARCIALMENTE INCOMPLETO')."
                },
                analysis: {
                  type: Type.STRING,
                  description: "Un párrafo de análisis objetivo y clínico fundamentado en hechos de la ciencia empírica moderna (neurobiología, evolución o termodinámica)."
                }
              }
            },
            logicalFailures: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 1 a 3 sesgos lógicos, falacias dialécticas o mecanismos de disonancia cognitiva presentes en la asimilación del argumento."
            },
            impactAnalysis: {
              type: Type.OBJECT,
              required: ["sintiente", "ecosistemic"],
              properties: {
                sintiente: {
                  type: Type.STRING,
                  description: "Consecuencias fácticas y directas que tiene esta asunción sobre la conciencia, estrés o dolor individual del animal sintiente implicado."
                },
                ecosistemic: {
                  type: Type.STRING,
                  description: "El desgaste calórico colateral, emisiones gaseosas o pérdida trófica que produce a escala colectiva planetaria."
                }
              }
            },
            alternativeReflection: {
              type: Type.STRING,
              description: "Una última e incisiva pregunta abierta formulada de forma socrática que rete directamente los cimientos morales del usuario sin acusar u ofender."
            }
          }
        }
      }
    });

    const textOutput = response.text?.trim();
    if (!textOutput) {
      throw new Error("No se obtuvo respuesta del motor de deconstrucción.");
    }

    const payload = JSON.parse(textOutput);
    res.json(payload);
  } catch (err: any) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: err?.message || "Algo salió mal procesando tu argumento con la Inteligencia de Sintiens." });
  }
});

async function startServer() {
  // Vite / static middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();


