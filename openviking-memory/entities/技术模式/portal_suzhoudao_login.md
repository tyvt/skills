# 苏周到扫码登录三接口迁移
门户苏周到扫码登录 API 前缀由 `/security/ctAuth/suzhouDao/*` 迁至 `/portal/login/external/suzhouDao/*`。

## 迁移范围
- 涉及 `getQrLoginParam`、`scanLogin`、`suzhouDao/login` 三个函数，通常集中在 `src/api/security/suzhouDao.js`
- 浏览器最终 URL 形如 `/api/v3.0/portal/login/external/suzhouDao/...`

## 请求拦截
- `request.js` 对以 `/portal/` 开头的 URL 自动切到 `VITE_APP_PORTAL_BASE_URL` 并走 POST，无需手写 `/api/v3.0`
- vite/nginx 的 `/api/v3.0` 代理一般已存在

## 联调注意
- `scanLogin` 若后端要求 query 的 `qrCodeId` 而非 JSON body 会 400，可加入 `portalApiRewrite.js` 的 NO_BODY 类处理
- 扫码弹窗与授权回调页逻辑可不动

## 涉及文件与归属
- zhi2-web-admin/src/api/security/suzhouDao.js
- zhi2-web-admin/src/utils/request.js
- zhi2-web-admin/src/utils/portalApiRewrite.js
- 所属项目：门户；来源会话 session_1049d6185d5fcfff06cfb94108b48261；代码基线 dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_suzhoudao_login",
  "source_extraction_id": "cabaf046dae94cc2ac7e371aef4ebe99",
  "version": 1,
  "memory_type": "entities"
}
-->