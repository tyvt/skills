# 开户银行查询统一 sourceModel 与 regionCode
苏住房G 项目 zhi2-web-admin 新增 workBank.js 工具，统一为 queryStartBank 传入 sourceModel 和 regionCode。

## 改动内容
- 新增 src/utils/workBank.js
- WORK_BANK_SOURCE_MODEL.PROPERTY = 'property'（阳光物业），BENEFIT = 'benefit'（公共收益）
- buildQueryStartBankParams(form, sourceModel, extra) 自动解析 regionCode（优先街道 → 社区 → 区级）
- 阳光物业·账号管理（property/propertyAccount/detail.vue）使用 sourceModel:'property' + regionCode
- 共有资金·开户申请（benefit/pubRegulatoryAccount/detail.vue）使用 sourceModel:'benefit' + regionCode

## 涉及文件
- src/utils/workBank.js
- property/propertyAccount/detail.vue
- benefit/pubRegulatoryAccount/detail.vue
- property/account/components/AccountDialog.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话ID：8599a6b3-e840-4f94-8a1c-c5743587d70f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "work_bank_query_param",
  "source_extraction_id": "5a297a094f1d47ea94c2f934ab29510b",
  "version": 1,
  "memory_type": "entities"
}
-->