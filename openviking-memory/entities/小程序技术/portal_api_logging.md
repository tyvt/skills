# 生产环境 PortalAPI 日志开启
requestCtAuth 中的请求/响应日志在体验版与正式版均输出，开发版不输出。

## 行为变更
- 原先由 shouldLogPortalApiInTrial() 控制，仅 envVersion==='trial' 时输出，正式版 release 直接 return 无日志
- 改为 shouldLogPortalApi，在体验版(trial)与正式版(release)均开启日志
- 新增 getPortalApiLogPrefix() 按环境区分前缀：正式版为 `[正式版][PortalAPI]`，体验版为 `[体验版][PortalAPI]`
- 开发版(develop)仍不输出，避免本地调试时日志过多

## 验证与归属
- 正式版需在真机调试或 vConsole 中查看 console.log；微信开发者工具选「正式版」预览时同样可见
- 验证证据：extracted source=cursor session=7a8362cf-cec7-4d22-a7bd-d0cf2fe6e97f
- 涉及文件：utils/portal-user.js、utils/portal-env-config.js
- 来源会话ID：7a8362cf-cec7-4d22-a7bd-d0cf2fe6e97f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_api_logging",
  "source_extraction_id": "9026a2dd560f4c3591414dede07daa93",
  "version": 1,
  "memory_type": "entities"
}
-->