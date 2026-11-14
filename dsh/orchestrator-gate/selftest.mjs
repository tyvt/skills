/**
 * orchestrator-gate 函数级自测。规则开关硬编码，测试里临时翻转 RULES 后复原。
 * 跑：node selftest.mjs
 */
import assert from "node:assert/strict";
import {
  RULES, decideInterception, splitSegments, tokenize, classifyBuild, classifyBilling,
  pathInSessions, apply, rulesFingerprint, classifyFanout, normalizeConfig,
} from "./lib/index.js";

const CFG = {
  repoRoots: ["D:\\repository\\skills"],
  moduleRoots: ["src/views/", "dsh/"],
  grepMinDepth: 2,
  grepFailClosedWhenNoRepoRoot: false,
  wholeReadBytesVue: 61440,
  wholeReadBytesOther: 40960,
};
const CWD = "D:\\repository\\skills";
const FILE = "D:\\repository\\skills\\dsh\\orchestrator-gate\\lib\\index.ts";
let rseq = 0;
const rp = () => `${FILE}\\f${rseq++}.ts`; // 每次整读用不同路径，避开整读去重
const files = new Set([FILE.toLowerCase(), FILE.replace(/\\/g,"/").toLowerCase()]);
const fsImpl = {
  statSync(p) {
    const hit = files.has(String(p).replaceAll("/", "\\").toLowerCase());
    return { isFile: () => hit, size: hit ? 1000 : 0 };
  },
};

let n = 0;
function check(name, got, want) {
  n++;
  const blocked = typeof got === "string";
  assert.equal(blocked, want, `${name}: expected ${want ? "block" : "pass"}, got ${blocked ? "block" : "pass"}`);
}
function eq(got, want, msg) { n++; assert.equal(got, want, msg); }
function am(got, re, msg) { n++; assert.match(got, re, msg); }
function ok(cond, msg) { n++; assert.ok(cond, msg); }
function withRules(over, fn) {
  const prev = {};
  for (const k of Object.keys(over)) {
    prev[k] = RULES[k];
    Object.defineProperty(RULES, k, { value: over[k], writable: false, configurable: true });
  }
  try { fn(); } finally {
    for (const k of Object.keys(prev)) Object.defineProperty(RULES, k, { value: prev[k], writable: false, configurable: true });
  }
}
const decide = (tool, args, extra = {}) => decideInterception({
  tool, args, config: CFG, cwd: CWD, fsImpl, ...extra,
});

// --- 切段 / 切词 ---
assert.deepEqual(splitSegments('echo "a && b"; npm run build'), ["echo \"a && b\"", "npm run build"]);
assert.deepEqual(tokenize('npm run "build"'), ["npm", "run", "build"]);
assert.deepEqual(splitSegments("echo \"cd .sessions && cat bill.json\""), ["echo \"cd .sessions && cat bill.json\""]);
assert.equal(pathInSessions("D:\\repository\\skills\\.sessions\\x"), true);
assert.equal(pathInSessions("D:\\repository\\skills\\.sessions_backup\\x"), false);

