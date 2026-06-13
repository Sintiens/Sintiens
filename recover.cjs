const fs = require('fs');

const transcriptPath = 'C:/Users/ger4s/.gemini/antigravity/brain/1705a455-6904-40d4-93e1-c59b90d80637/.system_generated/logs/transcript.jsonl';
const outDir = 'C:/Users/ger4s/Documents/02 Proyectos/Sintiens/recovered_files';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');
const files = {};

for (let line of lines) {
    if (!line.trim()) continue;
    let entry;
    try {
        entry = JSON.parse(line);
    } catch (e) {
        continue;
    }

    if (entry.tool_calls) {
        for (let call of entry.tool_calls) {
            if (call.name === 'write_to_file') {
                let args = call.args;
                if (typeof args === 'string') {
                    try { args = JSON.parse(args); } catch(e){}
                }
                if (args && args.TargetFile) {
                    let file = args.TargetFile.split('\\').pop().split('/').pop();
                    files[file] = args.CodeContent;
                }
            } else if (call.name === 'replace_file_content') {
                let args = call.args;
                if (typeof args === 'string') {
                    try { args = JSON.parse(args); } catch(e){}
                }
                if (args && args.TargetFile) {
                    let file = args.TargetFile.split('\\').pop().split('/').pop();
                    if (files[file] && args.TargetContent && args.ReplacementContent) {
                        files[file] = files[file].replace(args.TargetContent, args.ReplacementContent);
                    }
                }
            } else if (call.name === 'multi_replace_file_content') {
                let args = call.args;
                if (typeof args === 'string') {
                    try { args = JSON.parse(args); } catch(e){}
                }
                if (args && args.TargetFile && args.ReplacementChunks) {
                    let file = args.TargetFile.split('\\').pop().split('/').pop();
                    if (files[file]) {
                        let chunks = args.ReplacementChunks;
                        if (typeof chunks === 'string') {
                            try { chunks = JSON.parse(chunks); } catch(e){}
                        }
                        if (Array.isArray(chunks)) {
                            for (let chunk of chunks) {
                                if (chunk.TargetContent && chunk.ReplacementContent) {
                                    files[file] = files[file].replace(chunk.TargetContent, chunk.ReplacementContent);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

for (let filename in files) {
    let cleanFilename = filename.replace(/["']/g, '');
    fs.writeFileSync(`${outDir}/${cleanFilename}`, files[filename]);
    console.log(`Recovered ${cleanFilename}`);
}
