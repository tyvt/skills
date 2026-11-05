# detail_template_label_align
园区物管2.0 中 detail-template 组件标签名称对齐问题的根因与修复。

## 问题根因
- 标签区域 `.detail-label` 原写 `text-align: right`，上次为省略号给内部 `span` 加 `flex:1` 后文字占满整列，右对齐更明显。

## 修复方案
- 已将 `.detail-label` 改为 `text-align: left`，标签名称靠左显示；值区域默认左对齐未改动。

## 验证与归属
- 涉及文件：zhi2-web-admin/src/components/detail-template/detail-template.vue；所属项目：园区物管2.0；来源会话 a563fde7-487c-404f-a47e-ae62b28abbc3。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_label_align",
  "source_extraction_id": "57a4873f974d4683bd6bc4d140393662",
  "version": 1,
  "memory_type": "entities"
}
-->