// dsh-token-models — 服务端半。
// 浏览器侧「每模型 token」面板的数据来源有两路：
//   1) dsh-context 的 `contextTimeline.cost` 投影（宿主会话内主 agent + teammate 的逐模型 usage）；
//   2) 本服务端半新增的 HTTP 端点，读取 langgraph-orchestrator 的 `.sessions/*.costs.jsonl`，
//      把 **orchestrate 子进程**里跑的多模型 usage 也暴露给前端 —— 这部分不进会话事件日志，
//      此前面板看不到，正是本端点要补的缺口。
//
// 端点：GET /api/token-models/orchestrator-usage[?session_id=<id>]
//   返回 { ok, dir, sessions, models: [{model, prompt, completion, total, calls, elapsedSec, roles}], total }
//   - 不带 session_id：聚合该目录下所有 *.costs.jsonl；
//   - 带 session_id：只聚合 <session_id>.costs.jsonl（文件名匹配）。

import { readdirSync, readFileSync } from "node:fs";
import { join, basename } from "node:path";

export const name = "dsh-token-models";

// 依赖 webServer 服务注册 HTTP 路由；cordis 会等该服务就绪后再调用 apply（与 orchestrator-gate 同款）。
export const inject = ["webServer"];

const DEFAULT_SESSIONS_DIR = "D:\\repository\\skills\\dsh\\langgraph-orchestrator\\.sessions";

function normalizeConfig(input) {
  return {
    // 编排器成本日志目录（含 *.costs.jsonl）。可在 cordis.patch.yml 覆盖。
    sessionsDir:
      typeof input?.sessionsDir === "string" && input.sessionsDir.trim() !== ""
        ? input.sessionsDir.trim()
        : DEFAULT_SESSIONS_DIR,
    // 单次返回的最大文件数（防目录爆炸）。
    maxFiles: Number.isFinite(input?.maxFiles) && input.maxFiles > 0 ? Math.floor(input.maxFiles) : 200,
  };
}

/** 解析一行 JSON，容错。 */
function safeParse(line) {
  try {
    return JSON.parse(line);
  } catch {
    return null;
  }
}

/**
 * 读取并聚合 .costs.jsonl。
 * 每行形如：{ts, session_id, role, tool, model, ok, elapsed, usage:{prompt_tokens,completion_tokens,total_tokens}}
 * 按 model 聚合 prompt/completion/total/calls/roles。
 */
function aggregate(config, sessionId) {
  let files = [];
  try {
    files = readdirSync(config.sessionsDir).filter((f) => f.endsWith(".costs.jsonl"));
  } catch (e) {
    return { ok: false, dir: config.sessionsDir, error: String(e?.message ?? e), models: [], sessions: [], total: emptyTotals() };
  }
  if (sessionId) {
    const want = sessionId.endsWith(".costs.jsonl") ? sessionId : `${sessionId}.costs.jsonl`;
    files = files.filter((f) => f === want || basename(f, ".costs.jsonl") === sessionId);
  }
  files = files.slice(0, config.maxFiles);

  const byModel = new Map();
  const sessions = new Set();
  for (const file of files) {
    let text;
    try {
      text = readFileSync(join(config.sessionsDir, file), "utf8");
    } catch {
      continue;
    }
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (line === "") continue;
      const rec = safeParse(line);
      if (!rec || typeof rec !== "object") continue;
      const model = typeof rec.model === "string" ? rec.model : "(unknown)";
      const u = rec.usage ?? {};
      const prompt = Number(u.prompt_tokens) || 0;
      const completion = Number(u.completion_tokens) || 0;
      const total = Number(u.total_tokens) || prompt + completion;
      // 单次调用耗时（秒）；缺失或非有限值按 0 累加，杜绝 NaN 污染。
      const elapsed = Number.isFinite(Number(rec.elapsed)) ? Number(rec.elapsed) : 0;
      let m = byModel.get(model);
      if (!m) {
        m = { model, prompt: 0, completion: 0, total: 0, calls: 0, elapsedSec: 0, roles: new Set() };
        byModel.set(model, m);
      }
      m.prompt += prompt;
      m.completion += completion;
      m.total += total;
      m.calls += 1;
      m.elapsedSec += elapsed;
      if (typeof rec.role === "string") m.roles.add(rec.role);
      if (typeof rec.session_id === "string") sessions.add(rec.session_id);
    }
  }

  const models = [...byModel.values()]
    .map((m) => ({ model: m.model, prompt: m.prompt, completion: m.completion, total: m.total, calls: m.calls, elapsedSec: m.elapsedSec, roles: [...m.roles].sort() }))
    .sort((a, b) => b.total - a.total);

  const total = models.reduce(
    (a, m) => {
      a.prompt += m.prompt;
      a.completion += m.completion;
      a.total += m.total;
      a.calls += m.calls;
      a.elapsedSec += m.elapsedSec;
      return a;
    },
    emptyTotals()
  );

  return { ok: true, dir: config.sessionsDir, sessions: [...sessions].sort(), models, total };
}

function emptyTotals() {
  return { prompt: 0, completion: 0, total: 0, calls: 0, elapsedSec: 0 };
}

/** 极简 CORS + JSON 响应。 */
function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type",
  });
  res.end(body);
}

export function apply(ctx, raw) {
  const config = normalizeConfig(raw);
  ctx.logger?.info?.(`[dsh-token-models] loaded; orchestrator usage endpoint ready (dir=${config.sessionsDir})`);

  // 注册 HTTP 路由（webServer 已在 inject 中声明，正常必可用）。
  const webServer = ctx.webServer ?? ctx.get?.("webServer");
  if (webServer && typeof webServer.register === "function") {
    const path = "/api/token-models/orchestrator-usage";
    const dispose = webServer.register({
      kind: "exact",
      path,
      handler: async (req, res) => {
        try {
          if (req.method === "OPTIONS") {
            sendJson(res, 204, {});
            return;
          }
          if (req.method !== "GET") {
            sendJson(res, 405, { ok: false, error: "method not allowed" });
            return;
          }
          const url = new URL(req.url ?? path, "http://x");
          const sessionId = url.searchParams.get("session_id") ?? undefined;
          const result = aggregate(config, sessionId);
          sendJson(res, result.ok ? 200 : 500, result);
        } catch (e) {
          sendJson(res, 500, { ok: false, error: String(e?.message ?? e) });
        }
      },
    });
    ctx.effect?.(() => dispose, "token-models: orchestrator-usage route");
    ctx.logger?.info?.(`[dsh-token-models] route registered: GET ${path}`);
  } else {
    ctx.logger?.warn?.(`[dsh-token-models] webServer service not available; orchestrator-usage endpoint NOT registered`);
  }
}

// 供 selftest 直接调用
export { aggregate, normalizeConfig };
