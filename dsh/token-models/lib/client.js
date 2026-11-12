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
          children: [jsx.jsx("div", { style: { fontWeight: 600, marginBottom: 6 }, children: t("title") }), jsx.jsx("div", { children: t("empty") })],
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
