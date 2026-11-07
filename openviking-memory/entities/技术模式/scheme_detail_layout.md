# 服务方案详情三列栅格与纯文本改造
苏州市房地产监测V3 的 zhi2-web-admin 中 companyScheme/detail.vue 编辑态复用全局三列栅格、查看态用 FORM_COL 常量并将服务内容改为 textarea 规避 v-html 风险。

## 变更内容
- 编辑态复用全局 `section-form` 等三列栅格（`detail-form.scss`），`label-position` 改 `left` 并移除页内重复样式
- 查看态 `detailItems` 使用 `FORM_COL_THREE`/`FORM_COL_FULL` 常量布局
- 「服务内容」由 `richtext` 改为 `textarea`，规避 `v-html` 渲染风险

## 涉及文件
- `zhi2-web-admin/src/views/company/companyScheme/detail.vue`
- `zhi2-web-admin/src/styles/detail-form.scss`
- `zhi2-web-admin/src/views/company/companyManagement/components/AgencyBasicInfoForm.vue`
- `zhi2-web-admin/src/components/detail-template/detail-template.vue`
- `zhi2-web-admin/src/utils/detailLayout.js`
- `zhi2-web-admin/src/views/supervision/agreement/jgxm/components/SupervisionAddDialog.vue`
- `zhi2-web-admin/src/views/toB/agencyRecord/detail.vue`
- `zhi2-web-admin/src/views/company/companyRecordAgency/detail.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/142.md
- 来源会话ID：3186cfc4-7158-4eb1-b135-f23262301582；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scheme_detail_layout",
  "source_extraction_id": "72d05272e66f4c8da18668a0d230c1cf",
  "version": 1,
  "memory_type": "entities"
}
-->