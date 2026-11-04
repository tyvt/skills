- 埋点接口（如/appAnalytics/eventData/add）返回401时，不得阻塞页面跳转，也不得清除登录态或触发重新登录（干扰主流程）。
- redirect中转页应「先跳转、埋点后台发」：先lanch(path)再trackMenuEvent(url)，不对埋点做finally前置依赖。
- 失败也不该影响主流程的请求（埋点、日志、曝光统计）统一走noReject/skipAuth通道，不在调用点各自try/catch。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "analytics_401_policy",
  "source_extraction_id": "cf25625703d14c518174696c3e7c1a4c",
  "version": 1,
  "memory_type": "preferences"
}
-->