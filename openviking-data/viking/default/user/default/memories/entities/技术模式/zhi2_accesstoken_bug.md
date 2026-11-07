# 园区公共收益Web后台登录鉴权须用accessToken写请求头
园区公共收益项目(zhi2-web-admin)登录成功后接口仍401，根因是请求拦截器误用登录返回里的token字段而非accessToken。

## 问题根因
- 登录响应可能同时含`token`(临时令牌)与`accessToken`，网关校验的是`accessToken`
- `request.js`拦截器原将`UserLoginInfo.token`塞进Authorization导致鉴权失败
- 仅修store未改拦截器会遗留问题

## 解决方案
- 持久化与`getToken()`只认`accessToken`
- `request.js`统一`Authorization: Bearer ${accessToken}`
- 改登录页或`store/modules/user.js`时核对`auth.js`读写键名

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：src/utils/request.js、src/utils/auth.js、src/store/modules/user.js、src/views/login.vue
- 所属项目：园区公共收益；来源会话：a6727568-bde2-4da6-a70a-31bf732716a4；代码基线：bd275b5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_accesstoken_bug",
  "source_extraction_id": "c36c34f056dd48c9be8f216646e9ea81",
  "version": 1,
  "memory_type": "entities"
}
-->