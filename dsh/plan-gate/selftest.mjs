/**
 * plan-gate selftest：E1 无关；覆盖 E2 消费方（checkReviewState / decideInterception 读 _review.json）。
 * 用临时目录，不依赖真实工作区。node selftest.mjs
 */
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { checkReviewState as checkState, decideInterception, planSha, classifyGitCommand, sha256Content } from "./lib/index.js";
const checkReviewState = args => checkState({ sessionId: 's1', ...args });

let pass = 0, fail = 0;
function ok(name, cond) {
  if (cond) { pass++; console.log("PASS", name); }
  else { fail++; console.log("FAIL", name); }
}

function mkRepo() {
  const root = mkdtempSync(path.join(tmpdir(), "plangate-"));
  mkdirSync(path.join(root, ".plan"), { recursive: true });
  return root;
}
function writePlan(root, name, content) {
  const f = path.join(root, ".plan", name);
  writeFileSync(f, content, "utf-8");
  return f;
}
function writeReview(root, entries) {
  entries = entries.map(entry => {
    const file = path.join(root, entry.plan_key);
    let text;
    try { text = readFileSync(file, 'utf8'); } catch { return entry; }
    const sha = planSha(text);
    text = text.replace('---\n', `---\napproved_sha256: ${sha}\napproved_version: 1\n`);
    writeFileSync(file, text);
    return { schema_version: 2, session_id: path.basename(file, '.md'), version: 1, plan_sha256: sha, verdict: 'pass', ...entry };
  });
  writeFileSync(path.join(root, ".plan", "_review.json"), JSON.stringify({ entries }), "utf-8");
}
const baseFM = "---\nstatus: approved\nhuman_confirmed: true\n---\n";

// 1. 缺失 review.json → allow(fail-open)
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM + "## 二、已核验事实\n- a `x.py:1`\n");
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 2 });
  ok("missing review -> block", rs.action === "block");
}

// 2. 损坏 json → allow fail-open
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM);
  writeFileSync(path.join(root, ".plan", "_review.json"), "{bad", "utf-8");
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 2 });
  ok("corrupt review -> block", rs.action === "block");
}

// 3. round=2 → allow
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM);
  writeReview(root, [{ plan_key: ".plan/s1.md", round: 2, ts: "t1", verdict: "reject" }]);
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 0 });
  ok("latest reject -> block", rs.action === "block");
}

// 4. round=3 → warn (不阻断)
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM);
  writeReview(root, [{ plan_key: ".plan/s1.md", round: 3, ts: "t1" }]);
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 0 });
  ok("round 3 -> warn", rs.action === "warn");
}

// 5. round=5 → block
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM);
  writeReview(root, [{ plan_key: ".plan/s1.md", round: 5, ts: "t1" }]);
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 0 });
  ok("round 5 -> block", rs.action === "block");
}

// 6. round=5 + review_override → allow
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", "---\nstatus: approved\nhuman_confirmed: true\nreview_override: true\n---\n");
  writeReview(root, [{ plan_key: ".plan/s1.md", round: 5, ts: "t1" }]);
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 0 });
  ok("round 5 + override -> allow", rs.action === "allow");
}

// 7. round=5 + risk:high → allow
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", "---\nstatus: approved\nhuman_confirmed: true\nrisk: high\n---\n");
  writeReview(root, [{ plan_key: ".plan/s1.md", round: 5, ts: "t1" }]);
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 0 });
  ok("round 5 + risk high -> block", rs.action === "block");
}

// 8. 证据缺失 enableGuard=1 → block
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM + "## 一、前言\n无证据\n");
  writeReview(root, [{ plan_key: ".plan/s1.md", round: 1, ts: "t1" }]);
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 1 });
  ok("no evidence guard=1 -> block", rs.action === "block");
}

// 9. 证据缺失 enableGuard=2 → warn
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM + "无证据\n");
  writeReview(root, [{ plan_key: ".plan/s1.md", round: 1, ts: "t1" }]);
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 2 });
  ok("no evidence guard=2 -> warn", rs.action === "warn");
}

// 10. 有证据 + file:line → allow
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM + "## 二、已核验事实\n- `a.py:12` x\n");
  writeReview(root, [{ plan_key: ".plan/s1.md", round: 1, ts: "t1", verdict: "pass" }]);
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 1 });
  ok("evidence present -> allow", rs.action === "allow");
}

// 11. 跨 plan_key 不复用：s2 有 entry，s1 无 → s1 allow(no_entry)
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM);
  writeReview(root, [{ plan_key: ".plan/s2.md", round: 5, ts: "t1" }]);
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 0 });
  ok("cross plan_key no reuse", rs.action === "block");
}

