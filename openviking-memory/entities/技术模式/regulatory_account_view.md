# 开户申请详情显示银行账号
淮安物管开户申请详情页在查看模式需固定显示银行账号相关字段的修复模式。

## 问题根因
- `benefit/pubRegulatoryAccount/detail.vue` 的「管理银行」区块由 `showRegulatoryAccountFields` 控制。
- 原逻辑：查看模式仅当已填账号或 `accountOpenType === '1'`（已开户备案）才显示。
- 普通「新增」开户申请 `accountOpenType` 为 `'0'` 且无账号信息，导致字段隐藏。

## 修复方案
- 修改：当 `formMode === 'view'` 时始终显示「银行账号」「银行账户名称」，位于「网点联系电话」与「备注」之间。
- 编辑/新增模式仍按原逻辑控制。
- 账号未回传时显示为空，已保存则正常显示。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管；来源会话：4d35ab61-aca0-48ea-856a-b970e5251900
- 涉及文件：benefit/pubRegulatoryAccount/detail.vue、property/propertyAccount/detail.vue、benefit/pubRegulatoryAccount/index.vue、mixins/detailMixins.js
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regulatory_account_view",
  "source_extraction_id": "4ebd15bf71a8499ab4122103a7acac56",
  "version": 1,
  "memory_type": "entities"
}
-->