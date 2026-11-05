# 埋点请求401静默失败修复
苏住房C小程序埋点接口返回401时不再打断页面跳转与菜单点击等后续逻辑。

## 问题原因
- /appAnalytics/eventData/add 返回401时，原逻辑可能触发登出/跳转登录，阻塞后续操作
- redirect页埋点后跳转可能被reject阻塞

## 修复内容
- appAnalytics.js统一走silentPost，配置noReject:true + skipToken:true，外层catch(() => null)确保Promise始终resolve
- httpInstance.js对noReject请求在响应拦截提前返回，跳过userStore.clear()/appLogin()等401登出逻辑
- 网络fail时对noReject请求resolve(null)，新增skipToken配置，埋点类请求不传Authorization

## 验证与归属
- 效果：埋点401静默忽略，redirect页埋点后跳转不被阻塞
- 涉及文件：src/api/appAnalytics.js、httpInstance.js、src/api/index.js、src/utils/menuRouteMap.js
- 所属项目：苏住房C；来源会话ID：f8d2218a-2bef-4ce0-99ff-25ccbca24f30；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "analytics_silent_fix",
  "source_extraction_id": "024075fb80c64e0a8d2ee5d6485b7b39",
  "version": 1,
  "memory_type": "entities"
}
-->