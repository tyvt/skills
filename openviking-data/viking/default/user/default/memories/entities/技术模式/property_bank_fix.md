# 物业账户开户银行弹窗 isPubRegulatoryAccount 修复（苏住房G）
苏住房G 项目中物业账户详情页开户银行弹窗新增监管账户查询参数已修复。

## 根因
- `queryStartBank` 请求来自 `property/propertyAccount/detail.vue` 的 `showBankDialog()`，而非之前误改的 `property/account/detail.vue`（后者走 `/system/workBank/list`）

## 修复内容
- 在 `property/propertyAccount/detail.vue` 新增 computed `pubRegulatoryAccountQueryParams`：`add`/`openedAdd` 模式返回 `{ isPubRegulatoryAccount: '1' }`，`edit` 返回 `{}`
- `showBankDialog()` 的 `treeParams` 与 `filterParams` 均 spread 该参数，并补上 `isStart: '1'`
- `setBankBranches()` 网点相关逻辑同步调整

## 验证与归属
- 涉及文件：`property/propertyAccount/detail.vue`、`property/account/detail.vue`、`AccountDialog.vue`、`workBank.js`
- 所属项目：苏住房G；来源会话：4cfcd91c-2679-4f6f-b33f-ee016bf89b9f；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_bank_fix",
  "source_extraction_id": "fce90f19d6d64b639430b16da63eef9f",
  "version": 1,
  "memory_type": "entities"
}
-->