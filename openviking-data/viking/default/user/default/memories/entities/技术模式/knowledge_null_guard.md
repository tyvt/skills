---
audit_status: valid
last_checked: 2026-11-26T15:19:42+08:00
verdict_note: 修复属实：KnowledgePreviewDialog.vue 用 knowledgeData 归一化 null，detail.vue 有 previewKnowledge-null，handleQuote 存在。
---
# 知识预览组件未处理null致Vue警告
园区物管2.0 工单知识预览组件因 `previewKnowledge` 初始为 null 且组件始终挂载，触发访问 `knowledge.title` 的 Vue 警告。

## 问题根因
- `WorkOrderActionDialog` 与 `detail.vue` 中 `previewKnowledge` 初始为 null
- `KnowledgePreviewDialog` 始终挂载，而 Vue prop 默认值仅对 undefined 生效，导致渲染时访问 `knowledge.title` 警告

## 解决方案
- 组件新增 `knowledgeData` 计算属性，将 null 归一化为 `{}`
- 模板及附件列表改用 `knowledgeData`
- `handleQuote` 为空时直接返回

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/082.md
- 涉及文件：property/workOrder/order/components/KnowledgePreviewDialog.vue、WorkOrderActionDialog.vue、property/workOrder/order/detail.vue
- 来源会话：4041b099-030a-481a-8753-6ecca6c475fd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "knowledge_null_guard",
  "source_extraction_id": "36adc3f9f252485a8b7cdd7530b6990f",
  "version": 1,
  "memory_type": "entities"
}
-->