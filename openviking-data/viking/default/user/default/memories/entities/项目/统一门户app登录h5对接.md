# 统一门户APP登录H5对接
uni-app (Vue 3) H5 项目，按《统一门户 APP 端登录接口文档 v1.0.0》完成 APP 三重登录对接；应用列表页已做 demo/remote 双模式。

## 接口（5个）
- POST /portal/appLogin/captcha：fetchAppLoginCaptcha，返回 {uuid, img}，img 兼容 data: 与裸 base64
- POST /portal/appLogin/sms：sendAppLoginSms，传 phone/captchaUuid/captchaCode
- POST /portal/appLogin/login：appLogin，三重校验，userId long→字符串
- POST /v3.0/portal/appLogin/apps：fetchPortalApps(token)，Authorization: Bearer <token>，请求体为空，响应解包 {code, msg, data: PortalApp[]}
- POST /portal/appLogin/sso/jump：jumpToPortalApp，每次现取新票，绝不缓存 redirectUrl；token 同时放请求头与请求体（与 fetchPortalApps 仅放头不一致，待核对后端从哪读）

## 应用列表双模式（src/pages/systems/index.vue）
- demo 模式（默认）：直接用写死 demoSystems（物业管理 / 房产交易 / 物业手持端 / 其他应用）渲染静态四宫格
- remote 模式：VITE_DATA_MODE !== 'demo' 时调用 fetchPortalApps 渲染，authorized=false 置灰不跳转；点击已授权项每次现调 /sso/jump 换新票再开 redirectUrl；401 自动登出
- 登录后 submit() 执行 uni.reLaunch({ url: '/pages/systems/index' }) 直达本页
- 待修（as of 2026-11-11）：页面含 system-hero 横幅块（静态图 5b3eb.svg + "请选择您要进入的业务子系统"），用户要求移除该展位页；`<AppHeader title="" ... />` 标题为空；hero 图 5b3eb.svg 为静态 logo 非接口返回值（各应用卡片图标已正确用 app.appLogo）
- .env.example 默认 VITE_DATA_MODE=demo，仓库无真实 .env，dev 下 ?? 'demo' 落到 demo → 默认构建显示写死数据
- 消除"写死观感"关键：部署时把 VITE_DATA_MODE 设为 remote 并配好 VITE_API_BASE_URL（网关已反代 /api → /v3.0），而非改前端逻辑

## 后端依据（禅道 1431）
- 禅道 1431 = 【苏住房】管理端APP接入统一门户登录；需求：用户登录后按授权展示可查看的业务子系统或业务应用（接口驱动，非前端写死）
- 后端"应用管理"字段：APPID、应用名称、LOGO、适用范围、对接模式、所属项目、终端、是否启用、排序
- 前端 PortalApp = {appId, appName, appLogo, authorized} 基本对应后端字段（authorized ↔ 是否启用）
- toEntry 映射：title=appName、subtitle=授权提示、icon=appLogo、tone 按序轮色、authorized=是否启用

## 待核对点（分析未落地，as of 2026-11-11）
- /apps 的 HTTP 方法：代码默认 POST，需确认后端实际 GET 还是 POST
- token 位置：fetchPortalApps 只放 Bearer 头、jumpToPortalApp 头+体都有，两者不一致，需确认后端 /apps 从头还是体读 token
- 字段全名：appId/appName/appLogo/authorized 需与 2.4 接口文档逐一核对（尤其 authorized 后端是否叫 isEnabled/enabled）
- demo→remote 体验差异：写死副标题（项目台账·考评监管）+固定配色，切 remote 变通用"点击进入"+轮转配色；后端排序、适用范围前端未用

## 关键改动文件
- src/utils/portalAuth.ts（新增）：5 接口封装，统一解包 {code,msg,data}，code≠200 抛 msg，401→"登录已失效"
- src/stores/auth.ts：新增 appLoginAction（存 token+用户信息到本地），currentUser/logout/isLoggedIn，保留旧密码登录兼容
- src/pages/login-design/index.vue：图形码新接口常驻点击刷新；发短信前强校验图形码、发后无论成败刷新；验证码登录改真实三重校验（手机号+身份证后4位+6位短信码）60秒倒计时；demo 保留直进
- src/pages/systems/index.vue：真实模式挂载调 /apps 渲染，authorized=false 置灰不跳转；点击已授权项每次现调 /sso/jump 换新票再开 redirectUrl；401 自动登出；demo 保留静态四宫格
- src/styles/theme.css：补 .system-card.disabled、.system-loading 样式

## 验证与状态
- 验证以 typecheck + build 为准（均 exit 0）；仓库声明 tools/testing 工作区与 playwright 脚本但目录/配置缺失，未跑单测/E2E
- 接口路径拼为 /api/v3.0/portal/...（VITE_API_BASE_URL=/api + /v3.0）；若网关 /v3.0 已含代理前缀，只改 portalAuth.ts 的 portalBase() 一处
- 改动未提交（as of 2026-11-11）

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "统一门户APP登录H5对接",
  "source_extraction_id": "840701741d9c4cb0a46525c1cea15969",
  "version": 4,
  "memory_type": "entities"
}
-->