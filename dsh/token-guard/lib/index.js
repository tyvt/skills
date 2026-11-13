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
import { policy, capText, hasReadRange, redact } from '../../shared/p0-policy.mjs';
import { randomUUID } from 'node:crypto';

export const name = "token-guard";

// Only redacted, bounded text is retained. References never expose filesystem paths.
// Preserve structured tool values: bound the serialized representation, not its type.
export function boundStructuredValue(value, budget = policy.result.directChars, depth = 0) {
  const size = item => JSON.stringify(item)?.length ?? 4;
  if (typeof value === 'string') {
    let text = redact(value);
    if (size(text) <= budget) return text;
    text = text.slice(0, Math.max(0, budget - 24));
    while (text.length && size(text + '[truncated]') > budget) text = text.slice(0, Math.floor(text.length * 0.8));
    return size(text + '[truncated]') <= budget ? text + '[truncated]' : '';
  }
  if (value === null || typeof value !== 'object') return value;
  if (depth >= 8) return Array.isArray(value) ? [] : { _truncated: true };
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value.slice(0, 100)) {
      const remaining = budget - size(out) - (out.length ? 1 : 0);
      if (remaining < 24) break;
      out.push(boundStructuredValue(item, remaining, depth + 1));
    }
    if (out.length < value.length && budget >= 15) {
      while (out.length && size([...out, '[truncated]']) > budget) out.pop();
      out.push('[truncated]');
    }
    return out;
  }
  const keys = Object.keys(value).sort((a, b) => {
    const priority = key => ['exitCode', 'exit_code', 'ok', 'type', 'metadata', 'id'].includes(key) ? 0 : 1;
    return priority(a) - priority(b);
  });
  const out = {};
  for (const key of keys.slice(0, 100)) {
    const item = value[key];
    const placeholder = typeof item === 'string' ? '' : Array.isArray(item) ? [] : item && typeof item === 'object' ? {} : item;
    Object.defineProperty(out, key, { value: placeholder, enumerable: true, writable: true, configurable: true });
    if (size(out) > budget - 24) { delete out[key]; break; }
  }
  if (Object.keys(out).length < keys.length) out._truncated = true;
  for (const key of Object.keys(out)) {
    if (key === '_truncated' && !Object.hasOwn(value, key)) continue;
    const remaining = budget - size(out) + size(out[key]);
    out[key] = boundStructuredValue(value[key], key === 'metadata' ? Math.min(800, remaining) : remaining, depth + 1);
  }
  return out;
}

export function createLogStore() {
  const logs = new Map();
  const quotas = new Map();
  return {
    save(session, text) {
      if (!session) return null;
      const logRef = randomUUID().replaceAll('-', '');
      logs.set(logRef, { session, text: redact(text).slice(0, policy.logRead.maxTotalCharsPerSession) });
      if (logs.size > 100) logs.delete(logs.keys().next().value);
      return logRef;
    },
    read(logRef, session, { offset = 0, limit = policy.logRead.maxChars, maxLines = policy.logRead.maxLines } = {}) {
      const fail = error => ({ ok: false, error });
      if (!/^[a-f0-9]{32}$/.test(logRef ?? '') || !session || logs.get(logRef)?.session !== session) return fail('invalid_log_ref');
      if (![offset, limit, maxLines].every(Number.isSafeInteger) || offset < 0 || limit < 1 || limit > policy.logRead.maxChars || maxLines < 1 || maxLines > policy.logRead.maxLines) return fail('invalid_range');
      const quota = quotas.get(session) ?? { reads: 0, chars: 0 };
      if (quota.reads >= policy.logRead.maxReadsPerSession || quota.chars >= policy.logRead.maxTotalCharsPerSession) return fail('log_quota_exceeded');
      const text = logs.get(logRef).text;
      const content = text.slice(offset, offset + Math.min(limit, policy.logRead.maxTotalCharsPerSession - quota.chars)).split('\n').slice(0, maxLines).join('\n');
      quotas.set(session, { reads: quota.reads + 1, chars: quota.chars + content.length });
      return { ok: true, content, logRef, nextOffset: offset + content.length };
    },
  };
}

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

const GREP_MATCH = /^\s*(?:Line\s+)?\d+:/;
const GREP_FILE_LINE = /^(.+?):(\d+):(.*)$/;
const PWSH_WARN = "[警告] 工具产生了大量报错输出，可能包含许多与当前修改无关的既有错误。";
const BUILD_CMD = /\bnpm\s+run\s+lint\b|\bnpm\s+run\s+build\b|\bnpm\s+test\b/;
const ERROR_LINE = /\b(?:error|err!|failed|failure|exception)\b|✖|error TS\d+/i;

function grepStats(text) {
  const counts = new Map();
  let matches = 0;
  let current = null;
  for (const line of text.split("\n")) {
    const located = line.match(GREP_FILE_LINE);
    if (located && !located[1].includes(" ")) {
      const file = located[1];
      counts.set(file, (counts.get(file) ?? 0) + 1);
      matches += 1;
      continue;
    }
    if (GREP_MATCH.test(line)) {
      matches += 1;
      if (current) counts.set(current, (counts.get(current) ?? 0) + 1);
      continue;
    }
    const header = line.trim();
    if (header && !header.includes(" ") && /[\\/]/.test(header)) current = header;
  }
  return { files: counts.size, matches, counts };
}

