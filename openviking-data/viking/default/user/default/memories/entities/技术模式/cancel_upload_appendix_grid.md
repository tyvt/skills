# 机构注销上传组件统一替换为要件网格
苏州市房地产监测V3 的机构注销管理"注销材料"上传已从 `FileUpload` 替换为要件组件 `AppendixPackageSection` 按配置分组上传。

## 实现要点
- 机构注销管理"注销材料"上传从 `FileUpload` 替换为要件组件 `AppendixPackageSection` 按配置分组上传
- `src/views/company/companyCancel/detail.vue` 适配新增/编辑/查看三态
- `src/api/company/companyCancel.js` 新增 `COMPANY_CANCEL_APPENDIX_BUS_CODE = 'jgzx'` 兜底 busCode
- 经纪/租赁与开发企业注销入口共用生效

## 涉及文件
- zhi2-web-admin/src/views/company/companyCancel/index.vue
- zhi2-web-admin/src/views/company/companyCancel/detail.vue
- zhi2-web-admin/src/components/README.md
- zhi2-web-admin/src/views/zljg/README.md
- zhi2-web-admin/src/components/AppendixPackageSection/index.vue
- zhi2-web-admin/src/views/presale/permitCancel/detail.vue
- zhi2-web-admin/src/views/company/companyApplyAudit/detail.vue
- zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchDetail.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/121.md
- 来源会话：c91195ed-7ae8-483d-a56e-a2eb8c8b730b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cancel_upload_appendix_grid",
  "source_extraction_id": "0f076fb682cc4ed095319a8f2b93dadf",
  "version": 1,
  "memory_type": "entities"
}
-->