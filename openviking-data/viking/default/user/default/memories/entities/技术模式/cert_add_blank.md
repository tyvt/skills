# 证书新增无楼幢走旧接口致空白
`ProjectConsLicPanel` 与 `ProjectPlanLicPanel` 原仅在草稿楼幢非空时调主子表接口，否则走旧单表接口导致无楼幢时弹窗空白，已改为始终调新接口。

## 问题根因
- `ProjectConsLicPanel` 与 `ProjectPlanLicPanel` 原逻辑：草稿楼幢 `length > 0` 才调主子表接口
- 否则走旧单表接口，无楼幢时弹窗空白

## 修复方案
- 新增时始终调用 `addConEngConsLicAndBuilding` / `addConEngPlanLicAndBuilding`
- 楼幢读取 `draft*` 或子表 `ref.tableData`（可为空）
- `consLic/detail.vue` 与 `planLic/detail.vue` 同步一致

## 涉及文件
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/certificate/consLic/components/ConsLicBuildTable.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/certificate/consLic/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/DetailSubTableTemplate.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/customerProject/components/ProjectCertificateDetailDialog.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/subTableMixins.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/customerProject/mixins/projectEmbeddedCertificateDetail.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/Headline/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/020.md
- 来源会话ID：a685a691-d9cd-48fb-934f-e93a7a97176d
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_add_blank",
  "source_extraction_id": "2ff3eb53a9534d35a8a41e56fd95e4fb",
  "version": 1,
  "memory_type": "entities"
}
-->