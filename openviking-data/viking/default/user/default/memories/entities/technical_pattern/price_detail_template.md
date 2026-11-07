# Price filing detail pages all reuse DetailTemplate
In Suzhou Real Estate Monitoring V3, the price filing module's 22 route detail pages map to only 4 components, all covered by reusing `DetailTemplate`.

## Pattern
- Price filing module's 22 route detail pages map to only 4 components (`detail.vue` and `changeDetail.vue`)
- All reuse `DetailTemplate` for coverage
- Routes like `RecordPriceMngSuzhou`, `County`, `City` have completed the refactoring mapping

## Verification
- Evidence: src=苏州市房地产监测V3-rest/021.md
- Files: building/house/detail.vue, commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue, commercialHousingSales/priceFiling/priceParameters/detail.vue, components/detail-template/detail-template.vue, mixins/detailMixins.js, utils/detailLayout.js, commercialHousingSales/priceFiling/recordPriceMngSuzhou/changeDetail.vue, scripts/dedup-detail-crud.mjs
- Project: 苏州市房地产监测V3; Source session: 20e12931-e556-44aa-9ac8-050ec0af34f9; Code base: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：20e12931-e556-44aa-9ac8-050ec0af34f9


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "price_detail_template",
  "source_extraction_id": "0b7b022a5898402b92372b2cf88fe87d",
  "version": 1,
  "memory_type": "entities"
}
-->
