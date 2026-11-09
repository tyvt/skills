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

console.log('token-guard selftest: ALL PASS');
