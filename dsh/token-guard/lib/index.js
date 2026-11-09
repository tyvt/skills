/**
 * dsh-token-guard —— 零依赖本地插件（与 dsh-mcp-gateway / dsh-agent-guard 同约束：
 * 装在 profile 之外，**不 import `@deepseek-ai/*`**，否则 profile 外解析不到）。
 *
 * 缺口：dsh-spill-policy 在 tools/post-execute 逐次裁剪大结果，但**显式跳过 read**
 * （`exec.name === "read"`），而 read 单次默认最多返回 50KB(≈12.5k token)——这些
 * 大 read 结果每一轮都随历史重发，是「消息占 ~81% 上下文」的主要来源之一。
 *
 * 本插件补上这块：对 read（以及配置的额外工具）的大结果，在**执行期**做头尾裁剪
 * + 自动落盘（复用 ctx.get("spillStore")），返回裁剪版 + 可回读路径。不改写非文本块，
 * 任一步失败都保留原文，绝不阻断工具。
 *
 * 与现有插件分工：
 *   - spill-policy      : 非 read 的大结果，>maxInlineTokens 落盘；
 *   - tool-result-pruner: 仅 compaction 触发后压历史；
 *   - token-guard（本插件）: read 的大结果，执行期落盘 + 头尾保留。
 */

/** Cordis 插件身份与注入。tools 提供 tools/post-execute 事件。 */
export const name = "token-guard";
export const inject = ["tools"];

/**
 * 无 schemastery 时的最小配置解析：合并默认值。
 * 注意：**不 export Config**——Cordis 会把导出的 Config 当作 schemastery schema 调
 * `.validate()`，零依赖插件无法提供，会导致加载失败。配置在 apply 内自行归一化。
 */
function normalizeConfig(input) {
  return {
    enabled: input?.enabled ?? true,
    readBudgetTokens: input?.readBudgetTokens ?? 4000,
    inlineTokens: input?.inlineTokens ?? 1500,
    extraTools: Array.isArray(input?.extraTools) ? input.extraTools : [],
  };
}

const GAP = { type: "text", text: "\n\n[... token-guard: middle pruned ...]\n\n" };
const CHARS_PER_TOKEN = 4;

/** 与 dsh-token-meter 一致的固定密度估算（粗略，仅用于判阈值，不需精确）。 */
function estimateText(text) {
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}

function textBytes(text) {
  let bytes = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0);
    bytes += code <= 0x7f ? 1 : code <= 0x7ff ? 2 : code <= 0xffff ? 3 : 4;
  }
  return bytes;
}

/** 保留内容只能由 text/image 块构成；含其它块就原样放过，避免破坏结构。 */
function retainable(content) {
  return Array.isArray(content) && content.every((b) => b && (b.type === "text" || b.type === "image"));
}

function priceBlock(block) {
  return block.type === "text" ? estimateText(block.text) + 4 : 4;
}

function priceContent(content) {
  return content.reduce((s, b) => s + priceBlock(b), 0);
}

/** 按 token 预算保留头尾，中间折成 GAP。返回 { head, tail, omittedBytes }。 */
function retainContent(content, budget) {
  const head = [];
  const tail = [];
  let first = 0;
  let last = content.length - 1;
  let headChars = 0;

  let remaining = Math.ceil(budget / 2);
  while (first <= last) {
    const block = content[first];
    const cost = priceBlock(block);
    if (cost <= remaining) { head.push(block); remaining -= cost; first++; continue; }
    if (block.type === "text") {
      const approx = Math.max(0, remaining) * CHARS_PER_TOKEN;
      const t = block.text.slice(0, approx);
      headChars = t.length;
      if (t.length) head.push({ type: "text", text: t });
    }
    break;
  }

  remaining = Math.floor(budget / 2);
  while (last >= first) {
    const original = content[last];
    const block = last === first && original.type === "text"
      ? { type: "text", text: original.text.slice(headChars) }
      : original;
    const cost = priceBlock(block);
    if (cost <= remaining) { tail.push(block); remaining -= cost; last--; continue; }
    if (block.type === "text") {
      const approx = Math.max(0, remaining) * CHARS_PER_TOKEN;
      const t = approx > 0 ? block.text.slice(block.text.length - approx) : "";
      if (t.length) tail.push({ type: "text", text: t });
    }
    break;
  }
  tail.reverse();

  const bytesOf = (blocks) => blocks.reduce((s, b) => s + (b.type === "text" ? textBytes(b.text) : 0), 0);
  return { head, tail, omittedBytes: bytesOf(content) - bytesOf(head) - bytesOf(tail) };
}

function formatNotice(omittedBytes, ref) {
  const locator = ref?.locator ?? "(unknown path)";
  const hint = ref?.retrievalHint ?? "Use read with offset/limit, or grep this path.";
  return `(Omitted ${omittedBytes} bytes. Full result stored at: ${locator}. ${hint})`;
}

function mergeText(blocks) {
  const out = [];
  for (const b of blocks) {
    const prev = out.at(-1);
    if (b.type === "text" && prev?.type === "text") prev.text += b.text;
    else out.push(b.type === "text" ? { ...b } : b);
  }
  return out;
}

function fullTextOf(content) {
  return content.map((b) => (b.type === "text" ? b.text : "")).join("");
}

export function apply(ctx, rawConfig) {
  const config = normalizeConfig(rawConfig);
  if (!config.enabled) return;
  const budget = config.inlineTokens;
  if (!Number.isSafeInteger(budget) || budget < 0) {
    throw new Error(`token-guard: inlineTokens must be a non-negative integer (got ${budget})`);
  }
  const threshold = config.readBudgetTokens;
  const watched = new Set(["read", ...config.extraTools]);

  ctx.on("tools/post-execute", async (exec, result, next) => {
    const decision = await next();
    if (decision.kind !== "accept" || Object.hasOwn(decision, "value")) return decision;
    if (!watched.has(exec.name)) return decision;
    const content = decision.content ?? result.content;
    if (!retainable(content) || content.length === 0) return decision;
    if (priceContent(content) <= threshold) return decision;

    try {
      const owner = exec.agent?.session.header.id;
      if (owner === undefined) throw new Error(`no session owner for ${exec.name}`);
      const spillStore = ctx.get("spillStore");
      if (spillStore === undefined) throw new Error("no ctx.spillStore backend loaded");
      const ref = await spillStore.saveText({
        owner: { sessionId: owner },
        source: { kind: "tool", toolName: exec.name, callId: exec.callId, label: "result" },
        suggestedName: `${exec.name}.txt`,
        content: fullTextOf(content),
      });
      const retained = retainContent(content, budget);
      const notice = { type: "text", text: `\n\n${formatNotice(retained.omittedBytes, ref)}` };
      const rebuilt = retained.head.length + retained.tail.length === 0
        ? [notice]
        : mergeText([...retained.head, GAP, ...retained.tail, notice]);
      return { kind: "accept", content: rebuilt };
    } catch (error) {
      ctx.logger?.warn(`token-guard: ${String(error)}; keeping the inline content`);
      return decision;
    }
  }, { prepend: true });
}
