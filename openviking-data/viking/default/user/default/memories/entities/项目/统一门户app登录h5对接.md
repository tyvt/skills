# 统一门户APP登录H5对接
uni-app (Vue 3) H5 项目，按《统一门户 APP 端登录接口文档 v1.0.0》完成 APP 三重登录对接。

## 接口（5个）
- POST /portal/appLogin/captcha：fetchAppLoginCaptcha，返回 {uuid, img}，img 兼容 data: 与裸 base64
- POST /portal/appLogin/sms：sendAppLoginSms，传 phone/captchaUuid/captchaCode
- POST /portal/appLogin/login：appLogin，三重校验，userId long→字符串
- POST /portal/appLogin/apps：fetchPortalApps，带 Bearer，返回含 authorized
- POST /portal/appLogin/sso/jump：jumpToPortalApp，每次现取新票，绝不缓存 redirectUrl

## 关键改动文件
- src/utils/portalAuth.ts（新增）：5 接口封装，统一解包 {code,msg,data}，code≠200 抛 msg，401→"登录已失效"
- src/stores/auth.ts：新增 appLoginAction（存 token+用户信息到本地），currentUser/logout/isLoggedIn，保留旧密码登录兼容
- src/pages/login-design/index.vue：图形码新接口常驻点击刷新；发短信前强校验图形码、发后无论成败刷新；验证码登录改真实三重校验（手机号+身份证后4位+6位短信码）60秒倒计时；demo 保留直进
- src/pages/systems/index.vue：真实模式挂载调 /apps 渲染，authorized=false 置灰不跳转；点击已授权项每次现调 /sso/jump 换新票再开 redirectUrl；401 自动登出；demo 保留静态四宫格
- src/styles/theme.css：补 .system-card.disabled、.system-loading 样式

## 验证与状态
- 验证以 typecheck + build 为准（均 exit 0）；仓库声明 tools/testing 工作区与 playwright 脚本但目录/配置缺失，未跑单测/E2E
- 接口路径拼为 /api/v3.0/portal/...（VITE_API_BASE_URL=/api + /v3.0）；若网关 /v3.0 已含代理前缀，只改 portalAuth.ts 的 portalBase() 一处
- 改动未提交（as of 2026-11-10）

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "统一门户APP登录H5对接",
  "source_extraction_id": "097b8c1565b34d97a0060fad81a75824",
  "version": 1,
  "memory_type": "entities"
}
-->