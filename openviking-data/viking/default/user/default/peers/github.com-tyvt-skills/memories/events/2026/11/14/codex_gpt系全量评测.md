# Summary
2026-11-14 用户要求对 codex/gpt 系模型做全题目测试以判断适合的任务类型。助手对网关现存 4 个 codex/gpt 模型（gpt-6.1-sol、gpt-6.1-terra、gpt-6-sol、gpt-6-luna）跑 controller-bench 35 题全量评测（4×35=140 combos），结果存 bench-codex-full.json。有效分 0.769–0.779（gpt-6.1-terra 0.779 最高，gpt-6-luna 0.769 最低），均弱于 workbuddy/kimi-k3.1-pro(0.849)。M1 工具选择为共同短板（0.51–0.67），根因为爱直接答不肯落 code_editor、爱加冗余 pwsh 步骤。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 后续测试codex的gpt系列模型，全题目测试，判断他们适合的任务类型
**assistant [peer=github.com-tyvt-skills]**: 测 codex 的 gpt 系列，全 35 题。先拉网关现存 codex/gpt 模型清单。
**assistant [peer=github.com-tyvt-skills]**: 网关现存 codex/gpt 共 **4 个**：`gpt-6.1-sol`、`gpt-6.1-terra`、`gpt-6-sol`、`gpt-6-luna`（gpt-5.6 全系、gpt-6-astra 已被你关闭下线）。

跑 4 模型 × 35 题全量。复用 workbuddy-final 脚本改模型名单。这些是 codex 计费且部分 reasoning 模型较慢，max_tokens 保留 1500（与基准同口径）。建 todo + 脚本。
**assistant [peer=github.com-tyvt-skills]**: 4×35=140 combos。codex reasoning 模型较慢，预计几分钟。监听。
**assistant [peer=github.com-tyvt-skills]**: 推进中（15 项，约 7.5s/题）。继续监听。
**assistant [peer=github.com-tyvt-skills]**: 全量完成（140 rows, DONE）。评分并按题型判断任务类型。
**assistant [peer=github.com-tyvt-skills]**: 数据出来了。codex/gpt 系整体有效分都在 0.77–0.78，弱于 workbuddy/kimi-k3.1-pro（0.849）。M1（工具选择）是它们共同短板（0.51–0.67）。M9（多模态判读）全都 0.75——但注意 codex 都是**纯文本模型，image_analyst 是工具名**，M9 结果反映的是"是否计划用 image_analyst 工具"而非真看图，0.75 说明有部分没选对。

我细看 M1 短板具体错在哪、M9 具体情况，以便准确判断任务类型适配。
**assistant [peer=github.com-tyvt-skills]**: 诊断清楚了。codex/gpt 系 M1 短板的**共性根因非常一致**：
1. **M1-4（纯代码片段生成）**：全部 4 个都判成 `direct_answer` + steps=[]（应该 execute_tools 用 code_editor）——**倾向"能直接答就直接答、不肯落工具"**。
2. **M1-5 / M1-6**：爱**多加前置 pwsh 步骤**（先读再改/先读再看图），导致 efficiency 和 tool 混合分被拉低（tool 只算命中的占比）。这是 codex 的"多步倾向"。
3. M1-2 有些直接答（文本已提供却没走 file_reader）。

这塑造了明确的"任务类型适配画像"。做最终判定。
**assistant [peer=github.com-tyvt-skills]**: ## codex/gpt 系全量结果（4 模型 × 35 题）

结果存 [bench-codex-full.json](D:\repository\skills\controller-bench\results\bench-codex-full.json)。

### 总分（有效口径，fmt/err 记 0）

| 模型 | 有效分 | 名目分 | fmt | 中位耗时 |
|---|---|---|---|---|
| **codex/gpt-6.1-terra** | **0.779** | 0.779 | 0 | 7.9s |
| codex/gpt-6.1-sol | 0.771 | 0.771 | 0 | 10.9s |
| codex/gpt-6-sol | 0.771 | 0.771 | 0 | 7.6s |
| codex/gpt-6-luna | 0.769 | 0.841 | 3 | 8.1s |

**整体结论：codex/gpt 系 4 个都在 0.77 左右，明显弱于 workbuddy/kimi-k3.1-pro(0.849)，且都低于 workbuddy 的 deepseek-v4.1-flash(0.732)？——不，比它高，但比 kimi 低。** 它们是**中等水平、JSON 干净（几乎不崩）但工具选择判断差**。

### 各题型强弱（有效分）

