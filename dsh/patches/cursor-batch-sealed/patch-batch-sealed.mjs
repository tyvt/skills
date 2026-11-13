// Fixes "native call arrived after its batch was sealed" on the LOADED magpie
// cursor plugin (the copy magpie actually imports at runtime).
//
// What happens upstream: a step whose single tool call is handed to the caller
// seals its batch as soon as that call is accepted (sealBatch -> made ==
// expected), so this.state becomes "awaiting-results" while the Run is still
// finishing. If Cursor then re-sends a frame for a call the bridge has not yet
// recorded in this.execs (a retransmission of the request_context / MCP
// argument envelope that carries the same ExecServerMessage.id), acceptCall
// reaches the sealed-phase guard and throws 502:
//
//   native call arrived after its batch was sealed
//
// That kills the whole turn. The guard's own comment says only a NEW exec
// violates the sealed phase, and a retransmission is not a new exec: it carries
// the same request ID and identity. The upstream dedupe (this.execs) is correct,
// the guard runs before there is anything to compare against when the first
// copy of the frame was dropped rather than recorded.
//
// The patch makes that comment true: while a batch is awaiting results, an exec
// frame whose identity matches a call already in the sealed batch is dropped as
// the retransmission it is; only an exec that is genuinely new still fails.
//
//   node patch-batch-sealed.mjs            apply (idempotent, all targets)
//   node patch-batch-sealed.mjs --check    per-target status; exit 0 all patched, 3 pristine, 2 missing, 1 unknown/error
//   node patch-batch-sealed.mjs --restore  restore every target from its backup
import { readFileSync, writeFileSync, existsSync, copyFileSync, renameSync, readdirSync, realpathSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { homedir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const PATCH_DIR = dirname(fileURLToPath(import.meta.url));
export const PLUGIN_DIR = join(
  homedir(),
  '.config',
  'magpie',
  'plugins',
  'node_modules',
  '@magpie-community',
  'opencode-cursor-auth',
);
export const NATIVE = join(PLUGIN_DIR, 'native-session.mjs');
const BACKUP = join(PLUGIN_DIR, 'native-session.mjs.orig-batch-sealed');

// magpie updates the plugin from npm and the running plugin-host then loads it
// from bun's versioned install-cache directories
// (@magpie-community/opencode-cursor-auth@<version>@@registry.npmmirror.com@@@1),
// NOT from the .config tree. Every cache copy carries its own upstream guard,
// so the patch must cover all of them, not just the .config copy (2026-11-13:
// 0.2.44-0.2.46 upgrades re-introduced the sealed-batch 502 because only the
// stale 0.2.32 .config copy was patched).
export const targets = () => {
  const out = [PLUGIN_DIR];
  const scope = join(homedir(), '.cache', 'magpie', 'bun', 'install-cache', '@magpie-community');
  let entries;
  try {
    entries = readdirSync(scope, { withFileTypes: true });
  } catch {
    entries = [];
  }
  for (const e of entries) {
    if (!e.isDirectory() || !e.name.startsWith('opencode-cursor-auth@')) continue;
    out.push(join(scope, e.name));
  }
  return out;
};

const MARK = '// [cursor-batch-sealed]';

// The exact upstream guard. Kept as a literal anchor: if the plugin rewrites
// this region the patch refuses to write rather than guessing (same contract as
// patch-quiet.mjs).
const GUARD = `    if (this.terminal || this.state === "awaiting-results") invalid("native call arrived after its batch was sealed", 502)`;

// Replacement: keep the terminal case fatal (the Run is over), but treat a
// frame that duplicates a call already sealed into the current batch as the
// retransmission it is. A genuinely new exec still fails exactly as before.
const REPLACEMENT = `    // [cursor-batch-sealed] a frame duplicating a call already sealed into the
    // awaiting-results batch is a retransmission, not a new exec: drop it
    // instead of ending the turn. Comment above already promised this.
    if (this.terminal) invalid("native call arrived after its batch was sealed", 502)
    if (this.state === "awaiting-results") {
      const sealed = this.batches?.find((b) => b.calls.some((c) => c.requestID === call.requestID && c.digest === digest))
      if (sealed) return
      invalid("native call arrived after its batch was sealed", 502)
    }`;

// Per-target status. `dir` is a plugin package directory (the one holding
// native-session.mjs).
export const statusOf = (dir = PLUGIN_DIR) => {
  const file = join(dir, 'native-session.mjs');
  if (!existsSync(file)) return 'missing';
  const src = readFileSync(file, 'utf8');
  if (src.includes(MARK)) return 'patched';
  if (src.includes(GUARD)) return 'pristine';
  return 'unknown';
};

// Compatibility: status of the .config copy.
export const status = () => statusOf(PLUGIN_DIR);

const applyTo = (dir, { force = false } = {}) => {
  const file = join(dir, 'native-session.mjs');
  const backup = join(dir, 'native-session.mjs.orig-batch-sealed');
  const state = statusOf(dir);
  if (state === 'missing' || state === 'unknown') return { dir, changed: false, state, skipped: true };
  if (state === 'patched' && !force) return { dir, changed: false, state };
  const src = readFileSync(file, 'utf8');
  const occurrences = src.split(GUARD).length - 1;
  if (occurrences !== 1) throw new Error(`${dir}: expected exactly 1 sealed-batch guard, found ${occurrences}`);
  // First-run backup only: never overwrite a backup with patched content, so
  // --restore always returns the file to pristine.
  if (!existsSync(backup)) copyFileSync(file, backup);
  const patched = src.replace(GUARD, REPLACEMENT);
  if (patched === src) throw new Error(`${dir}: sealed-batch guard not replaced`);
  // Verify syntax before the swap so a bad patch can never be loaded. The temp
  // file must end in .mjs: node refuses to syntax-check an unknown extension.
  const tmp = `${file}.tmp-batch-sealed.mjs`;
  writeFileSync(tmp, patched);
  execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' });
  renameSync(tmp, file);
  return { dir, changed: true, state: 'patched' };
};

// Apply to every target: the .config copy plus all versioned install-cache
// copies. Per-target failures are collected, not fatal — one unreadable copy
// must not leave the others unpatched. reapply.mjs only reads `.changed`.
export const apply = ({ force = false } = {}) => {
  const results = targets().map((dir) => {
    try {
      return applyTo(dir, { force });
    } catch (e) {
      return { dir, changed: false, state: 'error', error: e.message };
    }
  });
  return {
    changed: results.some((r) => r.changed),
    results,
    version: results.every((r) => r.state === 'patched' || r.skipped) && results.some((r) => r.state === 'patched')
      ? 'patched'
      : 'mixed',
  };
};

export const restore = () => {
  const results = targets().map((dir) => {
    const backup = join(dir, 'native-session.mjs.orig-batch-sealed');
    if (!existsSync(backup)) return { dir, restored: false };
    copyFileSync(backup, join(dir, 'native-session.mjs'));
    return { dir, restored: true };
  });
  return { restored: results.some((r) => r.restored), results };
};

const main = () => {
  const args = process.argv.slice(2);
  try {
    if (args.includes('--check')) {
      const results = targets().map((dir) => ({ dir, s: statusOf(dir) }));
      for (const { dir, s } of results) console.log(`batch-sealed [${s}]: ${dir}`);
      const worst = results.every((r) => r.s === 'patched')
        ? 0
        : results.some((r) => r.s === 'unknown' || r.s === 'error')
          ? 1
          : results.some((r) => r.s === 'pristine')
            ? 3
            : 2;
      process.exitCode = worst;
      return;
    }
    if (args.includes('--restore')) {
      const r = restore();
      console.log(`restored native-session.mjs (${JSON.stringify(r)})`);
      return;
    }
    const r = apply();
    for (const t of r.results) {
      console.log(`batch-sealed [${t.state}]: ${t.dir}${t.error ? ` (${t.error})` : ''}`);
    }
    console.log(r.changed ? 'sealed-batch guard applied to at least one target' : 'all targets already patched; nothing to change');
  } catch (e) {
    console.error(`error: ${e.message}`);
    process.exitCode = 1;
  }
};

// Run as a CLI when this module is the program entry. process.argv[1] is not
// reliable here (PowerShell can hand node a script path it leaves undefined),
// so compare real paths from realpath of argv or fall back to the module itself
// only when imported from a main-like context.
const invokedDirectly = () => {
  const entry = process.argv[1];
  if (!entry) return true;
  try {
    return realpathSync(entry) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return resolve(entry) === resolve(fileURLToPath(import.meta.url));
  }
};

if (invokedDirectly()) main();
