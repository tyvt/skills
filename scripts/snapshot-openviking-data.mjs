#!/usr/bin/env node
/**
 * 备份 OpenViking 用户 data 树（知识相关部分）到 skills/openviking-data/
 * 源：%USERPROFILE%\.openviking\data\viking\default\user\default\
 * 含：memories/、peers 下各 peer 的 memories/、根目录 .overview.md / .abstract.md
 * 不含：sessions/（DSH 原文镜像，~120MB，可本地重镜像）、vectordb（可重算）
 *
 * node scripts/snapshot-openviking-data.mjs [--commit] [--push] [--reason manual]
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { setTimeout as sleep } from "timers/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_ROOT = path.resolve(__dirname, "..");
const DST_ROOT = path.join(SKILLS_ROOT, "openviking-data");
const SRC_USER = path.join(
  process.env.USERPROFILE || "",
  ".openviking",
  "data",
  "viking",
  "default",
  "user",
  "default"
);

const args = process.argv.slice(2);
const doCommit = args.includes("--commit");
const doPush = args.includes("--push");
const reasonIdx = args.indexOf("--reason");
const reason = reasonIdx >= 0 ? args[reasonIdx + 1] || "manual" : "manual";

const RESERVED = new Set(["readme.md", ".snapshot-meta.json"]);
const EXCLUDE_DIRS = new Set(["sessions"]);

function shouldSkipDir(name) {
  return EXCLUDE_DIRS.has(name);
}

function* walkFiles(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (shouldSkipDir(name)) continue;
      yield* walkFiles(p);
    } else if (name.endsWith(".md") && !name.startsWith(".")) {
      yield p;
    }
  }
}

function relFromUser(abs) {
  return path.relative(SRC_USER, abs).replace(/\\/g, "/");
}

function validateMd(abs) {
  const b = fs.readFileSync(abs);
  if (b.length === 0) return { ok: false, why: "empty" };
  let zeros = 0;
  for (const x of b) if (x === 0) zeros++;
  if (zeros > b.length * 0.05) return { ok: false, why: `nul ${zeros}/${b.length}` };
  const t = b.toString("utf8").trimEnd();
  if (t.length > 0 && !t.endsWith("-->") && /MEMORY_FIELDS/.test(t)) {
    return { ok: false, why: "truncated" };
  }
  return { ok: true };
}

function collectSources() {
  const rels = new Set();
  if (!fs.existsSync(SRC_USER)) return rels;
  for (const abs of walkFiles(path.join(SRC_USER, "memories"))) {
    rels.add(relFromUser(abs));
  }
  const peersRoot = path.join(SRC_USER, "peers");
  if (fs.existsSync(peersRoot)) {
    for (const peer of fs.readdirSync(peersRoot)) {
      const memDir = path.join(peersRoot, peer, "memories");
      if (!fs.existsSync(memDir)) continue;
      for (const abs of walkFiles(memDir)) {
        rels.add(relFromUser(abs));
      }
    }
  }
  for (const f of [".overview.md", ".abstract.md"]) {
    const p = path.join(SRC_USER, f);
    if (fs.existsSync(p)) rels.add(f);
  }
  return rels;
}

function listDstMd() {
  const out = [];
  if (!fs.existsSync(DST_ROOT)) return out;
  const userDst = path.join(DST_ROOT, "viking", "default", "user", "default");
  if (!fs.existsSync(userDst)) return out;
  for (const abs of walkFiles(userDst)) {
    const rel = path.relative(DST_ROOT, abs).replace(/\\/g, "/");
    if (RESERVED.has(path.basename(rel).toLowerCase())) continue;
    out.push(rel);
  }
  for (const f of [".overview.md", ".abstract.md"]) {
    const p = path.join(userDst, f);
    if (fs.existsSync(p)) out.push(`viking/default/user/default/${f}`);
  }
  return out;
}

if (!fs.existsSync(SRC_USER)) {
  console.error("ERR: 源目录不存在", SRC_USER);
  process.exit(1);
}

const srcRel = collectSources();
let copied = 0;
for (const rel of srcRel) {
  const from = path.join(SRC_USER, rel);
  const to = path.join(DST_ROOT, "viking", "default", "user", "default", rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  copied++;
}

const dstRelSet = new Set(listDstMd());
const srcDstRel = new Set([...srcRel].map((r) => `viking/default/user/default/${r}`));
let removed = 0;
for (const rel of dstRelSet) {
  if (RESERVED.has(path.basename(rel).toLowerCase())) continue;
  if (!srcDstRel.has(rel)) {
    fs.unlinkSync(path.join(DST_ROOT, rel));
    removed++;
  }
}

const bad = [];
let bytes = 0;
for (const rel of srcDstRel) {
  const abs = path.join(DST_ROOT, rel);
  if (!fs.existsSync(abs)) continue;
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
  src: SRC_USER,
  dst: DST_ROOT,
  fileCount: srcDstRel.size,
  bytes,
  copied,
  removed,
  excludes: ["sessions", "vectordb", "data/_system"],
};
fs.mkdirSync(DST_ROOT, { recursive: true });
fs.writeFileSync(path.join(DST_ROOT, ".snapshot-meta.json"), JSON.stringify(meta, null, 2), "utf8");

console.log(
  `OK: ${meta.fileCount} md, ${(bytes / 1024 / 1024).toFixed(2)} MB | copy=${copied} remove=${removed} | ${reason}`
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

git(["add", "openviking-data"]);
const st = git(["status", "--porcelain", "--", "openviking-data"]);
if (!st) {
  console.log("Git: 无变更，跳过提交");
  process.exit(0);
}
git(["-c", "core.safecrlf=false", "commit", "-m", `chore(openviking-data): 快照 ${meta.fileCount} md (${reason})`]);
console.log("Git:", git(["log", "--oneline", "-1"]));

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
