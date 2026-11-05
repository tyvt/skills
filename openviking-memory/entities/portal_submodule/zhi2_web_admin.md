# zhi2-web-admin (Portal)
Vue 2.7 admin frontend submodule under the 门户 (Portal) repo implementing Suzhou Dao QR login.

## Description
- Located at D:/repository/门户/zhi2-web-admin, a submodule of 门户 (Portal) parent repo; root portal has no business source
- Built with Vue 2.7, Vue Router 3, Element UI, Vite; axios via @/api wrapper
- 端口 8081 运行 Vite 开发服务器（HMR），直接提供 D:/repository/门户/zhi2-web-admin 工作区源码

## Key Facts
- Suzhou Dao (苏周到) QR code login implemented only here, not in root portal
- API src/api/security/suzhouDao.js: getQrLoginParam, scanLogin(qrCodeId), suzhouDaoLogin all POST /security/ctAuth/suzhouDao/... with { noMessage: true, skipAuthDialog: true }
- Effective base URL /api/v2.0 from env/.env VITE_APP_BASE_API, injected by vite.config
- src/api/index.js creates HttpRequest; src/utils/request.js rejects on code != 200; 401 popup skipped when skipAuthDialog true — login-less polling must carry this config
- Page side: QR display, scanLogin polling, code callback page, token persistence (components per routes/views)
- Code baseline dfee5a6

## Relations
- Submodule of 门户 (Portal) project
- Uses @/api axios wrapper and Element UI

## Files
- d:/repository/门户/zhi2-web-admin/src/api/security/suzhouDao.js
- d:/repository/门户/zhi2-web-admin/src/api/index.js
- d:/repository/门户/zhi2-web-admin/src/utils/request.js
- d:/repository/门户/env/.env

## 构建与部署
- npm run build 产物输出至父仓库 门户/dist（非子模块内 dist），因 vite.config 中 rootDir = path.resolve(__dirname, "../") 解析到父目录；nginx 站点 root 需指向 门户/dist
- 仓库规则禁止本地启动 dev server，须用本地 nginx（D:/nginx + nginx-ui 管理）部署 dist；task1497 新建 portal-task1497.conf 监听 8093，将 /api/v2.0|v3.0/* 去 /api 前缀反代本地网关 8080；该站点已于 2026-11-04 停用，配置移回 sites-available 保留备查，可按 E2E-EXTERNALINFO.md 重启
- 门户登录走 POST /v3.0/portal/login/login（userName/password，无验证码），与旧版后台 captcha 登录不同；超管 admin(userId=1) 直接拥有全部菜单

<!-- MEMORY_FIELDS
{
  "category": "portal_submodule",
  "name": "zhi2_web_admin",
  "source_extraction_id": "78833d4a4a0a498e864cad5a4111eea0",
  "version": 4,
  "memory_type": "entities"
}
-->