// --- S1 build/lint ---
withRules({ blockBuildLint: true }, () => {
  const shell = (command) => decide("pwsh", { command });
  const block = [
    ["cd src && npm run build", "cd then build"],
    ["Set-Location x; pnpm lint", "set-location lint"],
    ['npm run "build"', "quoted build"],
    ['npx "eslint" .', "eslint dot"],
    ["npm run build:app", "build: variant"],
    ["pnpm run lint:fix", "lint: variant"],
    ["vite build --mode prod", "vite build"],
    ["npx eslint", "eslint no args"],
    ["npx eslint src/**/*.ts", "eslint glob"],
    [`npx eslint ${FILE.replace(/\\/g, "/")} other`, "eslint extra"],
    ["tsc", "bare tsc"],
    ["tsc --noEmit", "bare noEmit"],
    ["tsc -p tsconfig.json", "project"],
    ["tsc --build", "tsc --build"],
    ["vue-tsc --noEmit", "bare vue-tsc"],
    ["npm run build -- --version", "script version arg"],
    [`cd packages/app && npx eslint src/foo.ts`, "cd relative eslint"],
    [`tsc ${FILE} `, "single file compile without noEmit"],
    ["bun run build", "bun run build"],
    ["bun run lint:fix", "bun run lint variant"],
    ["bunx eslint", "bunx eslint no args"],
    ["bun x eslint src/**/*.ts", "bun x eslint glob"],
  ];
  for (const [c, name] of block) check(name, shell(c), true);

  const pass = [
    ['echo "npm run build"', "echo"],
    ['git commit -m "npm run build \u62a5\u9519"', "git message"],
    ['grep "build" log', "grep build"],
    ['Write-Output "a|b"', "write-output pipe char"],
    ["pnpm run rebuild", "rebuild"],
    ["eslint --version", "eslint version"],
    ["tsc --help", "tsc help"],
    ["npx --version", "npx version"],
    ["npx eslint --version", "npx eslint version"],
    ["vite dev", "vite dev"],
    ["npm run dev", "dev"],
    [`npx eslint ${FILE}`, "single file eslint"],
    [`tsc ${FILE} --noEmit`, "single file tsc"],
    ["Get-ChildItem", "listing"],
    // typecheck 是验证安全网，不纳入全量拦截（见 index.js FULL_SCRIPTS 注释）
    ["bun run typecheck", "bun run typecheck passes"],
    ["bun typecheck", "bun bare typecheck passes"],
    ["bun run type-check", "bun type-check passes"],
    ["bun tsc", "bun bare tsc passes"],
    ["bun run typecheck -- --watch", "bun typecheck extra arg passes"],
    ["npm run typecheck", "npm run typecheck passes"],
    ["pnpm typecheck", "pnpm bare typecheck passes"],
    ["bun run dev", "bun dev"],
    ["bun install", "bun install"],
    ["bun add lodash", "bun add"],
    ["bun --version", "bun version"],
    ["bun pm ls", "bun pm ls"],
    ["bun rebuild", "bun rebuild"],
    ["bun run test", "bun test"],
    [`bunx eslint ${FILE}`, "bunx eslint single file"],
  ];
  for (const [c, name] of pass) check(name, shell(c), false);

  // statSync 抛异常 → 拦
  const boom = { statSync() { throw new Error("nope"); } };
  check("stat throws", decide("pwsh", { command: `npx eslint ${FILE}` }, { fsImpl: boom }), true);
});

// --- S4 外壳包装：放行 + 计数 ---
withRules({ blockBuildLint: true }, () => {
  for (const c of ["& npm run build", 'cmd /c "npm run build"', 'pwsh -Command "npm run build"', ".\\build.ps1"]) {
    const bag = { shellWrapped: 0 };
    const got = decide("pwsh", { command: c }, { bag });
    check(`wrap pass ${c}`, got, false);
    assert.ok(bag.shellWrapped >= 1, `wrap counted ${c}`);
  }
});

