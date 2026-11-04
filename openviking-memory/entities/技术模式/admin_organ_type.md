# Campos de pessoal ocultos e salvamento incompleto por falta de organType
O `companyAdmin/detail.vue` dependia de `form.organType` para exibir campos de pessoal; a interface sem `organType` os ocultava, e `getForm()` omitia `personnelType` e outros.

## 问题根因
- `isAgency` em `companyAdmin/detail.vue` depende de `form.organType` para mostrar campos de pessoal
- Interface sem `organType` causava ocultação; `getForm()` não salvava `personnelType` e demais campos

## 解决方案
- Adicionado `showAgencyFields` como fallback, unificando formulário e validação
- `getForm()` passou a preencher `personnelCode`, `personnelType`, `householdAddress`

## Verificação e arquivos
- 验证证据: src=苏州市房地产监测V3-leftover/118.md
- 涉及文件: companyAdmin/detail.vue, companyOrganContext.js, companyOrgan.js, operator/index.vue
- 所属项目: Suzhou Real Estate Monitoring V3; sessão: 1aa60fcd-fb6c-40ed-85a3-935deaae7e9d; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_organ_type",
  "source_extraction_id": "cb37c3e5026643ce8561e045e7a278a5",
  "version": 1,
  "memory_type": "entities"
}
-->