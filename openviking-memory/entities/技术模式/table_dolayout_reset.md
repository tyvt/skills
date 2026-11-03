# el-table列变未doLayout致切换后表体空
optionDecision/detail.vue 切到「投票信息」tab 时表格列增多，未执行 doLayout() 且缺 pageNum 重置，致表体高度为 0 行不显示。

## 问题根因
- 切换 tab 时表格列增多，但未执行 `doLayout()`
- 缺少 `pageNum` 重置，导致表体高度为 0，行不显示

## 修复方案
- 用 `div` 包裹 `DecisionRangeTable` 并加 `:key` 强制重建
- 切换时重置 `cardValue`、`pageNum` 并调用 `getList()` 与 `doLayout()`

## 验证与归属
- 验证证据：光标会话 642bb8f5-b288-4d41-8b2a-f3c3c981319f 提取
- 涉及文件：optionDecision/detail.vue、optionDecision/components/DecisionRangeTable.vue、mixins/listMixins.js、ownerDecision/detail.vue、components/zsTable/index.vue、components/zsTabs/index.vue、sortDecison/detail.vue、ownerDecision/components/DecisionRangeTable.vue
- 所属项目：太仓G；来源会话：642bb8f5-b288-4d41-8b2a-f3c3c981319f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_dolayout_reset",
  "source_extraction_id": "975f8cf81e1849d283acc90cad1435ef",
  "version": 1,
  "memory_type": "entities"
}
-->