# 监管账户银行回传账号只读修复
淮安物管开户申请与物业账户模块中，银行回传的账号在编辑模式下不应可修改，已修复为只读。

## 问题根因
- `benefit/pubRegulatoryAccount/detail.vue` 中 `canEditRegulatoryAccountFields` 原先在编辑模式且已有银行账号时返回 `true`。
- 导致银行回传（`accountOpenType == '0'`）的账号仍可修改，不符合预期。

## 修复方案
- 与物业账户模块保持一致，仅以下情况可编辑：`openedAdd`（已开户手工补录）或 `accountOpenType == '1'`（手工录入）。
- 银行回传（`accountOpenType == '0'`）时，「银行账号」和「银行账户名称」均为只读，仅展示回传值。
- 修改文件：`zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue`、`zhi2-web-admin/src/views/property/propertyAccount/detail.vue`。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管；来源会话：be883941-555c-45f9-bd6f-1078dd8d0fc0
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_return_readonly",
  "source_extraction_id": "766cfeab02434f30a55a13c9314916f3",
  "version": 1,
  "memory_type": "entities"
}
-->