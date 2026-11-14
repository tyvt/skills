/**
 * dsh-orchestrator-gate —— 编排器硬门禁（零依赖本地插件）。
 *
 * 与 dsh-cost-meter / dsh-agent-guard 同约束：装在 profile 之外，不 import @deepseek-ai/*。
 * 规则开关硬编码（方案 B），config 只留 enabled 总开关与阈值。
 *
 * 首启：blockRootGrep 开，blockWholeRead / blockBillingBypass / blockBuildLint 关。
 * 改开关必须改本文件后重启 Web；不读 config 里的同名开关。
 */

import { statSync } from "node:fs";
import path from "node:path";

export const name = "orchestrator-gate";
// 访问 ctx.tools.guard() 必须先声明 tools 依赖；否则 cordis 在属性访问时抛
// `cannot get property "tools" without inject`，apply 中断、插件不激活、守卫生效不了。
export const inject = ["tools"];

import { hasReadRange, validExecution, policy } from '../../shared/p0-policy.mjs';

/** 方案 B：规则开关不进 config。 */
export const RULES = {
  blockBuildLint: true,
  blockRootGrep: true,
  blockWholeRead: true,
  blockBillingBypass: true,
  blockEditWithoutPlan: true,
  blockSerialFanout: true,
  passThroughSubagents: true,
  wholeReadDedup: true,
  tscTreatProjectFlagAsFull: true,
  allowSingleFileTsc: true,
  blockBareTsc: true,
  allowSingleFileTscNoEmit: false,
};
Object.defineProperty(RULES, 'blockBuildLint', { writable: false, configurable: true });
Object.defineProperty(RULES, 'blockRootGrep', { writable: false, configurable: true });
Object.defineProperty(RULES, 'blockWholeRead', { writable: false, configurable: true });
Object.defineProperty(RULES, 'blockBillingBypass', { writable: false, configurable: true });
Object.defineProperty(RULES, 'blockEditWithoutPlan', { writable: false, configurable: true });
Object.defineProperty(RULES, 'blockSerialFanout', { writable: false, configurable: true });

/** 扇出敏感工具：同会话连续整读/整仓检索是最大串行浪费源。 */
const FANOUT_TOOLS = new Set(["read", "grep"]);
const FANOUT_STREAK_MAX_SESSIONS = 500;
// 会话记忆性 Map（sessionWholeReads/sessionHasPlan）的 FIFO 上限。
// 取 1000 = FANOUT_STREAK_MAX_SESSIONS 的 2×，给长驻进程多会话留冗余；
// 淘汰最久未插入会话仅丢其「已整读/已出计划」记忆，新会话从 false 起算（偏宽松、不误阻断）。
const SESSION_MEMO_MAX_SESSIONS = 1000;

/** offset/limit 均为 ≥1 整数才算分页读（豁免计数）；offset-only / 0 / 非整数按整读计。 */
function isPagedRead(args) {
  return Number.isInteger(args?.offset) && args.offset >= 1
    && Number.isInteger(args?.limit) && args.limit >= 1;
}

/**
 * 扇出连击判定（纯函数，r8 终审版口径）。
 * streak：该工具在本会话内的连续计数；达到阈值 → 返回拒绝文案（N=streak，M=threshold）。
 */
export function classifyFanout(tool, streak, threshold) {
  if (!Number.isInteger(streak) || !Number.isInteger(threshold) || threshold < 3) return null;
  if (streak < threshold) return null;
  return [
    `[orchestrator-gate] 已连续 ${streak} 次 ${tool}（阈值 ${threshold}）。同类对象批量任务请改道：`,
    "① spawn_teammate 扇出并行（多对象首选）；② workflow 编排大规模扇出；③ orchestrate {op:\"full\"} 走编排器。",
    "本次已重置计数，继续单发将再次累计拦截。",
  ].join("\n");
}

/** 编码/样式改动的落地工具：edit / write。首次落地前必须先出计划。 */
const EDIT_TOOLS = new Set(["edit", "write"]);
/** 视为「已出计划」的工具：todo_write（计划外化）。 */
const PLAN_TOOLS = new Set(["todo_write"]);

