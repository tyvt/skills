# Campos obrigatórios de alias e associação na certificação de agência
A certificação de entrada de rede de agência imobiliária deve submeter os campos não obrigatórios `companyAlias` e `industryAssociation`.

## Contexto
- `AgencyEntryNetworkDetail.vue` em `buildEntryNetworkSavePayload()` para agências não locatárias envia `companyAlias` sem espaços e `industryAssociation` com valor
- `AgencyEntryNetworkSections.vue` suporta edição (maxlength=150, dicionário `INDUSTRY_ASSOCIATION`) e visualização via `agencyBasicInfoContent.js` `DetailTemplate`

## Arquivos e nota
- `companyRecord.js` `saveAgencyEntryNetwork` recebeu comentário complementar
- Evidência: src=苏州市房地产监测V3/259.md
- Arquivos: companyRecord.js, AgencyEntryNetworkDetail.vue, AgencyEntryNetworkSections.vue, agencyBasicInfoContent.js, companyBasicInfoShared.js, companyRecordAgency/change/detail.vue, AgencyBasicInfoForm.vue
- Projeto: 苏州市房地产监测V3; sessão: 55b4a7f2-9aca-4e4f-906e-0245c0774837

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "agency_entry_network",
  "source_extraction_id": "106e4b7ccbcd45ba9141a4e92b902135",
  "version": 1,
  "memory_type": "entities"
}
-->