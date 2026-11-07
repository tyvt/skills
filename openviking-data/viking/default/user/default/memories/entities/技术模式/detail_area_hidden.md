# 表决明细区域被条件遮挡
太仓G 一般表决、业委会选举表决、选项表决的下方明细区域曾被 `mainCardValue == 0` 条件挡住，已在明细页补回决策明细区域。

## 问题根因
- 下方明细区域被 `mainCardValue == 0` 条件遮挡，在「业主决策明细/投票信息」页被隐藏，仅「基本信息」页可见

## 修复内容
- 一般表决：「业主决策明细」页图表下方增加决策明细区域；基本信息页用 `DecisionRangeTableLite`，明细页用完整版 `DecisionRangeTable`（含楼幢筛选、导出、投票状态）
- 选项表决：「投票信息」页下方增加决策明细区域；`VoteView` 合并 `getVoteResult` 与 `listOption` 配置数据展示全部已配置表决项（含得票为 0 的项），占比保留 2 位小数

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：`estate/decisionCommon/config.js`、`generalDecision/detail.vue`、`maintainDecision/detail.vue`
- 所属项目：太仓G；来源会话：e13c8223-12b6-4281-8230-5e3a8484ebd6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_area_hidden",
  "source_extraction_id": "9ee9055e33c847f9aa90f22112539d10",
  "version": 1,
  "memory_type": "entities"
}
-->