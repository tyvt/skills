---
status: approved
human_confirmed: false
risk: low-medium
review_override: false
session: context-fixed-overhead-p1a-batch2
approved_sha256: 46a7d27e8b99d7695cf6659fbe2a34f0d34d6d16d5961f2110c68fd44705e1f8
approved_version: 4
title: P1(A) 批 2 — 裁剪 session_query + workflow（profile 级）
---

# P1(A) 批 2：裁剪 session_query + workflow 工具组

> 迭代稿：已按用户决策定稿（见 §0），本轮送 plan_review。承接批 1（schedule+goal 已落地验证闭环，见 [p1a-trim-heavy-tools-20261114.md](p1a-trim-heavy-tools-20261114.md) §六）。

## §0 决策定稿（用户 2026-11-14 拍板）
1. **session_query 全局禁用**：顶层 `optional-tool-session-query` `disabled: true`，**full-tools 也不保留** session_query（8.8% 低频，不为其单独兜底）。
2. **workflow**：preset-standard 内 `tool-workflow` `disabled: true`；full-tools 保留（full-tools 复制 standard 但本批不在其加 disabled）。
3. **现在实施**，走同批 1 流程：plan_review → 人工确认 → 备份 → 重启 → 新会话验证 A/B/B'/D/E。

## 一、前因后果（≤3 句）
- 批 1 已省 schedule+goal ≈1,275 token/步。批 2 继续裁第 5、6 组重型低频工具：`session_query`（session_search/session_event_*）与 `workflow`。
- 使用率：session_search 8.8% / session_event_* 1.5% / workflow 0.7%（729 会话实测）。
- 目标：再省 ≈2,100 token/步；同样用 full-tools 预设做可达路径兜底，默认 standard 精简。

## 二、现状与证据（文件:行号/字段，均经 `--dump-config` 核验）

| 工具组 | token/步 | 使用率 | 落点（dump-config 实测） | 关闭机制 |
|---|---|---|---|---|
| workflow | 848 | 0.7% | `tool-workflow` **在一个 preset-standard 块内**（composed L1190，标准块 L1001-1211）；顶层 L650 的 tool-workflow 已被 web-app `disabled:true`（host-plane） | 在 **preset-standard 内** `tool-workflow` 加 `disabled: true` —— 同批 1 schedule/goal 的成熟机制 |
| session_query（session_search + session_event_*） | ~1,254 | 8.8%/1.5% | `optional-session-search`（顶层 group，composed L1873，由 `dsh-experimental-session-search` bundle insert）→ 内嵌 `optional-tool-session-query`（L1884） | 顶层 `- id: optional-tool-session-query / disabled: true` —— **已用 `--patch` overlay 实测生效**（dump 显示 disabled:true，无 patch 错误） |

**已核验证据：**
- batch2 落点均来自 `dsh web --dump-config` 组合树（与批 1 同一权威口径）。
- `optional-tool-session-query` 顶层禁用：`--patch <临时overlay>` 实测 dump 里变 `disabled: true`、无 `entry not found`。
- `tool-workflow` 在 preset-standard 块内（composed L1190）→ 沿用批 1 "preset 内 disabled" 机制（批 1 已实证有效）。
- 批 1 复盘教训：新条目用 `insert:`；preset 内 disabled 对 bundle 定义的 preset 有效（config 合并）。

## 三、实施方案（同批 1 模式，先建可达路径则已有 full-tools）

> full-tools 预设已在批 1 建好（复制 standard 全插件、schedule/goal 启用）。批 2 不改 full-tools 块：其 **workflow 保留**；session_query 因顶层全局禁用而 full-tools 也不含。

- **B2-1 workflow**：在 **preset-standard 块内** `- id: tool-workflow`（按 id 定位）加 `disabled: true`。不动 ptc/minimal/cordis/full-tools。
- **B2-2 session_query（全局禁用）**：**顶层** `- id: optional-tool-session-query` 加 `disabled: true`（不动 group 本身）。顶层禁用作用于所有预设 → **full-tools 也不含 session_query**（决策 1，接受其 8.8% 低频场景切走或临时无该能力）。
- 可达路径：full-tools 恢复 **workflow**（来自其复制 standard 且本批不改 full-tools）。session_query 全局摘除、无兜底。

## 四、验证计划（可执行断言）

> 前置：重启 dsh web → 开**全新**会话（旧会话工具目录冻结，勿用）。读 `contextHeaders.val.headers[0].tools` 与 `contextBreakdown.val.breakdown.toolsTokens`。

