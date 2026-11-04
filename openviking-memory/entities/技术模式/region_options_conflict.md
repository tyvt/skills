# Conflito de Nomeação de regionOptions com Mixin area
No projeto Suzhou Real Estate Monitoring V3, o `data` local `regionOptions` conflita com o computed `regionOptions` do mixin `area` (via `detailMixins`), causando aviso Vue e poluição de prop.

## 问题根因
- `data` local `regionOptions` conflita com computed `regionOptions` do mixin `area` em `detailMixins`
- `CompanyCancelDetail` data e `CompanyBasicInfoForm` prop têm mesmo nome, causando conflito
- `CompanyBasicInfoForm` usa incorretamente `detailMixins` no modo view executando `init()` e sobrescrevendo prop `form`

## 解决方案
- `companyRecordAgency/change/detail.vue` e `toB/companyRecord/detail.vue` renomeiam campo local para `administrativeAreaOptions`
- `companyCancel/detail.vue` renomeia `regionOptions` para `economicRegionOptions`
- `CompanyBasicInfoForm.vue` remove `detailMixins`, importa direto `Headline` e `DetailTemplate` e reusa `form` do pai
- Mudanças sincronizadas em template, data, `initDict()` e catch branch

## Escopo
- Também envolve companyApplyAudit/detail.vue, CompanyBasicInfoForm/Detail, transferDiscount/detail.vue, companyApply/detail.vue etc.

## Verificação e Atribuição
- 验证证据: src=苏州市房地产监测V3-rest/073.md; src=苏州市房地产监测V3/122.md; src=苏州市房地产监测V3/239.md
- 涉及文件: toB/companyRecord/detail.vue, area.js, detailMixins.js, companyApplyAudit/detail.vue, companyRecordAgency/change/detail.vue, CompanyBasicInfoForm.vue, CompanyBasicInfoDetail.vue, transferDiscount/detail.vue, companyCancel/detail.vue, companyApply/detail.vue, form.js
- 所属项目: Suzhou Real Estate Monitoring V3; Sessões: 8173eb01-8b73-474d-a30a-4662d6fb521e, 9aaca310-0d97-443b-83c2-2382ce1e8d98; Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "region_options_conflict",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 3,
  "memory_type": "entities"
}
-->