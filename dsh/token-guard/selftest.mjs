// 自测：验证零依赖插件的裁剪/落盘逻辑与事件契约。
import assert from 'assert';
import { apply, name, inject } from './lib/index.js';

assert.equal(name, 'token-guard');
assert.deepEqual(inject, ['tools']);

// 模拟 ctx + spillStore + tools/post-execute 事件
let handler;
const saved = {};
const ctx = {
  on(evt, h) { if (evt === 'tools/post-execute') handler = h; },
  get(k) {
    if (k === 'spillStore') return {
      async saveText(input) { saved.text = input.content; return { locator: 'C:/spill/read.txt', retrievalHint: 'Use read.' }; }
    };
    return undefined;
  },
  logger: { warn() {} },
};

apply(ctx, { enabled: true, readBudgetTokens: 100, inlineTokens: 40 });
assert.ok(handler, 'tools/post-execute handler registered');

// 大 read 结果：需要被裁剪
const bigText = 'x'.repeat(2000); // ~500 token > 100 threshold
const exec = { name: 'read', callId: 'c1', agent: { session: { header: { id: 'sess1' } } } };
const result = { content: [{ type: 'text', text: bigText }] };
const decision = { kind: 'accept' };
const next = async () => decision;
const out = await handler(exec, result, next);
assert.equal(out.kind, 'accept');
assert.ok(saved.text && saved.text.length === 2000, 'full text spilled');
assert.ok(Array.isArray(out.content) && out.content.length >= 1, 'content present');
const joined = out.content.map(b => b.text).join('');
assert.ok(joined.includes('token-guard: middle pruned'), 'GAP marker present');
assert.ok(joined.includes('Full result stored at'), 'notice present');
assert.ok(joined.length < bigText.length, 'trimmed smaller than original');

// 小 read 结果：不动
let handler2; const ctx2 = { on(e, h) { if (e === 'tools/post-execute') handler2 = h; }, get() { return undefined; }, logger: { warn() {} } };
apply(ctx2, { enabled: true, readBudgetTokens: 100, inlineTokens: 40 });
const small = { kind: 'accept' };
const out2 = await handler2({ name: 'read', agent: {} }, { content: [{ type: 'text', text: 'tiny' }] }, async () => small);
assert.equal(out2, small, 'small result untouched');

// 非 read 工具：不动
const out3 = await handler({ name: 'grep', agent: {} }, { content: [{ type: 'text', text: bigText }] }, async () => decision);
assert.equal(out3, decision, 'non-read untouched');

// disabled：不注册
delete globalThis.__x;
let reg = false; const ctx3 = { on() { reg = true; }, get() { return undefined; }, logger: { warn() {} } };
apply(ctx3, { enabled: false });
assert.equal(reg, false, 'disabled registers nothing');

let capHandler;
apply({
  on(evt, h) { if (evt === 'tools/post-execute') capHandler = h; },
  get(k) {
    if (k === 'spillStore') return { async saveText() { return { locator: 'x', retrievalHint: 'read' }; } };
    return undefined;
  },
  logger: { warn() {} },
}, { enabled: true, readBudgetTokens: 100000, inlineTokens: 1000 });

function textResult(body) {
  return capHandler(
    { name: body.name, callId: 'c', agent: { session: { header: { id: 'sess1' } } } },
    { content: [{ type: 'text', text: body.text }] },
    async () => ({ kind: 'accept' }),
  );
}
const grepLines = Array.from({ length: 40 }, (_, i) => `Line ${i + 1}: hit`).join('\n');
const grepOut = await textResult({ name: 'grep', text: grepLines });
assert.ok(grepOut.content[0].text.includes('结果过多，已截断'), 'grep capped');
assert.equal((grepOut.content[0].text.match(/Line /g) || []).length, 20);

const manyFiles = Array.from({ length: 12 }, (_, i) => `src/f${i}.js\n  1: hit`).join('\n');
const fileOut = await textResult({ name: 'grep', text: manyFiles });
assert.ok(fileOut.content[0].text.includes('结果过多，已截断'), 'grep file cap');
assert.ok(!fileOut.content[0].text.includes('src/f11.js'), 'eleventh file dropped');

const errors = Array.from({ length: 30 }, (_, i) => `error line ${i}`).join('\n');
const pwshOut = await capHandler(
  { name: 'pwsh', callId: 'c', arguments: { command: 'npm test' }, agent: { session: { header: { id: 'sess1' } } } },
  { content: [{ type: 'text', text: errors }] },
  async () => ({ kind: 'accept' }),
);
assert.ok(pwshOut.content[0].text.startsWith('[警告]'), 'pwsh warning');
assert.ok(pwshOut.content[0].text.includes('省略 15 行错误'), 'pwsh middle omitted');
assert.ok(pwshOut.content[0].text.includes('error line 29'), 'pwsh tail kept');

const longBad = `无法读取 ${'x'.repeat(1200)}`;
const orchOut = await textResult({ name: 'orchestrate', text: longBad });
assert.ok(orchOut.content[0].text.includes('请宿主重新规划'), 'orchestrate replanned');
assert.ok(orchOut.content[0].text.length < longBad.length, 'orchestrate shortened');
const clean = { kind: 'accept' };
const longOk = await capHandler(
  { name: 'orchestrate', callId: 'c', agent: { session: { header: { id: 'sess1' } } } },
  { content: [{ type: 'text', text: 'ok '.repeat(600) }] },
  async () => clean,
);
assert.equal(longOk, clean, 'clean orchestrate result untouched');

const readLines = Array.from({ length: 520 }, (_, i) => `L${i}`).join('\n');
const readOut = await textResult({ name: 'read', text: readLines });
assert.ok(readOut.content[0].text.includes('已超过 500 行'), 'read capped at 500 lines');

const skillOut = await textResult({ name: 'skill', text: 'S'.repeat(6000) });
assert.ok(skillOut.content[0].text.length < 3000, 'skill receipt shortened');
assert.ok(skillOut.content[0].text.includes('skill 正文已截断'));

console.log('token-guard selftest: ALL PASS');
