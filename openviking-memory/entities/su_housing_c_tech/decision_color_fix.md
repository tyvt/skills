# 决策与选举页意见颜色及名称显示修复
苏住房C投票模块决策页意见颜色丢失与选举页名称显示异常已修复，恢复颜色绑定并规避小程序label冲突。

## 问题根因
- 决策记录列表右侧意见文字颜色绑定丢失，未区分同意/不同意/弃权
- 选举页`DecisionResult.vue`未正确处理候选人姓名显示，与原生`label`属性冲突

## 修复内容
- 决策页意见文字恢复颜色：同意绿、不同意红、弃权橙
- 选举页`DecisionResult.vue`采用`CardCell`+`#label`插槽显示姓名，弃权显橙色，候选人名默认黑
- 涉及`DecisionRecord.vue`、`CardList.vue`同步调整

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_vote/elect/DecisionResult.vue`、`pages_vote/decision/common/DecisionResult.vue`、`CardList.vue`、`DecisionRecord.vue`
- 来源会话ID：656e6a75-7f8b-4804-98e6-133f13d94700；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "decision_color_fix",
  "source_extraction_id": "bc0083fed0b94cb88a7ca161c3df36e9",
  "version": 1,
  "memory_type": "entities"
}
-->