- **断言 A（目标工具消失）**：新 standard 会话 `tools` 内**无** `workflow`，且**无**这 5 个（`dsh-tool-session-query` 注册的全部，源码 lib/index.js L955-998 核验）：`session_search`、`session_event_search`、`session_trace`、`session_event_trace`、`session_event_read`。失败判据：任一仍在→配置未生效或 plugin id 不对。
- **断言 B（token 下降，绝对区间）**：新 standard 会话 `toolsTokens` 落在 **7,000~7,600**（对标批 1 后 standard 8,025 − 预期 2,100 →约 5,925… 亦可能因基线波动；**主判据=回归到"删除工具后的稳定值"，实施后先记录一次实测值作为新基线**，并核对恰是 workflow(848)+会话 5 工具(~1,254)消失）。用 `token-optimizer` 复核。
- **断言 B'（不该动的仍在）**：`team_task_*` / `spawn_teammate` / `pwsh`/`read`/`edit`/`grep`/`glob` / `mcp_gateway` 仍在（未误伤）。
- **断言 D（full-tools 双向）**：切 `full-tools` → **`workflow` 工具重现**；且 **`session_query` 5 工具仍无**（全局禁用，full-tools 也不含，验证决策落地）。
- **断言 E**：抽样历史会话重放，核心工具无变化。
- 未跑构建项写明原因。

## 五、决策已定
1. session_query：**全局禁用，full-tools 不保留**（顶层 `optional-tool-session-query` disabled，摘除其注册的 5 个 session_* 工具）。
2. workflow：standard 禁、full-tools 保留。
3. 现在实施，走同批 1 流程（plan_review → 人工确认 → 备份 → 重启 → 新会话验证）。

**实施落点澄清（P2）**：本批**只改 `~/.dsh/profiles/web/cordis.patch.yml` 一个文件**；"不动 cordis" 指**不改 `preset-cordis` 预设块**，不是不改该文件。已有条目（`tool-workflow`@standard、`optional-tool-session-query`@顶层）**只加 `disabled: true`**；无新条目（不像批 1 需要 insert:）。

## 六·补 回滚
- 变更仅落 `~/.dsh/profiles/web/cordis.patch.yml`（非 git）；实施前复制 `cordis.patch.yml.bak-b2-<ts>`，失败则还原备份 + 重启。
- 或去 standard 内 `tool-workflow` 的 disabled + 去顶层 `optional-tool-session-query` 的 disabled + 重启。

## 七、实施阻塞记录（2026-11-14，workflow 部分暂停）
- 已实施 session_query（B2-2）侧无问题；但 **workflow（B2-1）遇到阻塞**：
  - 事实：批 1 干净态文件里 preset-standard 的 `tool-workflow` **已是 `disabled: true`**（DSH 启动时对 profile 文件做 reconcile/重写所致，非我改的），但实测批 1 新会话 `794ca361`（14:56）**仍挂载 `workflow` 工具（852 token）**。
  - 即：文件层面 disabled ≠ 会话实际工具目录。`workflow` 工具的来源未被 standard 内 `tool-workflow` disabled 摘除 —— 疑似由 DSH boot reconcile 或其它层（顶层 web-app tool-workflow / preset 合并）重新提供。
  - 结论：**workflow 单靠"preset 内 tool-workflow disabled"无效**，需专门溯源（禁用后新会话是否真消失要 live 验），不宜仓促改。
- **建议拆分**：先落地 **session_query（已 `--patch` overlay 验证可摘除 5 个工具）**；**workflow 单独开一个微调研再处理**。
- 当前文件已回滚到批 1 干净态（`.bak-b2-20261114152247`，diff=0）。

## 八、session_query 实施结果（2026-11-14，已实施待 live 验证）
- 用户决策：**先只实施 session_query，workflow 暂停**。
- 已实施：`~/.dsh/profiles/web/cordis.patch.yml` 顶层追加 `- id: optional-tool-session-query / disabled: true`（备份 `.bak-b2sq-20261114152739`）。
- `--dump-config` 验证：`optional-tool-session-query` = `disabled: true`，无 patch 错误，full-tools 仍在；YAML 合法（24 条）；语义 diff 0 删除行。
- **live 验证待重启 + 新会话**：断言 A=新会话 tools 无 `session_search`/`session_event_search`/`session_trace`/`session_event_trace`/`session_event_read`（dsh-tool-session-query 注册的全部 5 个）；B'=team_task/spawn/pwsh/read/edit/grep/glob/mcp_gateway 仍在；预计 toolsTokens 降 ≈1,254。
