# personnel_enterprise_only
No zhi2-web-admin (产品2.0), a interface de adicionar pessoal (`personnelRecord`) aceita apenas contas de usuário empresariais.

## 问题背景
- `personnel-record.spec.js` usava conta administrativa (`zsbase`) para requisição de adição, retornando erro de que apenas usuário empresarial é suportado.

## 解决方案
- Passos do lado empresarial usam `loginAsCompany()`; aprovação usa `loginAsAdmin()`.
- Criar `e2e/.env.e2e` para configurar contas de teste.
- Padrão: testes E2E de fluxo de pessoal separam login empresarial e administrativo.

## 涉及文件与来源
- e2e/company/personnel-record.spec.js, e2e/fixtures/auth-helpers.js, e2e/company/company-record-change.spec.js, e2e/toB/company-personnel-flow.spec.js, src/views/company/staffManagement/personnelRecord/detail.vue
- 来源会话：81bf4b53-55e2-427c-8ca3-f981d35d881b

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "personnel_enterprise_only",
  "source_extraction_id": "5ba2dade06d048a48e78322216a00bde",
  "version": 1,
  "memory_type": "entities"
}
-->