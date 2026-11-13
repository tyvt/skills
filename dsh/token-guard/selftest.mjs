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

async function textResult(body) {
  const out = await capHandler(
    { name: body.name, callId: 'c', arguments: body.arguments, agent: { session: { header: { id: 'sess1' } } } },
    { content: [{ type: 'text', text: body.text }] },
    async () => ({ kind: 'accept' }),
  );
  // 未折叠/未裁剪时 handler 原样返回 decision（无 content），此时输出即原文。
  const content = Array.isArray(out?.content) ? out.content : [{ type: 'text', text: body.text }];
  return { ...out, content };
}
const grepLines = Array.from({ length: 40 }, (_, i) => `Line ${i + 1}: hit`).join('\n');
const grepOut = await textResult({ name: 'grep', text: grepLines, arguments: {} });
// 无文件信息 + 命中 40 ≥30 但 files<5 → 不折叠（组合条件），应回行内容。
assert.ok(grepOut.content[0].text.includes('Line '), 'single-unknown-file 40 hits NOT folded (combined condition)');

// 单文件多命中（24 条）不得折叠（审计 B：1 文件 24 条曾被折成文件名）。
const oneFileMany = ['src/a.js', ...Array.from({ length: 24 }, (_, i) => `  ${i + 1}: hit`)].join('\n');
const oneFileOut = (await textResult({ name: 'grep', text: oneFileMany, arguments: {} })).content[0].text;
assert.ok(oneFileOut.includes('hit'), 'single file 24 hits keeps line content');

// 组合条件：文件 ≥5 且 命中 ≥30 才折叠为文件清单 + 行号。
const manyFiles = [];
for (let f = 0; f < 6; f++) {
  manyFiles.push(`src/f${f}.js`);
  for (let i = 0; i < 6; i++) manyFiles.push(`  ${i + 1}: hit`);
}
const fileText = (await textResult({ name: 'grep', text: manyFiles.join('\n'), arguments: {} })).content[0].text;
assert.ok(fileText.includes('个文件'), 'grep file list header when files>=5 && matches>=30');
assert.ok(fileText.includes('src/f0.js') && fileText.includes('行 1'), 'file list includes line numbers');

// 带上下文参数的 grep 不折叠（尊重 -C/-A/-B）。
const ctxOut = (await textResult({ name: 'grep', text: manyFiles.join('\n'), arguments: { context: 2 } })).content[0].text;
assert.ok(ctxOut.includes('hit'), 'grep with context not folded');

const errors = Array.from({ length: 30 }, (_, i) => `error line ${i}`).join('\n');
const pwshOut = await capHandler(
  { name: 'pwsh', callId: 'c', arguments: { command: 'npm test' }, agent: { session: { header: { id: 'sess1' } } } },
  { content: [{ type: 'text', text: errors }] },
  async () => ({ kind: 'accept' }),
);
assert.ok(pwshOut.content[0].text.startsWith('[警告]'), 'pwsh warning');
assert.ok(pwshOut.content[0].text.includes('省略 15 行错误'), 'pwsh middle omitted');
assert.ok(pwshOut.content[0].text.includes('error line 29'), 'pwsh tail kept');
// build 分支不得走读取类裁剪文案（形状互不串）。
assert.ok(!pwshOut.content[0].text.includes('省略90行'), 'build output must not use read-class 省略90行 wording');

// ── pwsh 读取类大输出裁剪（新增）──────────────────────────────────────────────
// 带 saveText 计数的 ctx，便于断言「是否落盘 / 落盘内容」。
function makePwshCtx(cfg, spillImpl) {
  let h;
  const calls = [];
  const store = {
    async saveText(input) {
      calls.push(input.content);
      if (spillImpl === 'throw') throw new Error('boom');
      return { locator: 'spill://big.txt', retrievalHint: 'read' };
    },
  };
  apply({
    on(e, fn) { if (e === 'tools/post-execute') h = fn; },
    get(k) { return k === 'spillStore' ? store : undefined; },
    logger: { warn() {} },
  }, cfg);
  return { handler: h, calls };
}
async function runPwsh(handler, command, text) {
  return handler(
    { name: 'pwsh', callId: 'c', arguments: { command }, agent: { session: { header: { id: 'sess1' } } } },
    { content: [{ type: 'text', text }] },
    async () => ({ kind: 'accept' }),
  );
}

