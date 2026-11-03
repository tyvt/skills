# 等级 update() 缺 bizState 守卫
物业服务等级更新接口 update() 未校验 bizState，审核中/已备案单据仍可改五类等级/evalLevel/频次，绕过审批直接生效。

## 问题现象
- 处于「审核中」(bizState=1) 或「已备案」(bizState=2) 的等级单据，仍可通过 update 接口改内容。
- E2E 实测断言返回 200 且值已变。

## 根因
- 流程类单据状态机靠接口层校验当前状态守卫；仅草稿态(bizState=0)允许编辑，提交后(1)应冻结。
- 守卫缺失使任何拿到接口的人可在审批前/备案后改内容，审批人看到与最终生效内容不一致，审批流形同虚设。

## 修复要求
- update 接口必须校验 bizState（仅 0 允许），其余状态返回明确错误码。
- 前端按状态置灰/隐藏保存按钮，但前端不能替代后端校验。
- 审批前内容被改要有痕迹（变更记录+1）以便审计。
- E2E 断言：提交成审核中后再 update，断言失败且原值未变；覆盖审核中/已备案两种状态。
- 五类单据（等级、等级变更、检查记录、整改通知书、报告编制）的 update/save 都要过 bizState 守卫。

## 验证与归属
- 来源会话 00e04b09-06b5-44c0-9662-cf41dca07319（基线 05caac8）
- 涉及文件：zhi2-web-admin/src/views/evaluation/stdEvaluation/serviceGrade/detail.vue；e2e/std-evaluation/cases/02-service-grade-crud.cjs；docs/std-evaluation/api-map-grade.md
- 结论：D7 高 | 新发现（已报给 Lead）

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "grade_update_noguard",
  "source_extraction_id": "6f248a62204c446d94da2fddb78663b8",
  "version": 1,
  "memory_type": "entities"
}
-->