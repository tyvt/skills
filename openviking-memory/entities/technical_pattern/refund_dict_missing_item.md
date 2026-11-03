# 退款详情字典缺项直接读dictValue报错
`refund/detail.vue` 的 `initDict()` 对 `NOTICE_VALIDITY` 字典 `find()` 结果直接访问 `.dictValue`，缺 `REFUND_NOTICE_VALIDITY` 时抛 `Cannot read properties of undefined`。

## 问题根因
- `refund/detail.vue` 的 `initDict()` 对 `NOTICE_VALIDITY` 字典 `find()` 后直接读 `.dictValue`
- 缺少 `REFUND_NOTICE_VALIDITY` 字典项时 `find()` 返回 undefined
- 访问 `.dictValue` 抛 `Cannot read properties of undefined`

## 解决方案
- 于 `zhi2-web-admin/src/utils/noticeValidity.js` 新增 `getNoticeValidityDays` 安全查找
- 缺失时不抛错并提示手动选择
- 同步修复同类隐患

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/090.md
- 涉及文件：refund/detail.vue、presale/exchangeContract/detail.vue、presale/specialcontract/detail.vue、agreement/account/detail.vue、detail-template.vue、dict-tag.vue、supervision/bank/cbyh/detail.vue、mixins/detailMixins.js、scripts/scan-tag-mismatch.js
- 所属项目：苏州市房地产监测V3；来源会话：78d15986-f89e-4ac8-b7bf-426222e6b9db；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "refund_dict_missing_item",
  "source_extraction_id": "8ed586693555450a9c1dcbba0fb39408",
  "version": 1,
  "memory_type": "entities"
}
-->