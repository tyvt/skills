# H5门户前端项目
uni-app 编写的 H5 门户前端项目，构建产物为 dist，由 nginx 托管在 localhost:8091。

## Description
- 使用 Vite 构建，VITE_DATA_MODE 为构建期常量，支持 demo 与 remote 两种模式。
- 登录页 src/pages/login-design/index.vue 以 isRemote 判断 VITE_DATA_MODE 是否不为 demo，决定是否真正调用后端接口。
- demo 模式下 sendSmsCode 与 appLoginAction 不调接口，仅走本地假倒计时。
- 验证码登录需手机号、身份证后四位、图形验证码、短信码；密码登录分支当前抛「密码登录接口未开放」。

## Build Config
- .env 设置 VITE_DATA_MODE=remote 且 VITE_API_BASE_URL=/api 时走真实接口。
- 修改 .env 后必须重新执行 npm run build:h5，构建期常量才会烘焙进包，仅刷新页面无效。
- portalAuth.ts 调用 /api/v3.0/portal/appLogin/{captcha,sms,login,apps} 及 /api/v3.0/portal/sso/jump。

## Significance
- 2026-11-11 因 dist 在切 remote 前以 demo 模式构建，导致登录不调接口，当日重新构建修复。


<!-- MEMORY_FIELDS
{
  "peer_id": "D--repository---H5",
  "category": "前端项目",
  "name": "h5_portal_frontend",
  "source_extraction_id": "dba2f19a9ce34be7b4625c17b2fd44b5",
  "version": 1,
  "memory_type": "entities"
}
-->