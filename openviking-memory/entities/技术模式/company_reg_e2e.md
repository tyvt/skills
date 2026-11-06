# 企业注册 E2E 登录会话修复
苏州市房地产监测V3 修复企业注册 E2E 中主管部门登录与注册流程会话不一致导致的身份证号碰撞问题。

## 根因
- 原 loginWithRealAccount 在设置 E2E_BASE_URL 时强制走 storageState 恢复登录，需事先手动保存 e2e/.auth/zsbase.json
- 注册流程在 http://192.168.1.129:8098 用账号完成，clearBrowserSession 后主管部门登录无法复用已清除会话

## 主要改动
- auth-helpers.js：loginWithRealAccount 优先用账号密码在同一 baseURL 登录，仅无凭据时回退 storageState；并修复 loginFromStorageState 在 clearBrowserSession 后从文件重新注入 cookies/storage
- save-auth-state.mjs：默认地址从 8096/sys/fdc 改为 8098，与注册环境一致

## 验证与归属
- 全流程用例通过（35s）：E2E_BASE_URL=http://192.168.1.129:8098 npx playwright test e2e/register/company
- 涉及文件：e2e/.auth/zsbase.js、auth-helpers.js、e2e/register/company-register.spec.js、e2e/fixtures/register-helpers.js
- 项目：苏州市房地产监测V3；来源会话ID：bbaca6f0-5087-4168-ba51-8a2343915f2e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_reg_e2e",
  "source_extraction_id": "cf849a215e8c44dd8c9bdd8eace90dfe",
  "version": 1,
  "memory_type": "entities"
}
-->