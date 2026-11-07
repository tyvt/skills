# 导航到 ResultStatistics 需要 rangeId
当从 `decision/index.vue`、`elect/index.vue`、`ViewOptionsList.vue` 跳转到 `ResultStatistics` 时，拼接 `rangeId` (`decisionRangeId`)；组件补充参数的读取和传递。

## 规则
- `decision/index.vue`、`elect/index.vue`、`ViewOptionsList.vue` 在导航中附加 `rangeId`
- `common/ResultStatistics.vue` 和 `multiple/ResultStatistics` 读取并传递 `decisionRangeId` 给 `selectMaintainResult`

## 文件与验证
- 验证证据: src=i淮安公版/001.md
- 涉及文件: src/pages_owner/decision/index.vue, elect/index.vue, decision/common/ResultStatistics.vue, decision/multiple/ResultStatistics.vue, decision/sort/ResultStatistics.vue, decision/components/DecisionList.vue, decision/multipleForm.vue, decision/optional/ResultStatistics.vue
- 所属项目: i淮安公版/zhi2-mobile-admin-h5-c-unlimited

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "result_statistics_range_id",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 1,
  "memory_type": "entities"
}
-->