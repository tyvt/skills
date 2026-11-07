# el-col最小宽度撑开日期范围致证书有效期未对齐
苏州市房地产监测V3 中 personnelCertificate/detail.vue 的 daterange 在 el-row/el-col 下被 Element 默认最小宽度撑出列宽，致证书有效期未对齐。

## 问题现象
- daterange 在 el-row/el-col 下被 Element 默认最小宽度撑出列宽
- 证书有效期字段未与其他字段对齐

## 解决方案
- 改外层为 div.detail-from-container
- zs-form 设 label-position='top'
- 编辑区换用 section-form section-form--label-top 与 9 个 section-field 并套用 detail-form.scss 栅格及 min-width: 0 实现同宽

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/114.md
- 涉及文件：personnelCertificate/detail.vue、detail-form.scss、AgencyPersonnelCertificateTable.vue、QualificationFormSection.vue、DeveloperBasicInfoForm.vue、Headline/index.vue、index.scss、element-ui.scss
- 所属项目：苏州市房地产监测V3；来源会话：819c3c2f-b512-4af8-bde8-ad7a2b56d9c1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_col_date_range",
  "source_extraction_id": "1fb73d685c824df4a1f924aabfc03c6d",
  "version": 1,
  "memory_type": "entities"
}
-->