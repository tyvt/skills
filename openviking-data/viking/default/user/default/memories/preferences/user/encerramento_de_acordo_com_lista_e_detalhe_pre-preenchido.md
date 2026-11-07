- 新增 `guaranteeDepositAgreementEnd/index.vue`（列表，接口 `/page`）和 `detail.vue`（详情），复用 `operation-btn-group` 用于审核，并支持通过 `?agreementId=xxx` 进行预填充
- 级联更新 `guaranteeDeposit/components/index.vue`
- 涉及文件: pubRegulatoryStopAgreement/index.vue, pubRegulatoryStopAgreement/detail.vue, guaranteeDepositAccount/index.vue, guaranteeDepositAccount/detail.vue, guaranteeDeposit/index.vue, guaranteeDeposit/detail.vue, propertyAgreementEnd/index.vue, propertyAgreementEnd/detail.vue
- 验证：源会话 b33c9a86-2657-44fd-82c7-9dec68b27f44

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：b33c9a86-2657-44fd-82c7-9dec68b27f44


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 根据预填列表和明细的关闭",
  "source_extraction_id": "1a2b75746c8a4c628333ce0a17314818",
  "version": 1,
  "memory_type": "preferences"
}
-->
