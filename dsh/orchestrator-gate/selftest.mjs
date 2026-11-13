/**
 * orchestrator-gate 函数级自测。规则开关硬编码，测试里临时翻转 RULES 后复原。
 * 跑：node selftest.mjs
 */
import assert from "node:assert/strict";
import {
  RULES, decideInterception, splitSegments, tokenize, classifyBuild, classifyBilling,
  pathInSessions, apply, rulesFingerprint,
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

// --- read §3.3 ---
withRules({ blockWholeRead: true }, () => {
  const big = { statSync: () => ({ size: 90_000, isFile: () => true }) };
  const small = { statSync: () => ({ size: 100, isFile: () => true }) };
  check("read big", decide("read", { file_path: FILE }, { fsImpl: big }), true);
  check("read ranged", decide("read", { file_path: FILE, offset: 1, limit: 50 }, { fsImpl: big }), false);
  check("read small", decide("read", { file_path: FILE }, { fsImpl: small }), false);
  check("read relative", decide("read", { file_path: "lib/index.js" }, { fsImpl: big }), false);
  check("read dedup", decide("read", { file_path: FILE }, { alreadyWholeRead: true, fsImpl: small }), true);
  const vue = "D:\\repository\\skills\\dsh\\x.vue";
  check("vue under", decide("read", { file_path: vue }, { fsImpl: { statSync: () => ({ size: 50_000, isFile: () => true }) } }), false);
  check("vue over", decide("read", { file_path: vue }, { fsImpl: { statSync: () => ({ size: 70_000, isFile: () => true }) } }), true);
});

// --- 放行：orchestrate / 子 ctx / 默认关 ---
check("orchestrate", decide("orchestrate", { op: "full", request: "npm run build" }), false);
check("subagent", decide("pwsh", { command: "npm run build" }, { isSubagent: true }), false);
check("build on by default (npm run build blocks)", decide("pwsh", { command: "npm run build" }), true);
check("edit untouched", decide("edit", { file_path: FILE }), false);

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
console.log(`selftest ok: ${n} checks + P0 structured/newline regressions`);
