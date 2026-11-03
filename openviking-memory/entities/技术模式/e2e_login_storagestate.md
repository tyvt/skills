# E2E Login StorageState
Correção de falha de sessão em login E2E forçando `storageState` no mesmo endereço no projeto 苏州市房地产监测V3.

## Causa e Correção
- `loginWithRealAccount` ao definir `E2E_BASE_URL` forçava restauração de login via `storageState`, mas após `clearBrowserSession` a sessão de conta registrada no mesmo endereço não era reutilizável.
- Em `auth-helpers.js`, prioriza login por usuário/senha no mesmo `baseURL`; fallback para `storageState` só sem credenciais.
- `save-auth-state.mjs` muda endereço padrão de `8096/sys/fdc` para `8098`.

## Arquivos Envolvidos
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/register/company-register.spec.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/register-helpers.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/register/company-register-extract.spec.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/register/company-register-branch.spec.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/auth-helpers.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/playwright.config.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/id-helpers.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/test-results/register-company-register--a0a34-全流程-Step1→Step5（含各步骤-UI-校验）-production-readonly/error-context.md

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3-rest/026.md
- Sessão: bbaca6f0-5087-4168-ba51-8a2343915f2e
- Projeto: 苏州市房地产监测V3; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_login_storagestate",
  "source_extraction_id": "2541e120aaed44a78ac4d8041d820fd0",
  "version": 1,
  "memory_type": "entities"
}
-->