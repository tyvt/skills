- 埋点请求携带过期token返回401须静默处理，避免触发登出并阻塞页面跳转
- appAnalytics.js统一走silentPost配noReject:true与skipToken:true且catch(()=>null)保resolve
- httpInstance.js对noReject跳过userStore.clear()/appLogin()，网络fail时resolve(null)，新增skipToken不传Authorization
- 埋点接口（eventDataAdd、projectDataAdd、stockDataAdd、smartDataAdd）带noReject:true时，网络异常或网关失败也不再showToast，错误仍写入控制台日志便于排查（来源会话cc6f6b5a-0108-4cad-9087-5dce18827d62）
- 涉及文件：src/api/appAnalytics.js、src/api/httpInstance.js、src/api/index.js、src/utils/menuRouteMap.js、src/pages/redirect/index.vue、src/utils/app.js、src/utils/index.js
- 适用项目：苏住房C(zhi2-mobile-shimin)；验证src=苏住房C/067.md；来源会话f8d2218a-2bef-4ce0-99ff-25ccbca24f30

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "analytics_401_silent",
  "source_extraction_id": "28e8d98968314a9086db1bb85f1eddd6",
  "version": 2,
  "memory_type": "preferences"
}
-->
