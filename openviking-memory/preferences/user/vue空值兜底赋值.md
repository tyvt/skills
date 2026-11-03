- Em `zhi2-web-admin/src/views/maintenance/accountQuery/type.vue`, no `listCallback`, quando `response.costMap` é `null/undefined` atribui objeto vazio padrão para evitar erro de renderização de `accountClassifySummary`.
- Evidência: src=bugfix/002.md; arquivo: zhi2-web-admin/src/views/maintenance/accountQuery/type.vue; sessão: 7237df2f-31b9-4f24-abf3-253139b16a09
- Em templates, ao ler propriedades de objeto possivelmente nulas usa encadeamento opcional e fallback de curto-circuito: para `threeData[threeDataIndex]` undefined, usa `v-if="threeData[threeDataIndex]?.companyNames?.length"` e `:dataList="threeData[threeDataIndex]?.companyNames || []"` para evitar TypeError.
- Evidência: src=bugfix/003.md; arquivos: index.vue, vue.js; sessão: 57ee5fc8-b902-4632-8d17-f084cf9e6c5d
- Em `src/views/benefit/statisticsMap/operatingAssets.vue` remove `statsConfig` e fallback, área de estatística usa apenas `statistics` do backend; quando `assetStatsMap` ausente/null/não-objeto/vazio retorna [], página não erra e área fica vazia.
- Evidência: cursor sessão=8764d18a-96ce-41bc-b2fc-650ff71a2d75; arquivo: src/views/benefit/statisticsMap/operatingAssets.vue
- Em `src/views/benefit/statisticsMap/operatingAssets.vue`, nomes de ativos por tipo (houseName, spaceNumber, advertiseSpaceName, venueName) usam fallback para `assetLeaseName` evitando vazio.
- Evidência: cursor sessão=629035c8-256f-4490-890e-e576020db92e; arquivo: src/views/benefit/statisticsMap/operatingAssets.vue
- Em `src/views/benefit/statisticsMap/operatingAssets.vue`, tabela com `tableRows` vazio adiciona renderização condicional `operating-assets__table-empty` com estilo centralizado, mostra "暂无数据" evitando página vazia.
- Evidência: cursor sessão=009b156c-7e38-4831-9716-5483987c41c5; arquivo: src/views/benefit/statisticsMap/operatingAssets.vue
- Em `zhi2-web-admin/src/views/projectManagement/customerProject/detail.vue`, `projectId` passa a usar cadeia de fallback (`this.id`/`$route.params.tableId`/`$route.query.id`) para evitar saída silenciosa quando `/building/project/detail` retorna null.
- Evidência: src=苏州市房地产监测V3-rest/025.md; sessão: 01a16159-63a8-7295-ba46-c2ad374e49ae

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue空值兜底赋值",
  "source_extraction_id": "2541e120aaed44a78ac4d8041d820fd0",
  "version": 5,
  "memory_type": "preferences"
}
-->