/**
 * 派生指纹：由「规则开关 + BINS + FULL_SCRIPTS」的内容派生一个短哈希。
 * 改这些规则 → 指纹变；重启后日志里指纹若与预期不同，说明加载的不是你以为的那份。
 * 故意不手写版本号：手写版本号会被遗忘更新，派生指纹不会。
 */
export function rulesFingerprint() {
  const ruleKeys = Object.keys(RULES).sort();
  const material = [
    "rules:" + ruleKeys.map((k) => `${k}=${RULES[k]}`).join(","),
    "bins:" + [...BINS].sort().join(","),
    "full:" + [...FULL_SCRIPTS].sort().join(","),
  ].join("|");
  // FNV-1a 32-bit，零依赖，稳定跨进程
  let h = 0x811c9dc5;
  for (let i = 0; i < material.length; i++) {
    h ^= material.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

const SHELL_TOOLS = new Set(["pwsh", "bash", "terminal"]);
const COMMAND_FIELDS = ["command", "script", "cmd"];
const BINS = new Set(["npm", "pnpm", "yarn", "bun", "bunx", "npx", "eslint", "tsc", "vue-tsc", "vite"]);
const WRAP_HEADS = new Set(["&", "start-process", "cmd", "bash", "pwsh", "sh"]);

const BUILD_LINT_NON_EXEC = new Set([
  "echo", "write-output", "write-host", "git", "grep", "select-string",
  "cat", "get-content", "rg", "type",
]);
const DATA_READ = new Set([
  "cat", "get-content", "get-childitem", "select-string", "rg", "grep",
  "find", "dir", "ls", "type",
]);
const SEARCH_HEADS = new Set([
  "find", "ls", "dir", "get-childitem", "where-object", "select-object",
  "grep", "rg", "select-string",
]);
const CD_HEADS = new Set(["cd", "set-location", "pushd"]);
const EXEC_TOKENS = new Set(["--exec", "-exec", "-execdir", "-ok", "-okdir", "-command"]);
const QUERY_FLAGS = new Set(["--version", "--help", "-v", "-h"]);

export function normalizeConfig(input) {
  const roots = Array.isArray(input?.repoRoots) ? input.repoRoots.filter((s) => typeof s === "string" && s) : [];
  const modules = Array.isArray(input?.moduleRoots) ? input.moduleRoots.filter((s) => typeof s === "string" && s) : [];
  return {
    enabled: input?.enabled ?? true,
    repoRoots: roots,
    moduleRoots: modules,
    grepMinDepth: Number.isInteger(input?.grepMinDepth) ? input.grepMinDepth : 2,
    grepFailClosedWhenNoRepoRoot: input?.grepFailClosedWhenNoRepoRoot === true,
    wholeReadBytesVue: input?.wholeReadBytesVue ?? 61440,
    wholeReadBytesOther: input?.wholeReadBytesOther ?? 40960,
    // 扇出连击阈值：合法值=整数≥3，非法一律回退默认 5（0/2/"x"/3.5/-1/"5"/null/undefined/"3"）。
    fanoutStreakThreshold: Number.isInteger(input?.fanoutStreakThreshold) && input.fanoutStreakThreshold >= 3
      ? input.fanoutStreakThreshold : 5,
  };
}

export function commandOf(args) {
  if (!args || typeof args !== "object") return undefined;
  for (const k of COMMAND_FIELDS) {
    if (typeof args[k] === "string") return args[k];
  }
  return undefined;
}

/** 引号感知切段：; && || | 和 CR/LF；引号内不切。 */
export function splitSegments(command) {
  const src = String(command ?? "");
  const out = [];
  let buf = "";
  let quote = null;
  const push = () => {
    if (buf.trim()) out.push(buf.trim());
    buf = "";
  };
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      buf += c;
      if (c === quote) quote = null;
      continue;
    }
    if (c === "'" || c === "\"") { quote = c; buf += c; continue; }
    if (c === ";" || c === '\n' || c === '\r') { push(); continue; }
    if (c === "&" && src[i + 1] === "&") { push(); i++; continue; }
    if (c === "|" && src[i + 1] === "|") { push(); i++; continue; }
    if (c === "|") { push(); continue; }
    buf += c;
  }
  push();
  return out;
}

