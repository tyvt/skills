#!/usr/bin/env node
/**
 * 将 ~/.openviking/.../memories 同步到 D:\repository\skills\openviking-memory
 * 用法:
 *   node scripts/snapshot-openviking-memory.mjs
 *   node scripts/snapshot-openviking-memory.mjs --commit --push --reason import-all-complete
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { setTimeout as sleep } from "timers/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_ROOT = path.resolve(__dirname, "..");
const DST_ROOT = path.join(SKILLS_ROOT, "openviking-memory");
const SRC_ROOT = path.join(
  process.env.USERPROFILE || "",
  ".openviking",
  "data",
  "viking",
  "default",
  "user",
  "default",
  "memories"
);

const args = process.argv.slice(2);
const doCommit = args.includes("--commit");
const doPush = args.includes("--push");
const reasonIdx = args.indexOf("--reason");
const reason = reasonIdx >= 0 ? args[reasonIdx + 1] || "manual" : "manual";

const RESERVED = new Set(["readme.md", ".snapshot-meta.json"]);

function listMd(root) {
  const out = [];
  if (!fs.existsSync(root)) return out;
  for (const abs of walk(root)) {
    if (!abs.endsWith(".md")) continue;
    const base = path.basename(abs);
    if (base.startsWith(".")) continue;
    out.push(path.relative(root, abs).replace(/\\/g, "/"));
  }
  return out;
}

function* walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function validateMd(abs) {
  const b = fs.readFileSync(abs);
  if (b.length === 0) return { ok: false, why: "empty" };
  let zeros = 0;
  for (const x of b) if (x === 0) zeros++;
  if (zeros > b.length * 0.05) return { ok: false, why: `nul ${zeros}/${b.length}` };
  const t = b.toString("utf8").trimEnd();
  if (t.length > 0 && !t.endsWith("-->")) return { ok: false, why: "truncated" };
  return { ok: true };
}

function countByTop(relPaths) {
  const m = {};
  for (const r of relPaths) {
    const top = r.includes("/") ? r.split("/")[0] : r;
    m[top] = (m[top] || 0) + 1;
  }
  return m;
}

if (!fs.existsSync(SRC_ROOT)) {
  console.error("ERR: OpenViking 记忆源不存在:", SRC_ROOT);
  process.exit(1);
}
fs.mkdirSync(DST_ROOT, { recursive: true });

const srcRel = new Set(listMd(SRC_ROOT));
let copied = 0;
for (const rel of srcRel) {
  const from = path.join(SRC_ROOT, rel);
  const to = path.join(DST_ROOT, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  copied++;
}

let removed = 0;
for (const rel of listMd(DST_ROOT)) {
  if (RESERVED.has(rel.toLowerCase())) continue;
  if (!srcRel.has(rel)) {
    fs.unlinkSync(path.join(DST_ROOT, rel));
    removed++;
  }
}

const dstRel = listMd(DST_ROOT).filter((r) => !RESERVED.has(r.toLowerCase()));
const bad = [];
let bytes = 0;
for (const rel of dstRel) {
  const abs = path.join(DST_ROOT, rel);
  bytes += fs.statSync(abs).size;
  const v = validateMd(abs);
  if (!v.ok) bad.push({ rel, why: v.why });
}

if (bad.length) {
  console.error("ERR: 校验失败", bad.slice(0, 10));
  process.exit(2);
}

const meta = {
  syncedAt: new Date().toISOString(),
  reason,
  src: SRC_ROOT,
  dst: DST_ROOT,
  fileCount: dstRel.length,
  bytes,
  copied,
  removed,
  byCategory: countByTop(dstRel),
};
fs.writeFileSync(path.join(DST_ROOT, ".snapshot-meta.json"), JSON.stringify(meta, null, 2), "utf8");

console.log(
  `OK: ${dstRel.length} md, ${(bytes / 1024 / 1024).toFixed(2)} MB | copy=${copied} remove=${removed} | ${reason}`
);

if (!doCommit) process.exit(0);

const git = (gargs) => {
  const r = spawnSync("git", gargs, { cwd: SKILLS_ROOT, encoding: "utf8" });
  if (r.status !== 0) {
    console.error("git", gargs.join(" "), r.stderr || r.stdout);
    process.exit(r.status || 1);
  }
  return (r.stdout || "").trim();
};

git(["add", "openviking-memory"]);
const st = git(["status", "--porcelain", "--", "openviking-memory"]);
if (!st) {
  console.log("Git: 无变更，跳过提交");
  process.exit(0);
}

const msg = `chore(openviking-memory): 快照 ${meta.fileCount} md (${reason})`;
git(["-c", "core.safecrlf=false", "commit", "-m", msg]);
console.log("Git: committed", git(["log", "--oneline", "-1"]));

if (!doPush) process.exit(0);

for (let i = 1; i <= 5; i++) {
  const r = spawnSync("git", ["push", "origin", "main"], { cwd: SKILLS_ROOT, encoding: "utf8" });
  const out = (r.stdout || "") + (r.stderr || "");
  if (r.status === 0 || /up-to-date|main -> main/.test(out)) {
    console.log("Git: push OK");
    process.exit(0);
  }
  console.warn(`Git: push 第 ${i} 次失败，15s 后重试`);
  await sleep(15000);
}
process.exit(1);
