# 选择对话框表格被压缩且行数不足
在项目 园区公共收益 (zhi2-web-admin) 中，`zs-select-dialog` 的固定 `tableTrCount` 导致水平滚动条占据高度并截断最后一行；`.dialog-right` 中带有 `flex:1; min-height:0` 的表格被压缩。

## 问题根因
- 固定的 `tableTrCount` 导致水平滚动条占据高度并截断最后一行
- `.dialog-right` 中带有 `flex:1; min-height:0` 的表格被压缩/裁剪

## 解决方案
- 动态计算行数并预留缓冲
- 使用 `flex-shrink:0` 以避免压缩
- 在 `getList()` 之后调用 `doLayout()`

## 涉及的文件
- `zs-select-dialog` (zs-select-dialog.vue, zs-select-dialog-func.vue, SKILL.md)
- `zs-dialog.vue` 和 `zs-table.vue`
- `pubBankDetailDay/index.vue`

## 验证与归属
- 验证证据: extracted source=cursor session=0369602c-e19b-47c4-b72b-a8e1c7d91b45
- 所属项目: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_compress",
  "source_extraction_id": "421380447a664b42a4a5d20500dc7f5e",
  "version": 1,
  "memory_type": "entities"
}
-->