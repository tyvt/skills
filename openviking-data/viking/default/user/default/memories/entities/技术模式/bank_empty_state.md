# 银行表空状态不应固定行数

在 `BankAccountTable.vue` 中固定的 `:table-tr="5"` 导致空状态下出现不紧凑的空白和按钮未对齐。

## 问题根因
- 固定的 `:table-tr="5"` 在无数据时会产生不紧凑的空白
- 空状态下按钮与标题未对齐

## 解决方案
- 在 `BankAccountTable.vue` (supervision/agreement/account 和 property/propertyAccount) 中用 `Headline` 包裹
- 将按钮移动到 `#right` 插槽
- 将 `:table-tr` 绑定到 `itf_bankList.length` 会触发 `zs-table` 的紧凑空状态
- 添加诸如 `titleText` 的 props 以统一布局

## 文件与归属
- 验证证据: src=苏州市房地产监测V3-rest/121.md
- 涉及文件: supervision/agreement/account/detail.vue, property/propertyAccount/components/BankAccountTable.vue, Headline/index.vue, zs-table/zs-table.vue, styles/index.scss, benefit/pubRegulatoryAccount BankAccountTable.vue 和 detail.vue
- 所属项目: 苏州市房地产监测V3; 会话: a5d89768-99be-4451-84bf-85a35b766c41; baseline: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：a5d89768-99be-4451-84bf-85a35b766c41


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_empty_state",
  "source_extraction_id": "9949a745ce6a40b6bab523d20bf2a550",
  "version": 1,
  "memory_type": "entities"
}
-->
