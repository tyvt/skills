- `zs-dialog.vue` 的 `calculateHeight()` 中将 `style.height` 由动态测量写死改为 `auto`，避免嵌套弹窗 footer 错位或溢出。
- `maintenanceItemDialog.vue`（行 513-522）删除定制高度样式，并移除 `custom-class` 与 `:draggable="false"`，配合 zs-dialog 高度 auto 修复嵌套弹窗溢出（验证：src=2-0/012.md；涉及文件：maintenanceItemDialog.vue、zs-dialog.vue；来源会话：04d92724-d809-4b20-a0c6-fbdaca7dbf64）。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue弹窗高度与嵌套溢出处理",
  "source_extraction_id": "e1697a5b28f1459ca244bb8203dedf0c",
  "version": 1,
  "memory_type": "preferences"
}
-->