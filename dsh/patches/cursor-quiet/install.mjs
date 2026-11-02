// Installs the Cursor quiet-retry into the magpie cursor plugin.
//
//   node install.mjs             apply (idempotent), print what changed
//   node install.mjs --check     exit 0 patched, 3 not patched, 1 unknown
//   node install.mjs --restore   put the plugin back as published
//
// The patch is two edits to the plugin's own entry:
//   1. one import of ./cursor-quiet-retry.mjs, the helper copied next to it;
//   2. the `answer` arrow wrapped in quietRetry(...), so a Run that went quiet
//      before any output is retried instead of ending the turn.
//
// A plugin update replaces index.mjs and drops the helper, so reapply.mjs
// runs this again from a scheduled task; the anchor is checked first and an
// entry this script does not recognise is never written.
import {
  readFileSync,
  writeFileSync,
  existsSync,
  copyFileSync,
  renameSync,
  appendFileSync,
  mkdirSync,
  rmSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
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
const ENTRY = join(PLUGIN_DIR, 'index.mjs');
const HELPER = join(PLUGIN_DIR, 'cursor-quiet-retry.mjs');
const HELPER_SOURCE = join(PATCH_DIR, 'cursor-quiet-retry.mjs');
const BACKUP = join(PLUGIN_DIR, 'index.mjs.orig-cursor-quiet');
const LOG = join(PATCH_DIR, 'apply.log');

const IMPORT_ANCHOR =
  'import { NATIVE_LIMITS, nativeSessions, NativeSessionError, nativeFields, nativeMcpArgs, Quiet } from "./native-session.mjs"';
const IMPORT_LINE = '\nimport { quietRetry } from "./cursor-quiet-retry.mjs"';
const ANSWER_ANCHOR =
  'const answer = async (auth, chat, signal, session) => kept(await answerOf(auth, chat, signal, session))';
const ANSWER_PATCHED =
  'const answer = async (auth, chat, signal, session) => kept(await quietRetry(() => answerOf(auth, chat, signal, session), { signal }))';
const MARK = 'quietRetry(() => answerOf(';

export const version = () => {
  try {
    return JSON.parse(readFileSync(join(PLUGIN_DIR, 'package.json'), 'utf8')).version ?? '?';
  } catch {
    return '?';
  }
};

const writeAtomic = (file, text) => {
  const tmp = file + '.tmp-cursor-quiet';
  writeFileSync(tmp, text);
  renameSync(tmp, file);
};

export const log = (line) => {
  try {
    mkdirSync(PATCH_DIR, { recursive: true });
    const stamp = new Date().toISOString();
    // A plugin version this patch does not know would otherwise repeat the same
    // error every five minutes all day, so an identical line is logged once a day.
    if (existsSync(LOG)) {
      const lines = readFileSync(LOG, 'utf8').trimEnd().split('\n');
      const last = lines[lines.length - 1] ?? '';
      if (last.slice(0, 10) === stamp.slice(0, 10) && last.slice(25) === line) return;
    }
    appendFileSync(LOG, `${stamp} ${line}\n`);
  } catch {}
};

export const status = () => {
  if (!existsSync(ENTRY)) return 'missing';
  const source = readFileSync(ENTRY, 'utf8');
  if (source.includes(MARK) && source.includes('cursor-quiet-retry.mjs')) return 'patched';
  if (source.includes(ANSWER_ANCHOR) && source.includes(IMPORT_ANCHOR)) return 'pristine';
  return 'unknown';
};

// apply patches a pristine entry and refreshes the helper; a patched entry is
// left alone apart from the helper, so a re-run after an update is harmless.
export const apply = () => {
  const state = status();
  if (state === 'missing') throw new Error(`cursor plugin not found at ${PLUGIN_DIR}`);
  if (state === 'unknown') {
    throw new Error(
      `cursor plugin ${version()} is not a version this patch knows; left untouched (update install.mjs)`,
    );
  }
  const helper = readFileSync(HELPER_SOURCE, 'utf8');
  const helperStale = !existsSync(HELPER) || readFileSync(HELPER, 'utf8') !== helper;
  if (state === 'patched') {
    if (helperStale) writeFileSync(HELPER, helper);
    return { changed: false, helperRefreshed: helperStale, version: version() };
  }
  const source = readFileSync(ENTRY, 'utf8');
  // Always refresh the backup from the entry just read: after a plugin update the
  // old backup belongs to the previous version and restore would bring it back.
  writeFileSync(BACKUP, source);
  writeFileSync(HELPER, helper);
  writeAtomic(ENTRY, source.replace(IMPORT_ANCHOR, IMPORT_ANCHOR + IMPORT_LINE).replace(ANSWER_ANCHOR, ANSWER_PATCHED));
  return { changed: true, helperRefreshed: true, version: version() };
};

export const restore = () => {
  const state = status();
  if (state === 'missing') throw new Error(`cursor plugin not found at ${PLUGIN_DIR}`);
  if (state === 'pristine') return { changed: false, version: version() };
  if (state === 'unknown') throw new Error(`cursor plugin ${version()} is not one this patch wrote; left untouched`);
  const source = readFileSync(ENTRY, 'utf8');
  writeAtomic(ENTRY, source.replace(ANSWER_PATCHED, ANSWER_ANCHOR).replace(IMPORT_LINE, ''));
  rmSync(HELPER, { force: true });
  return { changed: true, version: version() };
};

const main = () => {
  const args = process.argv.slice(2);
  const quiet = args.includes('--quiet');
  if (args.includes('--check')) {
    const state = status();
    if (!quiet) console.log(`${state} (plugin ${version()})`);
    process.exitCode = state === 'patched' ? 0 : state === 'pristine' ? 3 : 1;
    return;
  }
  try {
    if (args.includes('--restore')) {
      const result = restore();
      const line = result.changed ? `restored plugin ${result.version}` : `already pristine (plugin ${result.version})`;
      log(line);
      if (!quiet) console.log(line);
      return;
    }
    const result = apply();
    const line = result.changed
      ? `patched plugin ${result.version}`
      : result.helperRefreshed
        ? `refreshed helper on plugin ${result.version}`
        : `already patched (plugin ${result.version})`;
    log(line);
    if (!quiet) console.log(line);
  } catch (error) {
    log(`error: ${error.message}`);
    if (!quiet) console.error(error.message);
    process.exitCode = 1;
  }
};

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