// --- S2 账单 / .sessions ---
withRules({ blockBillingBypass: true }, () => {
  const shell = (command, extra = {}) => decide("pwsh", { command }, extra);
  const block = [
    ["python cost_bill.py", "run bill"],
    ["cat .sessions/bill.json", "cat sessions"],
    ["Select-String x .sessions", "select sessions"],
    ["grep \"bill\" .sessions/", "grep sessions"],
    ["cd .sessions && cat bill.json", "cd then cat"],
    ["cd .sessions && cd sub && cat bill.json", "cd sub"],
    ["cd .sessions/sub && cat bill.json", "cd relative sub"],
    ['find . -name "cost_bill.py" -exec python {} \\;', "find exec"],
    ["Get-ChildItem | ForEach-Object { python cost_bill.py }", "foreach"],
  ];
  for (const [c, name] of block) check(name, shell(c), true);

  const pass = [
    ["echo cost_bill.py", "echo bill"],
    ['git commit -m "cost_bill.py"', "git bill"],
    ['Write-Output "see cost_bill.py"', "write bill"],
    ['find . -name "cost_bill.py"', "find name"],
    ['Get-ChildItem -Filter "cost_bill.py"', "gci filter"],
    ['echo "cd .sessions && cat bill.json"', "quoted cd"],
    ["cd .sessions && cd .. && cat bill.json", "cd out"],
    ['Get-ChildItem | Where-Object { $_.Name -eq "cost_bill.py" }', "where script"],
    ['Get-ChildItem -Recurse | Where-Object Name -eq "cost_bill.py"', "where prop"],
    ['grep "cost_bill.py" logs/', "grep filename"],
  ];
  for (const [c, name] of pass) check(name, shell(c), false);

  // exec.cwd 在子目录
  check("cwd sub", shell("cd .sessions && cat bill.json", { cwd: "D:\\repository\\skills\\sub" }), true);
});

// --- grep §3.2（默认开关）---
check("grep default", decide("grep", {}), true);
check("grep empty", decide("grep", { path: "" }), true);
check("grep dot", decide("grep", { path: "." }), true);
check("grep root", decide("grep", { path: CWD }), true);
check("grep depth1", decide("grep", { path: "D:\\repository\\skills\\pkg" }), true);
check("grep module", decide("grep", { path: "D:\\repository\\skills\\dsh\\orchestrator-gate" }), false);
check("grep whitelist", decide("grep", { path: "D:\\repository\\skills\\src\\views" }), false);
check("grep include still root", decide("grep", { include: "*.ts" }), true);
{
  const bag = { errors: 0 };
  check("grep no root relative", decide("grep", { path: "src/foo" }, { cwd: null, config: { ...CFG, repoRoots: [] }, bag }), false);
  assert.equal(bag.errors, 1);
}
check("grep drive root", decide("grep", { path: "D:\\" }), true);

// --- 全项目覆盖：任意 cwd 下都按仓库根判定，不再依赖 repoRoots 白名单 ---
{
  const other = "D:\\repository\\苏住房G";
  const cfgNoRoots = { ...CFG, repoRoots: [] };
  check("grep other project root (cwd)", decide("grep", { path: other }, { cwd: other, config: cfgNoRoots }), true);
  check("grep other project default", decide("grep", {}, { cwd: other, config: cfgNoRoots }), true);
  check("grep other project dot", decide("grep", { path: "." }, { cwd: other, config: cfgNoRoots }), true);
  check("grep other project depth1", decide("grep", { path: "D:\\repository\\苏住房G\\src" }, { cwd: other, config: cfgNoRoots }), true);
  check("grep other project deep ok", decide("grep", { path: "D:\\repository\\苏住房G\\src\\views\\home" }, { cwd: other, config: cfgNoRoots }), false);
  check("grep other project relative root", decide("grep", { path: "src" }, { cwd: other, config: cfgNoRoots }), true);
}

// --- read §3.3 ---
withRules({ blockWholeRead: true }, () => {
  const big = { statSync: () => ({ size: 90_000, isFile: () => true }) };
  const small = { statSync: () => ({ size: 100, isFile: () => true }) };
  check("read big", decide("read", { file_path: rp() }, { fsImpl: big }), true);
  check("read ranged", decide("read", { file_path: FILE, offset: 1, limit: 50 }, { fsImpl: big }), false);
  check("read small", decide("read", { file_path: rp() }, { fsImpl: small }), false);
  check("read relative", decide("read", { file_path: "lib/index.js" }, { fsImpl: big }), false);
  check("read dedup", decide("read", { file_path: rp() }, { alreadyWholeRead: true, fsImpl: small }), true);
  const vue = "D:\\repository\\skills\\dsh\\x.vue";
  check("vue under", decide("read", { file_path: vue }, { fsImpl: { statSync: () => ({ size: 50_000, isFile: () => true }) } }), false);
  check("vue over", decide("read", { file_path: vue }, { fsImpl: { statSync: () => ({ size: 70_000, isFile: () => true }) } }), true);
});

