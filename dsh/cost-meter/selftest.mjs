// cost-meter 自测：验证 usage 累加、阈值触发一次、注入到 messages。
import assert from 'assert';
import fs from 'fs';
import { apply, inspect, name, hasIntentSignal } from './lib/index.js';

const user = (text) => ({ role: 'user', content: text });
assert.equal(hasIntentSignal([user('修改组件，验证后提交并推送')]), true);
assert.equal(hasIntentSignal([user('历史：修改、测试、提交浪费很多。给我一份改进方案')]), false);
assert.equal(hasIntentSignal([user('修改验证提交'), user('现在只要分析报告')]), false);
assert.equal(hasIntentSignal([user('修改验证提交'), user('<system-reminder>测试提交</system-reminder>')]), true);
assert.equal(hasIntentSignal([user('> 修改、验证、提交\n给我建议')]), false);
assert.equal(hasIntentSignal([user('修改并测试，暂不提交')]), false);

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
onRule(afterA, textMsg(3200));
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
assert.ok(texts(b).includes('只允许'), 'second big miss uses whitelist wording');
onRule(streak, big(500));
b = await preRule({ agent: { session: streak }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(!texts(b).includes('必须是一次取数'), 'a small step resets the streak');

// P3-11 意图→todo 外化：user 消息同时含「修改+验证+提交」才注入 todo-gate，只触发一次。
const userMsg = (t) => ({ role: 'user', content: [{ type: 'text', text: t }] });
const intentS = { header: { id: 'intent-todo' } };
b = await preRule({ agent: { session: intentS }, messages: [userMsg('请修复这个 bug，跑测试验证后提交')] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(texts(b).includes('[todo-gate]'), 'intent with modify+verify+commit triggers todo-gate');
b = await preRule({ agent: { session: intentS }, messages: [userMsg('继续修复、测试并提交')] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(!texts(b).includes('[todo-gate]'), 'todo-gate fires only once');
const intentMiss = { header: { id: 'intent-todo-missing' } };
b = await preRule({ agent: { session: intentMiss }, messages: [userMsg('请修复并实现，然后验证测试')] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(!texts(b).includes('[todo-gate]'), 'missing commit element does not trigger todo-gate');

// P3-12 改前 build 基线：先 edit 工具事件再 pre-step → 注入 build-gate；跑过 build 后不注入。
const buildS = { header: { id: 'build-baseline' } };
onRule(buildS, { type: 'tool/use', data: { name: 'edit', arguments: { path: 'a.js' } } });
b = await preRule({ agent: { session: buildS }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(texts(b).includes('[build-gate]'), 'edit without build triggers build-gate');
const buildRan = { header: { id: 'build-baseline-ran' } };
onRule(buildRan, { type: 'tool/use', data: { name: 'edit', arguments: { path: 'a.js' } } });
onRule(buildRan, { type: 'tool/use', data: { name: 'pwsh', arguments: { command: 'npm run build' } } });
b = await preRule({ agent: { session: buildRan }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(!texts(b).includes('[build-gate]'), 'running build suppresses build-gate');

// ---- LRU 淘汰：活跃会话不被淘汰、总数受 ACC_MAX_SESSIONS(2000) 约束 ----
{
  const h2 = [];
  const ctx2 = { on(evt, fn) { if (evt === 'session/event') h2.push(fn); } };
  apply(ctx2, { enabled: true });
  const fire = (sid, n) => { for (const f of h2) f({ header: { id: sid } }, { type: 'assistant/message', data: { content: [{ type: 'text', text: 'x' }], usage: { uncachedInputTokens: 1, cacheReadTokens: 0, outputTokens: n } } }); };
  fire('hot-A', 100);
  for (let i = 0; i < 2500; i++) {
    fire('s' + i, 1);
    if (i % 100 === 0) fire('hot-A', 1); // 持续 touch 保持最近使用
  }
  // 等价断言降级（A3：测试不反向扩生产 API）：撤掉 inspectSize 后不承诺精确 size，
  // 只按行为验证 LRU：活跃会话存活 / 最早空闲会话淘汰 / 最新会话在。
  assert.ok(inspect('hot-A'), '活跃会话 hot-A 未被淘汰');
  assert.equal(inspect('s0'), undefined, '最早插入的空闲会话 s0 已被淘汰');
  assert.ok(inspect('s2499'), '最新插入会话仍在');
  console.log('cost-meter selftest: LRU eviction PASS (behavioral: hot-A alive / s0 evicted / s2499 alive)');
}

// ---- B2 enforcement：连续大未命中后按白名单软拦截（首次实现 enforcement）----
// 放在夹具 early-exit 之前，保证无 session.v4.jsonl 夹具时也必跑。
{
  const b2Handlers = [];
  let b2Guard;
  const ctxB2 = {
    on(evt, h) { if (evt === 'session/event') b2Handlers.push(h); },
    tools: { guard(fn) { b2Guard = fn; return () => {}; } },
  };
  apply(ctxB2, { enabled: true, enforceBigMiss: true }); // perStepUncachedBudget 默认 10000
  assert.equal(typeof b2Guard, 'function', 'B2 registers ctx.tools.guard');
  const onB2 = (session, event) => { for (const h of b2Handlers) h(session, event); };
  const b2big = (n) => ({ type: 'assistant/message', data: { usage: { uncachedInputTokens: n, cacheReadTokens: 0, outputTokens: 1 } } });
  const sess = { header: { id: 'b2-streak' } };
  const exec = (name, args) => ({ name, arguments: args, agent: { session: sess } });

  // 单步大未命中（streak=1）：不拦。
  onB2(sess, b2big(20000));
  assert.equal(b2Guard(exec('read', { file_path: 'a.js' })), undefined, 'streak<2: no block');

  // 第二步大未命中（streak=2）：进入 enforcement。
  onB2(sess, b2big(21000));
  // 软拦：无参整读 / 无 path grep / 整段回灌。
  assert.ok(typeof b2Guard(exec('read', { file_path: 'a.js' })) === 'string', 'block: whole read (no offset/limit)');
  assert.ok(typeof b2Guard(exec('grep', { pattern: 'foo' })) === 'string', 'block: grep without path');
  assert.ok(typeof b2Guard(exec('pwsh', { command: 'git log' })) === 'string', 'block: git log whole dump');
  // 硬放行：带 offset/limit 的 read、带 path 的 grep、edit/write、验证命令、未列名工具。
  assert.equal(b2Guard(exec('read', { file_path: 'a.js', limit: 40 })), undefined, 'pass: paged read with limit');
  assert.equal(b2Guard(exec('read', { file_path: 'a.js', offset: 10 })), undefined, 'pass: paged read with offset');
  assert.equal(b2Guard(exec('grep', { pattern: 'foo', path: 'src/x' })), undefined, 'pass: grep with path');
  assert.equal(b2Guard(exec('edit', { file_path: 'a.js' })), undefined, 'pass: edit');
  assert.equal(b2Guard(exec('write', { file_path: 'a.js' })), undefined, 'pass: write');
  assert.equal(b2Guard(exec('pwsh', { command: 'node --check a.js' })), undefined, 'pass: verify command node --check');
  assert.equal(b2Guard(exec('pwsh', { command: 'npm test' })), undefined, 'pass: verify command npm test');
  assert.equal(b2Guard(exec('glob', { pattern: '**/*.js' })), undefined, 'pass: unlisted tool (glob) defaults to pass');

  // 边界：小步把 streak 归零 → 全放行。
  onB2(sess, b2big(500));
  assert.equal(b2Guard(exec('read', { file_path: 'a.js' })), undefined, 'small step resets streak: no block');

  // 边界：uncached 缺失/为 0 时不计 streak（absent 事件），不误判。
  const sessAbsent = { header: { id: 'b2-absent' } };
  const execAbsent = (name, args) => ({ name, arguments: args, agent: { session: sessAbsent } });
  onB2(sessAbsent, { type: 'assistant/message', data: { usage: { inputTokens: 0, outputTokens: 0, totalTokens: 0 } } });
  assert.equal(b2Guard(execAbsent('read', { file_path: 'a.js' })), undefined, 'absent/zero usage: no false block');

  // 开关关闭（env=0）：即使 streak>=2 也全放行。
  const b2HandlersEnv = [];
  let b2GuardEnv;
  const ctxEnv = {
    on(evt, h) { if (evt === 'session/event') b2HandlersEnv.push(h); },
    tools: { guard(fn) { b2GuardEnv = fn; return () => {}; } },
  };
  const prevEnv = process.env.DSH_COST_METER_ENFORCE;
  process.env.DSH_COST_METER_ENFORCE = '0';
  try {
    apply(ctxEnv, { enabled: true, enforceBigMiss: true });
    const onEnv = (session, event) => { for (const h of b2HandlersEnv) h(session, event); };
    const sessEnv = { header: { id: 'b2-env' } };
    onEnv(sessEnv, b2big(20000)); onEnv(sessEnv, b2big(21000));
    const eEnv = (name, args) => ({ name, arguments: args, agent: { session: sessEnv } });
    assert.equal(b2GuardEnv(eEnv('read', { file_path: 'a.js' })), undefined, 'env=0: fully pass even at streak>=2');
  } finally {
    if (prevEnv === undefined) delete process.env.DSH_COST_METER_ENFORCE;
    else process.env.DSH_COST_METER_ENFORCE = prevEnv;
  }
  console.log('cost-meter selftest: ALL PASS (B2 enforcement whitelist)');
}

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

// 审计 P0：连续纯推理步升级。第 1 步软提示（bareReasoning），第 2 步起硬指令（bareReasoningEscalate）。
const bareS = { header: { id: 'bare-streak' } };
const bareMsg = (n) => ({ type: 'assistant/message', data: { content: [{ type: 'text', text: 'x' }], usage: { uncachedInputTokens: 1, cacheReadTokens: 0, outputTokens: n } } });
const preBare = (res) => (res.messages ?? []).map((m) => m.source?.summary ?? '');
onRule(bareS, bareMsg(3200));
b = await preRule({ agent: { session: bareS }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(preBare(b).includes('cost-meter bareReasoning'), '1st bare step: soft reasoning-watchdog');
assert.ok(!preBare(b).includes('cost-meter bareReasoningEscalate'), '1st bare step: no escalation yet');
onRule(bareS, bareMsg(4000));
b = await preRule({ agent: { session: bareS }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(preBare(b).includes('cost-meter bareReasoningEscalate'), '2nd consecutive bare step: escalate to must-call-tool');
assert.ok(!preBare(b).includes('cost-meter bareReasoning'), '2nd bare step: soft notice replaced by escalation');
// 出现工具调用即清零 streak，回到软提示。
onRule(bareS, toolMsg(4000));
onRule(bareS, bareMsg(3200));
b = await preRule({ agent: { session: bareS }, messages: [] }, async () => ({ kind: 'enter', messages: [] }));
assert.ok(preBare(b).includes('cost-meter bareReasoning') && !preBare(b).includes('bareReasoningEscalate'), 'tool call resets bare streak');
console.log('cost-meter selftest: ALL PASS (bare escalation)');
