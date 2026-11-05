# 发布范围筛选重置修复
产品2.0 消息发布范围筛选弹窗（`selectRangeDialog`）修复左侧行政区树搜索后无法重置的问题。

## 问题
- 上次用 `@reset` 事件联动父组件，Vue 2 中未稳定触发
- 左侧树过滤后仅清空关键字不足以恢复节点展示

## 修复要点
- 采用 `provide/inject`：`selectRangeDialog` 注入 `resetRangeFilter`，`rangeTable` 在 `resetQuery` 直接调用，不依赖事件名
- 重置顺序：先重置右侧 `queryParams`，再清空左侧行政区筛选（`parentId` 等），最后 `nextTick` 重新请求列表
- 左侧树：`treeRenderKey` 变更强制重渲染；清空搜索框；`highlight-current` 取消高亮
- `deptTree`：去掉无效的 `queryData` 监听（会调用不存在的 `getList`）

## 涉及文件
- zhi2-web-admin/src/views/system/message/components/selectRangeDialog.vue
- zhi2-web-admin/src/views/system/message/components/rangeTable.vue
- zhi2-web-admin/src/views/system/message/components/deptTree.vue

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：产品2.0
- 来源会话：e8e1b511-6b3a-4a1c-a292-a25e3a8b00fd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "range_reset_fix",
  "source_extraction_id": "5c881ec3a20f414facbaf9f447492b5b",
  "version": 1,
  "memory_type": "entities"
}
-->