# 证书详情表单14字段三列栅格
苏州市房地产监测V3 中将证书信息表单调整为 14 字段 3 列栅格对齐设计稿，新增性别等必填字段。

## 变更内容
- 修改 `company/personnelCertificate/detail.vue` 将证书信息表单调整为 14 字段 3 列栅格
- 新增性别字段（字典 `sys_user_sex`）等必填字段
- 同步调整机构资质与人员证书相关组件及 API 文件

## 涉及文件
- `zhi2-web-admin/src/views/company/personnelCertificate/detail.vue`
- `zhi2-web-admin/src/views/institution/qualifications/index.vue` 与 `detail.vue`
- `zhi2-web-admin/src/views/zljg/components/PersonnelCertificatePlaceholder.vue`
- `zhi2-web-admin/src/views/company/personnelCertificate/index.vue`
- `zhi2-web-admin/src/api/company/personnelCertificate.js` 与 `utils/registerQualification.js`
- `zhi2-web-admin/src/views/institution/personnel/components/certificatesDialog.vue`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/126.md
- 来源会话ID：3faee039-2b79-4d3e-be53-0d46273c923b
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_detail_grid",
  "source_extraction_id": "d5003cc58ed741acbc25c5ea5b23b3df",
  "version": 1,
  "memory_type": "entities"
}
-->