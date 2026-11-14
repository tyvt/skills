/**
 * dsh-plan-gate —— 计划审批门（零依赖本地插件，仿 dsh-orchestrator-gate）。
 *
 * 规则：任何「修改 / 修复 / 实现 / 配置改动」落地前，必须先产出 Markdown 计划，
 * 经 reviewer（workbuddy/deepseek-v4.1-flash）审核通过，且经用户人工确认，方可落盘。
 *
 * 本门在 edit / write / apply_patch 等改动类工具执行前检查：
 *   - 仓库根 .plan/<sessionId>.md 是否存在（或 .plan/ 下任一已放行的计划文件）；
 *   - 其 frontmatter 是否满足 status: approved 且 human_confirmed: true。
 * 不满足 => 返回拒绝文案，阻止本次改动。
 *
 * 与 orchestrator-gate 同约束：装在 profile 之外，不 import @deepseek-ai/*；
 * 访问 ctx.tools.guard() 必须先声明 tools 依赖。
 */

import { readFileSync, readdirSync, realpathSync } from "node:fs";
import { createHash } from "node:crypto";
import { splitSegments, tokenize } from "../../orchestrator-gate/lib/index.js";

const APPROVAL_FIELDS = new Set(['status', 'human_confirmed', 'review_verdict', 'review_score', 'reviewer', 'approved_sha256', 'approved_version', 'reviewed_at']);
export function canonicalPlan(text) {
  const lines = String(text).replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  if (lines[0]?.trim() === '---') {
    const end = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
    if (end > 0) {
      const retained = lines.slice(1, end).filter(line => !APPROVAL_FIELDS.has(line.split(':', 1)[0].trim()));
      if (retained.some(line => line.trim())) lines.splice(1, end - 1, ...retained);
      else lines.splice(0, end + 1);
    }
  }
  return lines.join('\n');
}
export function planSha(text) { return createHash('sha256').update(canonicalPlan(text), 'utf8').digest('hex'); }
import path from "node:path";

export const name = "plan-gate";
export const inject = ["tools"];

/** 默认改动类工具（config.guardTools 可覆盖）。 */
const DEFAULT_GUARD_TOOLS = ["edit", "write", "apply_patch", "pwsh"];

/** 视为「产出/回写计划」的工具：命中时不拦（允许写计划文件本身）。 */
const PLAN_WRITE_TOOLS = new Set(["plan_review"]);

// ── git 写命令门控（验证门禁凭证；见 .plan/verify-gate-commit-gate-20261114.md）──
// 与 dsh/langgraph-orchestrator/src/verify.py compute_content_sha 逐字节对齐。
const GIT_WRITE_SUBCMDS = new Set([
  "commit", "push", "tag", "reset", "clean", "revert", "merge", "rebase",
  "cherry-pick", "am", "apply", "stash", "restore", "switch", "checkout",
]);
// 仅无写标志/无位置名时才算 read 的 git 子命令（branch/remote 细分处理）。
const GIT_READ_SUBCMDS = new Set([
  "status", "log", "diff", "show", "rev-parse", "describe", "blame",
  "ls-files", "show-ref", "for-each-ref",
]);
const DELETED_SENTINEL = "<DELETED>";
const REVIEW_FILE = "_review.json";

/** 去词的配对引号（tokenize 已去，这里兜底命令行头）。 */
function stripQuotes(s) {
  const v = String(s ?? "");
  return v.length >= 2 && (v[0] === '"' || v[0] === "'") && v.at(-1) === v[0] ? v.slice(1, -1) : v;
}

/**
 * 判断单个 token 段是否为 git 写操作。返回 "write" | "not-git" | "unknown"。
 * 非 git 命令 → "not-git"；git 但子命令无法静态判定 → "unknown"。
 */
