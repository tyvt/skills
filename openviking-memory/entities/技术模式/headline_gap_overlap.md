# 详情页Headline间距因gap与margin叠加
苏州市房地产监测V3 中 detail-container 挂 Headline 时 gap 与 margin 叠加、detail-from-container 内表单 row-gap 与子级 margin 叠加致间距偏大。

## 问题根因
- detail-container 挂 Headline 时 gap:24px 与 margin-bottom:16px 叠加
- detail-from-container 内表单 row-gap:16px 与子级 margin 叠加致间距偏大

## 修复方案
- detail-container 仅保留 gap:24px 并去除 Headline 的 margin-bottom
- detail-from-container 内表单仅用 row-gap:16px 去子级 margin
- AgencyBasicInfoForm 内部续用 row-gap:16px 不加 margin-top

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/010.md
- 涉及文件：institutionRegister/detail.vue、AppendixPackageSection/index.vue、Headline/index.vue、AppendixEmpty/index.vue、AgencyBasicInfoDetail.vue、AgencyBranchDetail.vue、companyApplyAudit/detail.vue、entrustSale/detail.vue
- 来源会话：7d944204-556e-42c4-aea2-49cfa70bd1db；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_gap_overlap",
  "source_extraction_id": "c7f6eb576e6d4f86af40444cea8581f7",
  "version": 1,
  "memory_type": "entities"
}
-->