# detail-label 标签右对齐修复
园区物管2.0 详情模板中 .detail-label 因 text-align:right 叠加内部 span flex:1 导致标签名称右偏。

## 问题根因
- .detail-label 设 text-align:right，内部 span 用 flex:1 占满，文字被推到右端
- 标签名与值区域视觉错位，标签靠右而非自然左对齐

## 解决方案
- 将 .detail-label 的 text-align 改为 left，使标签名称靠左
- 值区域保持原有左对齐逻辑未改动

## 验证与归属
- 验证：会话 a563fde7 将 text-align 由 right 改为 left 修复标签右偏
- 涉及文件：zhi2-web-admin/src/components/detail-template/detail-template.vue
- 所属项目：园区物管2.0；来源会话：a563fde7-487c-404f-a47e-ae62b28abbc3；代码基线：none；验证证据：园区物管2.0/025.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_label_align",
  "source_extraction_id": "236e0ad1f0424f45996c7c5522b4f29a",
  "version": 1,
  "memory_type": "entities"
}
-->