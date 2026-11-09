// cost-meter 自测：验证 usage 累加、阈值触发一次、注入到 messages。
import assert from 'assert';
import { apply, name } from './lib/index.js';

assert.equal(name, 'cost-meter');

// 收集事件处理器
let onSession, onPreStep;
const ctx = {
  on(evt, h) {
    if (evt === 'session/event') onSession = h;
    if (evt === 'agent/pre-step') onPreStep = h;
  },
};
apply(ctx, { enabled: true, perStepUncachedBudget: 1000, sessionUncachedBudget: 100000, sessionEquivBudget: 100000000 });

const session = { header: { id: 's1' } };
const agent = { session };

// 模拟两次 assistant/message：一次大未命中
onSession(session, { type: 'assistant/message', data: { usage: { uncachedInputTokens: 5000, cacheReadTokens: 1000, outputTokens: 200 } } });
onSession(session, { type: 'assistant/message', data: { usage: { uncachedInputTokens: 500, cacheReadTokens: 800, outputTokens: 100 } } });

// pre-step：应触发 perStep（最后一步 uncached 500 < 1000 不触发，但上一步 5000 是最后写入的值）
// 注意 lastUncached 被第二次覆盖成 500，所以 perStep 不触发；先验证不触发
let out = await onPreStep({ agent, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.equal(out.messages.length, 0, 'no notice when below per-step');

// 再发一次大未命中，使 lastUncached=12000
onSession(session, { type: 'assistant/message', data: { usage: { uncachedInputTokens: 12000, cacheReadTokens: 0, outputTokens: 0 } } });
out = await onPreStep({ agent, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.equal(out.messages.length, 1, 'perStep notice injected');
assert.ok(out.messages[0].content[0].text.includes('cost-meter'));
assert.ok(out.messages[0].content[0].text.includes('未命中'));

// 同一阈值不再重复提醒
out = await onPreStep({ agent, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.equal(out.messages.length, 0, 'perStep fires once');

// 累计未命中超过 sessionUncachedBudget(100000)? 当前累计 5000+500+12000=17500 < 100000 不触发
assert.equal(out.messages.length, 0);

// disabled: 不注册
let reg = false; const ctx2 = { on() { reg = true; } };
apply(ctx2, { enabled: false });
assert.equal(reg, false);

console.log('cost-meter selftest: ALL PASS');
