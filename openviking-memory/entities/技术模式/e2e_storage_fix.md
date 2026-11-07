# 同址E2E清会话后storageState登录失效修复
苏州市房地产监测V3 同址 E2E 注册流程在清除会话后 storageState 恢复登录失效，已修复为优先账号密码登录。

## 根因
- `loginWithRealAccount` 设置 `E2E_BASE_URL` 时强制 `storageState` 恢复登录
- 同址注册流程 `clearBrowserSession` 后无法复用已清除会话

## 修复方案
- `auth-helpers.js` 改为优先账号密码登录同 `baseURL`，仅无凭据回退 `storageState` 并支持重注入
- `save-auth-state.mjs` 默认地址由 `8096/sys/fdc` 改为 `8098`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/076.md
- 涉及文件：company-register.spec.js、register-helpers.js、company-register-extract.spec.js、company-register-branch.spec.js、auth-helpers.js、playwright.config.js、id-helpers.js、error-context.md
- 所属项目：苏州市房地产监测V3；来源会话：bbaca6f0-5087-4168-ba51-8a2343915f2e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_storage_fix",
  "source_extraction_id": "52563a75f85f486e82400fb998e47654",
  "version": 1,
  "memory_type": "entities"
}
-->