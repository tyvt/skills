
- 埋点请求携带过期token返回401须静默处理，避免触发登出并阻塞页面跳转
- appAnalytics.js统一走silentPost配noReject:true与skipToken:true且catch(()=>null)保resolve
- httpInstance.js对noReject跳过userStore.clear()/appLogin()，网络fail时resolve(null)，新增skipToken不传Authorization
- 涉及文件：src/api/appAnalytics.js、src/api/httpInstance.js、src/api/index.js、src/utils/menuRouteMap.js、src/pages/redirect/index.vue、src/utils/app.js、src/utils/index.js
- 适用项目：苏住房C(zhi2-mobile-shimin)；验证src=苏住房C/067.md；来源会话f8d2218a-2bef-4ce0-99ff-25ccbca24f30


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "analytics_401_silent",
  "source_extraction_id": "f50f877d11dc4b4680b3c1097a023672",
  "version": 1,
  "memory_type": "preferences"
}
-->