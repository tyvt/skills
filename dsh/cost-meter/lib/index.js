/**
 * dsh-cost-meter —— 会话内实时成本/未命中提醒（零依赖本地插件）。
 *
 * 与 dsh-mcp-gateway / dsh-agent-guard 同约束：装在 profile 之外，**不 import @deepseek-ai/***。
 *
 * 作用：把「60% 窗口收尾 / 每步未命中过高 / 累计等效成本过高」从口头规则变成**运行时自动提醒**。
 *   - 监听 `session/event`，从 assistant/message 的 usage 累加 uncached / cacheRead / output；
 *   - 每次 `agent/pre-step` 前检查阈值，越过就在本轮 messages 末尾追加一条 notice 提示模型收尾/换会话/别再整读；
 *   - 同一阈值只提醒一次（按会话记录），避免每步刷屏。
 *
 * 等效成本口径：cacheRead×0.1 + uncached + output×4。
 * 0.1 与 4 是假设倍率，待按实际计费校准，不是某次会话日志的证据。
 * 三键全 0 且没有 cacheReadTokens 的 usage 视为 absent：不进等效成本，只计 absentSteps。
 */

import { randomUUID } from "node:crypto";

export const name = "cost-meter";
export const inject = [];

/**
 * 配置归一化（零依赖，不 export Config 以免被 Cordis 当 schemastery schema 校验）。
 */
function normalizeConfig(input) {
  return {
    enabled: input?.enabled ?? true,
    sessionEquivBudget: input?.sessionEquivBudget ?? 8_000_000,
    // 单步未命中门槛 10k（2026-11-10 由 15k 下调，实测 >15k 时单步 reasoning 已失控）。
    perStepUncachedBudget: input?.perStepUncachedBudget ?? 10_000,
    // 单步 output 门槛 3k（2026-11-10 bug6369：step 46/49/50 单步 output ~10k，
    // 全耗在反复推翻自己的 reasoning 上——缺事实时不该脑内演算）。
    perStepOutputBudget: input?.perStepOutputBudget ?? 3_000,
    // 纯文本且无工具调用：1500 即疑似自我辩论（有工具的长输出仍走 3k）。
    bareReasoningBudget: input?.bareReasoningBudget ?? 1_500,
    sessionUncachedBudget: input?.sessionUncachedBudget ?? 3_000_000,
    // 比 800 万更早的两档。15 万 ≈ 10 个单步未命中预算，或约两步 65k 级 cache 重读（按 0.1 倍率）。
    // 100 万比现有 800 万低一个数量级，避免累计档只在会话末期响一次。
    sessionEquivEarly: input?.sessionEquivEarly ?? 150_000,
    sessionEquivMid: input?.sessionEquivMid ?? 1_000_000,
  };
}

// 0.1 / 4：假设倍率，待计费校准。
const equivOf = (u) => (u.cacheRead || 0) * 0.1 + (u.uncached || 0) + (u.output || 0) * 4;
const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(0) + 'k' : String(Math.round(n));

/**
 * 从 assistant/message 的 data.usage 取数。
 * 三键全 0 且没有 cacheReadTokens：absent，不当成零成本。
 * 带 cacheReadTokens 的显式 0（四键）仍是真实记账。
 */
/** 能看到 content 才判定；看不到返回 unknown，避免误报。 */
export function classifyAssistant(event) {
  const d = event?.data ?? event ?? {};
  const content = d.content ?? d.message?.content;
  if (!Array.isArray(content)) return "unknown";
  const tool = content.some((b) => b && (b.type === "tool_use" || b.type === "toolCall" || b.type === "functionCall" || b.type === "tool_call"));
  return tool ? "tool" : "text";
}

