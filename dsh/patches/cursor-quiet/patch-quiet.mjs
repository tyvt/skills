// Raises the "Cursor went quiet" watchdog threshold on the LOADED magpie
// cursor plugin (the copy magpie actually imports at runtime), so large
// composer 2.5 server-side preps don't trip NATIVE_LIMITS.quiet = 240_000
// and end the turn with "Cursor went quiet: N heartbeats and nothing else
// for 240 s".
//
// patch-magpie-quiet.ps1 was meant to do this but resolved its target from
// ~/.cache/magpie/bun/install-cache (the unloaded copy), so the change never
// took effect. This module is the durable, self-healing equivalent:
// reapply.mjs runs it from the scheduled task, so a plugin update that
// overwrites native-session.mjs re-raises quiet automatically.
//
//   node patch-quiet.mjs            apply (idempotent)
//   node patch-quiet.mjs --check    exit 0 patched, 3 pristine, 2 missing, 1 unknown
//   node patch-quiet.mjs --restore  restore from backup
import {
  readFileSync,
  writeFileSync,
  existsSync,
  copyFileSync,
  renameSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { execSync } from 'node:child_process';
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
const NATIVE = join(PLUGIN_DIR, 'native-session.mjs');
const BACKUP = join(PLUGIN_DIR, 'native-session.mjs.orig-cursor-quiet');
const TARGET_MS = 600_000;
const TARGET_SEC = TARGET_MS / 1000;

// Either marker means "quiet already raised" — ours, or patch-magpie-quiet.ps1's.
const OUR_MARK = `// [cursor-quiet] quiet raised to ${TARGET_SEC}s`;
const PS1_MARK = '// [local patch] quiet raised';

// `  quiet: 240_000,` at the start of its line — not the prose in the
// error-message template (line ~105) or the throw (line ~143).
const QUIET_RE = /^(\s*quiet:\s*)[\d_]+(,*)\s*$/m;

export const statusQuiet = () => {
  if (!existsSync(NATIVE)) return 'missing';
  const src = readFileSync(NATIVE, 'utf8');
  if (src.includes(OUR_MARK) || src.includes(PS1_MARK)) return 'patched';
  if (QUIET_RE.test(src)) return 'pristine';
  return 'unknown';
};

export const applyQuiet = ({ force = false } = {}) => {
  const state = statusQuiet();
  if (state === 'missing') throw new Error(`native-session.mjs not found at ${PLUGIN_DIR}`);
  if (state === 'unknown') throw new Error('native-session.mjs layout changed; refusing to patch quiet');
  const src = readFileSync(NATIVE, 'utf8');
  const m = src.match(QUIET_RE);
  const currentMs = m ? Number(m[2].replace(/_/g, '')) : null;
  if (state === 'patched' && !force) return { changed: false, version: 'patched' };
  if (currentMs === TARGET_MS && !force) return { changed: false, version: `already ${TARGET_SEC}s` };
  if (!existsSync(BACKUP)) copyFileSync(NATIVE, BACKUP);
  const formatted = TARGET_MS.toLocaleString('en-US').replace(/,/g, '_'); // 600_000
  const patched = src.replace(QUIET_RE, `$1${formatted}$3 ${OUR_MARK}`);
  if (patched === src) throw new Error('quiet assignment not found');
  const tmp = `${NATIVE}.tmp-cursor-quiet`;
  writeFileSync(tmp, patched);
  renameSync(tmp, NATIVE);
  try {
    execSync(`node --check "${NATIVE}"`, { stdio: 'pipe' });
  } catch {
    // syntax check is best-effort; patch-magpie-quiet.ps1 does a full import verify
  }
  return { changed: true, from: currentMs, to: TARGET_MS };
};

export const restoreQuiet = () => {
  if (!existsSync(BACKUP)) throw new Error('no backup to restore (native-session.mjs.orig-cursor-quiet)');
  copyFileSync(BACKUP, NATIVE);
  try {
    execSync(`node --check "${NATIVE}"`, { stdio: 'pipe' });
  } catch {
    /* best-effort */
  }
  return { restored: true };
};

const main = () => {
  const args = process.argv.slice(2);
  const log = (m) => console.log(m);
  try {
    if (args.includes('--check')) {
      const s = statusQuiet();
      const code = s === 'patched' ? 0 : s === 'pristine' ? 3 : s === 'missing' ? 2 : 1;
      console.log(`quiet status: ${s}`);
      process.exit(code);
    }
    if (args.includes('--restore')) {
      const r = restoreQuiet();
      log(`restored native-session.mjs (${JSON.stringify(r)})`);
      return;
    }
    const result = applyQuiet();
    log(
      result.changed
        ? `raised quiet: ${result.from} -> ${result.to} in ${NATIVE}`
        : `quiet already at target (${TARGET_SEC}s); nothing to change`,
    );
  } catch (error) {
    log(`error: ${error.message}`);
    process.exitCode = 1;
  }
};

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
