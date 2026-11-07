
# Unregistered zs Components Cause Vue Warning
Usage of unregistered `<zs-button-group>` and `<zs-attachment>` tags triggered unknown custom element warnings in Suzhou Real Estate Monitoring V3 (zhi2-web-admin).

## Description
- `<zs-button-group>` and `<zs-attachment>` not registered caused Vue warnings
- Project: Suzhou Real Estate Monitoring V3 (zhi2-web-admin)

## Root Cause
- Global use of `<zs-button-group>` in 16 files (e.g., chooseHouseDialog.vue) caused warnings
- `<zs-attachment>` in contract/index.vue lacked registration
- In commercialHousingSales/presale detail pages, `<zs-attachment>` and `isAttachmentDialogVisible` unregistered triggered warnings

## Fix
- Replaced `<zs-button-group>` with `<el-button-group>` in 16 files
- In contract/index.vue, swapped `<zs-attachment>` for locally imported `attachmentDraw` with props `:id` and `:bus`
- Removed legacy code in presale detail pages using `<zs-attachment>` to eliminate warning

## Verification
- Evidence: src=苏州市房地产监测V3-rest/003.md, src=苏州市房地产监测V3-rest/087.md, src=苏州市房地产监测V3/059.md
- Sessions: da4d6410-f867-47a9-acf7-3468a014ca81, bf4f4ff9-8f97-43fa-9336-a48464455213
- Files: companyAdmin/detail.vue, contract/index.vue, commercialHousingSales/presale/versionManagement/detail.vue, template/detail.vue, contractRevoke/detail.vue, scripts/migrate-detail-framework.mjs, supervision/progress/node/detail.vue, mixins/detailMixins.js, package.json, buildinginfo/detail.vue, e2e/fixtures/contract-version-helpers.js, chooseHouseDialog.vue, saleAgencyDialog.vue, vite.config.js, main.js, zs-button/index.vue, zs-button/zs-button.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：da4d6410-f867-47a9-acf7-3468a014ca81


<!-- MEMORY_FIELDS
{
  "category": "technical_standard",
  "name": "unregistered_zs_components",
  "source_extraction_id": "cf49faa128334ff6ad44b159523193ea",
  "version": 4,
  "memory_type": "entities"
}
-->
