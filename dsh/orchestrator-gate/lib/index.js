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

function normalizeConfig(input) {
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

/** §3.2：返回命中原因或 null。repoRoot 缺失时写 bag.errors。 */
export function classifyGrep(args, config, { cwd, bag } = {}) {
  const raw = args?.path;
  const empty = raw === undefined || raw === null || String(raw).trim() === "" || String(raw).trim() === ".";
  const roots = config.repoRoots ?? [];
  const base = cwd ?? null;
  const root = repoRootFor(base, roots) ?? (roots.length === 1 ? roots[0] : null);
  if (empty) return "仓库根 grep";
  const target = path.isAbsolute(String(raw)) ? String(raw) : (base ? path.resolve(base, String(raw)) : null);
  if (!target) {
    if (config.grepFailClosedWhenNoRepoRoot) return "无 repoRoot 的 grep";
    if (bag) bag.errors = (bag.errors ?? 0) + 1;
    return null;
  }
  const matched = repoRootFor(target, roots);
  if (!matched) {
    if (norm(target) === norm(path.parse(target).root)) return "盘根 grep";
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
    "\uff08\u672c\u89c4\u5219\u5168\u5c40\u5f3a\u5236\u3002\u82e5\u786e\u9700\u76f4\u8dd1\u7a84\u547d\u4ee4\uff0c\u8bf7\u5148\u7f29\u5230\u5355\u6587\u4ef6/\u5355\u6a21\u5757\u3002\uff09",
  ].join("\n");
}

/**
 * 返回 string = 拒绝；null = 放行。
 * bag 可选：{ errors, shellWrapped, uncovered } 供调用方计数。
 */
export function decideInterception({ tool, args, config, isSubagent, alreadyWholeRead, cwd, fsImpl, bag }) {
  if (tool === "orchestrate") {
    if (args?.execution !== undefined && !validExecution(args)) return JSON.stringify({ code: 'INVALID_EXECUTION', reason: '结构化执行需要绝对workdir、安全program/args；shell元字符须走已有授权流程', recommendation: { tool: 'orchestrate', arguments: { op: 'full', request: '审查并授权所需命令' } } });
    return null;
  }
  if (RULES.passThroughSubagents && isSubagent) return null;
  const cfg = config ?? {};

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
    if (why) return reason("grep", `path=${args?.path ?? "(缺省)"}`, "缩到具体模块目录再搜");
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

export function apply(ctx, raw, { counters = { rejected: 0, errors: 0, shellWrapped: 0, uncovered: 0 } } = {}) {
  const config = normalizeConfig(raw);
  const sessionWholeReads = new Map();
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
      const hit = decideInterception({
        tool,
        args: exec?.arguments,
        config,
        isSubagent: (sess?.delegationDepth ?? 0) > 0,
        alreadyWholeRead,
        cwd,
        bag,
      });
      counters.errors += bag.errors;
      counters.shellWrapped += bag.shellWrapped;
      counters.uncovered += bag.uncovered;
      if (bag.shellWrapped) log?.warn?.("orchestrator-gate: shell-wrapped segment, not intercepted");
      if (bag.uncovered) log?.warn?.("orchestrator-gate: %s command field missing (M3 uncovered)", tool);
      if (!hit && whole && sess?.id !== undefined) {
        if (!sessionWholeReads.has(sess.id)) sessionWholeReads.set(sess.id, new Set());
        sessionWholeReads.get(sess.id).add(exec?.arguments?.file_path);
      }
      if (hit) {
        counters.rejected++;
        log?.warn?.("orchestrator-gate: rejected %s", tool);
        return hit;
      }
    } catch (e) {
      counters.errors++;
      log?.warn?.("orchestrator-gate error", e);
    }
    return undefined;
  });
  ctx?.on?.("dispose", () => disposer?.());
  return { counters, sessionWholeReads };
}