// 正向-默认配置：250 行 → 头 120 + 省略90行 + 尾 40，落盘一次（落盘=裁剪前原文）。
const big250 = Array.from({ length: 250 }, (_, i) => `L${i + 1}`).join('\n');
{
  const { handler, calls } = makePwshCtx({ enabled: true, readBudgetTokens: 100000, inlineTokens: 1000 });
  const out = await runPwsh(handler, 'Get-Content big.txt', big250);
  const t = out.content[0].text;
  assert.ok(t.includes('省略90行'), 'default 250-line: 省略90行');
  assert.ok(t.includes('L1\n') || t.startsWith('L1'), 'head kept (L1)');
  assert.ok(t.includes('L250'), 'tail kept (L250)');
  assert.ok(t.length < big250.length, 'trimmed shorter than original');
  assert.ok(t.includes('spill://big.txt'), 'spill locator present');
  assert.equal(calls.length, 1, 'spilled once');
  assert.equal(calls[0], big250, 'spilled content = pre-trim original');
}

// 合并回归：保留读取类落盘，并对保存内容脱敏、对最终结果执行 P0 硬帽。
{
  const { handler, calls } = makePwshCtx({ enabled: true, readBudgetTokens: 100000, inlineTokens: 1000 });
  const sensitive = 'token=merge-secret\n' + Array.from({ length: 250 }, (_, i) => `${i}:` + 'x'.repeat(100)).join('\n');
  const out = await runPwsh(handler, 'Get-Content big.txt', sensitive);
  assert.equal(calls.length, 1);
  assert.ok(!calls[0].includes('merge-secret'), 'spill never saves raw secret');
  assert.ok(!out.content[0].text.includes('merge-secret'));
  assert.ok(out.content[0].text.length <= 3200, 'legacy line cap cannot bypass P0 char cap');
}

// 正向-非默认配置：max100/head30/tail20, 101 行 → 省略51行（防字面量 160 回归）。
{
  const big101 = Array.from({ length: 101 }, (_, i) => `R${i + 1}`).join('\n');
  const { handler } = makePwshCtx({ enabled: true, readBudgetTokens: 100000, inlineTokens: 1000, pwshReadMaxLines: 100, pwshHeadLines: 30, pwshTailLines: 20 });
  const out = await runPwsh(handler, 'gc big.txt', big101);
  const t = out.content[0].text;
  assert.ok(t.includes('省略51行'), 'non-default: 省略51行 (101-30-20)');
  assert.ok(t.includes('R1') && t.includes('R101'), 'non-default head/tail kept');
}

// 小读取类：20 行 → 原样放过，不落盘、content 不清空。
{
  const small20 = Array.from({ length: 20 }, (_, i) => `S${i + 1}`).join('\n');
  const { handler, calls } = makePwshCtx({ enabled: true, readBudgetTokens: 100000, inlineTokens: 1000 });
  const out = await runPwsh(handler, 'Get-Content small.txt', small20);
  const t = (out.content ? out.content[0].text : small20);
  assert.equal(t, small20, 'small read-class untouched (not emptied)');
  assert.equal(calls.length, 0, 'small read-class not spilled');
}

// 负向：build 命令不被读取类误伤，且不落盘。
{
  const { handler, calls } = makePwshCtx({ enabled: true, readBudgetTokens: 100000, inlineTokens: 1000 });
  await runPwsh(handler, 'npm run build', big250);
  await runPwsh(handler, 'pnpm lint', big250);
  await runPwsh(handler, 'npm test -- --type=e2e', big250);
  assert.equal(calls.length, 0, 'build/lint commands never spilled');
}

