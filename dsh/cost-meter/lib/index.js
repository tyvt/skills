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
 * 等效成本口径：cacheRead×0.1 + uncached + output×4（与 token-frugal/token-optimizer 一致），
 * 单位是「相对 token」。阈值默认给出保守值，可在 config 覆盖。
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
    perStepUncachedBudget: input?.perStepUncachedBudget ?? 15_000,
    sessionUncachedBudget: input?.sessionUncachedBudget ?? 3_000_000,
  };
}

const equivOf = (u) => (u.cacheRead || 0) * 0.1 + (u.uncached || 0) + (u.output || 0) * 4;
const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(0) + 'k' : String(Math.round(n));

/** 从 assistant/message 事件的 data.usage 提取四类 token，兼容多种字段名。 */
function readUsage(event) {
  const d = event?.data ?? event;
  const u = d?.usage;
  if (!u) return undefined;
  return {
    uncached: u.uncachedInputTokens ?? u.inputTokens ?? 0,
    cacheRead: u.cacheReadTokens ?? 0,
    output: u.outputTokens ?? 0,
  };
}

export function apply(ctx, rawConfig) {
  const config = normalizeConfig(rawConfig);
  if (!config.enabled) return;

  // sessionId -> { uncached, cacheRead, output, steps, fired:Set }
  const acc = new Map();

  ctx.on("session/event", (session, event) => {
    if (event?.type !== "assistant/message") return;
    const u = readUsage(event);
    if (!u) return;
    const id = session?.header?.id ?? session?.id;
    if (id === undefined) return;
    let a = acc.get(id);
    if (!a) { a = { uncached: 0, cacheRead: 0, output: 0, steps: 0, lastUncached: 0, fired: new Set() }; acc.set(id, a); }
    a.uncached += u.uncached;
    a.cacheRead += u.cacheRead;
    a.output += u.output;
    a.steps += 1;
    a.lastUncached = u.uncached;
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
    const a = id !== undefined ? acc.get(id) : undefined;
    if (!a) return next();

    const equiv = equivOf(a);
    const checks = [
      ["perStep", a.lastUncached > config.perStepUncachedBudget,
        `[cost-meter] 上一步未命中 ${fmt(a.lastUncached)} tokens（>${fmt(config.perStepUncachedBudget)}），极高。先别整读大文件：用 grep 定位 + read offset/limit，或先看已有结果再决定下一步。`],
      ["sessionUncached", a.uncached > config.sessionUncachedBudget,
        `[cost-meter] 本会话累计未命中 ${fmt(a.uncached)} tokens（>${fmt(config.sessionUncachedBudget)}）。成本已高，收窄任务范围、避免重复整读，必要时开新会话。`],
      ["sessionEquiv", equiv > config.sessionEquivBudget,
        `[cost-meter] 本会话等效成本 ${fmt(equiv)}（>${fmt(config.sessionEquivBudget)}，含 ${a.steps} 步）。接近收尾线：尽快给出结论或拆分到新会话，别用 compaction 硬撑。`],
    ];
    const extra = [];
    for (const [key, hit, text] of checks) {
      if (hit && !a.fired.has(key)) {
        a.fired.add(key);
        extra.push(notice(text, `cost-meter ${key}`));
      }
    }
    if (extra.length === 0) return next();
    return next().then((decision) => {
      if (decision?.kind && decision.kind !== "enter") return decision;
      const base = decision?.messages ?? messages ?? [];
      return { ...(decision ?? {}), kind: "enter", messages: [...base, ...extra] };
    });
  });
}
