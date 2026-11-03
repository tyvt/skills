# Conflito de região por nome duplicado em mixin
O componente `AgencyBasicInfoDetail` sofre conflito de propriedade `regionOptions` entre `data` e mixin `area`, disparando aviso Vue.

## Causa raiz
- `AgencyBasicInfoDetail` mistura o mixin `area` e tanto `data` quanto o computed do mixin definem `regionOptions`
- O `data` carrega dicionário `ECONOMIC_INSTITUTIONS_REGION`, gerando conflito de propriedade e aviso Vue

## Solução
- Renomear campo em `data` para `administrativeRegionOptions`
- Atualizar configuração `loadDicts` e em computed `basicInfo` passar `regionOptions: this.administrativeRegionOptions` para `buildAgencyBasicContentInfo`

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3-leftover/119.md
- Arquivos: `AgencyBasicInfoDetail.vue`, `detailMixins.js`, `area.js`, `DeveloperBasicInfoDetail.vue`, `companyRecordAgency/detail.vue`, `agencyBasicInfoContent.js`
- Projeto: 苏州市房地产监测V3
- Sessão de origem: 3dd2b09c-ad3e-42a8-b87c-2fba58a2576a
- Baseline de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "region_options_conflict",
  "source_extraction_id": "d785eb449c3747999b3990855d973c1c",
  "version": 1,
  "memory_type": "entities"
}
-->