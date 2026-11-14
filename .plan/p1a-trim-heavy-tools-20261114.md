---
status: approved
human_confirmed: true
risk: medium
review_override: false
session: context-fixed-overhead-p1a
approved_sha256: 74b9fb2e3a2def4f229b7f78e69e48004fe82c954374e527842fb0ccaff52866
approved_version: 3
title: P1(A) 裁剪重型低频工具组 + 补齐可达路径（profile 级）
---

# P1(A)：profile 级裁剪重型低频工具组 + 可达路径兜底

> 迭代稿：已按用户三点决策定稿（见 §0），本轮送 plan_review。

## §0 决策定稿（用户 2026-11-14 拍板）
1. **team_task（1.5k）= 方案 X：不动、认掉**。`tool-agent-team` 与 spawn/send 同插件，不为省 1.5k 破坏 25% 使用率的团队能力；不追求该 1.5k。
2. **可达路径 = full-tools 预设切换兜底**：新增继承 standard 且重新启用被关组的 `full-tools` 预设，显式切该预设时才装载被裁工具组；不做运行时热切。
3. **落地节奏 = 批 1 先行**：批 1（schedule + goal）落地并验证无回归后，再做批 2（session_query + workflow）。两批各自可独立回滚。

## 一、前因后果（≤3 句）
- 每步固定重发 tools 中位 ~12.7k token，其中约 69%（~6k/步）来自 `team_task_*`/`schedule_*`/`session_event_*`/`session_search`/`workflow`/`goal` 六组重型工具。
- 这六组真实使用率仅 0.7%–8.8%（729 会话实测），绝大多数会话白背这些定义。
- 目标：把它们从**主会话（standard 预设 + 顶层 bundle）**移除，省 ~6k token/步；同时保留"需要时可触达"的路径，零功能损失。

## 二、现状与证据（文件:行号/字段）

**六组工具来源（关键结构事实）：**
| 工具组 | token/步 | 真实使用率 | 提供方（落点） |
|---|---|---|---|
| team_task_* | 1,512 | 3.8% | `dsh-experimental-agent-team-profile` bundle insert `tool-agent-team`（`dsh-experimental-tool-agent-team/lib/index.js:365` 等，与 spawn/send 同插件） |
| schedule_* | 1,495 | 1.4% | preset 内 `tool-schedule`=`@deepseek-ai/dsh-tool-schedule`（profile L132-133 / L369-370 / L716-717 三处） |
| session_search + session_event_* | ~1,254 | 8.8% / 1.5% | `dsh-experimental-session-search` bundle insert 组 `optional-session-search`→`optional-tool-session-query`（bundle cordis.patch.yml:1-14） |
| workflow | 848 | 0.7% | preset 内 `tool-workflow`=`@deepseek-ai/dsh-tool-workflow`（profile L289-290 / L521-522 / L863-864） |
| goal | 433 | 5.9% | preset 内 `tool-goal`=`@deepseek-ai/dsh-tool-goal`（profile L142-143 / L377-378 / L720-721） |

**已核验证据：**
- 使用率来自 projcache `contextTimeline.val.toolTally` 全 729 会话统计（见调研报告 [context-fixed-overhead-audit-20261114.md](context-fixed-overhead-audit-20261114.md) §2.2）。
- profile patch 在 bundle 之后应用，可直接用 `id:` 命中 bundle 插入项（`~/.dsh/mcp-gateway/cordis.patch.yml:5-6` 注释确认顺序）。
- 已有 `disabled:true` 关闭 plugin 的成熟先例：`tool-plugin-manager`/`tool-plugin-market`（profile L304-309）、`tool-subagent*`（L266-284）。
- `tool-agent-team` 组合了 spawn_teammate/send_message（使用率 25%）与 team_task_*（3.8%），**不可按工具拆**（单插件，`lib/index.js`）。

## 三、实施方案（分批、可独立回滚）

> 原则：**批 1 先做、验证过再做批 2**。每批"改完重启 dsh web → 新会话"验证。team_task 按决策 X 不动。可达路径统一由新增 `full-tools` 预设兜底（继承 standard + 重新启用被裁组）。

**批 1（本次实施范围）**

> 落实审阅 P1：①按**插件 id 锚点**定位（不靠行号，B1-0 插入会使行号下移）；②**只改 preset-standard**——已核实 L369-370 属 preset-ptc、L716-717 属 preset-cordis，是**不同预设、非 standard 副本**，误禁会连带砍掉 ptc/cordis 的 schedule/goal，故不动。

- **B1-0（先行）新增 full-tools 预设**：落 `~/.dsh/profiles/web/cordis.patch.yml`，**在 `- id: preset-standard`（L99）块整体结束之后插入**：
  - 结构：`- id: preset-full-tools` / `name: '@deepseek-ai/dsh-agent-preset'` / `config.id: full-tools` / `config.order: 5`（沿用 preset-standard L99-103 结构）；
  - **注册机制（已核验）**：preset 由 `dsh-agent-preset/index.js:25` 的 `ctx.agentPresets.register(this.config)` **自注册**——新增 `- id: preset-full-tools` 块即被自动发现并可选，**无需** 往 `agent-preset-registry`（L311-314，仅含 default/selectedDefault）追加枚举。default/selectedDefault 保持 standard 不变。
  - **id/order 冲突（已核验）**：全表唯一 preset id 为 standard/ptc/minimal/cordis，`order` 用 1/2/3/4，**无 order:5、无 full-tools** → order:5 与本 id 均空闲。
  - **复制语义（明确）**：**逐条完整复制 preset-standard 的全部 plugins 并保留各自原有的 `disabled` 标记**（含有意禁用的 tool-subagent*、tool-plugin-manager、tool-plugin-market、bash-on-win32，切勿在 full-tools 里重开），**唯一差异 = full-tools 内 tool-schedule 与 tool-goal 不加 disabled**（即这两组在 full-tools 启用）。
