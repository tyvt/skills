#!/usr/bin/env node
/** 只读刷新 %TEMP%/import-local-sources-state.json 的 cursor 小节 */
import fs from "fs";
import path from "path";
import os from "os";

const BASE = path.join(
  os.homedir(),
  "Documents/deepseek-harness/default-workspace/memory-migration"
);
const OUT = path.join(BASE, "out");
const TMP = os.tmpdir();
const strip = (s) => (s && s.charCodeAt(0) === 0xfeff ? s.slice(1) : s);

const rows = fs
  .readFileSync(path.join(OUT, "sessions.jsonl"), "utf8")
  .split(/\n/)
  .filter(Boolean)
  .map((l) => JSON.parse(l))
  .filter((r) => r.source === "cursor" && r.project);

const projs = [...new Map(rows.map((r) => [r.project, 0])).keys()].sort();
const byP = new Map();
for (const r of rows) byP.set(r.project, (byP.get(r.project) || 0) + 1);

const distillRoot = path.join(OUT, "distilled-local", "cursor");
const details = [];
let imported = 0;
let memories = 0;

for (const project of projs) {
  const src = path.join(distillRoot, project);
  let memN = 0;
  const titles = new Set();
  if (fs.existsSync(src)) {
    for (const f of fs.readdirSync(src).filter((x) => x.endsWith(".json"))) {
      try {
        const j = JSON.parse(strip(fs.readFileSync(path.join(src, f), "utf8")));
        memN += (j.memories || []).length;
        for (const m of j.memories || []) if (m.title) titles.add(m.title);
      } catch {}
    }
  }
  const df = path.join(TMP, `done-ov-cursor-${project}.json`);
  let done = new Set();
  if (fs.existsSync(df)) {
    try {
      done = new Set(JSON.parse(strip(fs.readFileSync(df, "utf8"))));
    } catch {}
  }
  const missing = [...titles].filter((t) => !done.has(t));
  if (!memN) {
    details.push({ project, sessions: byP.get(project), memories: 0, skipped: true });
  } else if (!missing.length) {
    imported++;
    memories += memN;
    details.push({ project, sessions: byP.get(project), memories: memN, ok: true });
  } else {
    details.push({
      project,
      sessions: byP.get(project),
      memories: memN,
      missingTitles: missing.length,
      error: "import_gap",
    });
  }
}

const statePath = path.join(TMP, "import-local-sources-state.json");
let state = {};
try {
  state = JSON.parse(strip(fs.readFileSync(statePath, "utf8")));
} catch {}

state.finishedAt = new Date().toISOString();
state.sources = state.sources || {};
state.sources.cursor = {
  projects: projs.length,
  imported,
  memories,
  note: "refresh-cursor-import-state: title gaps=0 视为导入完成",
  details,
};

fs.writeFileSync(statePath, JSON.stringify(state, null, 2), "utf8");
console.log(
  JSON.stringify({ projects: projs.length, imported, memories, gapProjects: details.filter((d) => d.error).length })
);
