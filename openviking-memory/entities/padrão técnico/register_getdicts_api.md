# Fluxo de registro usa getDicts com dicionário real
Os componentes do fluxo de registro usavam campos hardcoded incompatíveis; alterado para chamar a interface real de dicionário via `getDicts()`.

## Pontos de modificação
- `Step2LegalPerson.vue` e `ShareholderDialog.vue` usam `document_type`
- `Step1CompanyInfo.vue` usa `company_qualification_level`
- Atualizados `e2e/fixtures/register-helpers.js` e `e2e/fixtures/register-mocks.js`

## Verificação e origem
- Tipo de memória: pattern
- Evidência: src=产品2.0/034.md
- Arquivos: d:/repository/产品2.0/zhi2-web-admin/src/views/register/components/Step3Appendix.vue, src/views/company/companyRegister/detail.vue, src/views/tool/fjflpz/components/FjDialog.vue, e2e/fixtures/register-mocks.js, src/api/company/companyRegister.js, e2e/fixtures/register-helpers.js, src/views/register/companyRegister.vue, src/views/register/components/companyInfo.vue
- Projeto: 产品2.0; sessão: 008732db-2f2d-46d5-8491-ec57ab3fe2ea; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "register_getdicts_api",
  "source_extraction_id": "1f13dccd594c4d2ea1f0df489b324a34",
  "version": 1,
  "memory_type": "entities"
}
-->