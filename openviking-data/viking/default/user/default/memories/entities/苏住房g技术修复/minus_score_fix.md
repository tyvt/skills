# 考评扣分项占比接口调用顺序修复（苏住房G）
苏住房G 项目 minusScorePercentage.vue 的 getAverageScoreData() 新增 params 兜底判断，避免 params 无值时误调用统计接口。

## 问题根因
- getAverageScoreData() 存在调用顺序问题，当 params 无值时仍会发起 /evaluation/assessmentRecordStatistics/pageContentDeductRatio 请求

## 修复内容
- 在 minusScorePercentage.vue 的 getAverageScoreData() 新增兜底判断
- 当 this.params 不存在或 this.params.assessmentId 为空时：直接 return、清空 tableData、不发起接口请求
- 已检查文件 lint，当前无新增报错

## 验证与归属
- 所属项目：苏住房G（zhi2-web-admin）
- 来源会话ID：7a00055c-45e1-42c6-9eae-59ae8fe0af38
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：src/views/credit/assessment/components/minusScorePercentage.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "minus_score_fix",
  "source_extraction_id": "d5b56e443dfe4107a86edc9068f060a5",
  "version": 1,
  "memory_type": "entities"
}
-->