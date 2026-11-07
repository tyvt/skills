# 银行对话框中的公共监管账户筛选
在 Suzhou Housing G 项目中，参数 isPubRegulatoryAccount 仅当模式不为 'openedAdd' 时发送。

## 原因与解决
- 在 detail.vue 中，函数 showBankDialog 检查 formMode。
- 如果 formMode != 'openedAdd'，则发送 isPubRegulatoryAccount:'1' 以筛选运营银行。
- 否则，不发送该参数。

## 涉及的文件
- src/views/benefit/pubRegulatoryAccount/detail.vue
- src/views/system/regionBankAuth/detail.vue
- src/utils/workBank.js
- src/views/property/propertyAccount/detail.vue
- src/views/benefit/pubRegulatoryAccount/index.vue

## 验证
- 验证证据: 苏住房G/088.md (内部文档).
- 源会话: d88a1f97-8d9a-4d6d-a7cd-02ddf13b5a0d.
- 代码基线: none.

## 验证与归属
- 所属项目：苏住房G
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：d88a1f97-8d9a-4d6d-a7cd-02ddf13b5a0d


<!-- MEMORY_FIELDS
{
  "category": "缺陷修复",
  "name": "pub_reg_account_param",
  "source_extraction_id": "d932d4a67f654d5dbfff00e631306d33",
  "version": 1,
  "memory_type": "entities"
}
-->
