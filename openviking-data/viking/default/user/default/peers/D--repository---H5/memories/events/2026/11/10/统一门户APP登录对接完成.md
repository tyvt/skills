# Summary
2026-11-10，用户要求按《统一门户 APP 端登录接口文档 v1.0.0》对接；助手在 uni-app (Vue 3) H5 项目完成 APP 三重登录对接：新增 src/utils/portalAuth.ts（5 个接口封装），改 auth store、login-design 页、systems 页与 theme.css；vue-tsc 类型检查与 npm run build 均通过（exit 0），改动未提交。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=D--repository---H5]**: 根据文档对接
...
**assistant [peer=D--repository---H5]**: `fetchLoginCaptcha` still exists in request.ts but is now unused by the login page — that's fine (it belongs to the legacy password-login path and remains available). No dangling references to `captchaRequired`.

The integration is complete and verified (typecheck + build both exit 0). Let me mark the todo done and summarize.
**assistant [peer=D--repository---H5]**: 已按《统一门户 APP 端登录接口文档 v1.0.0》完成对接，`vue-tsc` 类型检查与 `npm run build` 均通过（exit 0）。

## 改动清单

**新增 [`src/utils/portalAuth.ts`](src/utils/portalAuth.ts)** — 5 个接口封装（`/api` 前缀 + `/v3.0`）：
| 接口 | 函数 | 处理要点 |
|---|---|---|
| `POST /portal/appLogin/captcha` | `fetchAppLoginCaptcha` | 解 `{uuid,img}`，`img` 兼容 `data:` 与裸 base64 |
| `POST /portal/appLogin/sms` | `sendAppLoginSms` | 传 `phone/captchaUuid/captchaCode` |
| `POST /portal/appLogin/login` | `appLogin` | 三重校验，`userId` long→字符串 |
| `POST /portal/appLogin/apps` | `fetchPortalApps` | 带 Bearer，返回含 `authorized` |
| `POST /portal/sso/jump` | `jumpToPortalApp` | 每次现取新票，绝不缓存 |
统一解包 `{code,msg,data}`：`code≠200` 抛 `msg`（可直接提示），401 → "登录已失效"。

**改 [`src/stores/auth.ts`](src/stores/auth.ts)** — 新增 `appLoginAction`（登录后存 token + 用户信息到本地），`currentUser`/`logout`/`isLoggedIn`；保留旧密码登录兼容。

**改 [`src/pages/login-design/index.vue`](src/pages/login-design/index.vue)**
- 图形验证码走新接口、常驻展示、点击刷新；
- 发送短信前强制校验图形码，**发送后无论成败都刷新图形码**（一次性、uuid 与图片重新配对）；
- 验证码登录改为真实三重校验（手机号 + 身份证后 4 位 + 6 位短信码），60 秒倒计时；
- demo 模式保留原直进逻辑，真实模式不再走"接口未开放"占位。

**改 [`src/pages/systems/index.vue`](src/pages/systems/index.vue)**
- 真实模式挂载时调 `/apps` 渲染列表；`authorized=false` 置灰并提示"未授权，请联系管理员开通"，不发起跳转；
- 点击已授权项**每次现调 `/sso/jump` 换新票**再打开 `redirectUrl`（红线：不缓存跳转地址）；
- 401 自动登出回登录页；demo 模式保留静态四宫格。

**改 [`src/styles/theme.css`](src/styles/theme.css)** — 补 `.system-card.disabled`、`.system-loading` 样式。

## 说明与待确认
- 接口路径按文档字面拼为 `/api/v3.0/portal/...`（`VITE_API_BASE_URL=/api` + `/v3.0`）。若网关实际 `/v3.0` 已含在代理前缀里，只改 `portalAuth.ts` 的 `portalBase()` 一处即可。
- 仓库声明了 `tools/testing` 工作区与 `playwright` 脚本，但目录和配置实际缺失，故验证以 **typecheck + build** 为准（均通过），未跑单测/E2E。

改动未提交。需要我提交（仅 commit / commit+push）还是暂不处理？

<!-- MEMORY_FIELDS
{
  "event_name": "统一门户APP登录对接完成",
  "goal": "完成门户登录对接",
  "summary": "2026-11-10，用户要求按《统一门户 APP 端登录接口文档 v1.0.0》对接；助手在 uni-app (Vue 3) H5 项目完成 APP 三重登录对接：新增 src/utils/portalAuth.ts（5 个接口封装），改 auth store、login-design 页、systems 页与 theme.css；vue-tsc 类型检查与 npm run build 均通过（exit 0），改动未提交。",
  "ranges": "0,53-67",
  "source_extraction_id": "097b8c1565b34d97a0060fad81a75824",
  "version": 1,
  "memory_type": "events"
}
-->