// dsh-token-models — 浏览器半（手写 factory，等价于 tsdown 产物形态）。
// 在会话视图新增一个「Models」标签页，逐模型列出：输入(未命中/缓存读/缓存写)、输出、缓存命中率、步数/等效成本。
// 数据来源：dsh-context 已算好的 `contextTimeline` 投影里的 `cost` 分桶
//   cost = { [provider]: { [model]: { peak?: Bucket, off?: Bucket } } }
//   Bucket = { uncached, cacheRead, cacheWrite, output }
// 该插件不新算任何数据，只做「把已存在的每模型分桶渲染成清单」。
window.__ModuleLoader__.load({
  id: "dsh-token-models",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    const react = require("react");
    const jsx = require("react/jsx-runtime");

    // ---- i18n（最小字典，跟随 locale 服务；未知语言回落 en）----
    const NS = "token-models";
    const dict = {
      en: {
        tab: "Models",
        title: "Per-model token usage",
        empty: "No per-model usage yet — appears once the session has made model requests.",
        model: "Model",
        input: "Input",
        miss: "Uncached",
        hit: "Cache hit",
        write: "Cache write",
        output: "Output",
        hitRate: "Hit rate",
        steps: "Steps",
        total: "Total",
        note: "Source: dsh-context contextTimeline.cost (per-message usage grouped by provider/model). Input = uncached + cacheRead + cacheWrite.",
        orchTitle: "Orchestrator models (orchestrate subprocess)",
        orchPrompt: "Prompt",
        orchCalls: "Calls",
        orchRoles: "Roles",
        orchNote: "Source: langgraph-orchestrator .sessions/*.costs.jsonl via GET /api/token-models/orchestrator-usage. These model calls run inside the orchestrate subprocess and are NOT in the host session's contextTimeline.",
        orchLoading: "Loading orchestrator usage…",
        orchEmpty: "No orchestrator usage recorded yet.",
        orchError: "Failed to load orchestrator usage:",
      },
      zh: {
        tab: "模型",
        title: "每模型 token 用量",
        empty: "暂无每模型数据——会话产生模型请求后出现。",
        model: "模型",
        input: "输入",
        miss: "未命中",
        hit: "缓存读",
        write: "缓存写",
        output: "输出",
        hitRate: "命中率",
        steps: "步数",
        total: "合计",
        note: "口径：dsh-context contextTimeline.cost（按 provider/model 聚合逐条 usage）。输入 = 未命中 + 缓存读 + 缓存写。",
        orchTitle: "编排器模型（orchestrate 子进程）",
        orchPrompt: "输入",
        orchCalls: "调用次数",
        orchRoles: "角色",
        orchNote: "口径：langgraph-orchestrator .sessions/*.costs.jsonl，经 GET /api/token-models/orchestrator-usage 读取。这些模型调用发生在 orchestrate 子进程内，不进宿主会话的 contextTimeline。",
        orchLoading: "正在加载编排器用量…",
        orchEmpty: "暂无编排器用量记录。",
        orchError: "加载编排器用量失败：",
      },
    };

    const fmt = (n) => {
      if (typeof n !== "number" || !Number.isFinite(n)) return "0";
      if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
      if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
      return String(Math.round(n));
    };

    // 从 contextTimeline.cost 展开成每模型行
    function rowsFromCost(cost) {
      if (!cost || typeof cost !== "object") return [];
      const rows = [];
      for (const provider of Object.keys(cost)) {
        const byModel = cost[provider];
        if (!byModel || typeof byModel !== "object") continue;
        for (const model of Object.keys(byModel)) {
          const mu = byModel[model] || {};
          const acc = { uncached: 0, cacheRead: 0, cacheWrite: 0, output: 0 };
          for (const band of ["peak", "off"]) {
            const b = mu[band];
            if (!b || typeof b !== "object") continue;
            acc.uncached += Number(b.uncached) || 0;
            acc.cacheRead += Number(b.cacheRead) || 0;
            acc.cacheWrite += Number(b.cacheWrite) || 0;
            acc.output += Number(b.output) || 0;
          }
          const input = acc.uncached + acc.cacheRead + acc.cacheWrite;
          if (input === 0 && acc.output === 0) continue;
          rows.push({
            key: provider + "/" + model,
            provider,
            model,
            ...acc,
            input,
            hitRate: input > 0 ? acc.cacheRead / input : 0,
          });
        }
      }
      rows.sort((a, b) => b.input + b.output - (a.input + a.output));
      return rows;
    }

    // 从编排器成本端点返回体展开成每模型行（与 rowsFromCost 同构，字段名不同）
    // 端点返回：{ ok, models:[{model, prompt, completion, total, calls, roles}], total }
    function rowsFromOrchestrator(payload) {
      if (!payload || payload.ok !== true || !Array.isArray(payload.models)) return [];
      const rows = [];
      for (const m of payload.models) {
        const prompt = Number(m.prompt) || 0;
        const completion = Number(m.completion) || 0;
        const total = Number(m.total) || prompt + completion;
        if (prompt === 0 && completion === 0) continue;
        rows.push({
          key: "orchestrator/" + (m.model || "(unknown)"),
          model: m.model,
          prompt,
          completion,
          total,
          calls: Number(m.calls) || 0,
          roles: Array.isArray(m.roles) ? m.roles : [],
        });
      }
      rows.sort((a, b) => b.total - a.total);
      return rows;
    }

    // 编排器子模型区块：自己 fetch 端点（不经会话事件日志，数据来自 .costs.jsonl）
    function OrchestratorSection(props) {
      const t = typeof props.t === "function" ? props.t : (k) => (dict.en[k] ?? k);
      const react = props.__react;
      const useState = react.useState;
      const useEffect = react.useEffect;
      const [state, setState] = useState({ loading: true, rows: [], error: null });

      useEffect(() => {
        let alive = true;
        const sessionId = props.sessionId;
        const qs = sessionId ? "?session_id=" + encodeURIComponent(sessionId) : "";
        const url = "/api/token-models/orchestrator-usage" + qs;
        fetch(url, { headers: { accept: "application/json" } })
          .then((r) => r.json().then((body) => ({ ok: r.ok, body })))
          .then(({ ok, body }) => {
            if (!alive) return;
            if (!ok || !body || body.ok !== true) {
              setState({ loading: false, rows: [], error: (body && body.error) || "request failed" });
              return;
            }
            setState({ loading: false, rows: rowsFromOrchestrator(body), error: null });
          })
          .catch((e) => {
            if (alive) setState({ loading: false, rows: [], error: String((e && e.message) || e) });
          });
        return () => {
          alive = false;
        };
      }, [props.sessionId]);

      const cell = { padding: "4px 10px", whiteSpace: "nowrap" };
      const headCell = { ...cell, fontWeight: 600, opacity: 0.7, textAlign: "left", borderBottom: "1px solid var(--dsw-alias-border-neutral, rgba(128,128,128,.25))" };
      const numCell = { ...cell, textAlign: "right", fontVariantNumeric: "tabular-nums" };
      const title = { fontWeight: 600, fontSize: 14, margin: "16px 0 8px" };

      if (state.loading) {
        return jsx.jsx("div", { style: { padding: "4px 8px", opacity: 0.6, fontSize: 12 }, children: t("orchLoading") });
      }
      if (state.error) {
        return jsx.jsx("div", { style: { padding: "4px 8px", opacity: 0.6, fontSize: 12 }, children: t("orchError") + " " + state.error });
      }
      if (state.rows.length === 0) {
        return jsx.jsx("div", { style: { padding: "4px 8px", opacity: 0.6, fontSize: 12 }, children: t("orchEmpty") });
      }
      const tot = state.rows.reduce((a, r) => { a.prompt += r.prompt; a.completion += r.completion; a.total += r.total; return a; }, { prompt: 0, completion: 0, total: 0 });
      const bodyRows = state.rows.map((r) =>
        jsx.jsxs("tr", {
          children: [
            jsx.jsx("td", { style: { ...cell, fontWeight: 500 }, children: r.key }),
            jsx.jsx("td", { style: numCell, children: fmt(r.prompt) }),
            jsx.jsx("td", { style: numCell, children: fmt(r.completion) }),
            jsx.jsx("td", { style: numCell, children: fmt(r.total) }),
            jsx.jsx("td", { style: numCell, children: String(r.calls) }),
            jsx.jsx("td", { style: { ...cell, opacity: 0.7 }, children: r.roles.join(",") }),
          ],
        }, r.key)
      );
      return jsx.jsxs("div", {
        children: [
          jsx.jsx("div", { style: title, children: t("orchTitle") }),
          jsx.jsxs("table", {
            style: { borderCollapse: "collapse", fontSize: 13, minWidth: 620 },
            children: [
              jsx.jsx("thead", {
                children: jsx.jsxs("tr", {
                  children: [
                    jsx.jsx("th", { style: headCell, children: t("model") }),
                    jsx.jsx("th", { style: { ...headCell, textAlign: "right" }, children: t("orchPrompt") }),
                    jsx.jsx("th", { style: { ...headCell, textAlign: "right" }, children: t("output") }),
                    jsx.jsx("th", { style: { ...headCell, textAlign: "right" }, children: t("total") }),
                    jsx.jsx("th", { style: { ...headCell, textAlign: "right" }, children: t("orchCalls") }),
                    jsx.jsx("th", { style: headCell, children: t("orchRoles") }),
                  ],
                }),
              }),
              jsx.jsx("tbody", { children: bodyRows }),
              jsx.jsx("tfoot", {
                children: jsx.jsxs("tr", {
                  style: { borderTop: "1px solid var(--dsw-alias-border-neutral, rgba(128,128,128,.25))", fontWeight: 600 },
                  children: [
                    jsx.jsx("td", { style: cell, children: t("total") }),
                    jsx.jsx("td", { style: numCell, children: fmt(tot.prompt) }),
                    jsx.jsx("td", { style: numCell, children: fmt(tot.completion) }),
                    jsx.jsx("td", { style: numCell, children: fmt(tot.total) }),
                    jsx.jsx("td", { style: numCell, children: String(state.rows.reduce((a, r) => a + r.calls, 0)) }),
                    jsx.jsx("td", { style: cell, children: "" }),
                  ],
                }),
              }),
            ],
          }),
          jsx.jsx("div", { style: { marginTop: 8, fontSize: 11, opacity: 0.6 }, children: t("orchNote") }),
        ],
      });
    }

    // 视图组件：props 由 slot 宿主注入（useProjection / sessionId / t）
    function TokenModelsView(props) {
      const t = typeof props.t === "function" ? props.t : (k) => (dict.en[k] ?? k);
      let cost = null;
      try {
        const proj = typeof props.useProjection === "function" ? props.useProjection("contextTimeline") : undefined;
        cost = proj && typeof proj === "object" ? proj.cost : undefined;
      } catch (e) {
        cost = undefined;
      }
      const rows = rowsFromCost(cost);
      const tot = rows.reduce(
        (a, r) => {
          a.uncached += r.uncached; a.cacheRead += r.cacheRead; a.cacheWrite += r.cacheWrite;
          a.output += r.output; a.input += r.input; return a;
        },
        { uncached: 0, cacheRead: 0, cacheWrite: 0, output: 0, input: 0 }
      );
      const totHit = tot.input > 0 ? tot.cacheRead / tot.input : 0;

      const cell = { padding: "4px 10px", whiteSpace: "nowrap" };
      const headCell = { ...cell, fontWeight: 600, opacity: 0.7, textAlign: "left", borderBottom: "1px solid var(--dsw-alias-border-neutral, rgba(128,128,128,.25))" };
      const numCell = { ...cell, textAlign: "right", fontVariantNumeric: "tabular-nums" };

      if (rows.length === 0) {
        return jsx.jsxs("div", {
          style: { padding: "16px", opacity: 0.7, fontSize: 13 },
          children: [
            jsx.jsx("div", { style: { fontWeight: 600, marginBottom: 6 }, children: t("title") }),
            jsx.jsx("div", { children: t("empty") }),
            jsx.jsx(OrchestratorSection, { __react: react, sessionId: props.sessionId, t }),
          ],
        });
      }

      const bodyRows = rows.map((r) =>
        jsx.jsxs("tr", {
          children: [
            jsx.jsx("td", { style: { ...cell, fontWeight: 500 }, children: r.key }),
            jsx.jsx("td", { style: numCell, children: fmt(r.input) }),
            jsx.jsx("td", { style: numCell, children: fmt(r.uncached) }),
            jsx.jsx("td", { style: numCell, children: fmt(r.cacheRead) }),
            jsx.jsx("td", { style: numCell, children: fmt(r.cacheWrite) }),
            jsx.jsx("td", { style: numCell, children: fmt(r.output) }),
            jsx.jsx("td", { style: numCell, children: Math.round(r.hitRate * 100) + "%" }),
          ],
        }, r.key)
      );

      return jsx.jsxs("div", {
        style: { padding: "12px 8px", overflow: "auto" },
        children: [
          jsx.jsx("div", { style: { fontWeight: 600, fontSize: 14, marginBottom: 8 }, children: t("title") }),
          jsx.jsxs("table", {
            style: { borderCollapse: "collapse", fontSize: 13, minWidth: 560 },
            children: [
              jsx.jsx("thead", {
                children: jsx.jsxs("tr", {
                  children: [
                    jsx.jsx("th", { style: headCell, children: t("model") }),
                    jsx.jsx("th", { style: { ...headCell, textAlign: "right" }, children: t("input") }),
                    jsx.jsx("th", { style: { ...headCell, textAlign: "right" }, children: t("miss") }),
                    jsx.jsx("th", { style: { ...headCell, textAlign: "right" }, children: t("hit") }),
                    jsx.jsx("th", { style: { ...headCell, textAlign: "right" }, children: t("write") }),
                    jsx.jsx("th", { style: { ...headCell, textAlign: "right" }, children: t("output") }),
                    jsx.jsx("th", { style: { ...headCell, textAlign: "right" }, children: t("hitRate") }),
                  ],
                }),
              }),
              jsx.jsx("tbody", { children: bodyRows }),
              jsx.jsx("tfoot", {
                children: jsx.jsxs("tr", {
                  style: { borderTop: "1px solid var(--dsw-alias-border-neutral, rgba(128,128,128,.25))", fontWeight: 600 },
                  children: [
                    jsx.jsx("td", { style: cell, children: t("total") }),
                    jsx.jsx("td", { style: numCell, children: fmt(tot.input) }),
                    jsx.jsx("td", { style: numCell, children: fmt(tot.uncached) }),
                    jsx.jsx("td", { style: numCell, children: fmt(tot.cacheRead) }),
                    jsx.jsx("td", { style: numCell, children: fmt(tot.cacheWrite) }),
                    jsx.jsx("td", { style: numCell, children: fmt(tot.output) }),
                    jsx.jsx("td", { style: numCell, children: Math.round(totHit * 100) + "%" }),
                  ],
                }),
              }),
            ],
          }),
          jsx.jsx("div", { style: { marginTop: 10, fontSize: 11, opacity: 0.6 }, children: t("note") }),
          jsx.jsx(OrchestratorSection, { __react: react, sessionId: props.sessionId, t }),
        ],
      });
    }

    const inject = ["slots", "locale"];

    function apply(ctx) {
      // 注册字典（若 locale 服务可用）
      if (ctx.locale && typeof ctx.locale.register === "function") {
        ctx.effect(() => ctx.locale.register(NS, dict), "token-models: dictionaries");
      }
      // 在会话视图新增一个「模型」标签页，排在 Context/Fleet 之后
      ctx.slots.inject("conversation.view", () =>
        ctx.slots.register(
          { name: "conversation.view", id: "token-models", order: 40, locale: NS, label: () => "Models" },
          TokenModelsView
        )
      );
    }

    exports.TokenModelsView = TokenModelsView;
    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});
