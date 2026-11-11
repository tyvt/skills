# Portal App Auth System
Portal web app (H5 zhishu) authentication flow: captcha → SMS → login → apps, served by a gateway backend.

## Config & Hosts
- Local test backend gateway: common-gateway 运行于 http://127.0.0.1:8086（Nacos 注册名 common-gateway-portal）；门户H5 经 nginx 8091 反代到该网关并剥除 /api 前缀。
- Default VITE_API_PROXY_TARGET host `unlimited.c.h5-zhishu…` returns /api 404 (SPA only, no backend proxy).
- Alternate `c.h5-zhishu…` gateway returns 500 on all endpoints including pre-auth captcha; HTTPS:443 unreachable from sandbox.
- VITE_DATA_MODE gates the real interface vs hardcoded demo data; the default demo build shows hardcoded /apps.

## Endpoints (gateway base http://127.0.0.1:8086，路由 /v3.0/** 不带 /api 前缀；门户H5 nginx 8091 已剥除 /api)
- POST /api/v3.0/portal/appLogin/captcha → 200 with uuid + base64 PNG (intermittent 500 "服务器异常").
- POST /api/v3.0/portal/appLogin/sendSms → 500 if captcha value wrong or expired.
- POST /api/v3.0/portal/appLogin/login → 500 if phone is not a registered 门户 account.
- POST /api/v3.0/portal/appLogin/apps → 400 without a valid Bearer token (fetchPortalApps sends token in Authorization header, no body).

## Validation Rules
- Backend is NOT lenient despite the user note "随便输入符合格式的数据都可通过"; the captcha value is actually checked.
- sendSms verifies captcha plus phone↔证件号后几位 match before sending the SMS code (test code noted as 123456).
- login requires a real registered 门户 phone number; dummy data fails with "该手机号未注册门户用户".
- A headless login cannot be driven without the test account's 手机号 + 证件号后几位.

<!-- MEMORY_FIELDS
{
  "category": "portal_auth",
  "name": "portal_auth_system",
  "source_extraction_id": "9dc220d03ae24e38ab5418f3cb518480",
  "version": 2,
  "memory_type": "entities"
}
-->