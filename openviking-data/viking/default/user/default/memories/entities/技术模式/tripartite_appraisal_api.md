---
audit_status: valid
last_checked: 2026-11-27T00:50:12+08:00
verdict_note: 惠山二期H5命中 selectTripartiteCertDetail/fetchThirdPartyAppraisal/applyNo, 三方鉴定接口属实
---
# 三方鉴定详情接口对接
泰兴小程序三方鉴定详情页现已使用提供的真实接口，请求已内聚到 `maintainProject.js` store 中。

## 接口与映射
- `maintainProject.js` 新增 `selectTripartiteCertDetail(params)`，请求地址为 `/v2.0/maintenance/miniapp/owner/selectTripartiteCertDetail`。
- `fetchThirdPartyAppraisal` 改为按 `applyNo` 查询的真实请求。
- store 内完成页面字段映射：`companyName -> appraisalUnit`、`viewVerdictDate -> conclusionDate`、`viewReportValidDate -> reportValidUntil`、`viewReportState -> situationText`。

## 页面适配
- `object-detail.vue` 跳转参数从 `id` 改为 `applyNo`。
- 跳转路径改为 `/pages_maintain_project/third-party-appraisal?applyNo=` 后接 `applyNo` 参数。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：`src/pages_maintain_project/maintainProject.js`、`src/pages_maintain_project/object-detail.vue`、`src/pages_maintain_project/third-party-appraisal.vue`、`apply-detail.vue`。
- 来源会话ID：a7cba4e4-2167-4cdd-892e-7afdbc7b24c6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tripartite_appraisal_api",
  "source_extraction_id": "886227d69a4c4d8ea47f9fd200dcd0da",
  "version": 1,
  "memory_type": "entities"
}
-->