/** 按空白切词，去词两侧配对引号，保留词内容。 */
export function tokenize(segment) {
  const src = String(segment ?? "");
  const out = [];
  let buf = "";
  let quote = null;
  const push = () => {
    if (!buf) return;
    if (buf.length >= 2 && (buf[0] === "\"" || buf[0] === "'") && buf.at(-1) === buf[0]) buf = buf.slice(1, -1);
    if (buf) out.push(buf);
    buf = "";
  };
  for (const c of src) {
    if (quote) {
      buf += c;
      if (c === quote) { quote = null; push(); }
      continue;
    }
    if (c === "'" || c === "\"") { quote = c; buf += c; continue; }
    if (c === " " || c === "\t") { push(); continue; }
    buf += c;
  }
  push();
  return out;
}

function headOf(argv) {
  const h = argv[0] ?? "";
  return h.replace(/^\.\\|^\.\//, "").toLowerCase();
}

function isWrapped(argv) {
  const h = headOf(argv);
  if (WRAP_HEADS.has(h)) return true;
  const raw = argv[0] ?? "";
  return /^\.\\.*\.ps1$/i.test(raw) || /^\.\/.*\.sh$/i.test(raw);
}

function scriptRuns(argv) {
  const text = argv.join(" ");
  const at = text.indexOf("{");
  if (at < 0) return false;
  const inner = text.slice(at);
  return /\b(python|node|pwsh|bash|npm|pnpm|yarn|bun|bunx|npx|eslint|tsc|vue-tsc|vite|start-process)\b/i.test(inner)
    || /-command/i.test(inner);
}

function hasExecToken(argv) {
  return argv.some((t) => {
    const l = t.toLowerCase();
    if (EXEC_TOKENS.has(l)) return true;
    return l.startsWith("invoke-");
  });
}

/** 先剥 npx / pnpm exec / npm exec，返回真实 bin 与其后的 argv。 */
function peelBin(argv) {
  let i = 0;
  const h = headOf(argv);
  const second = (argv[1] ?? "").toLowerCase();
  if (h === "npx" || h === "bunx") {
    i = 1;
    while (i < argv.length && argv[i].startsWith("-")) i++;
  } else if ((h === "pnpm" || h === "npm") && second === "exec") {
    i = 2;
    while (i < argv.length && argv[i].startsWith("-")) i++;
  } else if (h === "bun" && second === "x") {
    i = 2;
    while (i < argv.length && argv[i].startsWith("-")) i++;
  }
  return { bin: (argv[i] ?? "").toLowerCase(), rest: argv.slice(i + 1), index: i };
}

function isQueryOnly(argv) {
  const { bin, rest } = peelBin(argv);
  if (!BINS.has(bin)) return false;
  if (!rest.length) return false;
  return rest.every((t) => QUERY_FLAGS.has(t.toLowerCase()));
}

const TAKES_VALUE = new Set(["--config", "--parser", "--ext", "-c", "--format", "-f", "--ignore-pattern"]);

function positionals(argv) {
  const out = [];
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === "--") { out.push(...argv.slice(i + 1)); break; }
    if (t.startsWith("-")) {
      if (TAKES_VALUE.has(t.toLowerCase())) i++;
      continue;
    }
    out.push(t);
  }
  return out;
}

function wildcard(s) {
  return /[*?]/.test(s);
}

function statFile(p, fsImpl) {
  try {
    const st = (fsImpl?.statSync ?? statSync)(p);
    return typeof st?.isFile === "function" ? st.isFile.call(st) === true : false;
  } catch {
    return false;
  }
}

/**
 * 全量脚本名：只有 build / lint 及 `name:` 变体算「全量构建类」。
 * 注意：typecheck / type-check / tsc / vue-tsc 故意**不在此列**。
 * 项目常无 eslint，typecheck 是唯一的静态自检安全网；而 orchestrate 的 pwsh
 * 无本地 FS 跑不了全量 typecheck —— 若把 typecheck 关进全量拦截，宿主直跑被拦、
 * orchestrate 又跑不了，等于砍掉验证网，比漏拦更糟。typecheck 交宿主直跑（可窄跑），
 * 成本靠「单文件/单模块」自律与后台超时控制，不靠本门禁。
 */