function readUsage(event) {
  const d = event?.data ?? event;
  const u = d?.usage;
  if (!u) return undefined;
  const hasCacheRead = Object.prototype.hasOwnProperty.call(u, "cacheReadTokens")
    || Object.prototype.hasOwnProperty.call(u, "cacheRead");
  const absent = !hasCacheRead
    && u.uncachedInputTokens === undefined
    && u.inputTokens === 0
    && u.outputTokens === 0
    && (u.totalTokens === 0 || u.totalTokens === undefined);
  if (absent) return { absent: true };
  return {
    absent: false,
    uncached: u.uncachedInputTokens ?? u.inputTokens ?? 0,
    cacheRead: u.cacheReadTokens ?? u.cacheRead ?? 0,
    output: u.outputTokens ?? 0,
  };
}

let latestAcc;

/** 测试与排查：最近一次 enabled apply 的会话累计。 */
export function inspect(sessionId) {
  const a = latestAcc?.get(sessionId);
  if (!a) return undefined;
  return {
    uncached: a.uncached,
    cacheRead: a.cacheRead,
    output: a.output,
    lastOutput: a.lastOutput,
    steps: a.steps,
    absentSteps: a.absentSteps,
    equiv: equivOf(a),
    fired: [...a.fired],
  };
}

/** P3-11：从 pre-step 的 messages 里取 user 文本，判断是否同时含「修改+验证+提交」三要素。 */
function hasIntentSignal(messages) {
  if (!Array.isArray(messages)) return false;
  const text = messages
    .filter((m) => m && m.role === "user")
    .map((m) => {
      const c = m.content;
      if (typeof c === "string") return c;
      if (Array.isArray(c)) return c.map((b) => (typeof b === "string" ? b : b?.text ?? "")).join("\n");
      return "";
    })
    .join("\n");
  return /(修复|实现|修改|新增|开发|重构)/.test(text)
    && /(验证|测试|构建|build)/.test(text)
    && /(提交|push|推送)/.test(text);
}

