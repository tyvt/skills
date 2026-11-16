// Defaults direct-API cursor requests to Cursor's fast variant.
//
// The plugin only turns fast on when the caller sends service_tier "priority"
// or "fast" (index.mjs, chat handler):
//
//   const tier = chat.service_tier
//   const fast = tier === "priority" || tier === "fast" ? true : tier ? false : undefined
//
// A caller that sends no service_tier gets `undefined`, and pick() then writes
// fast=false — so calls placed straight against magpie's OpenAI endpoint never
// run Cursor's fast variant even when the account has one. This patch makes the
// no-tier case default to fast; an explicit non-fast tier ("default", "flex",
// ...) still turns it off, and models without a fast variant ignore it
// (pick() only applies want.fast when entry.fast).
//
//   node patch-fast-default.mjs            apply (idempotent, all targets)
//   node patch-fast-default.mjs --check    per-target status; exit 0 all patched, 3 pristine, 2 missing, 1 unknown/error
//   node patch-fast-default.mjs --restore  restore every target from its backup
//
// magpie loads the plugin from bun's versioned install-cache directories and
// keeps a stale copy under ~/.config/magpie/plugins, so like
// cursor-batch-sealed this covers every copy. Patching needs a magpie-bun
// restart to reach the running plugin-host's memory.
import { readFileSync, writeFileSync, existsSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

export const PATCH_DIR = dirname(fileURLToPath(import.meta.url));
export const MARKER = '[cursor-fast-default]';
export const ANCHOR = 'const fast = tier === "priority" || tier === "fast" ? true : tier ? false : undefined';
export const REPLACEMENT =
  'let fast = tier === "priority" || tier === "fast" ? true : tier ? false : undefined; ' +
  'if (fast === undefined) fast = true; ' +
  '// [cursor-fast-default] direct API calls without service_tier default to Cursor fast';
const BACKUP_SUFFIX = '.orig-fast-default';

// transform is the pure text surgery: no marker and exactly one anchor ->
// replacement; already marked -> leave as is; anything else -> refuse.
export function transform(content) {
  if (content.includes(MARKER)) return { ok: true, changed: false, content, reason: 'already patched' };
  const parts = content.split(ANCHOR);
  if (parts.length !== 2) {
    return { ok: false, changed: false, content, reason: `anchor found ${parts.length - 1} times, refusing to write` };
  }
  return { ok: true, changed: true, content: content.replace(ANCHOR, REPLACEMENT), reason: 'patched' };
}

const pluginDirs = () => {
  const home = homedir();
  const dirs = [join(home, '.config', 'magpie', 'plugins', 'node_modules', '@magpie-community', 'opencode-cursor-auth')];
  const cache = join(home, '.cache', 'magpie', 'bun', 'install-cache', '@magpie-community');
  try {
    for (const name of readdirSync(cache)) {
      if (name.startsWith('opencode-cursor-auth@')) dirs.push(join(cache, name));
    }
  } catch {}
  return dirs.filter((d) => existsSync(join(d, 'index.mjs')));
};

export const targets = () => pluginDirs().map((d) => join(d, 'index.mjs'));

// applyTo is apply over explicit paths so tests can run against a temp tree.
export function applyTo(paths) {
  const results = [];
  for (const path of paths) {
    try {
      if (!existsSync(path)) {
        results.push({ path, ok: false, changed: false, reason: 'missing' });
        continue;
      }
      const before = readFileSync(path, 'utf8');
      const r = transform(before);
      if (!r.ok) {
        results.push({ path, ok: false, changed: false, reason: r.reason });
        continue;
      }
      if (!r.changed) {
        results.push({ path, ok: true, changed: false, reason: r.reason });
        continue;
      }
      const backup = path + BACKUP_SUFFIX;
      if (!existsSync(backup)) copyFileSync(path, backup);
      writeFileSync(path, r.content);
      results.push({ path, ok: true, changed: true, reason: 'patched (backup: ' + existsSync(backup) + ')' });
    } catch (e) {
      results.push({ path, ok: false, changed: false, reason: e.message });
    }
  }
  return { changed: results.some((r) => r.changed), results };
}

export const apply = () => applyTo(targets());

export function restoreTo(paths) {
  const results = [];
  for (const path of paths) {
    const backup = path + BACKUP_SUFFIX;
    if (!existsSync(backup)) {
      results.push({ path, ok: false, reason: 'no backup' });
      continue;
    }
    copyFileSync(backup, path);
    results.push({ path, ok: true, reason: 'restored' });
  }
  return { changed: results.some((r) => r.ok), results };
}

export const restore = () => restoreTo(targets());

export function statusOn(paths) {
  return paths.map((path) => {
    if (!existsSync(path)) return { path, state: 'missing' };
    const c = readFileSync(path, 'utf8');
    if (c.includes(MARKER)) return { path, state: 'patched' };
    if (c.split(ANCHOR).length === 2) return { path, state: 'pristine' };
    return { path, state: 'unknown' };
  });
}

export const log = (msg) => console.log(`[cursor-fast-default] ${new Date().toISOString()} ${msg}`);

if (import.meta.url === 'file://' + process.argv[1].replace(/\\/g, '/') || process.argv[1] && import.meta.url.endsWith(process.argv[1].split(/[\\/]/).pop())) {
  const arg = process.argv[2] ?? '';
  if (arg === '--check') {
    const st = statusOn(targets());
    for (const s of st) log(`${s.state}: ${s.path}`);
    const states = st.map((s) => s.state);
    process.exitCode = states.every((s) => s === 'patched') ? 0 : states.includes('unknown') ? 1 : states.includes('missing') ? 2 : 3;
  } else if (arg === '--restore') {
    const r = restore();
    for (const s of r.results) log(`${s.ok ? 'restored' : 'FAILED'}: ${s.path} (${s.reason})`);
    process.exitCode = r.results.every((s) => s.ok) ? 0 : 1;
  } else {
    const r = apply();
    for (const s of r.results) log(`${s.ok ? (s.changed ? 'patched' : 'untouched') : 'FAILED'}: ${s.path} (${s.reason})`);
    process.exitCode = r.results.every((s) => s.ok) ? 0 : 1;
  }
}
