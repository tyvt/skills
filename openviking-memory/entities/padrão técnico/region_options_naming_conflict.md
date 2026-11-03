# Conflito de nome computed regionOptions com area mixin
No 苏州市房地产监测V3, dicionário local `regionOptions` conflita com computed homônimo do `area` mixin, gerando aviso Vue.

## Causa raiz
- Dicionário local `regionOptions` conflita com computed `regionOptions` do `area` mixin em `detailMixins`
- Gera aviso Vue e afeta reatividade do componente

## Correção
- `companyRecordAgency/change/detail.vue` e `toB/companyRecord/detail.vue` renomeiam local para `administrativeAreaOptions`
- Ajuste sincronizado em template, data, initDict e branch catch

## Escopo
- Envolve companyApplyAudit/detail.vue, CompanyBasicInfoForm/Detail, transferDiscount/detail.vue etc.

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3-rest/073.md
- Arquivos: toB/companyRecord/detail.vue, area.js, detailMixins.js, companyApplyAudit/detail.vue, companyRecordAgency/change/detail.vue, CompanyBasicInfoForm.vue, CompanyBasicInfoDetail.vue, transferDiscount/detail.vue
- Projeto: 苏州市房地产监测V3; Sessão: 8173eb01-8b73-474d-a30a-4662d6fb521e; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "region_options_naming_conflict",
  "source_extraction_id": "f3025b0b72ad4d9da2b7a5d18356898a",
  "version": 1,
  "memory_type": "entities"
}
-->