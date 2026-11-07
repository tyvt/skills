#!/usr/bin/env node
/**
 * 为 OV 磁盘记忆补 cursor 溯源（从 distilled-local/cursor 按 slug 对齐）
 * node scripts/patch-ov-cursor-evidence.mjs [--apply] [--limit=N]
 */
import fs from "fs";
import path from "path";
import os from "os";

const APPLY = process.argv.includes("--apply");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? parseInt(limitArg.split("=")[1], 10) : 50000;

const BASE = path.join(
  os.homedir(),
  "Documents/deepseek-harness/default-workspace/memory-migration"
);
const DISTILL = path.join(BASE, "out/distilled-local/cursor");
const MEM = path.join(os.homedir(), ".openviking/data/viking/default/user/default/memories");
const OUT = path.join(BASE, "out/cursor-evidence-patch-report.json");

const strip = (s) => (s && s.charCodeAt(0) === 0xfeff ? s.slice(1) : s);

/** sessionId -> evidence row */
const bySession = new Map();
const UUID = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi;

for (const proj of fs.readdirSync(DISTILL)) {
  const d = path.join(DISTILL, proj);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".json"))) {
    let j;
    try {
      j = JSON.parse(strip(fs.readFileSync(path.join(d, f), "utf8")));
    } catch {
      continue;
    }
    for (const m of j.memories || []) {
      const ev = String(m.evidence || "");
      if (!ev.includes("source=cursor")) continue;
      const row = {
        evidence: ev,
        project: proj,
        title: m.title,
        sessionIds: m.sessionIds || [],
      };
      for (const sid of row.sessionIds) {
        if (!bySession.has(sid)) bySession.set(sid, row);
      }
    }
  }
}

const needs = [];
let scanned = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".md") && !e.name.startsWith(".")) {
      scanned++;
      const raw = fs.readFileSync(p, "utf8");
      if (/extracted source=cursor/i.test(raw)) continue;
      const ids = [...raw.matchAll(UUID)].map((m) => m[0].toLowerCase());
      let hit = null;
      for (const id of ids) {
        if (bySession.has(id)) {
          hit = bySession.get(id);
          break;
        }
      }
      if (!hit) continue;
      needs.push({ rel: path.relative(MEM, p).replace(/\\/g, "/"), abs: p, ...hit });
    }
  }
}
walk(MEM);

let patched = 0;
const batch = needs.slice(0, LIMIT);

for (const n of batch) {
  const raw = fs.readFileSync(n.abs, "utf8");
  let line = `- 验证证据：${n.evidence}`;
  if (n.sessionIds?.length && !/来源会话/.test(raw)) {
    line += `\n- 来源会话：${n.sessionIds.slice(0, 3).join(", ")}`;
  }
  if (!/所属项目/.test(raw) && n.project) {
    line = `- 所属项目：${n.project}\n` + line;
  }
  let next;
  const memRe = /<!--\s*MEMORY_FIELDS[\s\S]*?-->\s*/;
  const verifyBlock = `## 验证与归属\n${line}\n`;
  if (/## 验证与归属/.test(raw)) {
    next = raw.replace(/(## 验证与归属\s*\n)/, `$1${line}\n`);
  } else if (memRe.test(raw)) {
    next = raw.replace(memRe, `\n${verifyBlock}\n$&`);
  } else {
    next = raw.trimEnd() + `\n\n## 验证与归属\n${line}\n`;
  }
  if (next === raw) continue;
  if (APPLY) fs.writeFileSync(n.abs, next, "utf8");
  patched++;
}

const report = {
  at: new Date().toISOString(),
  scannedMd: scanned,
  distillSessionKeys: bySession.size,
  candidates: needs.length,
  patched: APPLY ? patched : 0,
  dryRunWouldPatch: batch.length,
  sample: needs.slice(0, 15).map((x) => ({ rel: x.rel, evidence: x.evidence })),
};
fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ apply: APPLY, candidates: needs.length, patched }, null, 2));