// --- 放行：orchestrate / 子 ctx / 默认关 ---
check("orchestrate", decide("orchestrate", { op: "full", request: "npm run build" }), false);
check("subagent", decide("pwsh", { command: "npm run build" }, { isSubagent: true }), false);
check("build on by default (npm run build blocks)", decide("pwsh", { command: "npm run build" }), true);
// 计划门禁：首次 edit/write 无计划 → 拦；有 todo_write 计划 → 放行。
check("edit without plan blocked", decide("edit", { file_path: rp() }, { hasPlan: false }), true);
check("write without plan blocked", decide("write", { file_path: FILE, content: "x" }, { hasPlan: false }), true);
check("edit with plan passes", decide("edit", { file_path: rp() }, { hasPlan: true }), false);
check("write with plan passes", decide("write", { file_path: FILE, content: "x" }, { hasPlan: true }), false);
// todo_write 本身永不被计划门禁拦（它是出计划的手段）。
check("todo_write never blocked", decide("todo_write", { todos: [] }, { hasPlan: false }), false);
// 关闭该规则时 edit/write 恢复放行。
withRules({ blockEditWithoutPlan: false }, () => {
  check("edit passes when rule off", decide("edit", { file_path: rp() }, { hasPlan: false }), false);
});

// bash 字段缺失只计 uncovered
{
  const bag = { uncovered: 0 };
  check("bash no field", decide("bash", { line: "npm run build" }, { bag }), false);
  assert.equal(bag.uncovered, 1);
}

// --- apply：记忆集按会话隔离，被拦的不记 ---
withRules({ blockWholeRead: true }, () => {
  const guarded = [];
  const ctx = {
    tools: { guard(fn) { guarded.push(fn); return () => {}; } },
    on() {},
    logger: { warn() {} },
  };
  const counters = { rejected: 0, errors: 0, shellWrapped: 0, uncovered: 0 };
  const out = apply(ctx, { ...CFG, enabled: true }, { counters });
  const exec = (id, file, extra = {}) => guarded[0]({
    name: "read",
    arguments: { file_path: file, ...extra },
    agent: { session: { header: { id, delegationDepth: 0, cwd: CWD } } },
  });
  const small = FILE;
  assert.equal(exec("s1", small), undefined);
  const second = exec("s1", small);
  assert.equal(typeof second, "string");
  assert.match(second, /已整读/);
  assert.equal(exec("s2", small), undefined, "other session not polluted");
  assert.equal(out.sessionWholeReads.get("s1").has(small), true);
  assert.equal(counters.rejected, 1);
});

// --- apply：计划门禁按会话跟踪（todo_write 后 edit 放行）---
withRules({ blockEditWithoutPlan: true }, () => {
  const guarded = [];
  const ctx = {
    tools: { guard(fn) { guarded.push(fn); return () => {}; } },
    on() {},
    logger: { warn() {} },
  };
  const out = apply(ctx, { ...CFG, enabled: true }, {});
  const exec = (id, name, args) => guarded[0]({
    name, arguments: args,
    agent: { session: { header: { id, delegationDepth: 0, cwd: CWD } } },
  });
  // 首次编辑无计划 → 拦。
  const firstEdit = exec("a", "edit", { file_path: FILE, old_string: "x", new_string: "y" });
  assert.equal(typeof firstEdit, "string", "edit blocked before plan");
  assert.match(firstEdit, /必须先出计划/);
  // 其它会话不受影响（仍拦）。
  assert.equal(typeof exec("b", "edit", { file_path: FILE, old_string: "x", new_string: "y" }), "string");
  // 调 todo_write 出计划后，同会话 edit 放行。
  assert.equal(exec("a", "todo_write", { todos: [{ content: "改样式", status: "in_progress" }] }), undefined);
  assert.equal(out.sessionHasPlan.get("a"), true);
  assert.equal(exec("a", "edit", { file_path: FILE, old_string: "x", new_string: "y" }), undefined, "edit allowed after plan");
  assert.equal(exec("a", "write", { file_path: FILE, content: "z" }), undefined, "write allowed after plan");
});

