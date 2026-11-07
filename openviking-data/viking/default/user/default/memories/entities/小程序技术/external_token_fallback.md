# externalWebview token 兜底获取
pages/webview/externalWebview.vue 的 requestProfile 增加 token 兜底逻辑，属重复出现的兜底处理模式。

## 变更内容
- requestProfile(token) 内新增：currentToken = token || this.getCurrentToken()
- 按 currentToken 动态组装 requestHeader
- uni.request 的 header 改为 requestHeader，避免 token 为空时出现无效 Bearer
- 调用方未传 token 时自动从页面/全局/缓存获取

## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 当前无 linter 报错
- 涉及文件：pages/webview/externalWebview.vue、App.vue、utils/request.js
- 来源会话：0d9ff23f-d0ef-43e6-a8c6-8ef81d6383a9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "external_token_fallback",
  "source_extraction_id": "d724a33faad04a55a64d07ba768c13fb",
  "version": 1,
  "memory_type": "entities"
}
-->