// 12. decideInterception：计划 approved + round=5 → 拦截
{
  const root = mkRepo();
  writePlan(root, "sess1.md", baseFM);
  writeReview(root, [{ plan_key: ".plan/sess1.md", round: 5, ts: "t1" }]);
  const config = {
    enabled: true, planDir: ".plan", guardTools: new Set(["edit"]),
    requireFrontmatter: { status: "approved", human_confirmed: "true" },
    repoRoot: "", enablePlanReviewGuard: 0,
  };
  const r = decideInterception({ tool: "edit", args: { file_path: "x.js" }, config, sessionId: "sess1", cwd: root, fs: {} });
  ok("decideInterception round>4 -> block string", typeof r === "string" && r.includes("拦截"));
}

// 13. decideInterception：计划 approved 且 review 正常 → null 放行
{
  const root = mkRepo();
  writePlan(root, "sess2.md", baseFM);
  writeReview(root, [{ plan_key: ".plan/sess2.md", round: 1, ts: "t1", verdict: "pass" }]);
  const config = {
    enabled: true, planDir: ".plan", guardTools: new Set(["edit"]),
    requireFrontmatter: { status: "approved", human_confirmed: "true" },
    repoRoot: "", enablePlanReviewGuard: 0,
  };
  const r = decideInterception({ tool: "edit", args: { file_path: "x.js" }, config, sessionId: "sess2", cwd: root, fs: {} });
  ok("decideInterception normal -> null", r === null);
}

// Round four boundary; round warnings cannot bypass evidence checks.
for (const risk of ['', 'risk: high\n']) {
  const root = mkRepo();
  const file = writePlan(root, 's1.md', baseFM.replace('status:', risk + 'status:'));
  writeReview(root, [{plan_key: '.plan/s1.md', round: 4}]);
  ok(`round 4 ${risk ? 'high risk' : 'normal'} -> block`, checkReviewState({root, planFile: file, enableGuard: 0}).action === 'block');
}
{
  const root = mkRepo();
  const file = writePlan(root, 's1.md', baseFM + 'No evidence');
  writeReview(root, [{plan_key: '.plan/s1.md', round: 3}]);
  const result = checkReviewState({root, planFile: file, enableGuard: 1});
  ok('round 3 missing evidence still blocks', result.action === 'block' && result.reason.includes('已核验事实'));
}

// Version/session binding and stale confirmation regressions.
{
  const root = mkRepo();
  const file = writePlan(root, 's1.md', baseFM + '## 已核验事实\n- a.py:1\noriginal');
  writeReview(root, [{ plan_key: '.plan/s1.md', round: 1 }]);
  ok('bound current version passes', checkReviewState({root, planFile: file}).action === 'allow');
  ok('foreign session blocked', checkState({root, planFile: file, sessionId: 'other'}).action === 'block');
  writeFileSync(file, readFileSync(file, 'utf8').replace('original', 'changed'));
  ok('changed content invalidates confirmation', checkReviewState({root, planFile: file}).action === 'block');
  const config = {enabled: true, planDir: '.plan', guardTools: new Set(['edit']), requireFrontmatter: {status: 'approved', human_confirmed: 'true'}};
  ok('no foreign plan fallback', typeof decideInterception({root, cwd: root, sessionId: 'other', tool: 'edit', config}) === 'string');
  ok('approval-only changes preserve digest', planSha(baseFM + 'x') === planSha(baseFM.replace('approved', 'draft').replace('true', 'false') + 'x'));
}

// ── git 写门控（验证凭证）测试 ──────────────────────────────────────────────
const gitConfig = () => ({
  enabled: true, planDir: ".plan", guardTools: new Set(["edit", "pwsh"]),
  requireFrontmatter: { status: "approved", human_confirmed: "true" },
  repoRoot: "", enablePlanReviewGuard: 0,
});
// 造一个 workdir（含 .plan/），按真实文件写 _review.json 凭证
function mkWorkWithMarker(files, opts = {}) {
  const root = mkdtempSync(path.join(tmpdir(), "plangate-git-"));
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(root, rel);
    mkdirSync(path.dirname(full), { recursive: true });
    writeFileSync(full, content, opts.encoding || "utf-8");
  }
  const paths = opts.paths ?? Object.keys(files).filter((p) => path.basename(p) !== "_review.json");
  const sha = opts.sha ?? sha256Content(root, paths);
  const marker = opts.marker ?? { verified: opts.verified ?? true, session_id: "s1", run_ts: 1, paths, content_sha: sha, reason: "", gaps: [] };
  writeFileSync(path.join(root, "_review.json"), JSON.stringify(marker), "utf-8");
  return root;
}
const gitCall = (root, command) => decideInterception({ tool: "pwsh", args: { command }, config: gitConfig(), sessionId: "s1", cwd: root, fs: {} });

// A. 非 git pwsh → 放行
ok("pwsh pytest -> not-git allow", classifyGitCommand("pytest -q") === "not-git");
ok("pwsh node --check -> not-git allow", classifyGitCommand("node --check a.js") === "not-git");
ok("pwsh pytest intercepted null", gitCall(mkWorkWithMarker({ "a.txt": "x" }), "pytest -q") === null);

