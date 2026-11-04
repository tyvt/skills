# Registro externo de empresa dev exige organType 01
No registro externo de empresas de desenvolvimento, o `organType` deve ser uniformemente `01` (empresa de desenvolvimento), correspondendo ao título da página «Registro de conta empresarial (empresa de desenvolvimento)».

## Pontos de modificação
- Valor inicial do formulário em `src/utils/registerValidate.js`
- `getQueryParams()` em `src/views/company/companyRegister/index.vue`
- Rascunho de teste em `e2e/fixtures/register-helpers.js`

## Verificação e origem
- Tipo de memória: pattern
- Evidência: src=产品2.0/033.md
- Arquivos: d:/repository/产品2.0/zhi2-web-admin/src/views/company/companyRegister/index.vue, src/views/register/companyRegister.vue, src/api/company/companyRegister.js, src/views/register/components/companyInfo.vue, e2e/fixtures/company-helpers.js, src/views/company/companyRegister/detail.vue, src/views/login.vue, src/utils/registerValidate.js
- Projeto: 产品2.0; sessão: bc67591b-a7e5-4c59-bfbf-ecc997f7c3f3; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "outnet_register_organ",
  "source_extraction_id": "1f13dccd594c4d2ea1f0df489b324a34",
  "version": 1,
  "memory_type": "entities"
}
-->