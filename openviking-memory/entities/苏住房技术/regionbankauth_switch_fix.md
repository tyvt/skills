# 未备案单据开关回滚失效修复
苏住房G 区域银行授权页 `el-switch` 变更时因先写新值再取旧值，导致未备案单据开关回滚失败。

## 根因
- `zs-table-column` 的 `handleSwitchChange` 先写 `row.enableStatus` 新值，再调用 `handleEnableChange`。
- 致 `prevStatus` 取到新值而非原值，回滚判断失效。

## 修复方案
- 在 `regionBankAuth/index.vue` 的 `handleEnableChange` 中按目标状态反推原值。
- 拦截 `bizState !== '2'` 的未备案单据，提示并回滚开关。

## 验证与归属
- 验证证据：src=苏住房G/080.md；来源会话：aadf551a-5fa3-495e-9cfd-2fe0eba45d5b。
- 涉及文件：system/regionBankAuth/index.vue、regionBankAuth/detail.vue、property/utilityLinkConfig/index.vue、zs-table-column.vue。

<!-- MEMORY_FIELDS
{
  "category": "苏住房技术",
  "name": "regionbankauth_switch_fix",
  "source_extraction_id": "80b8d85da2ca487fb92817c245845f78",
  "version": 1,
  "memory_type": "entities"
}
-->