# 3列网格资格表单
在 Suzhou Real Estate Monitoring V3 中，资格证书表单已根据设计调整为 3 列网格。

## 变更
- `personnelCertificate/detail.vue` 调整为 3 列网格中的 14 个字段
- 新增性别字段，关联到字典 `sys_user_sex`
- 根据设计，与列表页 `index.vue` 逐单元格对齐

## 文件与归属
- 验证证据: src=苏州市房地产监测V3/169.md
- 涉及文件: institution/qualifications/index.vue, institution/qualifications/detail.vue, zljg/components/PersonnelCertificatePlaceholder.vue, company/personnelCertificate/index.vue, company/personnelCertificate/detail.vue, api/company/personnelCertificate.js, utils/registerQualification.js, institution/personnel/components/certificatesDialog.vue
- 会话: 3faee039-2b79-4d3e-be53-0d46273c923b; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_form_3col_align",
  "source_extraction_id": "77174234a0a04fd3bf6b0d9c3b1c7f88",
  "version": 1,
  "memory_type": "entities"
}
-->