# 房屋质量保证金协议终止前端功能
产品2.0 项目实现房屋质量保证金协议终止前端功能，包含列表页、详情页与联动更新。

## 列表页
- 文件：`guaranteeDepositAgreementEnd/index.vue`
- 接口：`GET /maintenance/guaranteeDepositAgreementEnd/page`，主键：`agreementEndId`
- 搜索：物业管理区域、开发企业、物业服务企业、建设单位、协议状态
- 列表列：协议编号、物业管理区域、开发企业、统一社会信用代码、物业服务企业、建设单位、协议状态、单据状态
- 支持新增、删除（仅 `bizState=0` 待提交可删）

## 详情页
- 文件：`guaranteeDepositAgreementEnd/detail.vue`
- 展示：物业管理区域、开发企业、物业服务企业、建设单位、协议信息、终止信息
- 新增流程：选择已备案（有效）协议 → 填写终止原因（必填，500字）→ 保存 → 提交审核
- 附件：新增/编辑模式「终止原因」下方增加「附件」字段（zs-file-upload 组件，字段名 attachments，支持 png/jpg/jpeg/pdf/doc/docx，选填），getForm() 已包含该字段一并提交；查看模式展示已上传附件
- 审核流程：复用 `operation-btn-group`（提交、审核、取消提交、取消审核）
- 支持 `?agreementId=xxx` 预填协议（便于从协议详情跳转）

## 联动更新
- 文件：`guaranteeDeposit/components/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：b33c9a86-2657-44fd-82c7-9dec68b27f44；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_deposit_end_feature",
  "source_extraction_id": "57e872b5424442ffaddb2a2cb119a7a7",
  "version": 2,
  "memory_type": "entities"
}
-->