# 整行字段未豁免导致半宽
在项目 苏州市房地产监测V3 中，人员信息布局组件强制两列未豁免，导致整行字段出现半宽。

## 问题根因
- 编辑态 `户籍地址` 本身已是 `FORM_COL_FULL`（span 24，整行），但 `PersonnelBasicInfoLayout.vue` 兜底样式把块内所有 `.el-row > .el-col` 强制收敛为两列宽（本意把三列栅格压成「证件照 + 两列」布局，只豁免 textarea），导致整行字段被压成半宽、后面「联系电话」挤到同一行。
- `PersonnelBasicInfoLayout.vue` 的回退样式强制 `.el-row > .el-col` 为两列未豁免

## 解决方案
- `AgencyPersonnelBasicInfoFormFields.vue` 为带有 `field.wide` 的 `el-col` 添加 `el-col--full-row` 类
- `PersonnelBasicInfoLayout.vue` 添加豁免规则以保持 100% 宽度；共享组件不变

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/247.md
- 涉及文件: components/HeadTitle/index.vue, company/companyApplyAudit/index.vue, company/companyApplyAudit/detail.vue, autonomy/regulation/record/detail.vue, mixins/detailMixins.js, company/personnelCertificate/detail.vue, institution/agencyPersonnel/components/AgencyPersonnelDetail.vue, components/detail-template/detail-template.vue
- 所属项目: 苏州市房地产监测V3; 会话: 699a0458-d744-41d2-99d1-4aedce0e8486; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_layout_full_row",
  "source_extraction_id": "393ff4b197654fe9a049ff3d076ab662",
  "version": 2,
  "memory_type": "entities"
}
-->