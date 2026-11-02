import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const home = path.dirname(fileURLToPath(import.meta.url));
export const hash = text => createHash('sha256').update(text).digest('hex');
export function planPatch(entry, manifest = JSON.parse(fs.readFileSync(path.join(home, 'manifest.json'), 'utf8'))) {
  const resolve = createRequire(path.resolve(entry));
  return manifest.patches.map(({ name, edits }) => {
    if (!['dsh-tools', 'dsh-llm-pi-ai', 'dsh-sandbox', 'dsh-tool-fs', 'dsh-tool-fs-search', 'dsh-tool-session-query'].includes(name)) throw new Error('Unexpected patch target: ' + name);
    const file = fs.realpathSync(resolve.resolve('@deepseek-ai/' + name));
    const original = fs.readFileSync(file, 'utf8');
    let next = original;
    for (const { before, after } of edits) {
      if (next.split(after).length === 2) continue;
      if (next.includes(after) || next.split(before).length !== 2) {
        throw new Error('DSH tool-call fix requires compatibility review: ' + name + '. No files were changed.');
      }
      next = next.replace(before, after);
    }
    return { name, file, original, next, beforeHash: hash(original), afterHash: hash(next) };
  });
}
export function applyPatch(entry, { backupDir = path.join(home, 'backups'), dryRun = false, manifest } = {}) {
  // Preflight every module and recheck all snapshots before the first write.
  const plan = planPatch(entry, manifest);
  for (const item of plan) {
    if (fs.readFileSync(item.file, 'utf8') !== item.original) throw new Error('Concurrent DSH update detected; retry after it completes.');
  }
  const changed = plan.filter(item => item.original !== item.next);
  if (!dryRun && changed.length) {
    fs.mkdirSync(backupDir, { recursive: true });
    for (const item of changed) {
      const backup = path.join(backupDir, item.name + '-' + item.beforeHash + '.js');
      if (!fs.existsSync(backup)) fs.writeFileSync(backup, item.original, { flag: 'wx' });
      else if (hash(fs.readFileSync(backup)) !== item.beforeHash) throw new Error('Backup integrity check failed: ' + item.name);
    }
    for (const item of changed) fs.writeFileSync(item.file, item.next);
    for (const item of changed) if (hash(fs.readFileSync(item.file)) !== item.afterHash) throw new Error('Post-write integrity check failed: ' + item.name);
  }
  return { checkedAt: new Date().toISOString(), entry: path.resolve(entry), dryRun, repaired: changed.map(item => item.name), modules: plan.map(({ name, file, beforeHash, afterHash }) => ({ name, file, beforeHash, afterHash })) };
}
