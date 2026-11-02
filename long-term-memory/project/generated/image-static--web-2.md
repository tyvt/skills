# 项目专属 · 图片与静态资源（2/2）

共 3 条，引用前核对所属项目及代码。

### x3329 · 门户 v2 网关前缀 /api/v2.0 三处对齐：env、nginx 反代、portalApiRewrite 与 sign/上传页

🟡 模式 ｜ 验证于 门户 ｜ 距代码最后改动 33 天，引用前请核对

【现象】部分接口（含 listTree、上传等）请求 URL 缺少 `/api` 前缀或仍走旧网关路径，页面 404 或网关拒收。
【根因】门户是 monorepo：父仓 `门户` 管 `env/.env` 与 `deploy/nginx.conf`，子模块 `zhi2-web-admin` 内还有 `portalApiRewrite.js`、`public/sign.js` 及若干 vue 里硬编码的 basePath——只改一处会在「开发代理 / 生产 nginx / 前端重写 / 加签脚本」之间漂移。已知 #1793/#1828 只覆盖 portal 菜单路由重写与前导斜杠；已知 #1189/#1823 讲 env 相对路径约定，但未覆盖本次「listTree 等漏改 + 主仓 nginx 与子模块 sign 同步提交」的整包修复。
【怎么做】① 父仓 `env/.env` 与 `deploy/nginx.conf` 统一对外前缀为 `/api/v2.0`（或项目约定的 gateway 形态）；② 子模块 `portalApiRewrite.js` 全量扫一遍 v2 接口族，懒加载 path 必须带前导 `/` 否则静默漏匹配；③ `sign.js`、FileUpload、登录相关 vue 与 README 中与 API 前缀双写的常量同步改；④ 主仓与子模块各建 `cursor/fix-api-v2-prefix` 分支分别提交，子模块指针再进主仓 commit，避免只推一半。
【验收】抓 listTree、上传、登录三类请求，确认浏览器里最终 URL 均含同一 gateway 前缀，且 nginx 日志无「strip /api」导致的 upstream 路径错误。

> 依据（摘）：会话 66c9378e（基线 3e8673b）：用户报「/api 前缀缺失」并要求「类似问题一并修复，listTree」；最终子模块 commit 374ecad（portalApiRewrite、sign.js、3 个 vue、READM…

文件：`env/.env`、`deploy/nginx.conf`、`zhi2-web-admin/src/utils/portalApiRewrite.js`
---

### x3366 · 门户全屏 publicPortal 二级页背景：portal_page_bg.jpg 必须与 portal.scss 同提交

🟡 套路 ｜ 验证于 门户 ｜ 距代码最后改动 15 天，引用前请核对

从 `/#/UnifiedLogin` 菜单打开的可售楼盘、公示公告等**全屏对外二级页**（`.public-portal`）背景统一走 `zhi2-web-admin/public/assets/images/homeNew/portal_page_bg.jpg`，样式在 `views/home/publicPortal/portal.scss`：`background-size: cover`、顶部居中，并保留 `#dfe6ee` 作图片加载前回退色；`@media print` 去掉背景避免整页大图打印。内容区仍用半透明白 `portal-panel`。若只提交 scss 不提交 jpg，线上只会看到灰色回退色。与统一登录顶栏 `banner_hero.svg`、登录后 `HomeHeroBanner` 是不同入口，换同一张天际线图需分别改引用。

> 依据（摘）：会话 49156c21：用户要求首页链接新页面背景统一为苏州天际线图；结论新增 portal_page_bg.jpg、改 portal.scss，并强调「请把 portal_page_bg.jpg 与 portal.scss 一起提交，否则…

文件：`zhi2-web-admin/public/assets/images/homeNew/portal_page_bg.jpg`、`zhi2-web-admin/src/views/home/publicPortal/portal.scss`、`zhi2-web-admin/src/views/home/components/HomeQuickLinks.vue`
---

### x3415 · 门户首页业务步骤默认图标：homeNewSliceIcon + BIZ_ICON_BY_CODE，接口 functionIcon 优先

🟡 模式 ｜ 验证于 门户 ｜ 距代码最后改动 19 天，引用前请核对

在 `/portal/home/functions` 尚未提供步骤图标或需设计稿占位时，zhi2-web-admin 首页业务中心可在 `homeLayout.js` 用 `public/assets/images/homeNew/切图 xxx.svg` 经 `homeNewSliceIcon` 写入 `BIZ_ICON_BY_CODE` 与 `DEFAULT_BUSINESS_FLOWS`（商品房 136–145、存量房 158–163、住房租赁 164–165 等）。同一 `functionCode` 可共用切图（如 `devEnterpriseAuth` 与「开发企业管理」共用 136）。运行时仍遵循：接口返回 `functionIcon` 时优先 `resolveServerAssetUrl`，本地切图仅为缺省回退；注释标明「后续改接口读取」便于替换。

> 依据（摘）：会话 51f607f4：用户要求商品房/存量房/住房租赁步骤暂用 homeNew 切图 SVG；结论同步更新 BIZ_ICON_BY_CODE 与 DEFAULT_BUSINESS_FLOWS，并说明接口有 functionIcon 时仍优…

文件：`zhi2-web-admin/src/views/home/config/homeLayout.js`、`zhi2-web-admin/public/assets/images/homeNew`
