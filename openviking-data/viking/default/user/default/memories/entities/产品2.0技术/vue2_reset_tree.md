# Vue 2 中 @reset 事件不稳定且树结构重置不完整
在产品 2.0 的 zhi2-web-admin 中，Vue 2 的 @reset 事件无法稳定触发父组件，并且在过滤左侧树结构后，仅清除关键字无法恢复节点。

## 问题根因
- 在 Vue 2 中，@reset 事件无法稳定触发父组件
- 在过滤左侧树结构后，仅清除关键字不足以恢复节点，导致重置不完整

## 解决方案
- selectRangeDialog 通过 provide/inject 注入 resetRangeFilter，以便 rangeTable 的 resetQuery 直接调用
- 重置顺序：右侧的 queryParams，左侧的行政区过滤器，在 nextTick 中发起请求
- 左侧树结构使用 treeRenderKey 进行重新渲染，并清除搜索框的高亮
- deptTree 移除无效的 queryData 监听器

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：e8e1b511-6b3a-4a1c-a292-a25e3a8b00fd
- 验证证据: src=产品2.0/048.md
- 涉及文件: zhi2-web-admin/src/views/system/message/components/selectRangeDialog.vue, rangeTable.vue, deptTree.vue, src/mixins/subTableMixins.js, table.js, area.js, src/components/zs-search-form/zs-search-form.vue, QueryResetButtons.vue
- 所属项目: 产品 2.0; 会话: e8e1b511-6b3a-4a1c-a292-a25e3a8b00fd; 代码库: 无

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia produto 2.0",
  "name": "vue2_reset_tree",
  "source_extraction_id": "794b625f596c43eeb4179370fbaced2a",
  "version": 1,
  "memory_type": "entities"
}
-->