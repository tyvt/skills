# 终止协议表单采用32px与网格的对齐
在苏州市房地产监测V3中，详情表单的列间距已通过全局变量和网格调整为32px。

## 变更
- 全局变量 `--detail-collapse-col-gap` 从 24px 调整为 32px；`.section-form` 使用该变量的 `column-gap`。
- 宽字段通过 `.section-field--wide { grid-column: span 2 }` 实现；在 ≤768px 或 `--full` 时回退为单列。

## 验证
- 验证证据: src=苏州市房地产监测V3/093.md
- 涉及文件: supervision/agreement/end/detail.vue, detailLayout.js, styles/index.scss, styles/detail-form.scss, detail-template.vue, Headline/index.vue, commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue, supervision/agreement/allocation/detail.vue
- 来源会话: c6c36197-e683-4727-86cf-a23980045e4e; baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_form_32px_grid",
  "source_extraction_id": "001ba47e03e9421b8f9ada51bc0b7ab9",
  "version": 1,
  "memory_type": "entities"
}
-->
