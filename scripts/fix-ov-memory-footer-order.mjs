#!/usr/bin/env node
/** 把误插在 MEMORY_FIELDS 之后的「验证与归属」挪到注释块之前 */
import fs from "fs";
import path from "path";
import os from "os";

const APPLY = process.argv.includes("--apply");
const MEM = path.join(os.homedir(), ".openviking/data/viking/default/user/default/memories");
const MEM_RE = /<!--\s*MEMORY_FIELDS[\s\S]*?-->\s*/;
const VERIFY_RE = /\n## 验证与归属[\s\S]*$/;

let scanned = 0;
let fixed = 0;

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".md") && !e.name.startsWith(".")) {
      scanned++;
      let raw = fs.readFileSync(p, "utf8");
      const memM = raw.match(MEM_RE);
      const verM = raw.match(VERIFY_RE);
      if (!memM || !verM) continue;
      const verifyBlock = verM[0].trimStart();
      const afterMem = raw.slice(memM.index + memM[0].length);
      if (!afterMem.includes("## 验证与归属")) continue;
      const body = raw.slice(0, memM.index).trimEnd();
      const memBlock = memM[0].trimEnd();
      const next = `${body}\n\n${verifyBlock}\n\n${memBlock}\n`;
      if (next !== raw) {
        fixed++;
        if (APPLY) fs.writeFileSync(p, next, "utf8");
      }
    }
  }
}
walk(MEM);
console.log(JSON.stringify({ apply: APPLY, scanned, fixed }));