- B1-1 `tool-schedule`：**只在 preset-standard 块内**（`- id: tool-schedule`，按 id 定位，当前 L132-133）加 `disabled: true`。**不动 preset-ptc(L369-370)/preset-cordis(L716-717)**。
- B1-2 `tool-goal`：**只在 preset-standard 块内**（`- id: tool-goal`，按 id 定位，当前 L142-143）加 `disabled: true`。不动 ptc/cordis。
- 影响：仅 standard（默认预设）本会话失去 schedule/goal 工具。schedule 1.4%、goal 5.9%；command-goal(L140-141) 保留，/goal 命令仍可用、不依赖 tool-goal。
- 在途 schedule：禁用只移除"创建/管理定时任务"工具，已在途任务由 side 调度器继续执行；如需查询/取消，切 `full-tools` 后用 `schedule_list`/`schedule_delete`。

**批 2（需可达路径；批 1 验证通过后再做，本次不改）**
- B2-1 session_query：顶层 `id: optional-tool-session-query` `disabled: true` 关闭（按 id 定位）。可达路径：`full-tools` 预设重新启用。
- B2-2 workflow：`tool-workflow`（按 id 定位，当前 L289-290）`disabled: true`。可达路径：`full-tools` 预设重新启用；日常编排由 `orchestrate`/`spawn_teammate` 承担（workflow 仅 0.7%）。
- **不处理 team_task**：按决策 X，`tool-agent-team` 保持不动（与 spawn/send 同插件），承认 team_task 1.5k 不省。

**可达路径兜底 = full-tools 预设（唯一路径）**
- 在 `~/.dsh/profiles/web/cordis.patch.yml` 新增 `full-tools` 预设（见 B1-0），作为唯一可达路径。
- 用户需要 schedule/goal/session_query/workflow 时显式切到 `full-tools`；默认 standard 保持精简。
- **不用** config 运行时热切（deferLoading 在 magpie 路由被剥，见 cordis.patch.yml:78-79）。

## 四、验证计划（可执行断言）

> 前置：每次改 profile 后**重启 dsh web → 开新会话**（绝不在长会话中途改）。读 `contextHeaders.val.headers[0].tools` 与 `contextBreakdown.val.breakdown.toolsTokens`。

- **断言 A（本批目标工具消失）**：standard 新会话 `tools` 名称集合内 `schedule_create/delete/list/update/view/edit` 与 `create_goal/update_goal/get_goal` **均不存在**。失败判据：任一仍在 → 配置未生效，查预设块归属与 disabled 落点。
- **断言 B（token 下降）**：新会话 `toolsTokens` 相比批 1 前基线（standard 约 9,825）**下降 1,928，容差按逐工具精确值 ±10%（−1,735 ~ −2,121 区间）**；不达标→核对实际消失的正是 schedule_*(1,495)+goal(433)。用 `node ~/.dsh/skills/token-optimizer/analyze.mjs` 复核中位。
- **断言 B'（不该动的仍在）**：standard 新会话 `tools` 内 **`session_search`/`session_event_*` 仍在、`workflow` 仍在、`team_task_*` 与 `spawn_teammate` 仍在**（批 1 不碰这些；若消失=误禁相邻插件）。同时 `toolsTokens` 未因误删出现超出断言 B 区间的额外下降。
- **断言 C（command-goal 真正执行）**：新会话实际发一次 `/goal` 并确认返回 goal 状态/列表（不止"命令仍注册"），确认命令入口不依赖 tool-goal。
- **断言 D（full-tools 可达 + 无冲突）**：切 `full-tools` 预设开新会话 → 预设可正常加载（无 id/order 冲突报错）、`tools` 内重新出现 schedule_*/goal 且 `toolsTokens` 回升 ≈基线；实际调 `schedule_list` 成功返回。
- **断言 E（未误伤核心工具）**：抽样 10 个历史会话重放，确认 pwsh/read/edit/grep/glob/team(spawn) 等必需工具数量与能力无变化。
- 未跑构建项写明"未执行+原因"。

## 四·补 回滚与在途 schedule 边界
- 变更仅落 `~/.dsh/profiles/web/cordis.patch.yml`（受 git 管理）：`git checkout -- cordis.patch.yml`（或 `git revert`）即回退；重启 dsh web 恢复。
- 若某 disabled 未生效/预设缺失致异常：删除新增 `preset-full-tools` 块 + 去掉 standard 内两处 disabled 即回改动前。
- **在途 schedule 判据与恢复**：**禁用前**先在 full-tools 预设验证 `schedule_list` 与 `schedule_delete`（取消）可正常用；若当前无在途 schedule，**先造一条一次性 schedule（1–2 分钟触发）做样本**，再执行 standard 禁用。禁用后抽查该样本是否按点触发、能否经 full-tools 取消——若不再触发或无法取消，判回归 → `git revert cordis.patch.yml` + 重启 dsh web 恢复 schedule 工具。

## 五、决策已定（不再待定）
1. team_task：**方案 X 不动**（认掉 1.5k）。
2. 可达路径：**full-tools 预设切换**。
3. 节奏：**批 1 先行**，验证通过再做批 2。批 1 **只改 preset-standard**，不动 ptc/minimal/cordis。
