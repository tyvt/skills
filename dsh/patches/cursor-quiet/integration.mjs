// Integration check: the plugin as installed on this machine, with its Cursor
// transport replaced by a stub, must retry a quiet Run transparently.
//
//   node install.mjs && node integration.mjs
//
// The stub is injected into a copy of the installed plugin, so the real
// package is only read here, never rewritten.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { PLUGIN_DIR, status, version } from './install.mjs';

const QUIET =
  'Cursor went quiet: 24 heartbeats and nothing else for 240 s, its last message checkpoint (try again)';

process.env.CURSOR_QUIET_BACKOFF_MS = '0';

const state = status();
assert.equal(state, 'patched', `the installed plugin must be patched first (state: ${state}); run node install.mjs`);

const dir = mkdtempSync(join(tmpdir(), 'cursor-quiet-'));
try {
  cpSync(PLUGIN_DIR, dir, { recursive: true });
  const url = (name) => JSON.stringify(pathToFileURL(join(dir, name)).href);
  let source = readFileSync(join(dir, 'index.mjs'), 'utf8');
  const anchor = 'async function answerOf(auth, chat, signal, session = "") {';
  assert.ok(source.includes(anchor), `answerOf anchor not found in plugin ${version()}`);
  source = source.replace(anchor, 'async function originalAnswerOf(auth, chat, signal, session = "") {');
  source = source.replaceAll('"./cursor-quiet-retry.mjs"', url('cursor-quiet-retry.mjs'));
  source = source.replaceAll('"./native-session.mjs"', url('native-session.mjs'));
  source += `
let __quietCalls = 0;
const __quietFrame = (value) => \`data: \${JSON.stringify(value)}\\n\\n\`;
async function answerOf() {
  __quietCalls += 1;
  const role = __quietFrame({ choices: [{ index: 0, delta: { role: "assistant", content: "" } }] });
  const body =
    __quietCalls === 1
      ? role + __quietFrame({ error: { message: ${JSON.stringify(QUIET)}, code: 502 } })
      : role + __quietFrame({ choices: [{ index: 0, delta: { content: "retried" } }] }) + "data: [DONE]\\n\\n";
  return new Response(body, { headers: { "content-type": "text/event-stream" } });
}
export { answer };
export const callCount = () => __quietCalls;
`;
  const entry = join(dir, 'entry-test.mjs');
  writeFileSync(entry, source);
  const plugin = await import(pathToFileURL(entry).href);
  const response = await plugin.answer({}, { model: 'cursor/composer-2.5', stream: true }, undefined, 'quiet-test');
  const body = await response.text();
  assert.equal(plugin.callCount(), 2, 'the quiet Run should be retried exactly once');
  assert.match(body, /retried/, 'the retry answer must reach the client');
  assert.doesNotMatch(body, /went quiet/, 'the quiet failure must not surface after a successful retry');
  assert.equal(response.headers.get('X-Magpie-Sign-In'), 'kept', 'the sign-in marker must survive the wrapper');
  console.log(`PASS: installed plugin ${version()} retries a quiet Run transparently (2 attempts, no duplicate output).`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
