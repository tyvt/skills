# zs-table-column 序号列点击修复
苏州市房地产监测V3 中 zs-table-column.vue 重构后 `:index` 弹窗无法选择，已全局排查修复并完成 90 个文件迁移。

## 问题根因
- 旧的 `:index="handler"` 点击 API 重构后未被处理
- `index` / `function` 被透传给 `el-table-column`，与原生 `index` 属性冲突
- `type="link"` 用 `scope.column.type` 判断，Element UI 不识别自定义 type，点击失效

## 修复内容
- 非 `type="index"` 列：拦截 `index` / `function` 透传
- `type="index"` 列：保留 `:index="tableIndex"` 等原生序号定制
- 用 `$attrs.type` 替代 `scope.column.type` 做列类型判断
- 兼容旧写法：`:index="handler"` 仍可作为 link 点击
- 新写法：`type="link" :function="handler"` 仅在 handler 为函数时显示 link 样式

## 全局迁移与验证
- 90 个文件已从旧写法迁移
- 涉及文件：zs-table-column.vue、WdmcDialog.vue、YhwdDialog.vue、superviseBank/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：bb86fbc4-fb2e-46ab-8ef7-7ec642005b52

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v3_table_index_fix",
  "source_extraction_id": "ffad441a88ee4d7980bb4a86cbbef7dd",
  "version": 1,
  "memory_type": "entities"
}
-->