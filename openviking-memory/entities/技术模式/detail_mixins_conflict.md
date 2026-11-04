# Uso indevido de detailMixins causa conflito e reescrita de form
No projeto Suzhou Real Estate Monitoring V3, o `detailMixins` introduziu computed `regionOptions` do mixin area conflitando com data de CompanyCancelDetail e prop de CompanyBasicInfoForm; CompanyBasicInfoForm usou detailMixins em modo view reescrevendo prop de form.

## 问题根因
- `detailMixins` traz `regionOptions` que conflita com `data` de CompanyCancelDetail e prop de CompanyBasicInfoForm (mesmo nome)
- CompanyBasicInfoForm usou `detailMixins`; no modo view executou `init()->getDetail()->detailCallback()` reescrevendo prop de form

## 解决方案
- `CompanyBasicInfoForm.vue` removido `detailMixins` e importou direto `Headline`, `DetailTemplate`; modo edição usa form do pai
- `companyCancel/detail.vue` renomeou `regionOptions` para `economicRegionOptions`

## Verificação e arquivos
- 验证证据: src=苏州市房地产监测V3-leftover/039.md
- 涉及文件: companyCancel/detail.vue, CompanyBasicInfoForm.vue, detailMixins.js, area.js, companyApply/detail.vue, companyRecordAgency/change/detail.vue, toB/companyRecord/detail.vue, form.js
- Sessão: 9aaca310-0d97-443b-83c2-2382ce1e8d98; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_mixins_conflict",
  "source_extraction_id": "6e670e2c1ff04c55bcebae32cab0400f",
  "version": 1,
  "memory_type": "entities"
}
-->