# Reorganização de Campos do Detail Vue
O `companyRegister/detail.vue` foi reorganizado em quatro seções alinhadas ao fluxo de registro.

## Alterações
- Reorganizado em seções de informações básicas, informações do escritório, informações do administrador da instituição e upload de anexos
- Nomes de campos alinhados com o fluxo de registro; removidos tipo de instituição e `bankTable` redundantes

## Arquivos Envolvidos
- `src/views/company/companyRegister/detail.vue`
- `src/views/register/components/Step1CompanyInfo.vue`, `Step2LegalPerson.vue`, `Step3Appendix.vue`
- `src/views/register/companyRegister.vue`, `accountInfo.vue`, `registerValidate.js`, `dialog.vue`

## Verificação e Origem
- Evidência: extraído do cursor session=005d84fc-8f79-4a0c-9b99-de4b2a6bcd0a
- Linha de base de código: none; projeto: Produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "register_detail_reorg",
  "source_extraction_id": "ea712054da3f4c828e9962a4a272fca7",
  "version": 1,
  "memory_type": "entities"
}
-->