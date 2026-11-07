# 账户类型因dictValue不匹配显示数字
OpenDetailDialog.vue 的 form.accountType 因字典 dictValue 与字段值不一致导致 DetailTemplate 的 tag 匹配失败回退显示数字。

## 问题根因
- form.accountType 存 acctypeVal，原 /maintenance/acctype/list 接口字典 dictValue 为 acctypeId
- DetailTemplate 的 tag 匹配失败回退显示数字

## 解决方案
- initDict() 中改用 getDicts('ACCOUNT_TYPE') 使 dictValue 与字段值一致

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：src=园区公共收益/028.md
- 涉及文件：maintenance/accountOpen/owner/components/OpenDetailDialog.vue、maintenance/accountOpen/components/OpenDetailDialog.vue、maintenance/accountOpen/owner/components/detail.vue、store/modules/fund.js、components/detail-template/detail-template.vue、maintenance/accountQuery/type.vue、maintenance/accountOpen/owner/components/OpenDetailTable.vue、maintenance/depositNotice/company/components/AddDialog.vue
- 所属项目：园区公共收益；来源会话：3ef9c696-10c0-4826-b1f5-80042dfc681b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_type_dictvalue_mismatch",
  "source_extraction_id": "73db46eea5524c5d9a7735b32709d2a9",
  "version": 1,
  "memory_type": "entities"
}
-->