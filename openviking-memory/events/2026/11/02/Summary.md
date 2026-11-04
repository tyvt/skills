# Summary
在 2026-11-02，用户记录了文件 guaranteeDepositAgreement/detail.vue 中缺失的电话格式校验的修复。contactPhone 和 propertyContactPhone 的校验仅包含必填性，缺少格式校验。添加了全局正则 patterns.contactPhone 用于校验手机、固定电话和8位数字号码。涉及文件: d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue, d:/repository/榆林G/zhi2-web-admin/src/views/company/companyManagement/components/detail.vue, d:/repository/榆林G/zhi2-web-admin/src/patterns/index.js, d:/repository/榆林G/zhi2-web-admin/src/mixins/detailMixins.js。来源: cursor 会话 ea514d30-3de8-4e8a-beb7-f0690c0e8a2b。
# 2026-11-02 (Monday) ChatLog:
**user**: 【记忆类型】bug
【标题】保证金协议物业开发电话缺格式校验
【内容】根因：`guaranteeDepositAgreement/detail.vue`中`contactPhone`与`propertyContactPhone`仅配必填校验，缺失格式校验。修复：补充全局`patterns.contactPhone`正则`/^((0\d{2,3}-\d{7,8})|(\d{8})|(1[3|4|5|6|7|8|9][0-9]\d{8}))$/`校验手机、座机及8位号码。
【验证证据】extracted source=cursor session=ea514d30-3de8-4e8a-beb7-f0690c0e8a2b
【涉及文件】d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue ; d:/repository/榆林G/zhi2-web-admin/src/views/company/companyManagement/components/detail.vue ; d:/repository/榆林G/zhi2-web-admin/src/patterns/index.js ; d:/repository/榆林G/zhi2-web-admin/src/mixins/detailMixins.js ; guaranteeDepositAgreement/detail.vue
【来源会话ID】ea514d30-3de8-4e8a-beb7-f0690c0e8a2b

<!-- MEMORY_FIELDS
{
  "event_name": "",
  "goal": "",
  "summary": "",
  "ranges": "0-4",
  "source_extraction_id": "ebd72c614ecf41f9ba8d70d6d434c474",
  "version": 1,
  "memory_type": "events"
}
-->