# A-2 上游 issue/PR 草案：为 dsh-memory-plugin 提供 MCP 工具面的可配置/网关化开关

> 目标：让 `@openviking/dsh-memory-plugin` 原生支持「不把 24 个 MCP 工具全部常驻进模型目录」，并可选择由宿主的 MCP gateway 按需代理，同时保留逐会话 peer 作用域语义。以此替代本地 `pnpm patch`，并根治多 peer 部署下的作用域退化。

## 标题
`feat(dsh-memory-plugin): add toolSurface config to gate/route the MCP tool surface (per-session peer preserved)`

---

## 一、问题陈述（为什么要改）

**论据 1 — 工具目录成本**：插件经 `mountOpenVikingMcp()`（`index.mjs`）无条件 `ctx.plugin(mcpClient, buildMcpConfig(config))`，把 24 个 MCP 工具全量挂进**每一步请求**的模型工具目录。实测这 24 个工具的 JSON schema 合计 **33,790 字节 ≈ 8.4k tokens**，在一个约 16.3k tokens 的工具目录里占 **约 52%**。对绝大多数会话，其中 `add_resource`/`add_skill`/`write`/`set_acl`/`privacy_*`/`list_users`/`list_watches` 等为低频维护类，却每步固定重发。

**论据 2 — 已有同类先例**：DSH 的 dbx / context-mode MCP 服务早已改由宿主 `dsh-mcp-gateway` 提供**单一入口工具**（≈826 字符），首次调用才拉起子进程、按需 `tools/list`。插件当前是**唯一逆行的直连常驻**，与宿主既定优化方向不一致。

**论据 3 — 无配置开关**：`config.mjs`/`mcp-env.mjs` 只暴露连接/recall/超时等旋钮，**没有** `toolSurface`/`toolFilter` 之类的开关或白名单。用户若想把工具面改由网关提供，只能 fork/`pnpm patch` 插件（维护成本高、升级即失效），或接受 8k tokens/步 的固定开销。

---

## 二、建议的 API 形态

优先方案（最小面）——新增 `toolSurface` 配置项：

```ts
toolSurface?: 'direct' | 'gateway' | 'off'   // 默认 'direct'（保持后向兼容）
```

语义：
- `'direct'`（默认）：现状，插件内部经 `mcpClient` 挂全量工具；`recallPeerScope` 按现有逻辑生效。
- `'off'`：**不挂 MCP 工具面**，只保留记忆旁路（capture/recall/commit/skills/profile 注入）。工具由外部另行提供（例如宿主 gateway）。改动仅需在 `apply()` 里用 `toolSurface !== 'off'` 守卫 `mountOpenVikingMcp()`。
- `'gateway'`：**推荐**——插件不挂直连工具，而是向外暴露其 stdio proxy 入口（`servers/mcp-proxy.mjs`）供宿主注册为 gateway server；**关键**：每次 MCP 调用要携带**逐会话 `actorPeerId`**，以在多 peer 部署下保持 actor 作用域（见副作用 2）。

补充（更强、面向多租户）——可选 `toolFilter`：
```ts
toolFilter?: string[]   // 白名单，仅暴露列出的 raw tool name；缺省=全部
```
用于只暴露高频子集（如 `find/search/read/tree/list/remember/write`），把维护类工具延后或关闭。

**兼容性**：三项均可选，缺省行为与现状完全一致，不破坏现有安装。

---

## 三、副作用与设计约束

1. **记忆旁路必须独立于工具面**：capture/recall/commit/skills 当前走 in-process `runtime.mjs`/`client.mjs`（HTTP `127.0.0.1:1933`），与 MCP 工具面相互独立——这使 `'off'`/`'gateway'` 能只剥离工具面而不伤记忆。请保持这一边界。
2. **per-session peer 语义（核心难点）**：当 MCP 工具由**单一长驻进程**（如 gateway）承载时，该进程无法从启动目录派生逐会话 peer；`resolveMcpActorPeerId()` 在拿不到显式 peer 时会退化为 broad（`all`）召回。**`toolSurface='gateway'` 模式必须由插件/宿主把每个会话的 peer 透传进每次 MCP 调用**（header 或 per-call 参数），否则多 peer 场景会跨租户可见。这是本地 workaround 无法解决的问题，也正是需要上游原生支持的原因。
3. **默认安全**：`'direct'` 默认、未知值告警并回退 `'direct'`，避免静默行为变化。

---

## 四、验收标准
- `toolSurface='off'` 时：新会话模型目录**不含** `mcp__openviking__*`；记忆 recall/capture/commit 正常。
- `toolSurface='gateway'` 时：工具经宿主 gateway 按需可用；**跨 workspace 的 actor 隔离保持**（多 peer 下 A 写的标记 B 搜不到）。
- 现有默认（不配置）行为逐字节不变。

---

## 五、本地 workaround 现状（供参考）
时间 2026-11-13。本地已用 `pnpm patch` 实现 `toolSurface: 'direct'|'off'` 的最小版（仅 gate `mountOpenVikingMcp`），并把 openviking 的 stdio proxy 注册为宿主 gateway server。实测：工具目录 16,327 → 9,142 tokens（降 44%）；功能全通；**唯多 peer 下显式工具调用作用域退化为 broad**（自动召回不受影响）。一旦上游提供原生开关，本地 patch 将删除并按上游语义迁移。故本 issue 也是本地 workaround 的**退出条件**。
