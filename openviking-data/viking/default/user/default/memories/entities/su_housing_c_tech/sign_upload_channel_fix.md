# 签字提交上传未走苏服办通道分析
苏住房C 小程序「参与决策 → 签字 → 提交」上传未走通用苏服办图片上传通道，根因在 `SignBoard.vue`。

## 问题分析
- 当前请求走普通 POST 网关而非文件上传网关
- 错误请求 `interface_id` 为 `szffluzm-whyhxx`（POST），正确上传应为 `szffluzm-wjsc`（上传专用）
- 错误 `version` 为 `2.1`，正确应为 `v2.1`
- 错误 header 含 `zs-sign`、`zs-param`，正确仅 `zs-authorization`、`zs-path`、`zs-source`
- 错误请求未附带文件，正确 FormData 应含 `file` 字段

## 修复要点
- `gateway.js` 通过 `config.file` 判断上传逻辑：`isFileUpload = !!config.file`，`fileField` 默认为 `file`
- `SignBoard.vue` 需改用上传专用接口与 `zs-authorization` 等正确 header

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`SignBoard.vue`、`gateway.js`、`httpInstance.js`
- 来源会话ID：79a544a0-5a29-4c3d-acb1-c80b3b9dfa2c
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "sign_upload_channel_fix",
  "source_extraction_id": "9e1222fc5f614dea9c5ae5cd01eb602c",
  "version": 1,
  "memory_type": "entities"
}
-->