// --- fanout：classifyFanout 纯函数（用例 1/2/12 部分）---
{
  eq(classifyFanout("read", 4, 5), null, "case1: streak<threshold passes");
  const t5 = classifyFanout("read", 5, 5);
  am(t5, /已连续 5 次 read/, "case2: message contains count+tool");
  am(t5, /阈值 5/, "case2: message contains threshold");
  am(t5, /spawn_teammate/, "case2: message suggests fanout");
  am(classifyFanout("grep", 5, 5), /已连续 5 次 grep/, "case11 partial");
  eq(classifyFanout("read", 5, 2), null, "threshold<3 guard");
  eq(classifyFanout("read", "5", 5), null, "non-int streak guard");
}

// --- fanout：normalizeConfig 阈值契约（用例 9）---
{
  for (const bad of [0, 2, "x", 3.5, -1, "5", null, undefined, "3"]) {
    eq(normalizeConfig({ fanoutStreakThreshold: bad }).fanoutStreakThreshold, 5, `case9: ${String(bad)} -> 5`);
  }
  eq(normalizeConfig({ fanoutStreakThreshold: 8 }).fanoutStreakThreshold, 8, "case8: 8 valid");
  eq(normalizeConfig({ fanoutStreakThreshold: 3 }).fanoutStreakThreshold, 3, "3 is min valid");
}

// --- fanout：apply 会话级连击（用例 1-6/8/10/11/13 系列）---
function fanoutHarness(cfgExtra = {}, rulesOver = {}) {
  const guarded = [];
  const ctx = {
    tools: { guard(fn) { guarded.push(fn); return () => {}; } },
    on() {},
    logger: { warn() {} },
  };
  const counters = { rejected: 0, errors: 0, shellWrapped: 0, uncovered: 0, rejectedByTool: {} };
  const out = apply(ctx, { ...CFG, enabled: true, ...cfgExtra }, { counters });
  const call = (id, name, args = {}, depth = 0) => guarded[0]({
    name, arguments: args,
    agent: { session: { header: { id, delegationDepth: depth, cwd: CWD } } },
  });
  return { out, counters, call, rp };
}

