# 表决意见单PDF按ID获取
表决意见单PDF由服务端生成，提交接口仅返回状态码而不返回文件流，需按 alfrescoFileUuid 取文件。

## 接口与流程
- 提交接口 POST /estate/decisionRecord 仅返回 code==200，不返回文件流
- 前端 src/views/decision/ParticipateIn.vue 触发提交
- 查询经 POST /h5decision/decisionRecord 获取 mtplOwnerVoteObligeeList[]
- 文件通过 alfrescoFileUuid 按 ID 获取

## 涉及文件（决策页）
- d:/repository/园区1.0表决页面/src/views/decision/ParticipateIn.vue
- d:/repository/园区1.0表决页面/src/views/decision/optional/ResultStatistics.vue
- d:/repository/园区1.0表决页面/src/views/decision/common/DecisionResult.vue
- d:/repository/园区1.0表决页面/src/views/decision/optional/ResultDetail.vue
- d:/repository/园区1.0表决页面/src/views/decision/components/StepSign.vue

## 涉及文件（其他）
- d:/repository/园区1.0表决页面/src/views/elect/ParticipateIn.vue
- d:/repository/园区1.0表决页面/src/utils/index.ts
- d:/repository/园区1.0表决页面/src/api/common.ts

## 验证与归属
- 验证证据：extracted source=cursor project=园区1.0表决页面
- 来源会话：c01ceb33-3a8e-412b-b7c4-7ee892caff45
- 所属项目：园区1.0表决页面；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_pdf_id",
  "source_extraction_id": "23362d8cfb5743fbb0ea01eb24844b03",
  "version": 1,
  "memory_type": "entities"
}
-->