function capGrep(text) {
  const stats = grepStats(text);
  if (stats.files <= 10 && stats.matches <= 20) return null;
  // 无文件信息（如 "Line 3: hit"）：只报总命中数，不回灌行内容。
  if (stats.files === 0) {
    return `[token-guard] grep 命中 ${stats.matches} 条（无文件信息），请缩范围或加 include。`;
  }
  // 有文件信息：折叠为「文件清单 + 每文件命中数」，最多列 10 个文件。
  const entries = [...stats.counts.entries()];
  const shown = entries.slice(0, 10).map(([file, k]) => `${file}  (${k} 条)`);
  const lines = [
    `[token-guard] grep 命中 ${stats.matches} 条 / ${stats.files} 个文件，已折叠为文件清单（不返回行内容）。请缩范围或加 include 精确定位。`,
    ...shown,
  ];
  if (entries.length > 10) lines.push("...（其余文件已省略）");
  return lines.join("\n");
}

function capPwsh(command, text) {
  if (!BUILD_CMD.test(String(command || ""))) return null;
  const lines = text.split("\n");
  const errors = lines.filter((line) => ERROR_LINE.test(line));
  if (errors.length <= 20) return null;
  const omitted = lines.length - 15;
  return [
    PWSH_WARN,
    ...lines.slice(0, 10),
    `... (省略 ${omitted} 行错误) ...`,
    ...lines.slice(-5),
  ].join("\n");
}

function capOrchestrate(text) {
  if (text.length <= 1000 || !/无法读取|示意/.test(text)) return null;
  return `${text.slice(0, 1000)}\n(结果不可用，已截断。请宿主重新规划，不要沿用无法读取或示意性内容。)`;
}

/** 超限时返回截断文本；未超限返回 null。 */
function cappedText(exec, text) {
  const toolName = exec?.name;
  if (toolName === "grep") return capGrep(text);
  if (toolName === "pwsh") return capPwsh(exec?.arguments?.command, text);
  if (toolName === "orchestrate") return capOrchestrate(text);
  if (toolName === "read") {
    const lines = text.split("\n");
    const args = exec?.arguments;
    const hasRange = hasReadRange(args);
    if (!hasRange && lines.length > 300) {
      return `[token-guard] read 未带 offset/limit 且共 ${lines.length} 行（>300）。先 grep 定位，或带 offset/limit 分段读，不要整读。`;
    }
    if (hasRange && lines.length > 500) {
      return lines.slice(0, 500).join("\n")
        + "\n[token-guard] read 已超过 500 行，其余已截断。请缩小 offset/limit 范围后再读。";
    }
    return null;
  }
  if (toolName === "skill" && text.length > 2500) {
    return text.slice(0, 2500)
      + "\n[token-guard] skill 正文已截断。只保留前 2500 字，按已给出的步骤执行，不要为了补全文再整篇重读。";
  }
  return null;
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
  const directTools = new Set(['grep', 'glob', 'read', 'pwsh']);
  const logStore = createLogStore();
  // Host integrations can expose this narrow reader without using arbitrary read paths.
  ctx.p0LogReader = logStore.read;
  ctx.tools?.register?.({
    name: 'p0_log_read',
    description: 'Read a token-guard logRef only (not execution logs). Session bound; at most 2000 characters / 40 lines, 3 reads / 6000 characters per session.',
    parameters: {
      type: 'object',
      properties: { logRef: { type: 'string' }, offset: { type: 'integer', minimum: 0 }, limit: { type: 'integer', minimum: 1, maximum: policy.logRead.maxChars }, maxLines: { type: 'integer', minimum: 1, maximum: policy.logRead.maxLines } },
      required: ['logRef'], additionalProperties: false,
    },
    output: { schema: { type: 'string' }, render: (_args, value) => [{ type: 'text', text: value }] },
    execute(args, exec) {
      return JSON.stringify(logStore.read(args.logRef, exec.agent?.session?.header?.id, args));
    },
  });

  ctx.on("tools/post-execute", async (exec, result, next) => {
    const decision = await next();
    if (decision.kind !== "accept") return decision;
    if (directTools.has(exec.name)) {
      if (Object.hasOwn(decision, 'value') && decision.value !== null && typeof decision.value === 'object') {
        return { ...decision, value: boundStructuredValue(decision.value) };
      }
      const source = Object.hasOwn(decision, 'value') ? decision.value : (decision.content ?? result.content);
      const original = typeof source === 'string' ? source : Array.isArray(source) ? fullTextOf(source) : JSON.stringify(source ?? '');
      const text = redact(original);
      const shortened = cappedText(exec, text) ?? text;
      if (shortened !== original || text.length > policy.result.directChars) {
        const session = exec.agent?.session?.header?.id;
        const logRef = logStore.save(session, text);
        const notice = `\n[token-guard] 结果已截断${logRef ? `；logRef=${logRef}，用 p0_log_read 窄读（2000字符/40行）` : '，请缩小范围'}。`;
        const output = capText(shortened, policy.result.directChars, notice);
        return Object.hasOwn(decision, 'value') ? { ...decision, value: output } : { ...decision, content: [{ type: 'text', text: output }] };
      }
      return decision;
    }
    if (Object.hasOwn(decision, 'value')) return decision;
    let content = decision.content ?? result.content;
    if (!retainable(content) || content.length === 0) return decision;
    const shortened = cappedText(exec, fullTextOf(content));
    if (shortened) {
      content = [{ type: "text", text: shortened }];
      if (!watched.has(exec.name) || priceContent(content) <= threshold) {
        return { kind: "accept", content };
      }
    }
    if (!watched.has(exec.name)) return decision;
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
