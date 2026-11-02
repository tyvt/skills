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
//   node patch-batch-sealed.mjs            apply (idempotent)
//   node patch-batch-sealed.mjs --check    exit 0 patched, 3 pristine, 2 missing, 1 unknown
//   node patch-batch-sealed.mjs --restore  restore from backup
import { readFileSync, writeFileSync, existsSync, copyFileSync, renameSync, realpathSync } from 'node:fs';
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

export const status = () => {
  if (!existsSync(NATIVE)) return 'missing';
  const src = readFileSync(NATIVE, 'utf8');
  if (src.includes(MARK)) return 'patched';
  if (src.includes(GUARD)) return 'pristine';
  return 'unknown';
};

export const apply = ({ force = false } = {}) => {
  const state = status();
  if (state === 'missing') throw new Error(`native-session.mjs not found at ${PLUGIN_DIR}`);
  if (state === 'unknown') throw new Error('native-session.mjs layout changed; refusing to patch batch-sealed guard');
  if (state === 'patched' && !force) return { changed: false, version: 'patched' };
  const src = readFileSync(NATIVE, 'utf8');
  const occurrences = src.split(GUARD).length - 1;
  if (occurrences !== 1) throw new Error(`expected exactly 1 sealed-batch guard, found ${occurrences}`);
  if (!existsSync(BACKUP)) copyFileSync(NATIVE, BACKUP);
  const patched = src.replace(GUARD, REPLACEMENT);
  if (patched === src) throw new Error('sealed-batch guard not replaced');
  // Verify syntax before the swap so a bad patch can never be loaded. The temp
  // file must end in .mjs: node refuses to syntax-check an unknown extension.
  const tmp = `${NATIVE}.tmp-batch-sealed.mjs`;
  writeFileSync(tmp, patched);
  execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' });
  renameSync(tmp, NATIVE);
  return { changed: true };
};

export const restore = () => {
  if (!existsSync(BACKUP)) throw new Error('no backup to restore (native-session.mjs.orig-batch-sealed)');
  copyFileSync(BACKUP, NATIVE);
  return { restored: true };
};

const main = () => {
  const args = process.argv.slice(2);
  try {
    if (args.includes('--check')) {
      const s = status();
      console.log(`batch-sealed status: ${s}`);
      process.exitCode = s === 'patched' ? 0 : s === 'pristine' ? 3 : s === 'missing' ? 2 : 1;
      return;
    }
    if (args.includes('--restore')) {
      console.log(`restored native-session.mjs (${JSON.stringify(restore())})`);
      return;
    }
    const r = apply();
    console.log(r.changed ? `patched batch-sealed guard in ${NATIVE}` : 'batch-sealed guard already patched; nothing to change');
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