const FULL_SCRIPTS = new Set(["build", "lint"]);
function isFullScript(script) {
  if (!script) return false;
  if (FULL_SCRIPTS.has(script)) return true;
  return /^(build|lint):/.test(script);
}

/** §3.1：一段 argv 是否全量 build/lint/类型检查。返回命中原因或 null。 */
export function classifyBuild(argv, { fsImpl, baseDir } = {}) {
  if (!argv.length) return null;
  if (isQueryOnly(argv)) return null;
  const h = headOf(argv);
  if (BUILD_LINT_NON_EXEC.has(h)) return null;

  if (h === "npm" || h === "pnpm" || h === "yarn" || h === "bun") {
    let script = "";
    if ((argv[1] ?? "").toLowerCase() === "run") script = argv[2] ?? "";
    else if ((argv[1] ?? "").toLowerCase() === "exec") return classifyBuild(argv.slice(2), { fsImpl, baseDir });
    else if (h === "bun" && (argv[1] ?? "").toLowerCase() === "x") return classifyBuild(argv.slice(2), { fsImpl, baseDir });
    else if (h === "bun" && ["install", "i", "add", "remove", "rm", "update", "upgrade", "pm", "init", "create", "-h", "--help", "-v", "--version"].includes((argv[1] ?? "").toLowerCase())) {
      // bun 的子命令而非脚本名；`bun x <bin>` 已在 peelBin 处理，其余放行
      return null;
    } else script = argv[1] ?? "";
    if (isFullScript(script)) return `script ${script}`;
    return null;
  }

  const { bin, rest } = peelBin(argv);
  if (bin === "vite") {
    if ((rest[0] ?? "").toLowerCase() === "build") return "vite build";
    return null;
  }
  if (bin === "eslint") {
    const pos = positionals(rest);
    if (!pos.length) return "eslint 无位置参数";
    if (pos.some((p) => wildcard(p))) return "eslint 通配符";
    if (pos.some((p) => !path.isAbsolute(p))) return "eslint 非绝对路径";
    const ok = pos.every((p) => statFile(p, fsImpl));
    return ok ? null : "eslint 非单文件";
  }
  if (bin === "tsc" || bin === "vue-tsc") {
    if (rest.some((t) => t === "--build" || t === "-b")) return `${bin} --build`;
    const pi = rest.findIndex((t) => t === "-p" || t === "--project");
    if (pi >= 0) {
      const proj = rest[pi + 1] ?? "";
      if (!proj || !/\.(ts|tsx)$/i.test(proj)) return `${bin} 工程配置`;
    }
    const consumed = new Set();
    rest.forEach((t, i) => { if (t === "-p" || t === "--project") consumed.add(i + 1); });
    const files = rest.filter((t, i) => !consumed.has(i) && !t.startsWith("-") && /\.(ts|tsx)$/i.test(t));
    if (files.length === 1 && path.isAbsolute(files[0]) && statFile(files[0], fsImpl)) {
      const noEmit = rest.some((t) => t === "--noEmit");
      if (noEmit) return null;
      if (RULES.allowSingleFileTscNoEmit) return null;
      return `${bin} 单文件编译（未带 --noEmit）`;
    }
    if (!files.length) return `bare ${bin}`;
    return `${bin} 非单文件`;
  }
  return null;
}

function norm(p) {
  return path.normalize(p).replace(/[\\/]+$/, "").toLowerCase();
}

export function pathInSessions(p) {
  return /[/\\]\.sessions([/\\]|$)/i.test(String(p ?? ""));
}

function cdTarget(argv) {
  const h = headOf(argv);
  const rest = argv.slice(1).filter((t) => t.toLowerCase() !== "-path");
  if (!rest.length) return h === "cd" || h === "set-location" ? "~" : null;
  return rest[0];
}

