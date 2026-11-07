# 预售转现售详情取数缺失总幢数户数致回显失败
苏州市房地产监测V3 中 `/presale/permit/detail` 取数未返回总幢数/总户数等字段致表单回显缺失，已通过字段补全与统一映射修复。

## 问题根因
- `/presale/permit/detail` 取数未返回总幢数/总户数等字段
- 导致 `CashsaleDetail.vue` 表单回显缺失

## 修复方案
- `CashsaleDetail.vue` 的 `loadTransferPlan` 经 `patchEmptyDisplayFields` 补全空字段
- `cashsaleConstants.js` 新增 `mapProjectDisplayFields` 统一映射并兼容 `buildingCount`/`houseCount` 别名
- 在 `detailCallback`、`handlePermitSelect` 与 `handleProjectChange` 中复用该映射

## 涉及文件
- zhi2-web-admin/src/views/presale/cashsale/components/CashsaleDetail.vue 与 CashsaleInfoPanel.vue
- zhi2-web-admin/src/views/presale/cashsale/cashsaleConstants.js
- zhi2-web-admin/src/mixins/detailMixins.js 与 form.js
- zhi2-web-admin/src/views/presale/cashsale/transfer/detail.vue
- zhi2-web-admin/e2e/fixtures/cashsale-transfer-helpers.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/156.md
- 来源会话：b85d9888-4202-4fa9-b003-9d507416419b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_detail_field_echo",
  "source_extraction_id": "5226bb432f51444c806d951babd78102",
  "version": 1,
  "memory_type": "entities"
}
-->