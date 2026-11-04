# 决策范围表格动态增列未重渲染致空
太仓G端切换「投票信息」标签时 DecisionRangeTable 动态增加列，表格未强制重渲染与调用 doLayout()，导致分页有数但内容空。

## 问题根因
- 切换「投票信息」标签时 `DecisionRangeTable` 动态增加列
- 表格未强制重渲染与调用 `doLayout()`，导致分页有数但内容空

## 修复约定
- 在 `DecisionRangeTable.vue` 增加 `:key` 强制重渲、监听 `showSuccess` 重置筛选、同步 `decisionId`、数据加载后 `doLayout()`、将行选择逻辑从 computed 改为 method（与选项表决页一致）
- `ownerDecision/detail.vue` 等同步优化 `handleChange` 延迟 `doLayout()`

## 验证与归属
- 验证证据：会话 d53534ba 用户报动态增列后内容空
- 涉及文件：ownerDecision/detail.vue、maintainDecision/detail.vue、decisionCommon/components/DecisionRangeTable.vue、api/estate/decisionRange.js、components/zsTable/index.vue、ownerDecision/components/DecisionRangeTable.vue、decisionCommon/components/VoteView.vue、mixins/listMixins.js、generalDecision/detail.vue
- 所属项目：太仓G；来源会话：d53534ba-0c28-4ea3-96ec-37f34b0b2967；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_range_dynamic_column",
  "source_extraction_id": "d4d8cd2912bd44b5966e096f7fc2c02d",
  "version": 2,
  "memory_type": "entities"
}
-->