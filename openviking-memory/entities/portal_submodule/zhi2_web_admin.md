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

<!-- MEMORY_FIELDS
{
  "category": "portal_submodule",
  "name": "zhi2_web_admin",
  "source_extraction_id": "a8b6facc0164405eaf0542dc855903f4",
  "version": 2,
  "memory_type": "entities"
}
-->