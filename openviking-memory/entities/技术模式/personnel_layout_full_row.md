# 整行字段未豁免导致半宽
在项目 苏州市房地产监测V3 中，人员信息布局组件强制两列未豁免，导致整行字段出现半宽。

## 问题根因
- 编辑模式下的居住地址为 `FORM_COL_FULL`
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
  "source_extraction_id": "3440ed0abfed42a4aa0c1bc2d6540321",
  "version": 1,
  "memory_type": "entities"
}
-->