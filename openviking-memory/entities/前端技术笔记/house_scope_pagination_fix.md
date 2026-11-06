# 楼幢房屋关联弹框分页文字竖排修复
修复园区公共收益项目楼幢信息详情「关联房屋」弹框分页区「共 61 条记录」中文逐字换行、竖排显示的问题。

## 问题原因
- 房屋关联弹框使用三列 Grid 布局，左侧分页区域宽度有限
- `zs-pagination` 内部为 `flex` 布局，「共 61 条记录」未设 `white-space: nowrap` 与 `flex-shrink: 0`，窄空间下被压缩竖排

## 修复内容
- 在 `HouseScopeDialog.vue` 的 `.transfer-footer--left` 补充分页样式（与 `SelectRecordProcedureDialog.vue` 处理一致）
- `pagination-total`：`white-space: nowrap` + `flex-shrink: 0`
- `pagination-container`：`flex-wrap: nowrap`
- `el-pagination`：`flex: 1` + `justify-content: flex-end`，分页控件靠右

## 验证与归属
- 涉及文件：HouseScopeDialog.vue、SelectRecordProcedureDialog.vue、zs-pagination.vue
- 所属项目：园区公共收益；来源会话：c25508c5-d1e5-4bd1-bb34-e499716d2d81

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "house_scope_pagination_fix",
  "source_extraction_id": "a0a0a0c0aaa74832979fdcae5833192c",
  "version": 1,
  "memory_type": "entities"
}
-->