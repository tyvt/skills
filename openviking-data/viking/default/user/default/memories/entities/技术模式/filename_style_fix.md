# 长文件名遮挡删除按钮样式修复（苏住房G）
苏住房G 项目修复了长文件名压制「删除」按钮的样式错乱问题。

## 问题原因
- `el-link` 是 inline 元素，在 flex 布局里不会随容器收缩
- 图标和文件名在同一 span，省略号无法正确生效

## 调整内容
- 图标与文件名拆开：`<i class="el-icon-document" />` + `<span class="file-name-text">`
- `el-link` 内部用 flex 布局，文件名区域设 `flex:1; min-width:0` 并加省略号
- 「删除」按钮设 `flex-shrink:0`，保证始终完整显示
- 刷新后长文件名显示为 `cd6dd466-...` 省略形式，不再遮挡

## 涉及文件与归属
- 涉及文件：`system/regionBankAuth/detail.vue`、`components/FileUpload/index.vue`
- 所属项目：苏住房G；来源会话：614f10e0-c3d4-4701-9abf-9cf9b6f48dc6；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "filename_style_fix",
  "source_extraction_id": "74b6128c507f42e8a98d5534bd5fc33d",
  "version": 1,
  "memory_type": "entities"
}
-->