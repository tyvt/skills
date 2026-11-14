# 每轮固定上下文（工具定义等）优化调研与方案

> 数据源：`~/.dsh/storages/session_projcache/sessions/*.json`（731 有效会话 / 75,055 steps / 2,434 turns）+ profile 配置 `~/.dsh/profiles/web/cordis.patch.yml` + 代码 checkout。全部只读核对，公式已验证（toolsTokens 复算与 projcache 完全吻合）。

---

## 一、先说结论

1. **每轮真正"固定重发"的是 tools + system，合计约 11–16k token/步**，在 75,055 步上被反复计费（多数命中缓存）。这是"工具定义每轮都带"的实体。
2. **tools 中位 ≈ 12.7k token，其中约 69%（≈6k token/步）来自 5 组"绝大多数会话用不到"的重型工具**：`team_task_*`、`schedule_*`、`session_event_*`、`session_search/trace`、`workflow`、`goal`。这些组真实使用率仅 **0.7%–8.8%**。
3. **`workflow` 单工具 848 token，729 个会话只用了 5 次（0.7%）**；`schedule_*` 4 工具 1,495 token，用了 10 次（1.4%）。纯占位。
4. **OpenViking MCP 存在"回退膨胀"**：38%（276/731）会话把 24 个 `mcp__openviking__*` 单独工具重新注入，每步 +4,697 token（14,102 vs 9,405），而 `mcp_gateway` 单入口（246 token）本已是替代方案——两套并存。
5. **message 侧（占 80%）才是总量大头**，但属于"真内容"，压它的抓手是工作流纪律（少整读、结果先过滤），不是删工具定义。
6. **收益量级**：裁掉重型低频工具 ≈ 省 **40M 等效成本（占总 3.8%）**；消除 OpenViking 内联回退 ≈ 再省 **13M（1.2%）**。两者合计 ≈ 5% 等效成本，且**零功能损失**（因为几乎没人用）。

---

## 二、每轮上下文的真实构成（数据）

### 2.1 每步固定重发 vs 每轮注入
| 类别 | 规模 | 频度 |
|---|---|---|
| **tools（工具定义）** | 中位 12.7k token（min 5.7k / max 18.7k，随 profile/模型变） | **每步** 重发 |
| **system（系统提示）** | 中位 1.6k token（min 732 / max 10.7k） | **每步** 重发 |
| inject（系统提醒/AGENTS/技能目录/runtime） | ~7.3k/会话，仅 ~9 次/会话（0.08 次/步） | **每轮**（turn 级），非每步 |
| message（工具结果+助手输出） | ~54k/会话（80%） | 累积增长 |

> 关键口径：**只有 tools + system 是"每步"重发**；inject 是 turn 级。所以"每轮都带的固定开销"= tools(~12.7k) + system(~1.6k) ≈ **14k token/步**。

### 2.2 tools token 逐工具拆解（真实 44 工具 header = 8,864 token）
| 工具 | token | 工具组 | 组真实使用率* |
|---|---|---|---|
| pwsh | 874 | 核心 | 96.2% |
| workflow | 848 | 重型 | **0.7%** |
| schedule_create | 786 | 重型 | 1.4%（整组） |
| schedule_update | 601 | 重型 | 1.4% |
| session_search | 418 | 重型 | 8.8% |
| ask_user_question | 313 | 核心 | — |
| edit | 288 | 核心 | 89.6% |
| team_task_update | 272 | 重型 | 3.8%（整组） |
| session_event_search | 260 | 重型 | 1.5% |
| mcp_gateway | 242 | 常用 | 46.4% |

**重型低频组（≈6,088 token = 69%）**：team 1,512 + schedule 1,495 + session_query 994 + workflow 848 + mcp_gateway(保留)495 + goal 433。
*使用率=729 会话中至少调用过一次该组的会话占比。

### 2.3 tools 规模随 profile 变化（不是恒定 11k）
| 模型/profile | toolsTokens 中位 |
|---|---|
| codex/gpt-6.1-sol | 6,413 |
| deepseek-v4.1-flash-sg | 8,864 |
| auto/deepseek-v4.1-flash | 10,926 |
| deepseek-v4.1-flash | 12,749 |
| composer-2.5 | 14,631（max 18,740） |

→ 差异来自各 profile 装载的 bundle/工具集不同，**不是按需懒加载**。

> ⚠️ **口径注脚（2026-11-14 补）**：本节 2.4 的"38% 会话带内联 OV 工具"是 **P0（A-1 收编 gateway）生效前（配置 mtime 2026-11-14 14:08 之前）的历史数据**。276 个带内联工具的会话最新 mtime 均停在 2026-11-13 14:22；P0 生效后的新会话工具数统一 46、内联 OV = 0。**现状无该浪费，已由 A-1 修复**。详见 [P0 签核记录](p0-ovgw-closure-signoff-20261114.md)。

### 2.4 OpenViking 内联回退（用/不用对照，clean estimate）— ⚠️历史数据，已被 P0 修复
| | 会话数 | 平均 toolsTokens |
|---|---|---|
| 带 `mcp__openviking__*` 独立工具 | 276 (38%) | **14,102** |
| 不带（仅 mcp_gateway 入口） | 455 | 9,405 |
| **差值** | | **+4,697 token/步** |