/** §3.4：返回命中原因或 null。shellWrapped 计数写入 bag。 */
export function classifyBilling(segments, { cwd, repoRoot, bag } = {}) {
  let current = cwd ?? repoRoot ?? null;
  let fallback = false;
  for (const seg of segments) {
    const argv = tokenize(seg);
    if (!argv.length) continue;
    const h = headOf(argv);
    if (CD_HEADS.has(h)) {
      const target = cdTarget(argv);
      if (target == null || target === "~" || current == null) {
        current = null;
        fallback = true;
      } else if (path.isAbsolute(target)) {
        current = path.normalize(target);
        fallback = false;
      } else {
        current = path.normalize(path.join(current, target));
        fallback = false;
      }
      continue;
    }
    if (isWrapped(argv)) bag && (bag.shellWrapped = (bag.shellWrapped ?? 0) + 1);
    const inSessions = current == null ? fallback : pathInSessions(current);
    if (BUILD_LINT_NON_EXEC.has(h) && !DATA_READ.has(h)) continue;
    const joined = argv.join(" ");
    if (/cost_bill\.py/i.test(joined)) {
      const search = SEARCH_HEADS.has(h);
      const exec = hasExecToken(argv);
      const runs = scriptRuns(argv);
      if (!(search && !exec && !runs)) return "cost_bill.py \u6267\u884c";
    }
    if (DATA_READ.has(h) && (inSessions || argv.some((a) => /\.sessions\b/i.test(a)))) return "读取 .sessions";
  }
  return null;
}

function repoRootFor(p, roots) {
  if (!p) return null;
  const n = norm(p);
  let best = null;
  for (const r of roots) {
    const nr = norm(r);
    if (n === nr || n.startsWith(nr + path.sep) || n.startsWith(nr + "/")) {
      if (!best || nr.length > best.length) best = r;
    }
  }
  return best;
}

function depthUnder(root, p) {
  const rel = path.relative(root, p);
  if (!rel || rel.startsWith("..")) return 0;
  return rel.split(/[/\\]/).filter(Boolean).length;
}

/** §3.2：返回命中原因或 null。全项目覆盖：不再依赖 repoRoots 白名单。 */
export function classifyGrep(args, config, { cwd, bag } = {}) {
  const raw = args?.path;
  const empty = raw === undefined || raw === null || String(raw).trim() === "" || String(raw).trim() === ".";
  const roots = config.repoRoots ?? [];
  const base = cwd ?? null;
  // 全项目覆盖：优先用 cwd 作为基准根；cwd 缺失时退回配置里的第一个 repoRoot。
  const root = base ?? (roots.length === 1 ? roots[0] : null);
  if (empty) return "仓库根 grep";
  const target = path.isAbsolute(String(raw)) ? String(raw) : (root ? path.resolve(root, String(raw)) : null);
  if (!target) {
    if (config.grepFailClosedWhenNoRepoRoot) return "无 repoRoot 的 grep";
    if (bag) bag.errors = (bag.errors ?? 0) + 1;
    return null;
  }
  // 盘根一律拦。
  if (norm(target) === norm(path.parse(target).root)) return "盘根 grep";
  // 全项目覆盖：以 cwd（或 repoRoot）为基准判断是否「仓库根级」。
  const matched = root ? (normWithin(root, target) ? root : repoRootFor(target, roots)) : repoRootFor(target, roots);
  if (!matched) {
    // 不在任何已知根下：仍按「相对 cwd 深度」判定，浅层即拦（全项目覆盖）。
    if (root) {
      const depth = depthUnder(root, target);
      if (depth >= 0 && depth < (config.grepMinDepth ?? 2)) return "仓库根 grep";
    }
    return null;
  }
  const rel = path.relative(matched, target);
  const normRel = rel.replace(/\\/g, "/");
  const under = (root, rel) => {
    const parts = (s) => {
      const out = [];
      let buf = "";
      for (const ch of String(s)) {
        const code = ch.charCodeAt(0);
        if (code === 47 || code === 92) {
          if (buf) out.push(buf);
          buf = "";
        } else buf += ch;
      }
      if (buf) out.push(buf);
      return out;
    };
    const a = parts(rel);
    return (config.moduleRoots ?? []).some((m) => {
      const b = parts(m);
      return b.length && b.length <= a.length && b.every((x, k) => x.toLowerCase() === a[k].toLowerCase());
    });
  };
  if (under(matched, normRel)) return null;
  if (depthUnder(matched, target) >= (config.grepMinDepth ?? 2)) return null;
  return "仓库根 grep";
}

