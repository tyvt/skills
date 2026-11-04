# E2E 登录 StorageState
修正苏州市房地产监测V3项目中 E2E 登录在同一地址强制 `storageState` 导致的会话失败。

## 原因与修正
- 当设置 `E2E_BASE_URL` 时，`loginWithRealAccount` 强制通过 `storageState` 恢复登录，但在 `clearBrowserSession` 之后，在同一地址注册的账户会话不可重用。
- 在 `auth-helpers.js` 中，优先在同一 `baseURL` 下使用用户名/密码登录；仅在没有凭据时回退到 `storageState`。
- `save-auth-state.mjs` 将默认地址从 `8096/sys/fdc` 更改为 `8098`。

## 涉及的文件
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/register/company-register.spec.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/register-helpers.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/register/company-register-extract.spec.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/register/company-register-branch.spec.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/auth-helpers.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/playwright.config.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/id-helpers.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/test-results/register-company-register--a0a34-全流程-Step1→Step5（含各步骤-UI-校验）-production-readonly/error-context.md

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/026.md
- 会话: bbaca6f0-5087-4168-ba51-8a2343915f2e
- 所属项目: 苏州市房地产监测V3; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_login_storagestate",
  "source_extraction_id": "2541e120aaed44a78ac4d8041d820fd0",
  "version": 1,
  "memory_type": "entities"
}
-->