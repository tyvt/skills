# Campos de pessoal ocultos e salvamento incompleto por falta de organType
O `companyAdmin/detail.vue` dependia de `form.organType` para exibir campos de pessoal; a interface sem `organType` os ocultava, e `getForm()` omitia `personnelType` e outros.

## Causa raiz
- `isAgency` em `companyAdmin/detail.vue` depende de `form.organType` para mostrar campos de pessoal
- Interface sem `organType` causava ocultação; `getForm()` não salvava `personnelType` e demais campos

## Solução
- Adicionado `showAgencyFields` como fallback, unificando formulário e validação
- `getForm()` passou a preencher `personnelCode`, `personnelType`, `householdAddress`

## Verificação e arquivos
- Evidência: src=苏州市房地产监测V3-leftover/118.md
- Arquivos: companyAdmin/detail.vue, companyOrganContext.js, companyOrgan.js, operator/index.vue
- Projeto: Suzhou Real Estate Monitoring V3; sessão: 1aa60fcd-fb6c-40ed-85a3-935deaae7e9d; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "admin_organ_type",
  "source_extraction_id": "cb37c3e5026643ce8561e045e7a278a5",
  "version": 1,
  "memory_type": "entities"
}
-->