// 自测：验证零依赖插件的裁剪/落盘逻辑与事件契约。
import assert from 'assert';
import { apply, name, inject, createLogStore } from './lib/index.js';

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
assert.equal(saved.text, undefined, 'direct results never spill sensitive raw text');
assert.equal(out, decision, 'direct result below hard cap is untouched');

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
    { name: body.name, callId: 'c', arguments: body.arguments, agent: { session: { header: { id: 'sess1' } } } },
    { content: [{ type: 'text', text: body.text }] },
    async () => ({ kind: 'accept' }),
  );
}
const grepLines = Array.from({ length: 40 }, (_, i) => `Line ${i + 1}: hit`).join('\n');
const grepOut = await textResult({ name: 'grep', text: grepLines });
assert.ok(grepOut.content[0].text.includes('无文件信息'), 'grep no-file summary');
assert.ok(!grepOut.content[0].text.includes('Line '), 'grep no line content');

const manyFiles = Array.from({ length: 12 }, (_, i) => `src/f${i}.js\n  1: hit`).join('\n');
const fileText = (await textResult({ name: 'grep', text: manyFiles })).content[0].text;
assert.ok(fileText.includes('个文件'), 'grep file list header');
assert.ok(fileText.includes('src/f0.js') && fileText.includes('src/f9.js'), 'first 10 files listed');
assert.ok(!fileText.includes('src/f10.js'), 'eleventh file dropped');
assert.ok(fileText.includes('条'), 'per-file counts present');

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
assert.ok(readOut.content[0].text.includes('未带 offset/limit'), 'read gate without offset/limit');
assert.ok(!readOut.content[0].text.includes('L0'), 'read gate returns no content');

const readRangeOut = await textResult({ name: 'read', text: readLines, arguments: { offset: 1, limit: 200 } });
assert.ok(readRangeOut.content[0].text.includes('已超过 500 行'), 'read with range falls back to 500-line cap');

const skillOut = await textResult({ name: 'skill', text: 'S'.repeat(6000) });
assert.ok(skillOut.content[0].text.length < 3000, 'skill receipt shortened');
assert.ok(skillOut.content[0].text.includes('skill 正文已截断'));

for (const name of ['grep', 'glob', 'read', 'pwsh']) {
  const bounded = await textResult({ name, text: '密'.repeat(10000), arguments: { offset: 1, limit: 40 } });
  assert.ok(bounded.content[0].text.length <= 3200, `${name} hard char cap`);
  assert.match(bounded.content[0].text, /logRef=[a-f0-9]{32}/);
}
const logStore = createLogStore();
const ref = logStore.save('owner', 'token=secret-value\n' + 'line\n'.repeat(1000));
assert.equal(logStore.read('../escape', 'owner').ok, false);
assert.equal(logStore.read(ref, 'other').ok, false);
assert.equal(logStore.read(ref, 'owner', { limit: 2001 }).ok, false);
assert.equal(logStore.read(ref, 'owner', { maxLines: 41 }).ok, false);
for (let i = 0; i < 3; i++) {
  const page = logStore.read(ref, 'owner', { offset: i * 200 });
  assert.equal(page.ok, true);
  assert.ok(page.content.length <= 2000 && page.content.split('\n').length <= 40);
  assert.ok(!page.content.includes('secret-value'));
}
assert.equal(logStore.read(ref, 'owner').error, 'log_quota_exceeded');
const valueOut = await capHandler({ name: 'pwsh', agent: {} }, {}, async () => ({ kind: 'accept', value: 'x'.repeat(5000) }));
assert.ok(valueOut.value.length <= 3200, 'value decision cannot bypass hard cap');
let logTool;
let guarded;
apply({ tools: { register(tool) { logTool = tool; } }, on(event, fn) { if (event === 'tools/post-execute') guarded = fn; } }, {});
const wrapped = await guarded({ name: 'glob', agent: { session: { header: { id: 'tool-session' } } } }, { content: [{ type: 'text', text: 'x'.repeat(9000) }] }, async () => ({ kind: 'accept', callId: 'keep-id' }));
assert.equal(wrapped.callId, 'keep-id');
const toolRef = wrapped.content[0].text.match(/logRef=([a-f0-9]{32})/)[1];
assert.equal(logTool.name, 'p0_log_read');
assert.equal(JSON.parse(logTool.execute({ logRef: toolRef }, { agent: { session: { header: { id: 'intruder' } } } })).ok, false);
assert.equal(JSON.parse(logTool.execute({ logRef: toolRef }, { agent: { session: { header: { id: 'tool-session' } } } })).ok, true);
const structured = { stdout: 'x'.repeat(4000), stderr: '', exitCode: 7, metadata: { id: 'job' } };
const structuredOut = await capHandler({ name: 'pwsh', agent: {} }, {}, async () => ({ kind: 'accept', callId: 'structured-call', value: structured }));
assert.equal(typeof structuredOut.value, 'object');
assert.equal(structuredOut.callId, 'structured-call');
assert.equal(structuredOut.value.exitCode, 7);
assert.equal(structuredOut.value.metadata.id, 'job');
assert.equal(structuredOut.value.stderr, '');
assert.equal(typeof structuredOut.value.stdout, 'string');
assert.ok(JSON.stringify(structuredOut.value).length <= 3200);
assert.equal(structured.stdout.length, 4000, 'input value is not mutated');
const hugeMetadata = await capHandler({ name: 'pwsh', agent: {} }, {}, async () => ({ kind: 'accept', value: { ...structured, metadata: { id: 'job', detail: '"\\n'.repeat(10000), entries: Array.from({ length: 1000 }, () => ({ detail: 'x'.repeat(1000) })) } } }));
assert.equal(hugeMetadata.value.metadata.id, 'job');
assert.equal(hugeMetadata.value.exitCode, 7);
assert.ok(JSON.stringify(hugeMetadata.value).length <= 3200);
assert.match(JSON.stringify(hugeMetadata.value.metadata), /truncated/);
console.log('token-guard selftest: ALL PASS');
