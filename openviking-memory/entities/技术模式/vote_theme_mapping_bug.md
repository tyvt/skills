# vote.js主题字段映射错误致卡片不显示
太仓一网通办H5 的 vote.js 将接口 decisionTitle 错映为 themName，导致详情卡片主题为空不显示。

## 问题根因
- src/store/vote.js 的 fetchSelectView 中接口 decisionTitle 被错映为 themName
- 导致 DetailTopCard 的 detail.subject 为空不显示

## 修复方案
- 改为 subject: detail.decisionTitle
- 清除 vote store 的 localStorage 持久化缓存

## 验证与归属
- 验证证据：extracted source=cursor session=1a726d2d-e3c2-47d0-addd-7f758f3f2707
- 涉及文件：src/views/decision/components/StepChoose.vue、src/views/decision/components/DetailTopCard.vue、src/views/decision/ParticipateIn.vue、src/views/decision/common/StepChoose.vue、src/views/owner-decision/components/OptionStepChoose.vue、src/views/owner-decision/ParticipateIn.vue、src/views/owner-decision/components/GeneralStepChoose.vue、src/store/vote.js
- 所属项目：太仓一网通办H5；来源会话：1a726d2d-e3c2-47d0-addd-7f758f3f2707；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_theme_mapping_bug",
  "source_extraction_id": "fc297c05bb3e476ab3698f797831cc98",
  "version": 1,
  "memory_type": "entities"
}
-->