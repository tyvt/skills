# detail-template 中标签的左对齐
在 Suzhou Real Estate Monitoring V3 中，`detail-template.vue` 的标签默认对齐方式已更改为左对齐。

## 组件变更
- `getLabelAlignClass` 将 `labelAlign` 默认值从 `right` 改为 `left`
- `getLabelContentStyle` 将默认值和回退改为 `flex-start`
- CSS `.detail-label` 和 `.detail-label-main` 使用 `justify-content: flex-start` 和 `text-align: left`
- 单个项仍可通过 `labelAlign` 覆盖

## 文件与归属
- 验证证据: src=苏州市房地产监测V3/168.md
- 涉及文件: CashsaleInfoPanel.vue, detail-template.vue, detail-template-long-labels.md, README.md, detail-template-CrrkOgnH.css, migrate-detail-framework.mjs
- 会话: 0e6522ee-5877-4b0d-9156-b0f67a688a71; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_label_left",
  "source_extraction_id": "77174234a0a04fd3bf6b0d9c3b1c7f88",
  "version": 1,
  "memory_type": "entities"
}
-->