import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyPatch } from './patcher.mjs';
const entry = process.argv[1];
// Only the DSH CLI entry is eligible. npm, business apps and subprocess runners are untouched.
if (entry && /[\\/]@deepseek-ai[\\/]dsh[\\/]lib[\\/]bin\.js$/i.test(path.resolve(entry))) {
  const statusFile = path.join(path.dirname(fileURLToPath(import.meta.url)), 'last-startup.json');
  try {
    const status = applyPatch(entry);
    fs.writeFileSync(statusFile, JSON.stringify({ ok: true, pid: process.pid, ...status }, null, 2) + '\n');
    if (status.repaired.length) console.error('[dsh-tool-call-fix] Restored: ' + status.repaired.join(', '));
  } catch (error) {
    try { fs.writeFileSync(statusFile, JSON.stringify({ ok: false, at: new Date().toISOString(), message: error.message }, null, 2) + '\n'); } catch {}
    console.error('[dsh-tool-call-fix] Startup stopped: ' + error.message);
    throw error;
  }
}
