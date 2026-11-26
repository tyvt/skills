---
audit_status: valid
last_checked: 2026-11-26T15:44:07+08:00
verdict_note: 苏住房防汛C端：flood-token-v1命中src/utils/request.ts-175等9处，submitInspectionRemote命中stores/flood.ts-323，remote.spec在playwright.config.ts-6/13。E2E配置与缺陷修复实证充分。
---
# 苏住房防汛C端真实后端 E2E（zhi2_flood_e2e）
本卡记录真实后端联调 E2E 的运行配置、登录注入、定位约定，以及联调中发现并修复的缺陷。

## 运行配置
- playwright.config.ts：baseURL=http://127.0.0.1:8095（nginx 站点、hash 路由），testDir=tests/e2e，testMatch 仅 remote.spec.ts，单 worker，不启 webServer（站点已由 nginx 提供）
- 无头 Chromium；可执行路径读 env PLAYWRIGHT_CHROMIUM_EXECUTABLE（本机 Edge 为 C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe），设置则用 executablePath
- 写作用域仅限 tests/e2e/remote.spec.ts（新增）与 playwright.config.ts（修改）；不改 flows.spec.ts 及其它源码

## 联调环境与登录
- nginx 8095 同源反代：/api-flood/ → http://127.0.0.1:9610/，/api-auth/ → http://127.0.0.1:9211/
- 登录 POST /api-auth/v2.0/security/auth/login，body {username,password}（AES-256 后 base64），请求头 zhi-project-id: suzhufang，返回 {code:200,data:{accessToken}}
- E2E 用已知密文走 API 登录取 token（账号密码/密文见隐私凭据 deploy_env.fangxun-c.dev.admin），免在测试内实现 AES
- addInitScript 将 token 注入 localStorage flood-token-v1，首屏即带 Authorization

## 定位约定
- uni-app 的 placeholder 不在 <input> 属性上（在 uni-input wrapper），getByPlaceholder 失效；检查页仅一个文本 input，用 locator('input').first() 填关键字"小"
- 物业区域选项 .complex-option（role=button），选中后断言 .complex-picked-text；数值项用 stepper「增加」点到 .stepper-value = 8；模板项 label 为 .sec-item-label
- 详情「物业管理区域」为独立 .detail-row-label（无冒号）、值 .detail-row-value，按 label 文本断言，勿用带冒号正则
- 断言全用 role/可见文本/class，不对任何 id 做 Number 处理

## 缺陷与验证（2026-11-03）
- 19 位雪花 ID（eventId/templateItemId/complexId）经 JS Number() 精度丢失（2117093674846941186 → 2117093674846941200），后端报「预警不存在」；submitInspectionRemote 改 String() 后 save/submit/detail 全 200
- history→detail 漏传 kind 导致求援取错接口，已修
- string id 下 API 直验：save→200、submit→200，detail 返回 inspectionNo=XZXJ20261103000005、complexName=天地华城小区、items 填 8
- task-2 五场景连续两次 3/3 通过（1+2、3、4+5）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_flood_e2e",
  "source_extraction_id": "8047ecd5ede147ceb4ef00de9aaa973b",
  "version": 2,
  "memory_type": "entities"
}
-->