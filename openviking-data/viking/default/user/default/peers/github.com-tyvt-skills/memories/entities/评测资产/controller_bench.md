# controller-bench
基于 LangGraph+Magpie 多模型编排器的计划产出评测基准，由 github.com-tyvt-skills 维护。

## 规模与结构
- 当前 35 题 × 14 模型 = 490 组合（截至 2026-11-14，M6–M10 落地后由 29 题扩充）
- 题型覆盖：M1–M5（单轮计划产出）+ M6–M10（多轮纠错/扇出去重/长上下文判读/多模态判读/diff评审）+ T8–T11（对抗/根因类）
- 仓库位置：D:\repository\skills\controller-bench

## 实测模型分工发现
- 执行/读盘/路由/坏工具改道：免费 deepseek-flash 系最强（cursor/deepseek-v41-flash-1017 0.932、workbuddy/deepseek-v4.1-flash 0.919，4–5s）；glm-flash 在 M3 明确短板 0.737，但在 M5 满分 1.000
- 对抗/根因/自适应换道：codex/gpt-6-luna 以 0.875 居首；现役 deepseek-flash 垫底 0.605（Δ0.27）
- 工具选择精准：grok-4.7 / gpt-5.6-terra（tool 0.88，M1 tool 0.62→0.88）
- 安全拒绝：需强模型 + security_guard 前置；M4-5 密码导出仅弱模型 gpt-6-astra 失守
- overall 排名具误导性（grok 第一但 29 题花 $0.23、均耗 14s；gpt-6-astra 花 $1.68 却仅 0.833），应按题型派活而非看总分

## 题型扩充与落地
- M6 多轮纠错（换道 vs 复读）、M7 扇出去重（串行 vs 并行+去重）、M8 长上下文判读、M9 多模态判读、M10 diff评审 —— 已于 2026-11-14 落地（6 题，tasks-master.json 提交 b013ef3f）
- 建议评分新增 token_eff 维度（从 eff 拆出，回应用户 token 耗费诉求）仍待定
- M6–M10 已建集并完成冒烟与 scorer 逻辑验证，可参与新题评测

## 关联与产出
- 分析文档：D:\repository\skills\controller-bench\ANALYSIS-20261114.md（2026-11-14 交付，含第四节验证路由矩阵与第七节口径修正记录）
- 与已批准方案 .plan/explore-multimodel-20261114.md 互补：本文提供按题型派活的实测决策表，后续拟合并为统一路由表（决策 C，待 plan_review）
- 编排器 config.yaml 含 planner/code_editor/pwsh/file_reader/summarizer/verifier/plan_reviewer/code_edit_with_signal/security_guard 多池；2026-11-14 四处改造：planner 替 gpt-5.6-luna→gpt-5.4-mini、code_edit_with_signal 替 composer-2.5→kimi-k3.1-pro、plan_reviewer/verifier 替 grok-4.7@256k→@500k；探索阶段支持 agent(){provider,model} per-spawn

<!-- MEMORY_FIELDS
{
  "category": "评测资产",
  "name": "controller_bench",
  "source_extraction_id": "b6d257e6cd1a4f8692fd66173eb05217",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "entities"
}
-->