/** target 是否落在 root 之下（含相等）。 */
function normWithin(root, target) {
  const r = norm(root).replace(/[\\/]+$/, "");
  const t = norm(target);
  return t === r || t.startsWith(r + path.sep) || t.startsWith(r + "/");
}

function isWholeRead(args) {
  if (!args) return false;
  return !hasReadRange(args);
}

/** §3.3 */
export function classifyRead(args, config, { alreadyWholeRead, fsImpl } = {}) {
  if (!isWholeRead(args)) return null;
  if (RULES.wholeReadDedup && alreadyWholeRead) return "本会话已整读";
  const file = args?.file_path;
  if (typeof file !== "string" || !path.isAbsolute(file)) return null;
  let size;
  try { size = (fsImpl?.statSync ?? statSync)(file)?.size; } catch { return null; }
  if (typeof size !== "number") return null;
  const vue = /\.vue$/i.test(file);
  const limit = vue ? config.wholeReadBytesVue : config.wholeReadBytesOther;
  if (size > limit) return vue ? ".vue 超字节阈值" : "超字节阈值";
  return null;
}

function reason(tool, summary, hint, fastPath) {
  return [
    JSON.stringify({ code: 'ORCHESTRATION_REQUIRED', reason: summary, recommendation: { tool: 'orchestrate', arguments: validExecution(fastPath) ? { op: 'full', ...fastPath } : { op: 'full', request: hint } }, budgetChars: policy.result.directChars }),
    "[orchestrator-gate] 该操作必须走 orchestrate 编排器，禁止宿主直跑。",
    `操作：${tool} ${summary}`,
    `\u6539\u7528\uff1aorchestrate {op:\"full\", request:\"${hint}\"}`,
    "注意：要真正执行命令/构建/检索跑本地文件，必须用 op:\"full\"（它会 generate_command→security_guard→_run_pwsh 真实执行并回传 exit/stdout/stderr）。",
    "op:\"tool\" 只做纯文本加工，不会执行 pwsh（模型只会回\"我没有执行能力\"），不要用它跑构建/命令/读盘。",
    "\uff08\u672c\u89c4\u5219\u5168\u5c40\u5f3a\u5236\u3002\u82e5\u786e\u9700\u76f4\u8dd1\u7a84\u547d\u4ee4\uff0c\u8bf7\u5148\u7f29\u5230\u5355\u6587\u4ef6/\u5355\u6a21\u5757\u3002\uff09",
  ].join("\n");
}

function planReason(tool, args) {
  const f = args?.file_path ?? args?.path ?? "(未知文件)";
  return [
    "[orchestrator-gate] 编码/样式改动必须先出计划，再落盘。",
    `操作：${tool} ${f}`,
    "本会话尚未用 todo_write 列出计划。请先调用：",
    '  todo_write { todos: [ {content:"…", status:"in_progress"}, … ] }',
    "列出本轮要改的文件/步骤（多步改动应标 in_progress/pending），然后重试本次编辑。",
    "（全项目覆盖：任何项目、任何 cwd 下首次落地改动前都要求先出计划。）",
  ].join("\n");
}

/**
 * 返回 string = 拒绝；null = 放行。
 * bag 可选：{ errors, shellWrapped, uncovered } 供调用方计数。
 * hasPlan：本会话是否已调用过 todo_write（计划门禁用）。
 */
