# Salvamento de entrada de agência inclui alias e campo de associação
No projeto 苏州市房地产监测V3, o salvamento de entrada de agência não locadora em `AgencyEntryNetworkDetail.vue` submete campos opcionais `companyAlias` e `industryAssociation`.

## Pontos de implementação
- Salvamento de entrada de agência não locadora em `AgencyEntryNetworkDetail.vue` via `buildEntryNetworkSavePayload()` submete `companyAlias` e `industryAssociation` opcionais
- `AgencyEntryNetworkSections.vue` integra os dois campos em modo edição (dicionário `INDUSTRY_ASSOCIATION`)
- Modo visualização reutiliza `DetailTemplate` de `agencyBasicInfoContent.js`
- `companyRecord.js` recebe comentários de interface

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-leftover/059.md
- 涉及文件: companyRecord.js, AgencyEntryNetworkDetail.vue, AgencyEntryNetworkSections.vue, agencyBasicInfoContent.js, companyBasicInfoShared.js, companyRecordAgency/change/detail.vue, AgencyBasicInfoForm.vue
- 所属项目: 苏州市房地产监测V3; Sessão: 55b4a7f2-9aca-4e4f-906e-0245c0774837; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_network_fields",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 2,
  "memory_type": "entities"
}
-->