
# 门户后端 (zhishu/portal)
苏州住房门户系统后端服务仓库，负责登录、SSO 跳转等接口；feature 分支已实现管理端 APP 接入统一门户登录（禅道1431）。

## 基本信息
- 仓库路径：D:\repository\门户后端
- Git 地址：http://gitlab.zhi.com/zhishu/portal.git
- 分支：本地与远端均有 dev、main（dev 含 main「门户统一登录」系列提交，含 43737de SSO Ticket 重构）
- 联调分支 feature/feat-dzc-261111：HEAD d5c413b「【苏住房】管理端APP接入统一门户登录需求门户后端实现」，2026-11-11 拉取本地联调
- 构建须 JDK21（D:\sdk\apps\temurin21-jdk\current），Maven 仓库 D:/maven-repo；产出 common-portal-server.jar 与 common-gateway.jar
- 运行依赖：Nacos(nacos.dev.zhi.com)、Dameng 测试库(192.168.1.101:15236)、Redis(192.168.1.110:16379 db0)、阿里云短信通道(dysmsapi.aliyuncs.com)

## 已实现接口（PC/SSO）
- POST /v3.0/portal/login/login：PC 账号密码登录，入参 {userName, password}
- POST /v3.0/portal/sso/jump：SSO 跳转，入参 {token, appId, targetUrl?}，返回 redirectUrl（JumpReqDto/JumpRespDto）
- 另有 /v3.0/portal/sso/ticket/verify、/verify 等 SSO 相关接口

## 已实现接口（APP 登录，feature/feat-dzc-261111，禅道1431）
- POST /v3.0/portal/appLogin/captcha：无入参，返回 {uuid, img}（base64，120s 一次性，Redis key portal:applogin:captcha:<uuid>）
- POST /v3.0/portal/appLogin/sms：入参 {phone, idNumberSuffix, captchaUuid, captchaCode}，校验图形码+手机号+证件后4位匹配，发短信并将6位码存 Redis(appLogin:<phone>，300s)；需 Nacos sms.sources.appLogin 配置
- POST /v3.0/portal/appLogin/login：入参 {phone, idNumberSuffix, smsCode} 三重校验，返回 {token, expireTime, userId, userName, nickName}
- POST /v3.0/portal/appLogin/apps：Bearer 鉴权，返回 [{appId, appName, appLogo, authorized}]

## 联调状态（2026-11-11）
- 前端 portalAuth.ts / login-design/index.vue 已补 idNumberSuffix，vue-tsc 通过；前端改动（含 systems/index.vue、stores/auth.ts、theme.css、scripts/redis-cli.mjs）未提交
- 后端代码零改动；开发库按分支 changelog 手工补列 T_PORTAL_DATA_MAPPING.SOURCE_USER_NAME、T_PORTAL_APPLICATION.ORDER_NUM/PROJECT_NAME（Nacos liquibase.enabled=false 致迁移未跑）
- 本地 e2e 直连 server :9222 全链路打通：captcha✅ / login✅(userId=104) / apps✅(3应用,szfczhpt authorized=true) / sso/jump✅(redirectUrl+ticket)；/sms 经 Redis 注入验证码绕过阿里云
- 测试账号：USER_ID=104，手机 13598941413，身份证后4位 1176，已授权 szfczhpt
- 待办（发布配置，未改共享环境）：Nacos application.yml 增加 sms.sources.appLogin 模板 code；dev 启用 liquibase 或补跑分支 3 个 changelog


<!-- MEMORY_FIELDS
{
  "category": "门户后端",
  "name": "zhishu_portal",
  "source_extraction_id": "00c444c3dac94ae08c34a642d8476228",
  "peer_id": "D--repository---H5",
  "version": 2,
  "memory_type": "entities"
}
-->