export function decideInterception({ tool, args, config, isSubagent, alreadyWholeRead, cwd, fsImpl, bag, hasPlan = false }) {
  if (tool === "orchestrate") {
    if (args?.execution !== undefined && !validExecution(args)) return JSON.stringify({ code: 'INVALID_EXECUTION', reason: '结构化执行需要绝对workdir、安全program/args；shell元字符须走已有授权流程', recommendation: { tool: 'orchestrate', arguments: { op: 'full', request: '审查并授权所需命令' } } });
    return null;
  }
  if (RULES.passThroughSubagents && isSubagent) return null;
  const cfg = config ?? {};

  // 计划门禁：首次 edit/write 前必须已有 todo 计划。全项目覆盖，不受 repoRoots 限制。
  if (RULES.blockEditWithoutPlan && EDIT_TOOLS.has(tool) && !hasPlan) {
    return planReason(tool, args);
  }

  if (SHELL_TOOLS.has(tool)) {
    const command = commandOf(args);
    if (command === undefined) {
      if (tool !== "pwsh" && bag) bag.uncovered = (bag.uncovered ?? 0) + 1;
    } else {
      const segments = splitSegments(command);
      for (const seg of segments) {
        const argv = tokenize(seg);
        if (isWrapped(argv) && bag) bag.shellWrapped = (bag.shellWrapped ?? 0) + 1;
      }
      if (RULES.blockBuildLint) {
        for (const seg of segments) {
          const argv = tokenize(seg);
          const why = classifyBuild(argv, { fsImpl, baseDir: cwd });
          if (why) return reason(tool, command.slice(0, 160), `build/lint: ${why}`, segments.length === 1 ? { workdir: args?.workdir ?? cwd, execution: { program: argv[0], args: argv.slice(1) } } : undefined);
        }
      }
      if (RULES.blockBillingBypass) {
        const why = classifyBilling(segments, { cwd, repoRoot: (cfg.repoRoots ?? [])[0] ?? null, bag });
        if (why) return reason(tool, command.slice(0, 160), `账\u5355\u6216\u5927\u7ed3\u679c\u67e5\u8be2\uff1a${why}`);
      }
    }
  }

  if (tool === "grep" && RULES.blockRootGrep) {
    const why = classifyGrep(args, cfg, { cwd, bag });
    if (why) return reason("grep", `path=${args?.path ?? "(缺省)"}`, "在全仓/大目录内检索该模式并返回命中文件与行号（op:full 会真实执行 pwsh Select-String/rg）");
  }

  if (tool === "read" && RULES.blockWholeRead) {
    const why = classifyRead(args, cfg, { alreadyWholeRead, fsImpl });
    if (why) {
      const msg = why === "本会话已整读"
        ? "该文件本会话已整读过，请改用 offset 续读后半段，或先 grep 定位目标行再读"
        : `整读超过字节阈值（${why}），请带 offset/limit 分段读`;
      return JSON.stringify({ code: 'READ_RANGE_REQUIRED', reason: msg, recommendation: { tool: 'read', arguments: { file_path: args?.file_path, offset: 1, limit: 40 } }, budgetChars: policy.result.directChars });
    }
  }
  return null;
}

