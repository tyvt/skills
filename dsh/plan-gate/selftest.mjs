/**
 * plan-gate selftest：E1 无关；覆盖 E2 消费方（checkReviewState / decideInterception 读 _review.json）。
 * 用临时目录，不依赖真实工作区。node selftest.mjs
 */
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { checkReviewState, decideInterception } from "./lib/index.js";

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
  writeFileSync(path.join(root, ".plan", "_review.json"), JSON.stringify({ entries }), "utf-8");
}
const baseFM = "---\nstatus: approved\nhuman_confirmed: true\n---\n";

// 1. 缺失 review.json → allow(fail-open)
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM + "## 二、已核验事实\n- a `x.py:1`\n");
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 2 });
  ok("missing review -> allow", rs.action === "allow");
}

// 2. 损坏 json → allow fail-open
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM);
  writeFileSync(path.join(root, ".plan", "_review.json"), "{bad", "utf-8");
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 2 });
  ok("corrupt review -> allow", rs.action === "allow");
}

// 3. round=2 → allow
{
  const root = mkRepo();
  const planFile = writePlan(root, "s1.md", baseFM);
  writeReview(root, [{ plan_key: ".plan/s1.md", round: 2, ts: "t1", verdict: "reject" }]);
  const rs = checkReviewState({ root, planDir: ".plan", planFile, enableGuard: 0 });
  ok("round 2 -> allow", rs.action === "allow");
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
  ok("round 5 + risk high -> allow", rs.action === "allow");
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
  ok("cross plan_key no reuse", rs.action === "allow");
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

console.log(`\nplan-gate selftest: ${fail === 0 ? "ALL PASS" : "FAIL"} passed=${pass} failed=${fail}`);
process.exit(fail === 0 ? 0 : 1);
