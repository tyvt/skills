# Limite de nome de pessoa jurídica em 30 caracteres
O frontend não limitava o comprimento do nome do representante legal, disparando erro 400 do backend ao exceder 30 caracteres; a correção principal ficou em Step2LegalPerson.

## Causa raiz
- Frontend não aplicava limite de comprimento no nome do representante legal
- Backend retornava erro 400 para nomes acima de 30 caracteres

## Solução
- Input Vue com maxlength="30", show-word-limit, v-model.trim e regra {min:2,max:30}
- register-helpers.js define REGISTER_MAX_LENGTH_FIELDS
- Step2 altera max do nome de 150 para 30

## Arquivos envolvidos
- src/utils/registerValidate.js e views/register/components/Step2LegalPerson.vue
- views/register/companyRegister.vue e e2e/fixtures/register-helpers.js
- views/institution/company/index.vue e e2e/register/company-register-fields.spec.js
- views/institutionRegister/components/Step2AdminInfo.vue e views/register/components/Step1CompanyInfo.vue

## Verificação
- Evidência: src=苏州市房地产监测V3-leftover/055.md; Sessão: e3d71734-ab93-48dc-b3f5-54b9eddd55be

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "legal_person_name_limit",
  "source_extraction_id": "2ad82671c0ec46a89bf7f8171f0d0fa6",
  "version": 1,
  "memory_type": "entities"
}
-->