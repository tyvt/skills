# 通过 branchCode 错误分配的监管银行代码

在 淮安物管 项目中，监管银行代码被错误地使用 `bankBranchCode` 而非 `bankCode` 进行赋值，与后端的预期不符。

## 问题根因
- `pubRegulatoryAccount/detail.vue` 和 `propertyAccount/detail.vue` 中的回调 `showBankDialog` 使用 `row.bankBranchCode` 为 `regulatoryBankCode` 赋值。

## 修正
- 回调改为使用 `row.bankCode` 以匹配后端的银行代码存储。

## 涉及的文件
- `benefit/pubRegulatoryAccount/detail.vue`, `benefit/pubWorkBank/detail.vue`
- `benefit/pubRegAccountChange/detail.vue`, `benefit/pubRegAccPropMgmt/detail.vue`
- `maintenance/bank/detail.vue`, `property/propertyAccount/detail.vue`
- `components/zs-select-dialog/zs-select-dialog-func.vue`, `benefit/pubRegulatoryAgreement/detail.vue`

## 验证
- cursor 会话: e057ae2f-2107-42b9-9657-ffd0a073d835
- 所属项目: 淮安物管 zhi2-web-admin; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bankcode_misassign",
  "source_extraction_id": "f67373fbed294ece99126a068db590fe",
  "version": 1,
  "memory_type": "entities"
}
-->