export function apply(ctx, rawConfig) {
  const config = normalizeConfig(rawConfig);
  if (!config.enabled) return;

  // sessionId -> { uncached, cacheRead, output, steps, absentSteps, fired:Set }
  const acc = new Map();
  latestAcc = acc;

  const newAcc = () => ({
    uncached: 0, cacheRead: 0, output: 0, steps: 0, absentSteps: 0,
    lastUncached: 0, lastOutput: 0, lastBare: false, bareCount: 0, bigMissStreak: 0,
    committed: false, optimized: false, closing: false,
    todoWritten: false, edited: false, buildRan: false,
    fired: new Set(),
  });

  ctx.on("session/event", (session, event) => {
    if (event?.type !== "assistant/message") return;
    const u = readUsage(event);
    if (!u) return;
    const id = session?.header?.id ?? session?.id;
    if (id === undefined) return;
    let a = acc.get(id);
    if (!a) {
      a = newAcc();
      acc.set(id, a);
    }
    if (u.absent) {
      a.absentSteps += 1;
      return;
    }
    a.uncached += u.uncached;
    a.cacheRead += u.cacheRead;
    a.output += u.output;
    a.steps += 1;
    a.lastUncached = u.uncached;
    a.lastOutput = u.output;
    a.lastBare = classifyAssistant(event) === "text" && u.output > config.bareReasoningBudget;
    // 连续纯推理步计数：只有「保持纯推理」才累加，一旦出现工具调用/正常步就清零。
    // 审计 P0：同一 turn 连续 2 个无工具调用步后必须升级为硬性「下一步必须调工具」，
    // 而不是每步都发同一句软提示（软提示实测拦不住 3–8k 的反复自我辩论）。
    a.bareStreak = a.lastBare ? (a.bareStreak || 0) + 1 : 0;
    if (a.lastBare) a.bareCount += 1;
    // 连续大未命中：第一次只提醒，第二次起把「提示」改成「下一步必须是取数」。
    a.bigMissStreak = u.uncached > config.perStepUncachedBudget ? (a.bigMissStreak || 0) + 1 : 0;
  });

  ctx.on("session/event", (session, event) => {
    const id = session?.header?.id ?? session?.id;
    if (id === undefined) return;
    let a = acc.get(id);
    if (!a) {
      a = newAcc();
      acc.set(id, a);
    }
    const type = String(event?.type ?? "");
    const d = event?.data ?? {};
    const toolName = d.name ?? d.tool ?? d.toolName ?? "";
    const blob = JSON.stringify(d.arguments ?? d.input ?? d.args ?? d.command ?? "");
    // P3-11：todo_write 出现即视为已外化阶段。
    if (/todo_write/i.test(toolName)) a.todoWritten = true;
    // P3-12：出现过 edit/write 类工具（\b 不把 todo_write 里的 write 算进来）。
    if (/\b(edit|write|apply_patch|multiedit|create_file|str_replace)\b/i.test(toolName)) a.edited = true;
    // P3-12：出现过 build/lint/test 命令（npm/pnpm/yarn 同类）。
    if (/\b(?:npm|pnpm|yarn)\b[^\n]*\b(?:build|lint|test)\b/i.test(blob)) a.buildRan = true;
    if (/pwsh/i.test(toolName) && /git\s+commit/.test(blob)) a.committed = true;
    if (/token-optimizer/.test(blob) || /token-optimizer/.test(toolName)) a.optimized = true;
    const reason = d.reason ?? d.status ?? "";
    if ((type === "turn/end" || type === "agent/turn-end" || type === "turn/completed") && reason === "completed" && a.committed && !a.optimized) {
      a.closing = true;
    }
  });

  const notice = (text, summary) => ({
    // 复刻 createMessage 的最小形状（role + source + 稳定 id），零依赖构造合法 user 消息。
    id: randomUUID(),
    role: "user",
    content: [{ type: "text", text }],
    source: { kind: "cost-meter", form: "notice", summary },
  });

  ctx.on("agent/pre-step", ({ agent, messages }, next) => {
    const id = agent?.session?.header?.id ?? agent?.session?.id;
    if (id === undefined) return next();
    let a = acc.get(id);
    if (!a) {
      a = newAcc();
      acc.set(id, a);
    }

    const equiv = equivOf(a);
    const intentHit = !a.todoWritten && hasIntentSignal(messages);
    // 本 turn 早先已有过无工具超长步，才给带工具的超预算步加上“下一步必须调工具”。
    const priorBare = a.bareCount > (a.lastBare ? 1 : 0);
    const overOutput = a.lastOutput > config.perStepOutputBudget;
    const outputText = priorBare
      ? `[cost-meter] 上一步已超预算，output ${fmt(a.lastOutput)} tokens（>${fmt(config.perStepOutputBudget)}）。下一步第一件事必须是工具调用，禁止再并列 Option 1/2/3。`
      : `[cost-meter] 上一步 output ${fmt(a.lastOutput)} tokens（>${fmt(config.perStepOutputBudget)}）。`;
    const checks = [
      ["perStep", a.lastUncached > config.perStepUncachedBudget && a.bigMissStreak < 2,
        `[cost-meter] 上一步未命中 ${fmt(a.lastUncached)} tokens（>${fmt(config.perStepUncachedBudget)}），极高。典型成因按概率排序：① 全仓/容器级 grep——缩到 src/views/<模块> 再搜；② 缺真实值在脑内演算——先查一条 SQL / 一个接口返回；③ 大文件整读——grep 定位后 read offset/limit。先判断自己属于哪种，再动下一步。`],
      ["perStepLookup", a.bigMissStreak >= 2,
        `[cost-meter] 连续 ${a.bigMissStreak} 步未命中 >${fmt(config.perStepUncachedBudget)}，提醒没改掉走势。下一步第一件事必须是一次取数，且只允许以下三种之一：① 带 offset/limit 的窄读 ② 带 path+include 的 grep ③ 一条 SQL（先 ALL_TAB_COLUMNS / 一行样本）。禁止整读、禁止全仓/容器级 grep、禁止推演。`],
      ["perStepOutput", overOutput && !priorBare, outputText],
      ["perStepOutputAfterA", overOutput && priorBare, outputText],
      ["bareReasoning", a.lastBare && a.bareStreak < 2,
        `[reasoning-watchdog] 上一步输出 ${fmt(a.lastOutput)} tokens 且无工具调用，疑似自我辩论。停止推演：调一次工具取事实，或直接下结论。`],
      // 审计 P0：连续第 2 个纯推理步起升级为硬指令。插件层无法真正下调 reasoningEffort
      // （reasoningEffort 在 turn 开始时已固定，pre-step 只能在 enter/reject 间选），
      // 所以这里用「下一步第一件事必须是工具调用」把空转截断在行为层。
      ["bareReasoningEscalate", a.lastBare && a.bareStreak >= 2,
        `[reasoning-watchdog] 已连续 ${a.bareStreak} 步无工具调用（每步 >${fmt(config.bareReasoningBudget)} tokens，当前 ${fmt(a.lastOutput)}）。这是「推理代替取数」的硬信号：下一步第一件事必须是工具调用——查一条数据 / 一次窄读 / 一次 grep 定位。禁止再列 Option 1/2/3，禁止再自我辩论；若确实无法推进就直接下结论收尾。`],
      ["closingCheck", a.closing,
        `[closing-check] 收尾证据不齐：本轮有提交，但未见构建/测试记录、也未见 token-optimizer 记录。构建/部署/回写证据不齐不要收尾——用 ask_user_question 明确是否继续排查。`],
      ["intentTodo", intentHit,
        `[todo-gate] 本任务含「修改+验证+提交」，先用 todo_write 把阶段外化，再动手。`],
      ["buildBaseline", a.edited && !a.buildRan,
        `[build-gate] 已开始改文件但本会话未见构建/测试基线。先跑一次 npm run build（或读最近 CI 结果），区分「预存在编译错误」与本次改动。`],
      ["sessionUncached", a.uncached > config.sessionUncachedBudget,
        `[cost-meter] 本会话累计未命中 ${fmt(a.uncached)} tokens（>${fmt(config.sessionUncachedBudget)}）。成本已高，收窄任务范围、避免重复整读，必要时开新会话。`],
      ["sessionEquivEarly", equiv > config.sessionEquivEarly,
        `[cost-meter] 本会话等效成本 ${fmt(equiv)}（>${fmt(config.sessionEquivEarly)}，含 cache 重读；另有 ${a.absentSteps} 步没有用量）。先收窄读取，别等单步未命中才停。`],
      ["sessionEquivMid", equiv > config.sessionEquivMid,
        `[cost-meter] 本会话等效成本 ${fmt(equiv)}（>${fmt(config.sessionEquivMid)}）。已明显高于单步预算，准备收尾或换会话。`],
      ["sessionEquiv", equiv > config.sessionEquivBudget,
        `[cost-meter] 本会话等效成本 ${fmt(equiv)}（>${fmt(config.sessionEquivBudget)}，含 ${a.steps} 步）。接近收尾线：尽快给出结论或拆分到新会话，别用 compaction 硬撑。`],
    ];
    // 只看上一步的规则：每步都可能再超，不能被会话级 fired 吞掉。
    const repeatable = new Set(["perStepOutput", "perStepOutputAfterA", "bareReasoning", "bareReasoningEscalate", "perStepLookup"]);
    const extra = [];
    for (const [key, hit, text] of checks) {
      if (!hit) continue;
      if (!repeatable.has(key) && a.fired.has(key)) continue;
      a.fired.add(key);
      extra.push(notice(text, `cost-meter ${key}`));
    }
    if (extra.length === 0) return next();
    return next().then((decision) => {
      if (decision?.kind && decision.kind !== "enter") return decision;
      const base = decision?.messages ?? messages ?? [];
      return { ...(decision ?? {}), kind: "enter", messages: [...base, ...extra] };
    });
  });
}
