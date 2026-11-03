# Conflito Vue2 mixin e componente na propriedade showListName
O mixin `listMixins` (table.js) define `data.showListName` e os componentes StateTable/PlanTable/LicTable redefinem o mesmo `computed`, gerando warning no Vue2.

## Causa Raiz
- `listMixins` (table.js) declara `showListName` em `data`
- StateTable/PlanTable/LicTable declaram `computed.showListName` com mesmo nome, conflitando com o mixin

## Solução
- Em `projectEmbeddedCertificateList.js`, o `watch` de `isEmbedded` define `showListName` do mixin como `!embedded`
- Remove os `computed.showListName` duplicados dos três componentes

## Arquivos e Atribuição
- Evidência: src=苏州市房地产监测V3-rest/120.md
- Arquivos: ProjectCertificateDetailDialog.vue, ProjectCertificateTabs.vue, stateLandLic/detail.vue, projectEmbeddedCertificateDetail.js, detailMixins.js, StateTable.vue, projectEmbeddedCertificateList.js, ruoyi.js
- Projeto: 苏州市房地产监测V3; sessão: 82c57f89-5320-4ad9-a2ed-1c48587b738a; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "vue2_showlistname_conflict",
  "source_extraction_id": "9949a745ce6a40b6bab523d20bf2a550",
  "version": 1,
  "memory_type": "entities"
}
-->