withRules({ blockSerialFanout: true }, () => {
  // 用例 1+2：read 整读连续 4 次放行、第 5 次拒绝
  {
    const { counters, call, rp } = fanoutHarness();
    for (let i = 0; i < 4; i++) {
      eq(call("s1", "read", { file_path: rp() }), undefined, "case1: 4th whole read passes");
    }
    const fifth = call("s1", "read", { file_path: rp() });
    eq(typeof fifth, "string", "case2: 5th whole read rejected");
    am(fifth, /spawn_teammate/, "case2: message suggests fanout");
    eq(counters.rejectedByTool.read, 1, "counters.rejectedByTool.read == 1");
  }
  // 用例 3：拒绝后重置，再连续 4 次放行
  {
    const { call, rp } = fanoutHarness();
    for (let i = 0; i < 5; i++) call("s1", "read", { file_path: rp() }); // 第 5 次被拒并清零
    for (let i = 0; i < 4; i++) {
      eq(call("s1", "read", { file_path: rp() }), undefined, "case3: after reset 4 passes");
    }
    eq(typeof call("s1", "read", { file_path: rp() }), "string", "case3: 5th again rejected");
  }
  // 用例 4：中间插 edit 清零重计（todo_write 先出计划让 edit 放行）
  {
    const { call, rp } = fanoutHarness();
    for (let i = 0; i < 4; i++) call("s1", "read", { file_path: rp() });
    call("s1", "todo_write", { todos: [{ content: "x", status: "in_progress" }] });
    call("s1", "edit", { file_path: FILE, old_string: "a", new_string: "b" }); // 清零两槽
    eq(call("s1", "read", { file_path: rp() }), undefined, "case4: edit resets read streak");
    for (let i = 0; i < 3; i++) call("s1", "read", { file_path: rp() });
    eq(typeof call("s1", "read", { file_path: rp() }), "string", "case4: streak restarted from 1");
  }
  // 用例 5（判别性）：read 整读×4 → grep×1 → read 整读第 5 次 → 拒绝（分槽计数）
  {
    const { call, rp } = fanoutHarness();
    for (let i = 0; i < 4; i++) call("s1", "read", { file_path: rp() });
    eq(call("s1", "grep", { pattern: "x", path: CWD + "\\dsh\\orchestrator-gate" }), undefined, "case5: 1st grep passes");
    eq(typeof call("s1", "read", { file_path: rp() }), "string", "case5: 5th read rejected (per-slot)");
  }
  // 用例 6：整读×4 → offset≥1&limit≥1 分页读×3 豁免 → 第 5 次整读拒绝
  {
    const { call, rp } = fanoutHarness();
    for (let i = 0; i < 4; i++) call("s1", "read", { file_path: rp() });
    for (let i = 0; i < 3; i++) {
      eq(call("s1", "read", { file_path: rp(), offset: 2, limit: 50 }), undefined, "case6: paged read exempt");
    }
    eq(typeof call("s1", "read", { file_path: rp() }), "string", "case6: 5th whole read rejected");
  }
  // 用例 6b（负例）：offset=0 / limit=0 / offset-only / 非整数 → 按整读计数（先触发一次拒绝清零，再重新数满 5）
  {
    const { call, rp } = fanoutHarness();
    eq(call("s1", "read", { file_path: rp(), offset: 0, limit: 50 }), undefined, "case6b: offset=0 counts (1)");
    eq(call("s1", "read", { file_path: rp(), offset: 2, limit: 0 }), undefined, "case6b: limit=0 counts (2)");
    eq(call("s1", "read", { file_path: rp(), offset: 2 }), undefined, "case6b: offset-only counts (3)");
    eq(call("s1", "read", { file_path: rp(), offset: "2", limit: 50 }), undefined, "case6b: non-int offset counts (4)");
    eq(typeof call("s1", "read", { file_path: rp(), offset: 0, limit: 50 }), "string", "case6b: 4 invalid variants counted as whole reads -> 5th rejects");
  }
  // 用例 7：子代理（delegationDepth=1）整读×10 全放行（豁免，不计数）
  {
    const { call, rp } = fanoutHarness();
    for (let i = 0; i < 10; i++) {
      eq(call("sub", "read", { file_path: rp() }, 1), undefined, "case7: subagent whole reads pass");
    }
  }
  // 用例 8：threshold=8 生效
  {
    const { call, rp } = fanoutHarness({ fanoutStreakThreshold: 8 });
    for (let i = 0; i < 7; i++) {
      eq(call("s1", "read", { file_path: rp() }), undefined, "case8: 7 passes at threshold 8");
    }
    eq(typeof call("s1", "read", { file_path: rp() }), "string", "case8: 8th rejected");
  }
  // 用例 10：orchestrate 清零两槽
  {
    const { call, rp } = fanoutHarness();
    for (let i = 0; i < 4; i++) call("s1", "read", { file_path: rp() });
    call("s1", "orchestrate", { op: "full", request: "x" });
    eq(call("s1", "read", { file_path: rp() }), undefined, "case10: orchestrate resets");
    for (let i = 0; i < 3; i++) call("s1", "read", { file_path: rp() });
    eq(typeof call("s1", "read", { file_path: rp() }), "string", "case10: streak restarted");
  }
  // 用例 11：grep 独立触发，read 槽不受影响
  {
    const { call, rp } = fanoutHarness();
    for (let i = 0; i < 4; i++) call("s1", "read", { file_path: rp() });
    for (let i = 0; i < 4; i++) eq(call("s1", "grep", { pattern: "x", path: CWD + "\\dsh\\orchestrator-gate" }), undefined, "case11: grep 1-4 pass");
    eq(typeof call("s1", "grep", { pattern: "x", path: CWD + "\\dsh\\orchestrator-gate" }), "string", "case11: 5th grep rejected");
    // read 槽仍停在 4：再 1 次整读应拒绝
    eq(typeof call("s1", "read", { file_path: rp() }), "string", "case11: read slot untouched");
  }
  // 用例 13：被拒调用不清零（read×4 → 整仓 grep 被既有规则拒 → 再 1 次整读拒）
  {
    const { call, rp } = fanoutHarness();
    for (let i = 0; i < 4; i++) call("s1", "read", { file_path: rp() });
    // 整仓 grep（cwd 即仓库根，深度不足）被 blockRootGrep 拒绝
    const rootGrep = call("s1", "grep", { pattern: "x", path: CWD });
    eq(typeof rootGrep, "string", "case13: root grep rejected by existing rule");
    eq(typeof call("s1", "read", { file_path: rp() }), "string", "case13: rejected grep did not reset read slot");
  }
  // 用例 13b：被拒 grep 不计数 → 4 次被拒整仓 grep 后 1 次合法模块内 grep 放行
  {
    const { call, rp } = fanoutHarness();
    for (let i = 0; i < 4; i++) {
      eq(typeof call("s1", "grep", { pattern: "x", path: CWD }), "string", "case13b: root greps rejected by existing rule");
    }
    const inner = call("s1", "grep", { pattern: "x", path: CWD + "\\dsh\\orchestrator-gate" });
    eq(inner, undefined, "case13b: rejected greps did not count; legal grep passes");
  }
  // 用例 13d：被拒调用不触发 orchestrate 清零（read×3 → build 被拒 → read 第 4 次放行）
  {
    const { call, rp } = fanoutHarness();
    for (let i = 0; i < 3; i++) call("s1", "read", { file_path: rp() });
    eq(typeof call("s1", "pwsh", { command: "npm run build" }), "string", "case13d: build rejected by existing rule");
    eq(call("s1", "read", { file_path: rp() }), undefined, "case13d: rejected build did not reset read slot");
  }
});