export function apply(ctx, raw, { counters = { rejected: 0, errors: 0, shellWrapped: 0, uncovered: 0, rejectedByTool: {} } } = {}) {
  const config = normalizeConfig(raw);
  const sessionWholeReads = new Map();
  // 计划门禁状态：sessionId -> 是否已调用过 todo_write（出过计划）。
  const sessionHasPlan = new Map();
  // sessionWholeReads/sessionHasPlan 首次插入前做 FIFO 上限淘汰（防无界增长）。
  const enforceMemoCap = (map, id) => {
    if (!map.has(id) && map.size >= SESSION_MEMO_MAX_SESSIONS) {
      map.delete(map.keys().next().value); // Map 迭代序=插入序，O(1) 淘汰最旧
    }
  };
  // 扇出连击状态：sessionId -> {read, grep}（分槽独立计数；有界，第 501 条插入时淘汰最旧）。
  const sessionStreaks = new Map();
  const setStreaks = (id, val) => {
    if (!sessionStreaks.has(id) && sessionStreaks.size >= FANOUT_STREAK_MAX_SESSIONS) {
      sessionStreaks.delete(sessionStreaks.keys().next().value); // Map 迭代序=插入序，O(1) 淘汰最旧
    }
    sessionStreaks.set(id, val);
  };
  if (!config.enabled) return;
  const log = typeof ctx?.logger === "function" ? ctx.logger(name) : ctx?.logger;
  // 启动日志：指纹 + 全量开关状态。改规则后必须重启 Web 才生效；
  // 重启前任何「实测被拦/未被拦」的结论都不成立——以这行日志为加载凭证。
  log?.warn?.(
    "orchestrator-gate loaded: fingerprint=%s rules=%s fullScripts=[%s]",
    rulesFingerprint(),
    Object.keys(RULES).sort().map((k) => `${k}=${RULES[k]}`).join(","),
    [...FULL_SCRIPTS].sort().join(","),
  );
  const disposer = ctx?.tools?.guard?.((exec) => {
    try {
      const sess = exec?.agent?.session?.header;
      const tool = exec?.name;
      const memo = sess?.id !== undefined ? sessionWholeReads.get(sess.id) : undefined;
      const whole = tool === "read" && isWholeRead(exec?.arguments);
      const alreadyWholeRead = whole && (memo?.has(exec?.arguments?.file_path) ?? false);
      const bag = { errors: 0, shellWrapped: 0, uncovered: 0 };
      const cwd = exec?.cwd ?? exec?.agent?.session?.header?.cwd ?? null;
      // 记录计划：本会话只要调用过 todo_write 即视为「已出计划」。
      if (sess?.id !== undefined && PLAN_TOOLS.has(tool)) { enforceMemoCap(sessionHasPlan, sess.id); sessionHasPlan.set(sess.id, true); }
      const hasPlan = sess?.id !== undefined ? (sessionHasPlan.get(sess.id) ?? false) : false;
      const isSub = (sess?.delegationDepth ?? 0) > 0;
      const hit = decideInterception({
        tool,
        args: exec?.arguments,
        config,
        isSubagent: isSub,
        alreadyWholeRead,
        cwd,
        bag,
        hasPlan,
      });
      counters.errors += bag.errors;
      counters.shellWrapped += bag.shellWrapped;
      counters.uncovered += bag.uncovered;
      if (bag.shellWrapped) log?.warn?.("orchestrator-gate: shell-wrapped segment, not intercepted");
      if (bag.uncovered) log?.warn?.("orchestrator-gate: %s command field missing (M3 uncovered)", tool);
      if (!hit && whole && sess?.id !== undefined) {
        enforceMemoCap(sessionWholeReads, sess.id);
        if (!sessionWholeReads.has(sess.id)) sessionWholeReads.set(sess.id, new Set());
        sessionWholeReads.get(sess.id).add(exec?.arguments?.file_path);
      }
      if (hit) {
        counters.rejected++;
        log?.warn?.("orchestrator-gate: rejected %s", tool);
        return hit; // 铁律：被任何规则拒绝的调用不修改扇出状态
      }
      // --- fanout 计数（仅在调用必然执行时才改状态；r8 终审口径）---
      if (sess?.id !== undefined) {
        if (tool === "orchestrate") {
          setStreaks(sess.id, { read: 0, grep: 0 }); // 编排器直过并清零两槽
        } else if (RULES.blockSerialFanout && !isSub && FANOUT_TOOLS.has(tool)) {
          // 分页读豁免：offset≥1 且 limit≥1 且均为整数 → 不计数也不清零
          const paged = tool === "read" && isPagedRead(exec?.arguments);
          if (!paged) {
            const st = sessionStreaks.get(sess.id) ?? { read: 0, grep: 0 };
            st[tool]++;
            if (st[tool] >= config.fanoutStreakThreshold) {
              st[tool] = 0; // 显式例外：fanout 自身拒绝清零本槽
              setStreaks(sess.id, st);
              counters.rejected++;
              counters.rejectedByTool[tool] = (counters.rejectedByTool[tool] ?? 0) + 1;
              log?.warn?.("orchestrator-gate: fanout-rejected session=%s tool=%s x%d", sess.id, tool, config.fanoutStreakThreshold);
              return classifyFanout(tool, config.fanoutStreakThreshold, config.fanoutStreakThreshold);
            }
            setStreaks(sess.id, st);
          }
        } else if (!FANOUT_TOOLS.has(tool)) {
          setStreaks(sess.id, { read: 0, grep: 0 }); // 非 fanout 工具调用清零两槽
        }
      }
    } catch (e) {
      counters.errors++;
      log?.warn?.("orchestrator-gate error", e);
    }
    return undefined;
  });
  ctx?.on?.("dispose", () => disposer?.());
  return { counters, sessionWholeReads, sessionHasPlan, sessionStreaks };
}
