# 苏服办JSSDK取票流程
在宿迁苏服办项目中，App.vue 的 initUser() 通过 lightAppJssdk.user.getTicket() 获取票据，无需显式传 appid。

## 调用流程
- Ticket 由 src/App.vue 的 initUser() 调用 lightAppJssdk.user.getTicket() 获取
- 调用 JSSDK 获取票据无需显式传 appid
- 未登录时触发 loginapp() 拉起登录

## 登录与校验
- 登录成功解析 obj.ticket 后由 verifyTicket() 发往后端 /trans 校验

## 验证与归属
- 验证证据：extracted source=cursor session=8c6acf84-85d0-40a8-8673-25165df2d108
- 涉及文件：d:/repository/宿迁苏服办/src/App.vue、src/api/config.js、src/api/gateway.js、index.html
- 所属项目：宿迁苏服办；来源会话：8c6acf84-85d0-40a8-8673-25165df2d108；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "app_jssdk_ticket",
  "source_extraction_id": "d82dd7e7fe344bf68c816f8510fcdc29",
  "version": 1,
  "memory_type": "entities"
}
-->