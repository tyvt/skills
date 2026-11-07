# 集成回调配置子表与列宽修复
产品2.0（zhi2-web-admin）系统管理同步日志/登录日志菜单的 `detail.vue` 中，新增时不应显示子表、子表列宽被压窄，已修复。

## 问题根因
- `zs-table-column` 内含 `zs-select`、`zs-input` 等复杂组件时，列宽被压到约 80px，表头截断、内容不可见
- 新增时即展示「集成回调配置」子表，与编辑/查看场景需求不符

## 修复方案
- `detail.vue` 中集成回调配置仅在编辑/查看时展示（`v-if="formMode != 'add'"`），新增时只填基本信息
- 提交新增接口不再传 `endpoints` 字段
- 列固定 `width` 改为 `min-width`，回调地址列加宽到 260px，表格 `width: 100%`
- 查看模式空值显示 `-`，详情加载时保证 `endpoints` 始终为数组

## 涉及文件
- system/syncLog/index.vue
- system/logininfor/index.vue
- system/menu/index.vue
- detail.vue
- 所属项目：产品2.0；来源会话：d9f3c68c-3ec6-4725-adf0-590b032f0388；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "callback_table_column_fix",
  "source_extraction_id": "cfc319a7d4474bb0b0c37ae22cfe0157",
  "version": 1,
  "memory_type": "entities"
}
-->
