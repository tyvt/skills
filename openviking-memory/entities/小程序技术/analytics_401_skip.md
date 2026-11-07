
# 埋点接口401不阻塞跳转
苏住房C移动端埋点接口返回401时通过标记与拦截器排除避免阻塞页面跳转与清登录态。

## 问题场景
- 调/appAnalytics/eventData/add埋点返回401，redirect中转页报错、跳转中断，甚至被当登录失效触发重新登录
- redirect页原写成trackApi(...).finally(()=>lanch(path))，埋点成为跳转前置依赖
- 全局HTTP拦截器对所有401统一执行userStore.clear()+appLogin()，埋点旁路请求不应有此副作用
- 埋点fire-and-forget，调用方无await/catch，失败变拒绝态Promise悬空

## 解决方案
- api层对埋点接口标记noReject/skipToken/skipAuth，失败不弹错、不触发登录
- httpInstance响应拦截器让noReject请求提前返回，跳过userStore.clear()/appLogin()登出逻辑；网络fail改resolve(null)
- redirect页改「先跳转、埋点后台发」：直接trackMenuEvent(url)后立刻lanch(path)，去掉finally包裹
- 封装silentPost携带noReject:true+skipToken:true，外层.catch(()=>null)保证Promise永resolve
- 新增skipToken配置，埋点类非鉴权请求不带Authorization，从源头避免过期token换401
- 判断标准：任何「失败也不该影响主流程」请求（埋点、日志、曝光）走此通道，不在调用点各自try/catch

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：f8d2218a-2bef-4ce0-99ff-25ccbca24f30
- 验收：埋点401时页面照常跳转、登录态不被清，其他业务接口401不受影响
- 会话885fa7c0用户要求eventData/add的401不影响跳转；appAnalytics.js增skipAuth:true与noReject/skipToken并列，httpInstance.js排除对应请求；来源苏住房C/045.md
- 会话f8d2218a（2026-08-21，基线9832ba3）用户反馈「/appAnalytics/eventData/add 401异常不要影响后续逻辑」；最终appAnalytics.js统一silentPost，httpInstance.js让noReject提前返回、fail resolve(null)、新增skipToken；来源f8d2218a-2bef-4ce0-99ff-25ccbca24f30
- 涉及文件：src/api/appAnalytics.js、src/api/httpInstance.js、src/api/index.js、src/pages/redirect/index.vue、src/utils/menuRouteMap.js、src/pages_tab/components/Home_Suzhufang.vue、src/utils/index.js、src/utils/app.js
- 所属项目：苏住房C；基线：9832ba3


<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "analytics_401_skip",
  "source_extraction_id": "cf25625703d14c518174696c3e7c1a4c",
  "version": 3,
  "memory_type": "entities"
}
-->