// B. git 读命令 → 放行
for (const c of ["git status", "git log --oneline", "git diff HEAD", "git show HEAD", "git branch", "git remote -v", "git rev-parse HEAD"]) {
  ok(`git read allow: ${c}`, classifyGitCommand(c) === "not-git");
}

// C. git 写命令 → write 需凭证
for (const c of ["git commit -m x", "git push", "git tag v1", "git reset --hard", "git clean -fd", "git restore .", "git switch main", "git checkout main", "git branch -D x", "git branch newname", "git remote add o u", "git -C repo commit", "git.exe commit", "git -c user.name=x push"]) {
  ok(`git write -> write: ${c}`, classifyGitCommand(c) === "write");
}

// D. 5 大子命令（含 reset 无参）统一拦
for (const c of ["git reset", "git clean", "git restore", "git switch", "git checkout"]) {
  ok(`git 5-sub write: ${c}`, classifyGitCommand(c) === "write");
}

// E. unknown（无法静态判定）→ unknown
for (const c of ["git pull", "git fetch", "& $env:GIT_BIN commit", "git notes add", "iex 'git commit'", "cmd /c git commit", "git"]) {
  ok(`unknown: ${c}`, classifyGitCommand(c) === "unknown");
}
ok("unknown overrides write (commit;pull)", classifyGitCommand("git commit; git pull") === "unknown");
ok("pytest; git commit -> write", classifyGitCommand("pytest; git commit") === "write");
ok("non-string command -> unknown", classifyGitCommand(undefined) === "unknown");

// F. 凭证校验：write 分支
{
  const root = mkWorkWithMarker({ "a.txt": "hello" }, { paths: ["a.txt"] });
  ok("git commit with valid marker -> allow", gitCall(root, "git commit -m x") === null);
}
{
  const root = mkWorkWithMarker({ "a.txt": "hello" });
  ok("git commit missing marker -> reject", typeof (() => { const r = mkdtempSync(path.join(tmpdir(), "pg-")); writeFileSync(path.join(r, "a.txt"), "x"); return gitCall(r, "git commit -m x"); })() === "string");
}
{
  const root = mkWorkWithMarker({ "a.txt": "hello" }, { verified: false });
  ok("git commit verified:false -> reject", typeof gitCall(root, "git commit -m x") === "string");
}
{
  // 验证后改文件字节 → 拒
  const root = mkWorkWithMarker({ "a.txt": "hello" }, { paths: ["a.txt"] });
  writeFileSync(path.join(root, "a.txt"), "CHANGED");
  ok("git commit after-edit hash mismatch -> reject", typeof gitCall(root, "git commit -m x") === "string");
}
{
  // paths 空 → 拒
  const root = mkWorkWithMarker({ "a.txt": "hi" }, { paths: [], sha: sha256Content(mkdtempSync(path.join(tmpdir(), "x-")), []) });
  ok("git commit empty paths -> reject", typeof gitCall(root, "git commit -m x") === "string");
}
{
  // paths 越界 → 拒
  const root = mkWorkWithMarker({ "a.txt": "hi" }, { paths: ["../evil"], sha: "deadbeef" });
  ok("git commit traversal paths -> reject", typeof gitCall(root, "git commit -m x") === "string");
}
{
  // unknown 走拒，不做凭证
  const root = mkWorkWithMarker({ "a.txt": "hi" }, { paths: ["a.txt"] });
  ok("git pull unknown -> reject even with valid marker", typeof gitCall(root, "git pull") === "string");
}

// G. _review.json 自排除 + 哈希算法对齐（含空格/删除哨兵/CRLF）
{
  const root = mkWorkWithMarker({ "a b.txt": "x", "sub\\c.txt": "y" }, { paths: ["a b.txt", "sub/c.txt", "_review.json"] });
  // 含 _review.json 时会被剔除，sha 只依 a b.txt / sub/c.txt
  const shaWithoutReview = sha256Content(root, ["a b.txt", "sub/c.txt"]);
  const shaWithReview = sha256Content(root, ["a b.txt", "sub/c.txt", "_review.json"]);
  ok("sha256Content excludes _review.json", shaWithoutReview === shaWithReview);
  ok("git commit with space-path valid marker -> allow", gitCall(root, "git commit -m x") === null);
}
{
  // DELETED 哨兵：paths 里含不存在文件，读失败用 <DELETED>
  const root = mkWorkWithMarker({ "a.txt": "hi" }, { paths: ["a.txt", "gone.txt"] });
  ok("marker with deleted-file path still computable", typeof sha256Content(root, ["a.txt", "gone.txt"]) === "string");
}

console.log(`\nplan-gate selftest: ${fail === 0 ? "ALL PASS" : "FAIL"} passed=${pass} failed=${fail}`);
process.exit(fail === 0 ? 0 : 1);