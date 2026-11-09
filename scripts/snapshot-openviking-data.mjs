#!/usr/bin/env node
/**
 * 备份所有影响 OpenViking 记忆质量的 data 子树 → skills/openviking-data/
 *
 * 含：
 *   - data/viking/default/user/default/ 整树（memories、peers、sessions、skills、resources、privacy、摘要）
 *   - data/vectordb/ 向量索引
 *   - data/viking/default/backend_meta.json 等同级元数据（若存在）
 *
 * 不含（纯运行时，无知识价值或可重算且会膨胀仓库）：
 *   - data/_system/、data/.openviking.lock、pending/、state/
 *
 * node scripts/snapshot-openviking-data.mjs [--commit] [--push] [--reason manual]
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { setTimeout as sleep } from "timers/promises";

function copyFileRetry(from, to, tries = 8) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  for (let i = 0; i < tries; i++) {
    try {
      fs.copyFileSync(from, to);
      return;
    } catch (e) {
      if ((e.code === "EBUSY" || e.code === "EPERM") && i < tries - 1) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1500);
        continue;
      }
      throw e;
    }
  }
}

function countFiles(root) {
  let n = 0;
  for (const _ of walkFiles(root)) n++;
  return n;
}

function lastVectordbBaseline() {
  try {
    const meta = JSON.parse(fs.readFileSync(path.join(DST_ROOT, ".snapshot-meta.json"), "utf8"));
    return Number(meta && meta.bySection && meta.bySection.vectordb && meta.bySection.vectordb.files) || 0;
  } catch {
    return 0;
  }
}

function mirrorVectordbRobocopy(srcRoot, dstRoot) {
  if (!fs.existsSync(srcRoot)) return { files: 0, bytes: 0, copied: 0, removed: 0, missing: true };
  fs.mkdirSync(dstRoot, { recursive: true });

  const srcCount = countFiles(srcRoot);
  const baseline = lastVectordbBaseline();
  // /MIR == /E + /PURGE: it deletes anything in dst that src no longer has.
  // Skip the purge when src looks abnormal (nearly empty, or <50% of last
  // successful backup), so a transient/broken source can never wipe the backup.
  const MIN_SRC_FILES = 10;
  const guardSkipPurge =
    srcCount < MIN_SRC_FILES || (baseline > 0 && srcCount < baseline * 0.5);
  const mode = guardSkipPurge ? "copy-only-guard" : "mir";
  if (guardSkipPurge) {
    console.warn(
      `WARN: vectordb guard skipped purge (src=${srcCount}, baseline=${baseline}, min=${MIN_SRC_FILES})`
    );
  }

  const common = ["/R:3", "/W:2", "/NFL", "/NDL", "/NJH", "/NJS", "/NP"];
  const switches = guardSkipPurge ? ["/E", "/XO", ...common] : ["/MIR", ...common];
  const before = new Set([...walkFiles(dstRoot)].map((p) => path.relative(dstRoot, p)));

  const r = spawnSync("robocopy", [srcRoot, dstRoot, ...switches], {
    encoding: "utf8",
    windowsHide: true,
  });
  const code = r.status ?? 0;
  if (code >= 8) {
    console.error("robocopy vectordb failed", code, r.stderr || r.stdout);
    process.exit(1);
  }

  let files = 0;
  let bytes = 0;
  const after = new Set();
  for (const abs of walkFiles(dstRoot)) {
    files++;
    bytes += fs.statSync(abs).size;
    after.add(path.relative(dstRoot, abs));
  }
  let removed = 0;
  for (const rel of before) if (!after.has(rel)) removed++;

  return {
    files,
    bytes,
    copied: files,
    removed,
    missing: false,
    robocopyExit: code,
    mirrorMode: mode,
    srcCount,
    baseline,
    guardSkipPurge,
  };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_ROOT = path.resolve(__dirname, "..");
const DST_ROOT = path.join(SKILLS_ROOT, "openviking-data");
const DATA_ROOT = path.join(process.env.USERPROFILE || "", ".openviking", "data");

const SECTIONS = [
  {
    key: "userDefault",
    src: path.join(DATA_ROOT, "viking", "default", "user", "default"),
    dst: path.join(DST_ROOT, "viking", "default", "user", "default"),
  },
  {
    key: "vectordb",
    src: path.join(DATA_ROOT, "vectordb"),
    dst: path.join(DST_ROOT, "vectordb"),
  },
];

const EXTRA_FILES = [
  {
    key: "backendMeta",
    src: path.join(DATA_ROOT, "viking", "default", "backend_meta.json"),
    dst: path.join(DST_ROOT, "viking", "default", "backend_meta.json"),
  },
];

const args = process.argv.slice(2);
const doCommit = args.includes("--commit");
const doPush = args.includes("--push");
const reasonIdx = args.indexOf("--reason");
const reason = reasonIdx >= 0 ? args[reasonIdx + 1] || "manual" : "manual";

const RESERVED = new Set(["readme.md", ".snapshot-meta.json"]);

function* walkFiles(root) {
  if (!fs.existsSync(root)) return;
  for (const name of fs.readdirSync(root)) {
    const p = path.join(root, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) yield* walkFiles(p);
    else yield p;
  }
}

function relFiles(root) {
  const out = new Set();
  for (const abs of walkFiles(root)) {
    out.add(path.relative(root, abs).replace(/\\/g, "/"));
  }
  return out;
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

function shouldValidateMd(rel) {
  const base = path.basename(rel);
  if (base.startsWith(".")) return false;
  if (!rel.endsWith(".md")) return false;
  if (rel.startsWith("memories/")) return true;
  if (rel.includes("/memories/")) return true;
  return false;
}

function mirrorTree(srcRoot, dstRoot) {
  const empty = { files: 0, bytes: 0, copied: 0, removed: 0, missing: !fs.existsSync(srcRoot) };
  if (!fs.existsSync(srcRoot)) return empty;
  const srcRel = relFiles(srcRoot);
  let bytes = 0;
  let copied = 0;
  for (const rel of srcRel) {
    const from = path.join(srcRoot, rel);
    const to = path.join(dstRoot, rel);
    copyFileRetry(from, to);
    copied++;
    bytes += fs.statSync(to).size;
  }
  let removed = 0;
  if (fs.existsSync(dstRoot)) {
    for (const rel of relFiles(dstRoot)) {
      if (!srcRel.has(rel)) {
        fs.unlinkSync(path.join(dstRoot, rel));
        removed++;
      }
    }
  }
  return { files: srcRel.size, bytes, copied, removed, missing: false };
}

const stats = {
  files: 0,
  bytes: 0,
  copied: 0,
  removed: 0,
  bySection: {},
};

for (const sec of SECTIONS) {
  const local =
    sec.key === "vectordb" ? mirrorVectordbRobocopy(sec.src, sec.dst) : mirrorTree(sec.src, sec.dst);
  stats.files += local.files;
  stats.bytes += local.bytes;
  stats.copied += local.copied;
  stats.removed += local.removed;
  stats.bySection[sec.key] = local;
}

for (const ef of EXTRA_FILES) {
  if (!fs.existsSync(ef.src)) continue;
  fs.mkdirSync(path.dirname(ef.dst), { recursive: true });
  copyFileRetry(ef.src, ef.dst);
  const b = fs.statSync(ef.dst).size;
  stats.bytes += b;
  stats.files += 1;
  stats.copied += 1;
  stats.bySection[ef.key] = { files: 1, bytes: b };
}

const bad = [];
const userDst = path.join(DST_ROOT, "viking", "default", "user", "default");
if (fs.existsSync(userDst)) {
  for (const abs of walkFiles(userDst)) {
    const rel = path.relative(userDst, abs).replace(/\\/g, "/");
    if (!shouldValidateMd(rel)) continue;
    const v = validateMd(abs);
    if (!v.ok) bad.push({ rel: `viking/default/user/default/${rel}`, why: v.why });
  }
}

if (bad.length) {
  console.error("ERR: 记忆 md 校验失败", bad.slice(0, 10));
  process.exit(2);
}

if (!fs.existsSync(SECTIONS[0].src)) {
  console.error("ERR: 用户 data 源不存在", SECTIONS[0].src);
  process.exit(1);
}

const meta = {
  syncedAt: new Date().toISOString(),
  reason,
  src: DATA_ROOT,
  dst: DST_ROOT,
  fileCount: stats.files,
  bytes: stats.bytes,
  copied: stats.copied,
  removed: stats.removed,
  bySection: stats.bySection,
  excludes: ["data/_system", "data/.openviking.lock", "pending", "state"],
};

fs.mkdirSync(DST_ROOT, { recursive: true });
fs.writeFileSync(path.join(DST_ROOT, ".snapshot-meta.json"), JSON.stringify(meta, null, 2), "utf8");

console.log(
  `OK: ${meta.fileCount} files, ${(stats.bytes / 1024 / 1024).toFixed(2)} MB | copy=${stats.copied} remove=${stats.removed} | ${reason}`
);
console.log(JSON.stringify(stats.bySection, null, 2));

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
git([
  "-c",
  "core.safecrlf=false",
  "commit",
  "-m",
  `chore(openviking-data): 全量快照 ${meta.fileCount} files (${reason})`,
]);
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
