# 银行账户查询空表留白与按钮位置统一修复
苏州市房地产监测V3 的 supervision 与 property 两个 BankAccountTable 已完成空表留白与按钮位置统一修复。

## 修改内容
- supervision `BankAccountTable.vue`：用 `Headline` 包裹，按钮移至 `#right` 插槽（与标题同一行）
- `:table-tr="5"` 改为 `:table-tr="itf_bankList.length"`，无数据时触发 `zs-table` 紧凑空态
- 新增 `titleText`、`showBalanceQueryButton`、`form` props
- property `BankAccountTable.vue` 同步实施上述相同改动

## 涉及文件
- `zhi2-web-admin/src/views/supervision/agreement/account/components/BankAccountTable.vue`
- `zhi2-web-admin/src/views/property/propertyAccount/components/BankAccountTable.vue`
- `supervision/agreement/account/detail.vue`
- `property/propertyAccount/detail.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：a5d89768-99be-4451-84bf-85a35b766c41
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_query_fix",
  "source_extraction_id": "ab3da10e36a44bd0aa5622239b14a9f5",
  "version": 1,
  "memory_type": "entities"
}
-->