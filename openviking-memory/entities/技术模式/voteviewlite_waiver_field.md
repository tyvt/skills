# 选项表决 VoteViewLite 投票表只展示配置表决项，弃权在顶层 waiver 字段
太仓G端选项表决详情「投票信息」中 VoteViewLite 表格仅展示配置的表决项，弃权统计位于接口顶层 waiver 字段而非表决项列表。

## 数据来源
- `VoteViewLite` 表格由 `listOption`(GET /estate/option/list, bizState:1) 与 `getVoteResult`(GET /estate/ownerDecision/ownerCalculationChart/{decisionId}) 按 optionId 合并。
- 列绑定 optionName、weightSocre、weightSocreRatio、areaSocre、areaSocreRatio。
- 弃权不是表决项配置，投票弹窗单独勾选，接口不会在 optionList 返回 optionName=弃权 的行。

## 统计与展示
- 弃权票数、面积统计在 voteRes.data 顶层 `waiver`、`waiverArea`，饼图 `VoteResultLite` 已用但表格默认不展示。
- 若要在表内显示弃权，需在 getDetail 合并后手动 append 一行或单独区块，不能指望 option/list。

## 验证与归属
- 验证：会话 aa345530 用户问表决项表缺弃权；结论说明两接口字段来源、弃权与表决项两套逻辑及 waiver 仅饼图使用。
- 涉及文件：zhi1-web-admin/src/views/estate/decisionCommon/components/VoteViewLite.vue、VoteResultLite.vue、zhi1-web-admin/src/api/estate/option.js、zhi1-web-admin/src/api/estate/ownerDecision.js
- 所属项目：太仓G；来源会话：aa345530-4486-428c-873f-fdc119c020eb；代码基线：e083bd5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voteviewlite_waiver_field",
  "source_extraction_id": "dc704c74760d4525ac86f3177b7c0dae",
  "version": 1,
  "memory_type": "entities"
}
-->