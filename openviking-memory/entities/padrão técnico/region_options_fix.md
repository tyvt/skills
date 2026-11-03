# Conflito de computed regionOptions em componente e mixin
O componente `AgencyEntryNetworkDetail.vue` mistura `area.js` via `detailMixins` que já possui o computed `regionOptions`, e a `data` do componente definia o mesmo nome, disparando aviso do Vue2.

## Causa raiz
- `detailMixins` inclui `area.js` com computed `regionOptions`
- `AgencyEntryNetworkDetail.vue` definia `regionOptions` na `data`, causando conflito e aviso Vue2

## Solução
- Renomeado para `administrativeRegionOptions`, referenciando `AgencyBasicInfoDetail.vue`
- Sincronizados `AgencyEntryNetworkDetail.vue` e `AgencyEntryNetworkAdminDetail.vue` em `data`, `initDict` e template `:region-options`

## Verificação e arquivos
- Evidência: src=苏州市房地产监测V3-leftover/113.md
- Arquivos: AgencyEntryNetworkDetail.vue, detailMixins.js (area.js), AgencyEntryNetworkAdminDetail.vue, AgencyBasicInfoDetail.vue
- Projeto: Suzhou Real Estate Monitoring V3; sessão: 5bc132a2-9d67-4e01-bb16-34e9f3a56c64; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "region_options_fix",
  "source_extraction_id": "cb37c3e5026643ce8561e045e7a278a5",
  "version": 1,
  "memory_type": "entities"
}
-->