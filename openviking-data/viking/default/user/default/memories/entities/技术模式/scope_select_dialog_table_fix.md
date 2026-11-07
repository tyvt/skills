# 新增开户明细弹框表格底部遮挡修复
园区公共收益 zhi2-web-admin 修复「新增开户明细」弹框表格底部被遮挡问题。

## 修改文件
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/OpenDetailTable.vue

## 主要改动
- 底部表单独立固定：scope-select-footer 从 zs-tabs 内移到 dialog-right 下，作为 tabs 下方固定区域
- 表格区域弹性布局：scope-select-table-wrap 包裹 zs-table，设 flex:1; min-height:0，内部滚动
- 动态表格行数：ResizeObserver 监听容器高度，动态计算 listTableTr
- 样式优化：底部区域增加顶部分隔线和背景色，搜索区 flex-shrink:0

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：a30ff912-d925-46fa-ad4b-9657898fd082；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scope_select_dialog_table_fix",
  "source_extraction_id": "6fca0bfeff2a4ec9beac3ad9d9f2ba6e",
  "version": 1,
  "memory_type": "entities"
}
-->