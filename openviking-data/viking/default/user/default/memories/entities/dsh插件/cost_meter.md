# cost-meter
DSH 本地插件，按步控制推理与输出 token 预算，越界时告警或硬中断。

## 预算参数（as of 2026-11-11）
- perStepOutputBudget=3000、bareReasoningBudget=1500
- perStepUncachedBudget=10000：tools.guard 白名单拦截整读/整 grep/整 dump，bigMissStreak≥2 触发

## 规则与升级
- 规则 A/B/C 与 closing-check 文案；fired 按 turn 计数且仅对上一步生效
- 规则 A 升级 bareReasoningEscalate：连续 2 个纯推理步升格硬中断，要求下一步调工具（对应审计 P0#1）
- lib/index.js 承载 P0-4 白名单文案、P3-11 意图→todo、P3-12 改前 build 基线、P3-13 证据门禁

## 关系
- 由 github.com-tyvt-skills 维护；与 agent-guard 同为 ~/.dsh 零依赖本地插件（符号链接 dsh-cost-meter）
- 上线阈值与 selftest 状态记录在 dsh 实体卡的提交与审计部分

<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "cost_meter",
  "source_extraction_id": "fa049ff27bf94cea909ff331a50cdbbf",
  "version": 1,
  "memory_type": "entities"
}
-->