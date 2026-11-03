# 选项表决结论弹窗误用字段致占比显示 NaN
MaintainResultDialogLite.vue 占比计算误用 actualTotal 等字段，应为 ownerCalculationChart 返回的 voteHouseNum、voteWeight、voteArea 等同款字段，导致 NaN 且缺「参与权数占比」。

## 问题根因
- MaintainResultDialogLite.vue 占比计算误用 actualTotal 等字段
- 正确字段应为 ownerCalculationChart 返回的 voteHouseNum、voteWeight、voteArea 等同款字段
- 误用导致占比显示 NaN 且缺「参与权数占比」

## 解决方案
- 修正三项占比计算改为正确字段
- 加 || 0 兜底防除零

## 验证与归属
- 验证证据：extracted source=cursor session=cde16b85-11ac-44ea-ab98-1f40f5fa5fb4
- 涉及文件：zhi1-web-admin/src/views/estate/optionDecision/components/MaintainResultDialog.vue、ownerDecision/components/MaintainResultDialog.vue、decisionCommon/components/MaintainResultDialogLite.vue、optionDecision/detail.vue、decisionCommon/components/MaintainResultTableLite.vue、optionDecision/components/MaintainResultTable.vue、decisionCommon/components/VoteResultKs.vue、VoteResultLite.vue
- 所属项目：太仓G；来源会话：cde16b85-11ac-44ea-ab98-1f40f5fa5fb4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintainresultdialog_lite_nan",
  "source_extraction_id": "afc8268d11fc4ff59123fa7eb053001d",
  "version": 1,
  "memory_type": "entities"
}
-->