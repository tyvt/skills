
- 在 `utils/portal-user.js` 新增 `requestCtAuth`：CT 认证 API 统一请求封装，当请求携带 `Authorization` 且返回 HTTP 401 时自动触发登出逻辑
- `handleCtAuthUnauthorized` 401 处理逻辑：调用 `clearPortalStorage()` 清空门户 token（`__ew_external_webview_ct_token__`）与用户快照（`__ew_external_webview_portal__`），提示「登录已过期，请重新登录」，广播 `portal-auth-expired` 事件让各页面同步清空内存中的 `pageToken`
- 排除微信登录接口 `/wechat/login`：返回 401 时不触发，避免首次登录失败误提示「登录已过期」
- 覆盖范围：所有使用 `CT_AUTH_API_BASE_URL_MAP` 基址的接口（`portal-user.js` 内全部 CT 接口、`api/common.js` 轮播图接口、`portal-h5-webview.js` 等）已接入统一 401 处理
- 所属项目：小程序；来源会话：aa013c4c-2e46-4f0b-b583-82a65c4f0fe2；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=小程序


<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "ct_auth_401",
  "source_extraction_id": "319ceeb1dbb643c898b8a5bab118bd5f",
  "version": 2,
  "memory_type": "preferences"
}
-->
