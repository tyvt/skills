# 监管终止详情表单右缘对齐依赖列间距栅格
苏州市房地产监测V3 中详情表单右缘对齐通过 --detail-collapse-col-gap 变量与 section-form column-gap 实现。

## 根因
- variables.css 中 --detail-collapse-col-gap 由 24px 调为 32px
- 原 detail-form.scss 与 index.scss 中 .section-form 的 column-gap 未使用变量

## 解决方案
- detail-form.scss 与 index.scss 中 .section-form 的 column-gap 改用 var(--detail-collapse-col-gap,32px)
- Headline 内 el-row 的 flex 列宽 calc 与 gap 增加 32px fallback
- detail-form.scss 新增 .section-field--wide{grid-column:span 2} 并在 ≤768px 回退单列

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/040.md
- 涉及文件：supervision/agreement/end/detail.vue、detailLayout.js、index.scss、detail-form.scss、detail-template.vue、Headline/index.vue、commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue、supervision/agreement/allocation/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：c6c36197-e683-4727-86cf-a23980045e4e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_form_col_gap",
  "source_extraction_id": "c92b7ca5b7f64394b3c0e71429202704",
  "version": 1,
  "memory_type": "entities"
}
-->