| 模型 | M1工具选 | M2依赖 | M3坏工具 | M4路由 | M5效率 | M6纠错 | M7扇出 | M8判读 | M9图像 | M10评审 | T对抗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| gpt-6.1-terra | **0.51** | 0.84 | 0.72 | 0.91 | **0.94** | 0.85 | **1.0** | **1.0** | 0.75 | 1.0 | 0.67 |
| gpt-6.1-sol | 0.62 | 0.87 | 0.73 | 0.92 | 0.77 | 0.79 | 0.75 | 0.75 | 0.75 | 1.0 | 0.69 |
| gpt-6-sol | **0.52** | **0.91** | **0.81** | **0.93** | 0.74 | 0.73 | 0.75 | 0.93 | 0.75 | 1.0 | 0.69 |
| gpt-6-luna | **0.67** | **0.98** | 0.79 | **0.97** | 0.81 | 0.85 | **1.0** | **1.0** | 0.75 | 1.0 | **0.79** |

## 它们适合的任务类型（核心判断）

**共同短板 = M1 工具选择（0.51–0.67）**，根因高度一致（我查了原始输出）：
- **M1-4 纯片段代码生成**：4 个全判 `direct_answer` 不走 code_editor → **爱"直接答"、不肯落工具**
- **M1-5/M1-6**：爱加冗余前置 pwsh 步骤（先读再改/先读再看图）→ 步骤多、efficiency 掉

**共同强项 = M2 步骤依赖、M4 路由、M10 评审（0.84–0.98）**，能理解依赖链、路由判断准、文本评审强。

### 逐个推荐用途

| 模型 | 适合 | 不适合 |
|---|---|---|
| **codex/gpt-6-luna** | **综合最佳**：M2依赖0.98、M4路由0.97、T对抗0.79（4个里最高）、M7/M8 满分 → **复杂多步规划、对抗/根因、长上下文判读** | M1 简单工具选择（0.67）、纯片段直答场景 |
| **codex/gpt-6.1-terra** | **效率型**：M5效率0.94、M7扇出1.0、M8判读1.0、M10评审1.0 → **批量聚合、长日志判读、diff评审** | M1 工具选择最差(0.51)、对抗弱(0.67) |
| **codex/gpt-6-sol** | **依赖链+路由**：M2 0.91、M4 0.93、M3 0.81（4个里最高，抗坏工具最好）→ **中等多步任务、坏工具改道** | M1(0.52)、效率(0.74)、对抗(0.69) |
| **codex/gpt-6.1-sol** | 均衡但**无突出项**：M4 0.92 尚可，其他都中游 | 无明显强项，M1(0.62)、最慢(10.9s) |

### 一句话总结
> **codex/gpt 系都"会想不会挑工具"**：理解依赖、路由、评审、判读强，但工具选择差（尤其爱直接答、不爱落 code_editor）、爱加冗余步骤。**不建议做主控 planner 首选**（M1 工具选择是主控核心能力，它们垫底）；**适合分工**：gpt-6-luna 做复杂规划/对抗、terra 做效率聚合/判读、6-sol 做坏工具改道。

⚠️ 重要口径：codex 是**计费模型**（per-token），且 4 个有效分都在 0.77 左右——**性价比明显不如 workbuddy/kimi-k3.1-pro(0.849)**。是否值得进池要按"质量×成本"再权衡。

需要我把这份 codex 评测结果整理成正式记录文档（含题型矩阵 + 任务类型适配）并提交吗？

<!-- MEMORY_FIELDS
{
  "event_name": "codex_gpt系全量评测",
  "goal": "评测codex模型能力",
  "summary": "2026-11-14 用户要求对 codex/gpt 系模型做全题目测试以判断适合的任务类型。助手对网关现存 4 个 codex/gpt 模型（gpt-6.1-sol、gpt-6.1-terra、gpt-6-sol、gpt-6-luna）跑 controller-bench 35 题全量评测（4×35=140 combos），结果存 bench-codex-full.json。有效分 0.769–0.779（gpt-6.1-terra 0.779 最高，gpt-6-luna 0.769 最低），均弱于 workbuddy/kimi-k3.1-pro(0.849)。M1 工具选择为共同短板（0.51–0.67），根因为爱直接答不肯落 code_editor、爱加冗余 pwsh 步骤。",
  "ranges": "0-36",
  "source_extraction_id": "d6af3b8809a949fe968962f4e16109aa",
  "version": 1,
  "memory_type": "events"
}
-->