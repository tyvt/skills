# 展开record冲掉姓名且缺分组致决策人丢失
苏住房C 移动端 DecisionResult.vue 中 `...record` 展开冲掉 `decisionPlayerName` 且同 `decisionResponseId` 记录未分组合并，导致决策人丢失。

## 问题根因
- `DecisionResult.vue` 中 `...record` 展开覆盖 `decisionPlayerName`
- 相同 `decisionResponseId` 记录未分组合并

## 修复要点
- `groupRecordRows` 按 ID 合并姓名
- `enrichRecordList` 仅补缺失字段
- 左侧 `label` 映射决策人姓名

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
  "source_extraction_id": "c9e7566efee64f47b3959dda50f459d4",
  "version": 1,
  "memory_type": "entities"
}
-->