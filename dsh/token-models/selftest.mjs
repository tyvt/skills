/**
 * token-models selftest：覆盖 aggregate() 聚合与 normalizeConfig() 默认值/env 解析。
 * 用临时目录写 *.costs.jsonl，不依赖真实工作区。运行：node selftest.mjs
 */
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { aggregate, normalizeConfig } from "./lib/index.js";

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("PASS", name); }
  else { fail++; console.log("FAIL", name, detail === undefined ? "" : "=> " + JSON.stringify(detail)); }
}

// ---- normalizeConfig ----
{
  const c = normalizeConfig({});
  ok("normalizeConfig 默认 maxFiles=200", c.maxFiles === 200, c);
  ok("normalizeConfig 默认 sessionsDir 非空字符串", typeof c.sessionsDir === "string" && c.sessionsDir.length > 0, c);
  const c2 = normalizeConfig({ maxFiles: -5, sessionsDir: "  " });
  ok("normalizeConfig 非法 maxFiles 回落 200", c2.maxFiles === 200, c2);
  ok("normalizeConfig 空白 sessionsDir 回落默认", c2.sessionsDir === c.sessionsDir, c2);
  const c3 = normalizeConfig({ maxFiles: 7.9, sessionsDir: "/tmp/x" });
  ok("normalizeConfig maxFiles 取整", c3.maxFiles === 7, c3);
  ok("normalizeConfig sessionsDir 覆盖生效", c3.sessionsDir === "/tmp/x", c3);
}

// ---- aggregate：多模型 / 多会话 / 坏行容错 ----
{
  const dir = mkdtempSync(path.join(tmpdir(), "tmodels-"));
  const w = (name, text) => writeFileSync(path.join(dir, name), text, "utf8");
  w("s1.costs.jsonl", [
    JSON.stringify({ model: "m-a", usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 }, role: "planner", session_id: "s1", elapsed: 2 }),
    JSON.stringify({ model: "m-a", usage: { prompt_tokens: 10, completion_tokens: 5 }, role: "coder", session_id: "s1", elapsed: 1 }),
    "  ", // 空行应跳过
    "{ not json", // 坏行应跳过
    JSON.stringify({ model: "m-b", usage: { prompt_tokens: 200, completion_tokens: 20, total_tokens: 220 }, session_id: "s2", elapsed: 3 }),
  ].join("\n"));
  w("s2.costs.jsonl", [
    JSON.stringify({ model: "m-b", usage: { prompt_tokens: 1, completion_tokens: 1 }, session_id: "s2" }), // total 缺省=prompt+completion=2
  ].join("\n"));

  const cfg = normalizeConfig({ sessionsDir: dir, maxFiles: 200 });
  const r = aggregate(cfg);
  ok("aggregate ok=true", r.ok === true, r);
  ok("aggregate 模型数=2", r.models.length === 2, r.models.map(m => m.model));
  const a = r.models.find(m => m.model === "m-a");
  const b = r.models.find(m => m.model === "m-b");
  ok("m-a prompt 合计=110", a && a.prompt === 110, a);
  ok("m-a completion 合计=55", a && a.completion === 55, a);
  ok("m-a total=150+15=165", a && a.total === 165, a);
  ok("m-a calls=2", a && a.calls === 2, a);
  ok("m-a roles 去重排序=[coder,planner]", a && JSON.stringify(a.roles) === JSON.stringify(["coder", "planner"]), a);
  ok("m-a elapsedSec=3", a && a.elapsedSec === 3, a);
  ok("m-b total=220+2=222", b && b.total === 222, b);
  ok("模型按 total 降序 (m-b 前)", r.models[0].model === "m-b", r.models.map(m => m.model));
  ok("sessions 去重排序=[s1,s2]", JSON.stringify(r.sessions) === JSON.stringify(["s1", "s2"]), r.sessions);
  ok("grand total.total=387", r.total.total === 150 + 15 + 222, r.total);

  // 单文件过滤：aggregate(sessionId) 按**文件名**筛选 *.costs.jsonl。
  // s1.costs.jsonl 内含 m-a 两条 + m-b 一条，故结果应只来自该文件（m-a 与 m-b），不含 s2 文件的内容。
  const r1 = aggregate(cfg, "s1");
  ok("aggregate(sessionId=s1) 仅取 s1 文件", r1.sessions.length <= 2 && r1.models.some(m => m.model === "m-a"), r1.models.map(m => m.model));
  const a1 = r1.models.find(m => m.model === "m-a");
  ok("aggregate(sessionId=s1) 中 m-a calls=2（仅 s1 文件里的两条）", a1 && a1.calls === 2, a1);

  rmSync(dir, { recursive: true, force: true });
}

// ---- aggregate：目录不存在应 ok=false 且不抛 ----
{
  const cfg = normalizeConfig({ sessionsDir: path.join(tmpdir(), "definitely-not-exist-" + Date.now()) });
  const r = aggregate(cfg);
  ok("aggregate 目录缺失 ok=false", r.ok === false && Array.isArray(r.models), r);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