// 别名/大小写：select-string / gc / cat / type / more 均命中读取类裁剪。
{
  const { handler } = makePwshCtx({ enabled: true, readBudgetTokens: 100000, inlineTokens: 1000 });
  for (const cmd of ['select-string foo x.txt', 'Get-Content x.txt', 'cat x.txt', 'type x.txt', 'more x.txt', 'gc x.txt']) {
    const out = await runPwsh(handler, cmd, big250);
    assert.ok(out.content[0].text.includes('省略90行'), `read-class alias hit: ${cmd}`);
  }
}

// spill 失败：返回仍有界 + 落盘失败提示，不返回完整原文。
{
  const { handler } = makePwshCtx({ enabled: true, readBudgetTokens: 100000, inlineTokens: 1000 }, 'throw');
  const out = await runPwsh(handler, 'Get-Content big.txt', big250);
  const t = out.content[0].text;
  assert.ok(t.length < big250.length, 'spill-fail still bounded');
  assert.ok(t.includes('落盘失败'), 'spill-fail notice present');
  assert.ok(!t.includes('L250\nL' + big250), 'spill-fail does not return full original');
}


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
const readOut = await textResult({ name: 'read', text: readLines, arguments: { file_path: 'src/a.js' } });
assert.ok(readOut.content[0].text.includes('未带 offset/limit'), 'read gate without offset/limit');
assert.ok(!readOut.content[0].text.includes('L0'), 'read gate returns no content');

// .vue 放宽到 500：340 行的 .vue 整读放行（审计 C2）。
const vue340 = Array.from({ length: 340 }, (_, i) => `L${i}`).join('\n');
const vueOk = { kind: 'accept' };
const vueOut = await capHandler(
  { name: 'read', callId: 'c', arguments: { file_path: 'src/detail.vue' }, agent: { session: { header: { id: 'sess1' } } } },
  { content: [{ type: 'text', text: vue340 }] },
  async () => vueOk,
);
assert.equal(vueOut, vueOk, '.vue under 500 lines read allowed');

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
// ── p0LogReader 声明分支（cordis provide 语义，2026-11-13）───────────────────
{
  let provided = null;
  const ctxProv = { provide(name, value) { provided = { name, value }; return () => {}; }, on() {}, get() { return undefined; }, logger: { warn() {} } };
  apply(ctxProv, {});
  assert.ok(provided, 'provide-capable ctx goes through ctx.provide');
  assert.equal(provided.name, 'p0LogReader');
  assert.equal(typeof provided.value, 'function', 'provided value is logStore.read');
  assert.equal(ctxProv.p0LogReader, undefined, 'no bare assignment when provide branch taken');
}
{
  const ctxBare = { on() {}, get() { return undefined; }, logger: { warn() {} } };
  apply(ctxBare, {});
  assert.equal(typeof ctxBare.p0LogReader, 'function', 'bare ctx falls back to direct assignment');
}
// ── p0LogReader 声明分支（cordis provide 语义，2026-11-13）───────────────────
{
  let provided = null;
  const ctxProv = { provide(name, value) { provided = { name, value }; return () => {}; }, on() {}, get() { return undefined; }, logger: { warn() {} } };
  apply(ctxProv, {});
  assert.ok(provided, 'provide-capable ctx goes through ctx.provide');
  assert.equal(provided.name, 'p0LogReader');
  assert.equal(typeof provided.value, 'function', 'provided value is logStore.read');
  assert.equal(ctxProv.p0LogReader, undefined, 'no bare assignment when provide branch taken');
}
{
  const ctxBare = { on() {}, get() { return undefined; }, logger: { warn() {} } };
  apply(ctxBare, {});
  assert.equal(typeof ctxBare.p0LogReader, 'function', 'bare ctx falls back to direct assignment');
}
console.log('token-guard selftest: ALL PASS');
