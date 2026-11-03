# Anexo de informações básicas da agência com busCode fixo por tipo
No projeto 苏州市房地产监测V3, o anexo de informações básicas da agência resolve busCode por tipo de instituição e fixa busId.

## Contexto
- `companyRecord.js` adiciona `resolveAgencyBasicInfoAppendixBusCode()` que retorna busCode como `jjjgxx`/`zljgxx` conforme o tipo de instituição.
- `AgencyBasicInfoDetail.vue` chama esse método para obter `licenseBusCode`.

## Comportamento
- `licenseAppendixBusId` é fixado como `String(companyRecordId)` e não muda mais com a auditoria de alteração.
- Estabiliza o anexo de licença independentemente do fluxo de revisão.

## Arquivos
- `companyRecord.js`, `AgencyBasicInfoDetail.vue`, `register-basic-info-appendix.spec.js`, `appendix-package-helpers.js`, `detail.vue` (toB/agencyRecord, companyRecordAgency, zljg/companyRecord, companyManagement/DeveloperBasicInfoDetail).

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "agency_appendix_buscode",
  "source_extraction_id": "c214f8dac06a4cb6a5b1a6943e986c4d",
  "version": 1,
  "memory_type": "entities"
}
-->