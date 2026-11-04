# 账户详情中终止日期字段被禁用且无值
在项目淮安物管 (zhi2-web-admin) 中，pubRegulatoryAccount/detail.vue 的终止日期 zs-input 被固定禁用（disabled），无法编辑。

## 问题
- terminationDate 的 zs-input 在所有模式下都被硬编码为禁用（disabled）
- 在查看/编辑时来自 getPubRegulatoryAccount；在新建时，form.terminationDate 初始化为 undefined 且没有赋值逻辑

## 影响
- 用户无法定义或更改终止日期

## 文件与验证
- 光标会话 75ba0721-e96d-4590-bbf7-51d468632dec
- 涉及文件: src/views/benefit/pubRegulatoryAccount/detail.vue, components/PubManagementTable.vue, pubManagementOrg/detail.vue, api/benefit/pubRegulatoryAccount.js, pubRegulatoryAgreement/detail.vue, pubRegAccountChange/detail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "termination_date_disabled",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 1,
  "memory_type": "entities"
}
-->