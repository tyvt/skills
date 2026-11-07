# 选项表决结论维护弹窗对齐昆山
太仓G 已修复选项表决「表决结论维护」弹窗与昆山不一致的问题，修正占比计算字段。

## 问题根因
- 占比计算误用 `actualTotal`、`notVote`、`totalAreaAll` 等字段
- `ownerCalculationChart` 实际返回昆山同款字段（`voteHouseNum`、`totalHouseNum`、`voteWeight`、`totalWeight`、`voteArea`、`totalArea`），导致 NaN 且缺「参与权数占比」

## 修复方案
- `MaintainResultDialogLite.vue` 新增「参与权数占比」字段
- 按昆山逻辑修正三项占比：参与户数=`voteHouseNum/totalHouseNum*100`、参与权数=`voteWeight/totalWeight*100`、参与面积=`voteArea/totalArea*100`
- 增加 `|| 0` 兜底避免除零显示 NaN

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证：刷新后重开「结果维护」弹窗，三项占比应与昆山一致
- 涉及文件：`optionDecision/components/MaintainResultDialog.vue`、`ownerDecision/components/MaintainResultDialog.vue`、`decisionCommon/components/MaintainResultDialogLite.vue`
- 所属项目：太仓G；来源会话：cde16b85-11ac-44ea-ab98-1f40f5fa5fb4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_kunshan_result",
  "source_extraction_id": "2dd7391766cd43be9516f6aa2465c206",
  "version": 1,
  "memory_type": "entities"
}
-->