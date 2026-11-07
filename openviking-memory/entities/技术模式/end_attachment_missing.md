# 协议终止详情页缺失附件上传组件
`guaranteeDepositAgreementEnd/detail.vue` 终止详情页缺少附件上传，需在「终止原因」下增加 `zs-file-upload` 组件。

## 问题根因
- `guaranteeDepositAgreementEnd/detail.vue` 终止详情页缺少附件上传组件

## 解决方案
- 在「终止原因」下增加 `zs-file-upload` 组件，字段为 `attachments`，支持 png/jpg/pdf/doc 等格式
- 查看模式渲染附件
- `getForm()` 包含 `attachments` 字段随表单提交

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreementEnd/detail.vue、index.vue、benefit/pubRegulatoryStopAgreement/detail.vue、mixins/listMixins.js、property/propertyAgreementEnd/detail.vue、router/index.js、benefit/pubQuarterlyDeclaration/detail.vue
- 所属项目：产品2.0；来源会话：cacd083e-59be-4431-9d3b-dd3a418fa3bd；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "end_attachment_missing",
  "source_extraction_id": "61bcf916e961454588f66fa839204bbe",
  "version": 1,
  "memory_type": "entities"
}
-->
