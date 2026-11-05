# 展开record冲掉姓名且缺分组致决策人丢失
苏住房C 移动端 DecisionResult.vue 中 `...record` 展开冲掉 `decisionPlayerName` 且同 `decisionResponseId` 记录未分组合并，导致决策人丢失。

## 问题根因
- 字段映射不一致：原将 `createTime` 置于右侧 `value`、决策选项置于 `remark`，与 `CardList` 的 label/value/remark 展示习惯不符
- `DecisionResult.vue` 中 `...record` 展开覆盖 `decisionPlayerName`
- 相同 `decisionResponseId` 记录未分组合并

## 修复要点
- 参考 `elect/DecisionResult.vue` 调整列表布局：左侧 `label` = 决策人姓名，右侧 `value` = 决策选项，下方 `remark` = 时间
- `groupRecordRows` 按 `decisionResponseId` 分组并合并各条 `decisionPlayerName`
- `enrichRecordList` 仅补充缺失字段，不再展开整个 `record` 对象
- 增加数据源兜底以确保姓名不丢失

## 涉及文件
- src/pages_vote/decision/common/DecisionResult.vue
- src/components/CardList/CardList.vue
- src/pages_vote/elect/DecisionResult.vue
- src/api/autonomy.js
- src/pages_vote/decision/common/DecisionRecord.vue
- src/components/CardCell/CardCell.vue
- src/components/CardCell/CellFulline.vue
- src/pages_vote/decision/components/DecisionList.vue

## 验证与归属
- 验证证据：extracted source=cursor session=0bc23870-2fcb-44e8-9d5d-37ad94613e2d
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：0bc23870-2fcb-44e8-9d5d-37ad94613e2d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "spread_record_bug",
  "source_extraction_id": "b1410b6d519f499da0178d453601d9b1",
  "version": 2,
  "memory_type": "entities"
}
-->