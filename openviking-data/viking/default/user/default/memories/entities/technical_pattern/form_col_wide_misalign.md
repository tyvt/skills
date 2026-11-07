
# 两列栅格中FORM_COL_WIDE未归一化致错位
苏州市房地产监测V3 中 AgencyPersonnelDetail.vue 查看态因 FORM_COL_WIDE 未归一化导致两列栅格错位。

## 问题根因
- `AgencyPersonnelDetail.vue` 查看态「户籍地址」使用 `FORM_COL_WIDE`（span=16）
- `DetailTemplate :column="2"` 两列栅格仅归一化 8→12，span=16 撑破 50/50 栅格且标签列宽计算不认该值，导致错位

## 解决方案
- 字段 layout 统一改 `HALF_LAYOUT` 并移除 `FORM_COL_WIDE` 导入
- 全局仅 `LeasePersonnelDetail` 与 `AgencyPersonnelDetail` 用两列模板，前者无异常

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/302.md
- 涉及文件：AgencyPersonnelDetail.vue、LeasePersonnelDetail.vue、PersonnelBasicInfoLayout.vue、detailLayout.js、detail-template.vue、agencyBasicInfoContent.js、companyManagement/detail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：df6caac4-1d69-43b0-b9fe-7fd0af3007ab；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "form_col_wide_misalign",
  "source_extraction_id": "1b549fb6f5f74e96a56ee33f14963762",
  "version": 1,
  "memory_type": "entities"
}
-->