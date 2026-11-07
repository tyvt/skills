# 测绘变更迁移到公共审批流
苏州市房地产监测V3 的测绘变更已迁移到公共审批流组件，删除本地 ApprovalDialog。

## 改造内容
- detail.vue 现通过 OperationBtnGroup 使用 ZsSubmit 和 zs-approval，统一传入 surveyChangeBusCode
- 本地 ApprovalDialog 已删除，E2E 已同步更新
- ESLint 扫描时项目内其他文件仍有既有告警，本次改动文件未引入新问题

## 联调注意
- 联调时确认后端 /surveyChange/approval 已支持公共格式（approveMessage、key 等）

## 涉及文件与归属
- 涉及文件：presale/surveyChange/detail.vue、components/OperationBtnGroup/index.vue、presale/surveyChange/components/ApprovalDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：50f44d3e-02d2-4be8-afe1-7e75bad426fa；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "survey_change_approval_flow",
  "source_extraction_id": "fb319a3c5f334f2eb408bff74ee001b7",
  "version": 1,
  "memory_type": "entities"
}
-->