function classifySegment(segment) {
  const toks = tokenize(segment).map(stripQuotes);
  if (!toks.length) return "not-git";
  // 找 argv0 = git/git.exe，跳过 git -C <path> / git -c k=v 前缀取真实子命令。
  let i = 0;
  const head0 = toks[0].replace(/^\.\\|^\.\//, "").toLowerCase();
  const isGit = head0 === "git" || head0 === "git.exe";
  if (!isGit) {
    // 非 git 命令：若含动态执行包装（iex/Start-Process/cmd /c 等）或变量/子表达式 → unknown
    const joined = toks.join(" ");
    if (/(^|\s)(iex|invoke-expression|start-process|cmd)(\s|$)/i.test(joined) ||
        /\$\(|`|\$env:|&\s*\$/i.test(segment)) {
      return "unknown";
    }
    return "not-git";
  }
  i = 1;
  // 跳过全局选项 git -C <path> / -c k=v / --git-dir=... 等
  while (i < toks.length) {
    const t = toks[i];
    if (t === "-C" || t === "-c" || t === "--git-dir" || t === "--work-tree" || t === "--namespace") { i += 2; continue; }
    if (t.startsWith("-")) { i += 1; continue; }
    break;
  }
  const sub = (toks[i] || "").toLowerCase();
  const rest = toks.slice(i + 1);
  if (!sub) return "unknown"; // git 但无子命令（如仅 git）→ 无法判定
  if (GIT_WRITE_SUBCMDS.has(sub)) return "write";
  if (sub === "branch") {
    // 纯列支（无位置名、无写标志）→ read；否则 write
    const writeFlag = rest.some((a) => /^(-[dDmMcCfF]|--delete|--move|--copy|--force|--create)$/.test(a));
    const positional = rest.some((a) => !a.startsWith("-"));
    if (!writeFlag && !positional) return "not-git";
    return "write";
  }
  if (sub === "remote") {
    const op = (rest[0] || "").toLowerCase();
    if (["", "-v", "show", "get-url"].includes(op) || op.startsWith("-v")) return "not-git";
    if (["add", "remove", "rm", "rename", "set-url", "prune", "update"].includes(op)) return "write";
    return "unknown";
  }
  if (sub === "config") {
    const hasGet = rest.some((a) => a === "--get" || a === "--get-all" || a === "--list" || a === "-l");
    return hasGet ? "not-git" : "write"; // config --unset / --add 等写
  }
  if (GIT_READ_SUBCMDS.has(sub)) return "not-git";
  // 其余 git 子命令（pull/fetch/add/rm/mv/notes/... 写或未知）→ unknown（fail-closed）
  return "unknown";
}

/**
 * 三态命令判定：任一段 unknown → unknown（优先）；任一段 write 且无 unknown → write；
 * 全为 not-git → not-git。无法解析/含动态执行 → unknown。
 * @returns {"write"|"not-git"|"unknown"}
 */
export function classifyGitCommand(command) {
  if (typeof command !== "string" || !command.trim()) return "unknown";
  let segs;
  try { segs = splitSegments(command); } catch { return "unknown"; }
  if (!segs.length) return "unknown";
  let sawWrite = false;
  for (const seg of segs) {
    let r;
    try { r = classifySegment(seg); } catch { return "unknown"; }
    if (r === "unknown") return "unknown";
    if (r === "write") sawWrite = true;
  }
  return sawWrite ? "write" : "not-git";
}

/** 文本归一化（与 verify.py _normalize 对齐）：UTF-8 严格解码成功→CRLF/CR→LF；失败→\x00BIN\x00+raw。 */
function normalizeBytes(buf) {
  // 严格 UTF-8 解码：Node 的 TextDecoder({fatal:true}) 失败抛错
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(buf);
  } catch {
    return Buffer.concat([Buffer.from("\x00BIN\x00", "latin1"), buf]);
  }
  const lf = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  return Buffer.from(lf, "utf8");
}

/** 读文件字节，失败返回 <DELETED> 哨兵字节（与 verify.py _read_bytes 对齐）。 */
function readBytesOrDeleted(workdir, relPath) {
  try {
    return readFileSync(path.join(workdir, relPath));
  } catch {
    return Buffer.from(DELETED_SENTINEL, "utf8");
  }
}

/**
 * 复刻 verify.py compute_content_sha(workdir, paths!=None)：去重 + 排除 _review.json basename
 * → sorted → 逐 path 追加 path(utf8) + \x1f + normalize(bytes) + \x1e → sha256 hex。
 * @returns {string} hex sha256
 */
export function sha256Content(workdir, paths) {
  const list = Array.isArray(paths) ? paths : [];
  const filtered = [...new Set(list.map(String))].filter(
    (p) => p && path.basename(p) !== REVIEW_FILE,
  );
  filtered.sort();
  const h = createHash("sha256");
  for (const p of filtered) {
    h.update(Buffer.from(p, "utf8"));
    h.update(Buffer.from("\x1f", "latin1"));
    h.update(normalizeBytes(readBytesOrDeleted(workdir, p)));
    h.update(Buffer.from("\x1e", "latin1"));
  }
  return h.digest("hex");
}

/** 凭证路径合法性：非数组/空 → 无效；含越界（.. 段或绝对路径）→ 无效。 */
function reviewPathsInvalid(paths) {
  if (!Array.isArray(paths) || paths.length === 0) return true;
  for (const p of paths) {
    if (typeof p !== "string" || !p) return true;
    if (path.isAbsolute(p)) return true;
    if (p.split(/[\\/]/).includes("..")) return true;
  }
  return false;
}


/**
 * 极简 frontmatter 解析：只取文件开头 `---` 与下一个 `---` 之间的 key: value。
 * 零依赖，容忍引号与注释；不做嵌套 YAML。
 * @returns {Record<string, string>}
 */
export function parseFrontmatter(text) {
  const src = String(text ?? "");
  const m = /^\uFEFF?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(src);
  if (!m) return {};
  const out = {};
  for (const rawLine of m[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf(":");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    // 去掉行尾注释（简单场景，值里不含 #）
    const hash = val.indexOf(" #");
    if (hash !== -1) val = val.slice(0, hash).trim();
    // 去配对引号
    if (val.length >= 2 && (val[0] === '"' || val[0] === "'") && val.at(-1) === val[0]) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

/** 读取单个计划文件并判断是否已「审核通过 + 人工确认」。 */
export function planFileApproved(file, require) {
  let text;
  try {
    text = readFileSync(file, "utf-8");
  } catch {
    return false;
  }
  const fm = parseFrontmatter(text);
  for (const [key, want] of Object.entries(require || {})) {
    const got = String(fm[key] ?? "").trim().toLowerCase();
    if (got !== String(want).trim().toLowerCase()) return false;
  }
  return true;
}

/**
 * 在计划目录里找一个已放行的计划文件。
 * 优先 <planDir>/<sessionId>.md；其次该 session 的活跃计划；最后任一已放行 .md。
 * @returns {{ok: boolean, file?: string, checked: string[]}}
 */
export function findApprovedPlan({ root, planDir, sessionId, require, fs = {} }) {
  const readdir = fs.readdirSync ?? readdirSync;
  const readFile = fs.readFileSync ?? readFileSync;
  const dir = path.join(root, planDir || ".plan");
  const approvedFn = (f) => {
    let text;
    try { text = readFile(f, "utf-8"); } catch { return false; }
    const fm = parseFrontmatter(text);
    for (const [key, want] of Object.entries(require || {})) {
      if (String(fm[key] ?? "").trim().toLowerCase() !== String(want).trim().toLowerCase()) return false;
    }
    return true;
  };

  let entries = [];
  try {
    entries = readdir(dir).filter((n) => /\.md$/i.test(n) && !/^TEMPLATE\.md$/i.test(n));
  } catch {
    return { ok: false, checked: [dir] };
  }

  const checked = [];
  // 1) 精确 <sessionId>.md
  if (sessionId) {
    const target = path.join(dir, `${sessionId}.md`);
    checked.push(target);
    if (entries.includes(`${sessionId}.md`) && approvedFn(target)) {
      return { ok: true, file: target, checked };
    }
    // 2) 该 session 的活跃计划（<sessionId>.*.md 或 *.md 前缀含 sessionId）
    const active = entries.filter((n) => n.startsWith(`${sessionId}.`));
    for (const n of active) {
      const f = path.join(dir, n);
      checked.push(f);
      if (approvedFn(f)) return { ok: true, file: f, checked };
    }
  }
  // Custom names are eligible only through an explicit current-session review.
  let bound = [];
  try {
    const state = JSON.parse(readFile(path.join(dir, '_review.json'), 'utf-8'));
    bound = (state.entries || []).filter(e => e.schema_version === 2 && e.session_id === sessionId).map(e => e.plan_key);
  } catch {}
  for (const n of entries) {
    const f = path.join(dir, n);
    const key = path.relative(root, f).replace(/\\/g, '/');
    if (bound.includes(key) && approvedFn(f)) return { ok: true, file: f, checked };
  }
  return { ok: false, checked };
}

function normalizeConfig(input) {
  const require = input?.requireFrontmatter && typeof input.requireFrontmatter === "object"
    ? input.requireFrontmatter
    : { status: "approved", human_confirmed: true };
  // human_confirmed 在 config 里可能被 YAML 解析成布尔；统一转成字符串比较。
  const normReq = {};
  for (const [k, v] of Object.entries(require)) normReq[k] = String(v);
  const guardTools = Array.isArray(input?.guardTools) && input.guardTools.length
    ? input.guardTools.filter((s) => typeof s === "string" && s)
    : DEFAULT_GUARD_TOOLS.slice();
  return {
    enabled: input?.enabled ?? true,
    planDir: typeof input?.planDir === "string" && input.planDir ? input.planDir : ".plan",
    guardTools: new Set(guardTools),
    requireFrontmatter: normReq,
    repoRoot: typeof input?.repoRoot === "string" ? input.repoRoot : "",
    // E2 证据章节校验档位：0/未设=不查；2=warn-only 灰度（默认）；1=硬拒。
    enablePlanReviewGuard: Number.isInteger(input?.enablePlanReviewGuard)
      ? input.enablePlanReviewGuard
      : 2,
  };
}

function rejectReason(tool, args, config, found) {
  const f = args?.file_path ?? args?.path ?? "(未知文件)";
  return [
    "[plan-gate] 改动被拒绝：缺少「已审核通过且已人工确认」的 Markdown 计划。",
    `操作：${tool} ${f}`,
    `计划要求：仓库根 ${config.planDir}/<sessionId>.md，frontmatter 需含 ` +
      Object.entries(config.requireFrontmatter).map(([k, v]) => `${k}: ${v}`).join(" 且 ") + "。",
    "正确流程：",
    '  1) 先产出 Markdown 计划（可复制 .plan/TEMPLATE.md），写入 .plan/<sessionId>.md；',
    '  2) 调 orchestrate {op:"plan_review", plan:"<计划正文>"} 交高级模型审核；',
    "  3) 审核 pass 后，用 ask_user_question 让用户人工确认终稿；",
    "  4) 用户确认后把计划 frontmatter 置 status: approved、human_confirmed: true；",
    "  5) 再重试本次改动。",
    found?.checked?.length ? `已检查：${found.checked.join(" , ")}` : "",
  ].filter(Boolean).join("\n");
}

/**
 * E2：读 .plan/_review.json，按当前计划文件的 plan_key + sha256 做复用/轮次/证据校验。
 * 返回 {action: "allow"|"block"|"warn", reason}。fail-safe：文件缺失/损坏一律 block（要求重新过审）。
 * @param {object} p - {root, planDir, planFile, enableGuard, fs}
 */
export function checkReviewState({ root, planDir, planFile, sessionId, enableGuard, fs = {} }) {
  const readFile = fs.readFileSync ?? readFileSync;
  const join = path.join;
  const dir = join(root, planDir || ".plan");
  const reviewPath = join(dir, "_review.json");
  let state;
  try {
    state = JSON.parse(readFile(reviewPath, "utf-8"));
  } catch (e) {
    // 缺失/损坏 → fail-safe block（要求重新过审，绝不静默放行）
    return { action: "block", reason: "review_json_absent_or_corrupt; re-review required" };
  }
  const entries = Array.isArray(state?.entries) ? state.entries : [];
  if (!planFile) return { action: "allow", reason: "no_plan_file" };
  // plan_key = 相对 root 的路径（与 api.py 一致，用 / 分隔）
  let planKey;
  try {
    planKey = path.relative(root, planFile).replace(/\\/g, "/");
  } catch (e) {
    return { action: "allow", reason: "plan_key_derive_failed" };
  }
  // 同 plan_key 的条目（禁跨 key 复用）
  const same = entries.filter((e) => e && e.plan_key === planKey && e.session_id === sessionId && e.schema_version === 2);
  if (!sessionId || !same.length) return { action: 'block', reason: 'no_session_version_review' };
  const latest = same[same.length - 1];
  try {
    const real = fs.realpathSync ?? realpathSync;
    const boundary = real(path.join(root, '.plan'));
    const relative = path.relative(boundary, real(planFile));
    if (!relative || relative.startsWith('..') || path.isAbsolute(relative) || path.dirname(boundary) !== real(root)) throw new Error('outside .plan');
    const text = readFile(planFile, 'utf-8');
    const fm = parseFrontmatter(text);
    if (latest.verdict !== 'pass' || latest.stale || latest.plan_sha256 !== planSha(text) ||
        fm.approved_sha256 !== latest.plan_sha256 || String(fm.approved_version) !== String(latest.version)) {
      return { action: 'block', reason: 'approval_version_mismatch; review and confirm current hash/version' };
    }
  } catch { return { action: 'block', reason: 'invalid_plan_boundary_or_content' }; }
  const round = Number(latest.round) || 0;

  // 读当前计划 frontmatter（risk:high / review_override）
  let fm = {};
  try {
    const txt = readFile(planFile, "utf-8");
    fm = parseFrontmatter(txt);
  } catch (e) {
    fm = {};
  }
  const override = String(fm.review_override || "").toLowerCase() === "true";

  // 轮次上限（按 plan_key 累计 round）
  if (round > 3 && !override) {
    return {
      action: "block",
      reason: `plan-review rounds=${round}>3，已达上限；如确需续审请在计划 frontmatter 置 review_override: true`,
    };
  }
  const roundWarning = round > 2 && !override
    ? `plan-review rounds=${round}>2，请只改结论或有证据的增量点` : '';

  // 证据章节校验（enablePlanReviewGuard: 0/未设=不查; 1=硬拒; 2=warn-only 灰度）
  const g = Number(enableGuard) || 0;
  if (g >= 1) {
    let txt = "";
    try { txt = readFile(planFile, "utf-8"); } catch (e) { txt = ""; }
    const hasEvidenceSection = /^#{1,3}\s*(?:[一二三四五六七八九十]+[、.]?\s*)?已核验事实/m.test(txt);
    const hasFileLine = /[\w./\\-]+\.(py|js|mjs|ts|md|json|sh|ya?ml):\d+/.test(txt);
    if (!hasEvidenceSection || !hasFileLine) {
      const msg = "计划缺「## 已核验事实」章节或缺少 文件:行 证据引用，请先补证据再送审";
      if (g >= 2) return { action: "warn", reason: msg };
      return { action: "block", reason: msg };
    }
  }
  return roundWarning ? {action: 'warn', reason: roundWarning} : { action: "allow", reason: "ok" };
}

/**
 * 纯判定：返回 string=拒绝，null=放行。便于单测。
 */
export function decideInterception({ tool, args, config, sessionId, cwd, fs }) {
  if (!config.enabled) return null;
  if (!config.guardTools.has(tool)) return null;
  if (PLAN_WRITE_TOOLS.has(tool)) return null;
  const root = cwd || config.repoRoot;

  // ── pwsh git 写门控：独立块严格独占 pwsh，所有分支显式 return，绝不落入下方 plan-approval ──
  if (tool === "pwsh") {
    try {
      const command = args?.command;
      const klass = classifyGitCommand(command);
      if (klass === "not-git") return null; // 非 git：放行（零影响）
      if (klass === "unknown") {
        return `[plan-gate] 无法静态判定该 pwsh 命令是否含 git 写操作，保守拒绝。命令：${String(command).slice(0, 200)}`;
      }
      // klass === "write"：需验证凭证
      const base = root || "";
      let marker;
      try {
        marker = JSON.parse(readFileSync(path.join(base, REVIEW_FILE), "utf-8"));
      } catch {
        return "[plan-gate] 检测到 git 写操作，但缺少验证凭证 _review.json（请先经验证门禁 run_full 生成）。";
      }
      if (!marker || marker.verified !== true) {
        return "[plan-gate] 检测到 git 写操作，但验证未通过（verified!=true），拒绝提交/推送。";
      }
      if (reviewPathsInvalid(marker.paths)) {
        return "[plan-gate] 验证凭证 paths 非法（空或含越界路径），拒绝。";
      }
      let recomputed;
      try {
        recomputed = sha256Content(base, marker.paths);
      } catch (e) {
        return `[plan-gate] 凭证哈希重算失败，保守拒绝：${e?.message ?? e}`;
      }
      if (recomputed !== marker.content_sha) {
        return "[plan-gate] 验证后被改动（内容哈希不一致），拒绝 git 写操作，请重新验证。";
      }
      return null; // 凭证有效且未被改动：放行
    } catch (e) {
      return `[plan-gate] pwsh 门禁校验异常，保守拒绝：${e?.message ?? e}`;
    }
  }

  if (!root) return rejectReason(tool, args, config, { checked: [] });
  const found = findApprovedPlan({
    root,
    planDir: config.planDir,
    sessionId,
    require: config.requireFrontmatter,
    fs,
  });
  // E2：计划已 approved 后，再查 _review.json 的轮次/证据（fail-open）
  if (found.ok) {
    const rs = checkReviewState({
      root,
      planDir: config.planDir,
      planFile: found.file,
      sessionId,
      enableGuard: config.enablePlanReviewGuard,
      fs,
    });
    if (rs.action === "block") {
      return `[plan-gate] 计划审核门禁拦截：${rs.reason}`;
    }
    // warn/allow 都放行
    return null;
  }
  return rejectReason(tool, args, config, found);
}

export function apply(ctx, raw) {
  const config = normalizeConfig(raw);
  if (!config.enabled) return;
  const log = typeof ctx?.logger === "function" ? ctx.logger(name) : ctx?.logger;
  log?.warn?.(
    "plan-gate loaded: planDir=%s guardTools=[%s] require=%s",
    config.planDir,
    [...config.guardTools].join(","),
    JSON.stringify(config.requireFrontmatter),
  );

  const disposer = ctx?.tools?.guard?.((exec) => {
    try {
      const sess = exec?.agent?.session?.header;
      const sessionId = sess?.id !== undefined && sess?.id !== null ? String(sess.id) : "";
      const tool = exec?.name;
      const cwd = exec?.cwd ?? sess?.cwd ?? null;
      const hit = decideInterception({
        tool,
        args: exec?.arguments,
        config,
        sessionId,
        cwd,
        fs: {},
      });
      if (hit) {
        log?.warn?.("plan-gate: rejected %s (no approved+confirmed plan)", tool);
        return hit;
      }
    } catch (e) {
      // 出错时保守拒绝改动，避免门禁失效放过未审批改动。
      log?.warn?.("plan-gate error", e);
      return `[plan-gate] 计划门禁校验异常，保守拒绝改动：${e?.message ?? e}`;
    }
    return undefined;
  });
  ctx?.on?.("dispose", () => disposer?.());
  return { config };
}
