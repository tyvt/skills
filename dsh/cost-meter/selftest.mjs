// cost-meter 自测：验证 usage 累加、阈值触发一次、注入到 messages。
import assert from 'assert';
import fs from 'fs';
import { apply, inspect, name } from './lib/index.js';

assert.equal(name, 'cost-meter');

// 收集事件处理器
const sessionHandlers = [];
let onPreStep;
const ctx = {
  on(evt, h) {
    if (evt === 'session/event') sessionHandlers.push(h);
    if (evt === 'agent/pre-step') onPreStep = h;
  },
};
const onSession = (session, event) => { for (const h of sessionHandlers) h(session, event); };
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

// 规则 A/B 不依赖夹具。用独立 ctx，避免和上面的累计会话混在一起。
const ruleHandlers = [];
let preRule;
const ctxRule = {
  on(evt, handler) {
    if (evt === 'session/event') ruleHandlers.push(handler);
    if (evt === 'agent/pre-step') preRule = handler;
  },
};
apply(ctxRule, { enabled: true });
const onRule = (session, event) => { for (const h of ruleHandlers) h(session, event); };
const textMsg = (n) => ({ type: 'assistant/message', data: { content: [{ type: 'text', text: 'x' }], usage: { uncachedInputTokens: 1, cacheReadTokens: 0, outputTokens: n } } });
const toolMsg = (n) => ({ type: 'assistant/message', data: { content: [{ type: 'tool_use', name: 'pwsh' }], usage: { uncachedInputTokens: 1, cacheReadTokens: 0, outputTokens: n } } });
const texts = (res) => (res.messages ?? []).map((m) => m.content[0].text).join('\n');
const onlyTool = { header: { id: 'rule-b-tool' } };
onRule(onlyTool, toolMsg(4000));
let b = await preRule({ agent: { session: onlyTool }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(!texts(b).includes('下一步第一件事'), 'tool-only over-output does not demand a tool');
const afterA = { header: { id: 'rule-b-after-a' } };
onRule(afterA, textMsg(2000));
onRule(afterA, toolMsg(4000));
b = await preRule({ agent: { session: afterA }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(texts(b).includes('下一步第一件事必须是工具调用'), 'after rule A, over-output demands a tool');

// 连续两步大未命中：第一次只提醒，第二次起强制取数，且每步都再注入。
const streak = { header: { id: 'miss-streak' } };
const big = (n) => ({ type: 'assistant/message', data: { usage: { uncachedInputTokens: n, cacheReadTokens: 0, outputTokens: 1 } } });
onRule(streak, big(20000));
b = await preRule({ agent: { session: streak }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(texts(b).includes('极高') && !texts(b).includes('必须是一次取数'), 'first big miss only warns');
onRule(streak, big(21000));
b = await preRule({ agent: { session: streak }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(texts(b).includes('必须是一次取数'), 'second consecutive big miss forces a lookup');
onRule(streak, big(500));
b = await preRule({ agent: { session: streak }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(!texts(b).includes('必须是一次取数'), 'a small step resets the streak');

// 夹具：session.v4.jsonl 的真实 assistant/message，不手写 usage。
const logPath = 'C:/Users/Administrator/Downloads/session.v4.jsonl';
if (!fs.existsSync(logPath)) {
  console.log('cost-meter selftest: ALL PASS (log fixture missing, skipped)');
  process.exit(0);
}
const events = fs.readFileSync(logPath, 'utf8').split(/\n/).filter(Boolean).map((line) => JSON.parse(line));
const absentEvents = events.filter((event) => {
  if (event.type !== 'assistant/message') return false;
  const usage = event.data?.usage;
  return usage?.inputTokens === 0 && usage?.outputTokens === 0 && usage?.totalTokens === 0
    && !Object.prototype.hasOwnProperty.call(usage, 'cacheReadTokens');
});
assert.equal(absentEvents.length, 48, 'log still has 48 three-key zero steps');

const logHandlers = [];
let preLog;
const ctxLog = {
  on(evt, handler) {
    if (evt === 'session/event') logHandlers.push(handler);
    if (evt === 'agent/pre-step') preLog = handler;
  },
};
const onLog = (session, event) => { for (const h of logHandlers) h(session, event); };
apply(ctxLog, {
  enabled: true,
  // 生产累计档是 15 万 / 100 万。这一步等效约 8.2k，8_000 只用来证明它会计入累计档。
  sessionEquivEarly: 8_000,
  sessionEquivMid: 1_000_000,
  sessionEquivBudget: 8_000_000,
});
const logSession = { header: { id: 'session-9bbaca36' } };
for (const event of absentEvents) onLog(logSession, event);
const afterAbsent = inspect('session-9bbaca36');
assert.equal(afterAbsent.absentSteps, 48);
assert.equal(afterAbsent.steps, 0);
assert.equal(afterAbsent.uncached, 0);
assert.equal(afterAbsent.cacheRead, 0);
assert.equal(afterAbsent.equiv, 0);

const seq253 = events.find((event) => event.seq === 253);
onLog(logSession, seq253);
let logged = await preLog({ agent: { session: logSession }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(logged.messages.some((message) => message.source?.summary === 'cost-meter perStep'), 'seq 253 fires perStep');

const only286 = { header: { id: 'seq-286' } };
onLog(only286, events.find((event) => event.seq === 286));
logged = await preLog({ agent: { session: only286 }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(!logged.messages.some((message) => message.source?.summary === 'cost-meter perStep'), 'seq 286 does not fire perStep');
assert.ok(logged.messages.some((message) => message.source?.summary === 'cost-meter sessionEquivEarly'), 'seq 286 counts toward cumulative tier');
const got286 = inspect('seq-286');
assert.equal(got286.uncached, 244);
assert.equal(got286.cacheRead, 65152);
assert.equal(got286.absentSteps, 0);

console.log('cost-meter selftest: ALL PASS');
