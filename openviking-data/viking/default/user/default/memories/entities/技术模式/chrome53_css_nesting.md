# Chrome53 不支持 CSS 嵌套
构建目标 chrome53 因嵌套语法导致 esbuild 压缩失败。
## 问题根因
- 构建目标 chrome53 不支持 CSS 嵌套（`&~.xxx`，父级嵌套）。
- esbuild 压缩失败。
## 解决方案
- 在 4 个文件中展平选择器（例如：`&~.info-row` → `.info-row ~ .info-row`）。
- 使用 `.count-block .total-count` 代替嵌套。
## 文件
- `company-detail.vue`, `property-detail.vue`, `PropertyCard.vue`, `data-analysis.vue`.
## 验证
- cursor 会话 ce271386-7c66-451e-b5aa-3595f5dce594; base: none.

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：ce271386-7c66-451e-b5aa-3595f5dce594


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "chrome53_css_nesting",
  "source_extraction_id": "e241c05fac3842f3aa947be4d03aabe9",
  "version": 1,
  "memory_type": "entities"
}
-->
