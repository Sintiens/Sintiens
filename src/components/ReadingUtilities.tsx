import type { TopicBlockData } from "../types/story";

interface ReadingUtilitiesProps {
  actId: string;
  actColor: string;
  blocks: TopicBlockData[];
  activeBlockId: string;
}

// TTS (text-to-speech) desactivado temporalmente por petición del usuario.
// La implementación original (speechSynthesis, sincronización palabra a
// palabra, panel de ajustes) se eliminó de este archivo y es recuperable
// desde el historial de git (commit anterior a esta simplificación).
export default function ReadingUtilities(_props: ReadingUtilitiesProps) {
  return null;
}
