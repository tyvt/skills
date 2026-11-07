# 共享布局兜底样式强制列宽致整行字段半宽
苏州市房地产监测V3 中 `PersonnelBasicInfoLayout.vue` 兜底样式强制块内两列宽且未豁免整行字段，导致 `FORM_COL_FULL` 字段被压半宽。

## 问题根因
- `PersonnelBasicInfoLayout.vue` 兜底样式强制块内 `.el-row > .el-col` 两列宽且未豁免整行字段
- 导致 `FORM_COL_FULL` 字段被压半宽显示

## 解决方案
- `AgencyPersonnelBasicInfoFormFields.vue` 为 `field.wide` 的 el-col 添加 `el-col--full-row` 类
- `PersonnelBasicInfoLayout.vue` 新增豁免规则保持该标记列 100% 宽，不影响共享布局其他页面

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/047.md
- 涉及文件：components/HeadTitle/index.vue、company/companyApplyAudit/index.vue、detail.vue、autonomy/regulation/record/detail.vue、mixins/detailMixins.js、company/personnelCertificate/detail.vue、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、components/detail-template/detail-template.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：699a0458-d744-41d2-99d1-4aedce0e8486；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "layout_full_col_width",
  "source_extraction_id": "21c871f3e04343d18fdcbf2dc8406ff6",
  "version": 1,
  "memory_type": "entities"
}
-->