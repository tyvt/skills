# 因未排除返回状态导致银行返回账户可编辑
在 淮安物管 项目中，由于未排除返回状态，银行返回的银行账户在详情页面中保持可编辑状态。

## 问题根因
- `pubRegulatoryAccount/detail.vue` 中的 `canEditRegulatoryAccountFields` 在编辑模式且存在账户时返回了 true。
- 这允许编辑银行返回账户（`accountOpenType == '0'`）。

## 修复
- 编辑现在仅允许在 `openedAdd` 或 `accountOpenType == '1'` 时进行。
- 银行返回账户变为只读。

## 涉及文件
- `benefit/pubRegulatoryAccount/detail.vue`
- `property/propertyAccount/detail.vue`

## 验证
- cursor 会话: be883941-555c-45f9-bd6f-1078dd8d0fc0
- 所属项目: 淮安物管 zhi2-web-admin; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_return_editable",
  "source_extraction_id": "f67373fbed294ece99126a068db590fe",
  "version": 1,
  "memory_type": "entities"
}
-->