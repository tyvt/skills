import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const source = path.dirname(fileURLToPath(import.meta.url));
const manifestFile = path.join(source, 'manifest.json');
let manifest;
if (fs.existsSync(manifestFile)) {
  manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
} else {
  const legacy = fs.readFileSync(path.join(source, '../apply-tool-call-fix.mjs'), 'utf8');
  const begin = legacy.indexOf('const patches=');
  const end = legacy.indexOf('const pending=');
  if (begin < 0 || end < begin) throw new Error('Original patch declaration not found');
  const patches = new Function(legacy.slice(begin, end) + '; return patches;')();
  manifest = { format: 1, id: 'dsh-tool-call-fix-20261027', patches: patches.map(([name, edits]) => ({ name, edits: edits.map(([before, after]) => ({ before, after })) })) };
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
}
const destination = path.join(process.env.USERPROFILE, '.dsh/patches/tool-call-fix');
fs.mkdirSync(destination, { recursive: true });
for (const name of ['patcher.mjs', 'bootstrap.mjs', 'manifest.json', 'install.mjs', 'install.ps1', 'uninstall.ps1', 'start-dsh.cmd', 'start-dsh.ps1', 'persistence.test.mjs', 'README.md']) {
  const input = fs.readFileSync(path.join(source, name));
  const output = path.join(destination, name);
  if (fs.existsSync(output)) {
    const previous = fs.readFileSync(output);
    if (previous.equals(input)) continue;
    const fingerprint = createHash('sha256').update(previous).digest('hex');
    const backup = output + '.previous-' + fingerprint;
    if (!fs.existsSync(backup)) fs.writeFileSync(backup, previous, { flag: 'wx' });
  }
  fs.writeFileSync(output, input);
}
// Retain the original source snapshots outside the workspace too.
const backups = path.join(source, '../tool-call-fix-backup');
if (fs.existsSync(backups)) {
  fs.mkdirSync(path.join(destination, 'original-snapshots'), { recursive: true });
  for (const name of fs.readdirSync(backups)) {
    const output = path.join(destination, 'original-snapshots', name);
    if (!fs.existsSync(output)) fs.copyFileSync(path.join(backups, name), output);
  }
}
const regression = path.join(source, '../tool-call-regression.test.mjs');
if (fs.existsSync(regression)) {
  const target = path.join(destination, 'tool-call-regression.test.mjs');
  if (fs.existsSync(target)) fs.readFileSync(target, 'utf8');
  fs.writeFileSync(target, fs.readFileSync(regression));
}
for (const [input, name] of [[path.join(source, '../tool-call-fix-report.md'), 'tool-call-fix-report.md'], [path.join(source, 'verification.json'), 'verification.json']]) {
  if (!fs.existsSync(input)) continue;
  const target = path.join(destination, name);
  if (fs.existsSync(target)) fs.readFileSync(target);
  fs.writeFileSync(target, fs.readFileSync(input));
}
console.log(JSON.stringify({ destination }));
