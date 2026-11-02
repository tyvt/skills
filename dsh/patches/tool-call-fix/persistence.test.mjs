import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { applyPatch, hash } from './patcher.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
const snapshots = fs.existsSync(path.join(here, 'original-snapshots')) ? path.join(here, 'original-snapshots') : path.join(here, '../tool-call-fix-backup');
const manifest = JSON.parse(fs.readFileSync(path.join(here, 'manifest.json'), 'utf8'));
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-patch-regression-'));
  t.after(() => { const resolved = fs.realpathSync(root); assert.equal(path.dirname(resolved), fs.realpathSync(os.tmpdir())); assert.ok(path.basename(resolved).startsWith('dsh-patch-regression-')); fs.rmSync(resolved, { recursive: true }); });
  const modules = path.join(root, 'node_modules/@deepseek-ai');
  const entry = path.join(modules, 'dsh/lib/bin.js');
  fs.mkdirSync(path.dirname(entry), { recursive: true });
  fs.writeFileSync(path.join(modules, 'dsh/package.json'), '{"name":"@deepseek-ai/dsh","type":"module"}');
  const files = [];
  for (const { name } of manifest.patches) {
    const dir = path.join(modules, name);
    fs.mkdirSync(path.join(dir, 'lib'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: '@deepseek-ai/' + name, type: 'module', exports: './lib/index.js' }));
    const file = path.join(dir, 'lib/index.js');
    fs.copyFileSync(path.join(snapshots, name + '-index.js'), file);
    files.push(file);
  }
  return { root, entry, files, backupDir: path.join(root, 'backups') };
}
test('restores overwritten modules and stores content-addressed original backups', t => {
  const f = fixture(t);
  const result = applyPatch(f.entry, { backupDir: f.backupDir });
  assert.equal(result.repaired.length, manifest.patches.length);
  for (const item of result.modules) {
    assert.equal(hash(fs.readFileSync(item.file)), item.afterHash);
    assert.equal(hash(fs.readFileSync(path.join(f.backupDir, item.name + '-' + item.beforeHash + '.js'))), item.beforeHash);
  }
});
test('a second startup is idempotent and does not rewrite modules', t => {
  const f = fixture(t); applyPatch(f.entry, { backupDir: f.backupDir });
  const before = f.files.map(file => fs.statSync(file).mtimeMs);
  assert.deepEqual(applyPatch(f.entry, { backupDir: f.backupDir }).repaired, []);
  assert.deepEqual(f.files.map(file => fs.statSync(file).mtimeMs), before);
  assert.equal(fs.readdirSync(f.backupDir).length, manifest.patches.length);
});
test('incompatible update fails preflight before changing either module', t => {
  const f = fixture(t);
  fs.appendFileSync(f.files[1], '\nif (!tool) throw new ToolNotFoundError(exec.name);\n');
  const before = f.files.map(file => fs.readFileSync(file, 'utf8'));
  assert.throws(() => applyPatch(f.entry, { backupDir: f.backupDir }), /compatibility review/);
  assert.deepEqual(f.files.map(file => fs.readFileSync(file, 'utf8')), before);
  assert.equal(fs.existsSync(f.backupDir), false);
});
test('NODE_OPTIONS restores overwritten modules before the CLI entry executes', t => {
  const f = fixture(t);
  const expected = manifest.patches.map(({ name, edits }) => ({ file: path.join(f.root, 'node_modules/@deepseek-ai', name, 'lib/index.js'), after: edits.map(e => e.after) }));
  fs.writeFileSync(f.entry, `import fs from 'node:fs'; for(const {file,after} of ${JSON.stringify(expected)}) for(const text of after) if(!fs.readFileSync(file,'utf8').includes(text)) throw new Error('Entry ran before restoration'); console.log('PRELOAD_BEFORE_ENTRY_OK');`);
  // Use a private copy: fixture startup must not replace the real startup audit record.
  const isolated = path.join(f.root, 'guard'); fs.mkdirSync(isolated);
  for (const name of ['patcher.mjs', 'bootstrap.mjs', 'manifest.json']) fs.copyFileSync(path.join(here, name), path.join(isolated, name));
  const option = '--import=' + pathToFileURL(path.join(isolated, 'bootstrap.mjs')).href;
  const child = spawnSync(process.execPath, [f.entry], { env: { ...process.env, NODE_OPTIONS: option }, stdio: 'inherit' });
  assert.equal(child.error, undefined); assert.equal(child.status, 0);
  assert.equal(JSON.parse(fs.readFileSync(path.join(isolated, 'last-startup.json'), 'utf8')).repaired.length, manifest.patches.length);
});
test('unrelated Node programs bypass the guard entirely', t => {
  const f = fixture(t);
  const app = path.join(f.root, 'business-app.mjs'); fs.writeFileSync(app, 'console.log("UNRELATED_NODE_OK");');
  const child = spawnSync(process.execPath, [app], { env: { ...process.env, NODE_OPTIONS: '--import=' + pathToFileURL(path.join(here, 'bootstrap.mjs')).href }, stdio: 'inherit' });
  assert.equal(child.error, undefined); assert.equal(child.status, 0);
  assert.equal(fs.existsSync(f.backupDir), false);
  for (const [i, { name }] of manifest.patches.entries()) assert.equal(hash(fs.readFileSync(f.files[i])), hash(fs.readFileSync(path.join(snapshots, name + '-index.js'))));
});
test('dry-run detects a missing patch without writing modules', t => {
  const f = fixture(t); const before = f.files.map(file => hash(fs.readFileSync(file)));
  assert.equal(applyPatch(f.entry, { backupDir: f.backupDir, dryRun: true }).repaired.length, manifest.patches.length);
  assert.deepEqual(f.files.map(file => hash(fs.readFileSync(file))), before);
  assert.equal(fs.existsSync(f.backupDir), false);
});
