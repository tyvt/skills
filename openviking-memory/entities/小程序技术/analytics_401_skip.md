# 埋点接口401不阻塞跳转
苏住房C移动端埋点接口返回401时通过标记与拦截器排除避免阻塞页面跳转与清登录态。
## 问题场景
- 调/appAnalytics/eventData/add埋点返回401，导致redirect中转页报错、后续跳转中断，甚至被当登录失效触发重新登录
- redirect页写成trackApi(...).finally(()=>lanch(path))，埋点成为跳转前置依赖
- 全局HTTP拦截器对所有401统一执行userStore.clear()+appLogin()，埋点旁路请求不应有此副作用
- 埋点本身是fire-and-forget，调用方没有await/catch，失败就变成一个拒绝态Promise悬在那里
## 解决方案
- api层对埋点接口同时标记noReject/skipToken/skipAuth，失败不弹错、不触发登录
- httpInstance中将带noReject或skipAuth的请求从401→清登录态+拉登录分支排除（兼容HTTP statusCode形态401）
- redirect页改为「先跳转、埋点后台发」：去掉finally包裹，直接trackMenuEvent(url)后立刻lanch(path)
- 封装silentPost携带noReject:true+skipToken:true，外层再.catch(()=>null)保证Promise永远resolve
- httpInstance响应拦截器让noReject请求在最前面提前返回，跳过clear()/appLogin()等登出逻辑
- 网络fail分支对noReject请求改为resolve(null)而不是reject
- 新增skipToken配置项，埋点类非鉴权请求不带Authorization，从源头避免用过期token换回401
- 判断标准：任何「失败也不该影响主流程」的请求（埋点、日志上报、曝光统计）都走此通道，不在调用点各自try/catch
## 验证与归属
- 验收：埋点401时页面照常跳转、登录态不被清，其他业务接口401处理不受影响
- 验证：会话885fa7c0用户要求eventData/add的401不影响跳转；appAnalytics.js增skipAuth:true与noReject/skipToken并列，httpInstance.js排除对应请求
- 补充验证：会话f8d2218a（2026-08-21，基线9832ba3）用户反馈「/appAnalytics/eventData/add 401这个接口异常不要影响后续逻辑」；最终改为appAnalytics.js统一silentPost（noReject+skipToken+.catch(()=>null)），httpInstance.js让noReject请求在响应拦截中提前返回、跳过userStore.clear()/appLogin()，网络fail时resolve(null)，并新增skipToken配置；来源会话ID：f8d2218a-2bef-4ce0-99ff-25ccbca24f30
- 涉及文件：src/api/appAnalytics.js、src/api/httpInstance.js、src/api/index.js、src/pages/redirect/index.vue
- 所属项目：苏住房C；来源会话ID：885fa7c0-9559-4361-80e6-9a88eb687621；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "analytics_401_skip",
  "source_extraction_id": "78365181dbcb4a00b458a6e0aa385005",
  "version": 2,
  "memory_type": "entities"
}
-->