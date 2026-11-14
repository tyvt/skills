# P0 闭环验证签核记录 — OpenViking 工具收编 mcp-gateway（A-1）

- 日期：2026-11-14
- 对应计划：[.plan/A1-openviking-gateway.md](A1-openviking-gateway.md)（status: approved / human_confirmed: true / review PASS 82/100）
- 结论：**P0 已落地并生效，闭环验证通过。无需再实现。**

---

## 一、口径注脚（重要，防误读）

本次"每轮固定上下文优化调研"报告 [context-fixed-overhead-audit-20261114.md](context-fixed-overhead-audit-20261114.md) 中出现的
**"38%（276/731）会话仍带 `mcp__openviking__*` 内联工具、每步 +4,697 token"** ——
**这是 P0 生效（配置 mtime 2026-11-14 14:08）之前的历史数据，不是现状。**

- 全部 276 个带内联 OV 工具的会话，最新文件 mtime 停在 **2026-11-13 14:22**（早于 P0 配置生效）；
- P0 生效后（>14:08）的全部会话，工具数 **统一 46、内联 OV 工具 = 0**（见验证①）。
- 故该 38% 应读作"P0 前历史浪费已识别并已由 A-1 修复"，**现状无该浪费**。

---

## 二、验证清单（四项）

### ① toolSurface:off 生效 — 通过
- 证据：`~/.dsh/profiles/web/node_modules/@openviking/dsh-memory-plugin/index.mjs:113-121`
  已有 `[patch A-1 ovgw]` 闸门：`const surface = input.toolSurface ?? "direct"; if (surface !== "off") mountOpenVikingMcp(ctx, config);`
- 配置：`~/.dsh/profiles/web/cordis.patch.yml:62` `toolSurface: "off"`。
- 实测：P0 生效后新会话（36640a2f / 39e84ea8 / 70d2180c / da8f538e）工具数均 **46**、`mcp__openviking__*` 计数 **0**、仅 `mcp_gateway`(269 tok)；`toolsTokens≈9,825`（对比 P0 前带 24 工具时 14k+）。

### ② 记忆 recall / commit 不受影响 — 通过
- 实测 post-config 会话 70d2180c 原始日志（460 行）：openviking 引用 95、recall 35、commit 31；
  profile/context 注入正常 splice（`<openviking-context source="profile">`）。
- 说明：`toolSurface:"off"` 只剥离 **MCP 工具面**（24 个手动工具），记忆的 capture/recall/commit/skills/profile 由 in-process runtime 走 HTTP `127.0.0.1:1933`，独立不受影响。`/health` = `{status:ok, healthy:true}`。
- gateway 代理链路可用：`mcp_gateway(server=openviking, tool=list)` 正常返回目录。

### ③ 跨 workspace peer 隔离探针 — 记录为"已知设计取舍，未无污染重做"
- A-1 计划 R1 已实测记录：gateway 单进程 proxy 无逐会话 peer，`recallPeerScope` 退化为 broad；
  **仅影响"模型主动调 openviking 工具"路径**，每步自动召回/写入走 in-process runtime，仍严格 actor 作用域。
- `servers/mcp-proxy.mjs:25-28` 注释印证：broad recall 模式下 actor header 故意不设，避免跨 workspace 误缩窄。
- **未在本会话重做 S4b 三控探针的原因**：S4b 需两个不同 workspace peer 各写唯一标记互查；
  本会话是单 workspace，写入测试标记会污染共享记忆库（影响后续 recall），收益不抵风险。
- **风险定性**：dev 单 peer 环境无实际跨 workspace 泄漏；多 peer 生产的根治在 A-2 上游原生 `toolSurface='gateway'`（已在 A-1 计划列为退出条件/后续项）。**本项维持 A-1 既有结论，不新增回退。**

### ④ 签核记录 — 本文件

---

## 三、回退条件（沿用 A-1）
- 任一异常：`input.toolSurface` 改回 `'direct'` 即恢复直连（actor scope 完整）。
- 插件升级令 patch 失效：优先采用上游带开关版本，删 `patchedDependencies` 重装（A-2 退出条件）。

## 四、遗留 / 后续
- A-2 上游：给 `@openviking/dsh-memory-plugin` 提 `toolSurface?: 'direct'|'gateway'|'off'` 或 `toolFilter` 原生项，满足后弃用本地 pnpm patch。
- 多 peer 生产前：以 A-2 原生 gateway surface 消除 broad 退化（根治跨 workspace 隔离）。