// --- fanout：有界 Map（第 501 条会话条目插入时淘汰最旧）---
withRules({ blockSerialFanout: true }, () => {
  const { out, call, rp } = fanoutHarness();
  for (let i = 0; i < 501; i++) {
    call("s" + i, "read", { file_path: rp() });
  }
  eq(out.sessionStreaks.size, 500, "bounded map: size capped at 500");
  eq(out.sessionStreaks.has("s0"), false, "bounded map: oldest evicted");
  eq(out.sessionStreaks.has("s500"), true, "bounded map: newest present");
});

// --- fanout：AGENTS.md 一致性断言（两份小节一致 + 阈值字面量 == 默认值）---
{
  const fs = await import("node:fs");
  const home = process.env.USERPROFILE;
  const docA = fs.readFileSync(`${home}\\.dsh\\AGENTS.md`, "utf8");
  const docB = fs.readFileSync("D:\\repository\\skills\\dsh\\AGENTS.md", "utf8");
  const section = (t) => {
    const m = t.match(/## 并行扇出（强制）[\s\S]*?(?=\n## |\n*$)/);
    return m ? m[0].trim() : null;
  };
  const secA = section(docA);
  ok(secA, "AGENTS.md: fanout section exists (global)");
  const secB = section(docB);
  ok(secB, "AGENTS.md: fanout section exists (repo)");
  eq(secA, secB, "AGENTS.md: two fanout sections identical");
  const def = normalizeConfig({}).fanoutStreakThreshold;
  ok(secA.includes(`默认连续 ${def} 次`), "AGENTS.md: threshold literal matches normalizeConfig default");
}

// 开关不在 config：config 里的 blockBuildLint 不能关掉硬编码的 true
{
  const got = decideInterception({
    tool: "pwsh", args: { command: "npm run build" },
    config: { ...CFG, blockBuildLint: false }, cwd: CWD, fsImpl,
  });
  check("config switch ignored (hardcoded true wins)", got, true);
}

// classify 单元冒烟
assert.equal(classifyBuild(tokenize("pnpm run rebuild")), null);
assert.ok(classifyBilling(splitSegments("python cost_bill.py"), { cwd: CWD }));

// 派生指纹：稳定、且随规则变化而变
{
  const fp1 = rulesFingerprint();
  assert.match(fp1, /^[0-9a-f]{8}$/, "fingerprint is 8 hex chars");
  assert.equal(rulesFingerprint(), fp1, "fingerprint stable within same rules");
  withRules({ passThroughSubagents: false }, () => {
    assert.notEqual(rulesFingerprint(), fp1, "fingerprint changes when a rule flips");
  });
  assert.equal(rulesFingerprint(), fp1, "fingerprint restored after rule restore");
}

assert.deepEqual(splitSegments('echo ok\r\nnpm run build'), ['echo ok', 'npm run build']);
assert.deepEqual(splitSegments('echo "first\nsecond"'), ['echo "first\nsecond"']);
assert.ok(decideInterception({ tool: 'pwsh', args: { command: 'echo ok\nnpm run build' }, config: CFG }));
const fast = { workdir: 'D:\\repository\\项目', execution: { program: 'node', args: ['--version'] } };
assert.equal(decideInterception({ tool: 'orchestrate', args: fast }), null);
const denied = JSON.parse(decideInterception({ tool: 'orchestrate', args: { ...fast, execution: { program: 'node', args: ['ok;whoami'] } } }));
assert.equal(denied.code, 'INVALID_EXECUTION');
assert.equal(denied.recommendation.arguments.op, 'full');

// --- apply：sessionHasPlan/sessionWholeReads FIFO 上限（SESSION_MEMO_MAX_SESSIONS=1000）---
withRules({ blockEditWithoutPlan: false, blockWholeRead: false }, () => {
  const guarded = [];
  const ctx = { tools: { guard(fn) { guarded.push(fn); return () => {}; } }, on() {}, logger: { warn() {} } };
  const out = apply(ctx, { ...CFG, enabled: true }, { counters: { rejected: 0, errors: 0, shellWrapped: 0, uncovered: 0 } });
  const fire = (id, name, args) => guarded[0]({ name, arguments: args, agent: { session: { header: { id, delegationDepth: 0, cwd: CWD } } } });
  for (let i = 0; i < 1500; i++) fire("p" + i, "todo_write", {});
  assert.ok(out.sessionHasPlan.size <= 1000, "sessionHasPlan size 受 1000 上限约束，实际=" + out.sessionHasPlan.size);
  assert.equal(out.sessionHasPlan.has("p0"), false, "最早会话 p0 已从 sessionHasPlan 淘汰");
  assert.equal(out.sessionHasPlan.has("p1499"), true, "最新会话 p1499 仍在 sessionHasPlan");
  // 淘汰后新会话首次判定为无计划（偏宽松、不误阻断）
  const out2 = guarded[0]({ name: "edit", arguments: { file_path: FILE }, agent: { session: { header: { id: "fresh", delegationDepth: 0, cwd: CWD } } } });
  assert.equal(out2, undefined, "新会话 fresh 未被误判为无计划而拦截");
});
console.log(`selftest ok: ${n} checks + P0 structured/newline regressions`);
