# 苏服办深链topicvoteid处理
苏服办打开轻应用 URL 会额外带 topicvoteid，需入库并在登录后自动开门主决策，外链追加参数与 backUrl。

## 处理流程
- 启动时从 query 写入 portalStore
- 登录/bootstrap 完成后若有该参数，自动走打开业主决策外链逻辑
- openOwnerDecisionVoteH5 对第三方 URL 追加明文 topicvoteid 与 backUrl（UTF-8 再 Base64，值为门户首页完整 URL，含 #/pages/webview/home）
- 第三方返回按钮先 decodeURIComponent 再 Base64 解码，用 window.location.href 整页跳回（hash 路由须在进页时保存 backUrl）

## 工具函数
- 集中在 portal.js：buildPortalHomeBackUrl、buildOwnerDecisionVoteBackUrlParam

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话 099b07e0 用户给出 ydzt.jszwfw.gov.cn 带 topicvoteid 的示例 URL；结论实现 backUrl/topicvoteid 与第三方对接示例
- 涉及文件：src/utils/portal.js、src/hooks/usePortal.js、src/store/portal.js
- 所属项目：无锡市区小程序嵌入H5；来源会话：099b07e0-3f22-4afe-a5e8-451cf8675f31；代码基线：ea242de

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "苏服办深链topicvoteid处理",
  "source_extraction_id": "b940121564bd4e05905f263bb6c08f8a",
  "version": 1,
  "memory_type": "entities"
}
-->