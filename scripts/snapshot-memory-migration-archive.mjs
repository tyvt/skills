#!/usr/bin/env node
/**
 * 备份 memory-migration 的「原始导出」（cursor / workbuddy / opencode 会话原始材料，
 * 即蒸馏前的源文件）→ skills/memory-migration-archive/
 *
 * 这是「原始源」归档，刻意与 openviking-data（OpenViking 派生状态镜像：memories/sessions
 * + vectordb）分开存放，满足“完整内容 + 溯源”的备份目标：原始材料与派生状态边界清晰，
 * 恢复或重新蒸馏时互不干扰。openviking-data 保持纯镜像契约（仅含 viking/ + vectordb）。
 *
 * 源目录默认：
 *   %USERPROFILE%\Documents\deepseek-harness\default-workspace\memory-migration\out
 * 可用环境变量 MIGRATION_OUT 覆盖。
 *
 * node scripts/snapshot-memory-migration-archive.mjs [--commit] [--push] [--reason manual]
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { setTimeout as sleep } from "timers/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_ROOT = path.resolve(__dirname, "..");
const DST_ROOT = path.join(SKILLS_ROOT, "memory-migration-archive");
const DEFAULT_SRC = path.join(
  process.env.USERPROFILE || "",
  "Documents", "deepseek-harness", "default-workspace", "memory-migration", "out"
);
const SRC = process.env.MIGRATION_OUT || DEFAULT_SRC;

const args = process.argv.slice(2);
const doCommit = args.includes("--commit");
const doPush = args.includes("--push");
const reasonIdx = args.indexOf("--reason");
const reason = reasonIdx >= 0 ? args[reasonIdx + 1] || "manual" : "manual";

function* walkFiles(root) {
  if (!fs.existsSync(root)) return;
  for (const name of fs.readdirSync(root)) {
    const p = path.join(root, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) yield* walkFiles(p);
    else yield p;
  }
}

function countFiles(root) {
  let n = 0;
  for (const _ of walkFiles(root)) n++;
  return n;
}

function lastBaseline() {
  try {
    const meta = JSON.parse(
      fs.readFileSync(path.join(DST_ROOT, ".snapshot-meta.json"), "utf8")
    );
    return Number(meta && meta.files) || 0;
  } catch {
    return 0;
  }
}

function recountExisting() {
  let files = 0;
  let bytes = 0;
  for (const abs of walkFiles(DST_ROOT)) {
    if (path.basename(abs) === ".snapshot-meta.json") continue;
    files++;
    bytes += fs.statSync(abs).size;
  }
  return { files, bytes };
}

let stats = { files: 0, bytes: 0, copied: 0, removed: 0, missing: false };

if (!fs.existsSync(SRC)) {
  // 源缺失时不要 /MIR 擦掉已有归档；保留并照常记录已有文件数。
  console.warn(`WARN: 源导出目录不存在，跳过镜像（保留已有归档）: ${SRC}`);
  const ex = recountExisting();
  stats = { ...ex, copied: 0, removed: 0, missing: true };
} else {
  fs.mkdirSync(DST_ROOT, { recursive: true });
  const srcCount = countFiles(SRC);
  const baseline = lastBaseline();
  // 与 vectordb 同样的守护：源异常偏少时不执行 /PURGE，避免瞬时/损坏源清空归档。
  const MIN_SRC_FILES = 10;
  const guardSkipPurge =
    srcCount < MIN_SRC_FILES || (baseline > 0 && srcCount < baseline * 0.5);
  // /XF 保留归档本地文件：README.md（说明）与 .snapshot-meta.json（由本脚本写出），
  // 二者都不在源目录中，必须排除在 /MIR 的清理之外，否则会被 purge 掉。
  const common = [
    "/R:3", "/W:2", "/NFL", "/NDL", "/NJH", "/NJS", "/NP",
    "/XF", "README.md", ".snapshot-meta.json",
  ];
  const switches = guardSkipPurge ? ["/E", "/XO", ...common] : ["/MIR", ...common];
  if (guardSkipPurge) {
    console.warn(
      `WARN: guard skipped purge (src=${srcCount}, baseline=${baseline})`
    );
  }
  const before = new Set(
    [...walkFiles(DST_ROOT)]
      .filter((p) => path.basename(p) !== ".snapshot-meta.json")
      .map((p) => path.relative(DST_ROOT, p))
  );
  const r = spawnSync("robocopy", [SRC, DST_ROOT, ...switches], {
    encoding: "utf8",
    windowsHide: true,
  });
  const code = r.status ?? 0;
  if (code >= 8) {
    console.error("robocopy failed", code, r.stderr || r.stdout);
    process.exit(1);
  }
  let files = 0;
  let bytes = 0;
  const after = new Set();
  for (const abs of walkFiles(DST_ROOT)) {
    if (path.basename(abs) === ".snapshot-meta.json") continue;
    files++;
    bytes += fs.statSync(abs).size;
    after.add(path.relative(DST_ROOT, abs));
  }
  let removed = 0;
  for (const rel of before) if (!after.has(rel)) removed++;
  stats = {
    files,
    bytes,
    copied: files,
    removed,
    missing: false,
    srcCount,
    baseline,
    guardSkipPurge,
    robocopyExit: code,
  };
}

const meta = {
  syncedAt: new Date().toISOString(),
  reason,
  src: SRC,
  dst: DST_ROOT,
  ...stats,
};
fs.mkdirSync(DST_ROOT, { recursive: true });
fs.writeFileSync(
  path.join(DST_ROOT, ".snapshot-meta.json"),
  JSON.stringify(meta, null, 2),
  "utf8"
);

console.log(
  `OK: ${stats.files} files, ${(stats.bytes / 1024 / 1024).toFixed(2)} MB | copy=${stats.copied} remove=${stats.removed} | ${reason}`
);
console.log(JSON.stringify(stats, null, 2));

if (!doCommit) process.exit(0);

const git = (gargs) => {
  const r = spawnSync("git", gargs, { cwd: SKILLS_ROOT, encoding: "utf8" });
  if (r.status !== 0) {
    console.error("git", gargs.join(" "), r.stderr || r.stdout);
    process.exit(r.status || 1);
  }
  return (r.stdout || "").trim();
};

git(["add", "memory-migration-archive"]);

// 技能库防零填充：提交前扫描暂存文件，疑似零填充（>5% NUL）一律拦截。
const staged = git([
  "diff",
  "--cached",
  "--name-only",
  "--",
  "memory-migration-archive",
])
  .split("\n")
  .filter(Boolean);
if (staged.length) {
  const bad = [];
  for (const f of staged) {
    const b = fs.readFileSync(path.join(SKILLS_ROOT, f));
    if (b.length > 0) {
      let z = 0;
      for (let i = 0; i < b.length; i++) {
        if (b[i] === 0) {
          z++;
          if (z > b.length * 0.05) break;
        }
      }
      if (z > b.length * 0.05) bad.push(f);
    }
  }
  if (bad.length) {
    console.error("ERR: 疑似零填充，拒绝提交:", bad.slice(0, 10));
    process.exit(2);
  }
}

const st = git(["status", "--porcelain", "--", "memory-migration-archive"]);
if (!st) {
  console.log("Git: 无变更，跳过提交");
  process.exit(0);
}
git([
  "-c",
  "core.safecrlf=false",
  "commit",
  "-m",
  `chore(memory-migration-archive): 快照 ${stats.files} files (${reason})`,
]);
console.log("Git:", git(["log", "--oneline", "-1"]));

if (!doPush) process.exit(0);
for (let i = 1; i <= 5; i++) {
  const r = spawnSync("git", ["push", "origin", "main"], {
    cwd: SKILLS_ROOT,
    encoding: "utf8",
  });
  const out = (r.stdout || "") + (r.stderr || "");
  if (r.status === 0 || /up-to-date|main -> main/.test(out)) {
    console.log("Git: push OK");
    process.exit(0);
  }
  console.warn(`Git: push 第 ${i} 次失败，15s 后重试`);
  await sleep(15000);
}
process.exit(1);
