# 证书等级字典绑定修复
苏州市房地产监测V3 的机构人员证书表修复证书等级未绑定字典类型导致列表回显失败的问题。

## 问题根因
- `AgencyPersonnelCertificateTable.vue` 误用 `certificateLevel` 且未对接 `company_certificate_level` 字典

## 修复方案
- 列表、弹窗、表单统一改用 `level` 并绑定 `type='dict'` 及字典 URL
- 于 `created()` 调用 `getDicts` 加载字典

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/164.md
- 涉及文件：路由信息.json、AgencyPersonnelCertificateTable.vue、AgencyPersonnelDetail.vue、personnelCertificate/detail.vue、personnelCertificate/index.vue、agency-personnel-real-api-flow.spec.js、companyApplyAudit/detail.vue、detail-template.vue
- 所属项目：苏州市房地产监测V3；来源会话：fee19692-41de-42b8-a8ed-8e08fa99ede8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "cert_level_dict",
  "source_extraction_id": "4ab1eb5ff2df476e89c5e40eba2a6f96",
  "version": 1,
  "memory_type": "entities"
}
-->