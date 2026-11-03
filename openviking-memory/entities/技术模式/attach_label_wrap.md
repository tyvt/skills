# 附件上传全局化传label自套外壳
`StandaloneAppendixField` 传入 `label` 时自动套用宫格外壳与标题条，脱离证书专用组件依赖，已全局样式接入。

## 问题根因
- `StandaloneAppendixField`（`zs-file-upload`/`FileUpload` 底层）传入 `label` 时需依赖证书专用组件包裹

## 修复方案
- 传入 `label` 时自动套用 `appendix-requirement-grid` 宫格外壳与标题条
- 全局样式 `appendix-requirement-grid.scss` 已在 `index.scss` 引入
- 表单项加 `appendix-labeled-field-form-item` 类并设 `label-width="0"` 消除重复标签

## 涉及文件
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/detailAttachmentDisplay.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/customerProject/components/ProjectCertificateTabs.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/certificate/conLandLic/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/detail-template/detail-template.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/certificate/planLic/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/certificate/stateLandLic/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/buildinginfo/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/certificate/conLandLic/changeDetail.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/020.md
- 来源会话ID：f08e4450-7e4c-4f7a-8514-96638563fc99
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "attach_label_wrap",
  "source_extraction_id": "2ff3eb53a9534d35a8a41e56fd95e4fb",
  "version": 1,
  "memory_type": "entities"
}
-->