`mcp__openviking__add_resource` 单工具就 1,645 token。而 `mcp_gateway`（246 token）已能代理同批能力——两套并存的纯浪费。

---

## 三、其余部分（message / inject）的优化空间

- **message 占 80%（~54k/会话）是总量大头**，但内容是真实工作（工具结果 41% + 助手输出 45%）。**不能删，只能靠纪律压**：
  - 工具结果（tool 23.5k/会话最大单项）：`read` 用 offset/limit、大输出先过滤、同文件只整读一次；
  - 助手输出 45%：拆小步、少长篇复述。
- **inject（~7.3k/会话）**：来自 AGENTS.md 全文 + 技能目录 + Agent Teams 段 + runtime。已在 profile 层有 `agent-instructions maxBytes:65536` 上限；若 AGENTS.md 继续膨胀可再收（低优先）。
- **这两项都是"行为/纪律"型优化，不产生结构性删减**，收益低于工具侧，列为 P2。

---

## 四、方案（按优先级，零功能损失为主）

### P0 — 消除 OpenViking 工具回退膨胀（✅ 已于 A-1 落地并验证，见签核记录）
> **状态更新**：P0 已由 11-13 的 [A-1 计划](A1-openviking-gateway.md) 落地（approve+人工确认），配置生效后新会话工具数 46/内联 OV=0。本项**无需再实现**，仅需闭环签核 → 见 [p0-ovgw-closure-signoff-20261114.md](p0-ovgw-closure-signoff-20261114.md)。以下为原始方案描述（历史）。
**问题**：38% 会话同时带 `mcp_gateway`(246) 与 24 个 `mcp__openviking__*`(≈7,700)，每步多 ~4.7k token。
**做法**：在 profile 的 OpenViking MCP 接入处，将其工具面设为**只走 gateway 代理**（与已有 `toolSurface:"off"` 同款思路），不再内联导出 24 个独立工具；需要直连的场景由 `mcp_gateway` 按需代理。
**验证**：新开会话读 `contextHeaders.tools`，确认不再出现 `mcp__openviking__*`、toolsTokens 回落到 ~9.4k；跑一次需要 OpenViking 的操作确认经 gateway 仍可用。
**预期**：≈ **13M 等效成本（1.2%）**，零功能损失。

### P1 — 重型低频工具改为"触发式/子代理专用"（结构性，收益最大）
**问题**：team_task / schedule / session_event / session_query / workflow / goal ≈ 6k token/步 = 69% 工具定义，使用率 0.7%–8.8%。
**做法（两选一，建议 A）**：
- **A. profile 级 bundle 裁剪 + 按需装载**：把这些组从 `standard` 主会话预设中移除，仅在"明确需要"的场景（显式任务类型 / 子代理 preset）装载。参考已有 `web profile 已 disabled 6 个 delegation 工具` 的成熟做法（cordis.patch.yml:266-309）。
- **B. 引入流程级懒加载**：给这些工具包设 `deferLoading:true` / `registration.when()`（机制已存在 dsh-tools/lib/index.js:557，但基线工具未用）；**注意** magpie openai-completions 路由会剥掉 deferLoading（cordis.patch.yml:78-79），需先在路由 compat 声明里允许，否则退化为普通工具。
**验证**：抽样 20 个历史会话重放，确认头部 tools 缩减、被裁组在真正需要时（如团队任务）仍可调起。
**预期**：≈ **40M 等效成本（3.8%）**；若叠加 A 与 P0，合计 ≈ 5%。

### P2 — 工作流纪律（message 侧，靠规则/skill，不删定义）
- 强化 `read offset/limit`、大结果先过滤、同文件整读一次、拆步短答（已在 AGENTS.md/skill 有雏形，落到 token-frugal 建议条目）。
**预期**：难精确量化，压 message 增量，长期复利。

### P3（可选）— system 瘦身
- 监控 AGENTS.md / 技能目录体积，必要时下调 `agent-instructions maxBytes`；优先级最低（system 仅占每步 ~1.6k）。

---

## 五、落点与风险

- **P0/P1 都落 `~/.dsh/profiles/web/cordis.patch.yml`**（profile 层配置，非改动 harness 核心），改动受 git 管理，`git revert` 可回滚。
- **主风险 = P1 误裁"偶尔需要"的工具**（team_task 3.8%、session_search 8.8% 并非 0）。缓解：抽样重放验证 + 保留 gateway/子代理可达路径 + 灰度一个 profile 先观察。
- **config 启动读死**：改 profile 需重启 DSH Web 生效（见 user-profile 记载）。

---

## 六、待你拍板

1. 先做 **P0**（几乎零风险）还是 **P0+P1 一起上**？
2. P1 走 **A（profile 裁剪）** 还是 **B（deferLoading 懒加载，需先解决 magpie 路由剥除）**？
3. 是否要把 P0/P1 落成正式改动计划（走 plan_review + 人工确认）后实施？
