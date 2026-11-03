# 证书等级回显失败因字段误用未配字典
苏州市房地产监测V3 中 AgencyPersonnelCertificateTable.vue 误用 certificateLevel 字段且未配置字典类型，致证书等级回显失败。

## 问题根因
- AgencyPersonnelCertificateTable.vue 列表列、查看弹窗、编辑表单误用 `certificateLevel` 字段
- 未配置字典类型，导致证书等级回显失败

## 解决方案
- 该组件内统一改用 `level` 字段
- 列表列与弹窗配置 `type="dict"`、`dict-url="company_certificate_level"`
- 编辑表单换用 `zs-select`
- AgencyPersonnelDetail.vue 的 `loadDetail()` 中同步适配

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/120.md
- 涉及文件：路由信息.json、AgencyPersonnelCertificateTable.vue、AgencyPersonnelDetail.vue、detail.vue、index.vue、agency-personnel-real-api-flow.spec.js、detail-template.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：fee19692-41de-42b8-a8ed-8e08fa99ede8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_level_field_fix",
  "source_extraction_id": "43a56e1135f54aee8434303afd94ddab",
  "version": 1,
  "memory_type": "entities"
}
-->