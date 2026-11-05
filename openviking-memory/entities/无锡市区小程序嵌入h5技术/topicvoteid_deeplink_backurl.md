# topicvoteid深链参数与backUrl回调实现
无锡市区小程序嵌入H5已实现 backUrl 回调参数与 topicvoteid 深链参数支持，用于业主决策投票外链跳转。

## 代码改动
- src/utils/portal.js 新增 encodeBase64Utf8、buildPortalHomeBackUrl、buildOwnerDecisionVoteBackUrlParam
- src/hooks/usePortal.js 的 openOwnerDecisionVoteH5 打开外链时追加 topicvoteid 与 backUrl
- src/pages/face/bdc.vue 复用 encodeBase64Utf8 去掉重复实现

## 参数说明
- topicvoteid：议题ID（明文）
- backUrl：Base64(UTF-8) 编码的回调地址

## 验证与归属
- 验证证据：会话 099b07e0 用户确认实现
- 涉及文件：portal.js、usePortal.js、bdc.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：099b07e0-3f22-4afe-a5e8-451cf8675f31；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "topicvoteid_deeplink_backurl",
  "source_extraction_id": "d627421ec49c4bd58fa21558c5e6d07e",
  "version": 1,
  "memory_type": "entities"
}
-->