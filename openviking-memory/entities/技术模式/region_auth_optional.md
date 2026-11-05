# 行政区域银行授权「协议」非必填（苏住房G）
苏住房G 行政区域银行授权前端「协议」已改为非必填。

## 改动说明
- `regionBankAuth/detail.vue`：从 `rules` 删除 `agreementBizId` 必填规则，去掉 `ZsSubmit` 的 `:before-submit` 及 `validateAgreementForSubmit` 方法
- `regionBankAuthChange/detail.vue`：从 `rules` 删除 `agreementBizId` 必填规则
- 保存仍按原逻辑提交 `agreementBizId`（有值则传，无则为 `undefined`）

## 待验证
- 编辑保存：无协议或清空后保存应成功
- 提交：草稿查看页无协议可提交，不再提示「请先上传线下签署的协议」
- 变更保存：变更详情不上传协议可保存；若接口仍返回「协议不能为空」需后端处理

## 验证与归属
- 所属项目：苏住房G；来源会话：607c2421-907c-47de-86d0-5678a1ce399b
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_auth_optional",
  "source_extraction_id": "860342b9e35444b492cc9a51f5ff3149",
  "version": 1,
  "memory_type": "entities"
}
-->