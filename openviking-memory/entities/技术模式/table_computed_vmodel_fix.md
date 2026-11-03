# computed usado como v-model em tabela causa erro de linha indefinida
No projeto 苏州市房地产监测V3, `EducationTable` usa computed como v-model; ao adicionar, o emit do componente pai conflita com o recálculo de altura do `zs-table`, gerando `row` undefined e erro.

## Causa raiz
- `EducationTable` usa computed como v-model
- Ao adicionar, o emit do pai conflita com o recálculo de altura do `zs-table`, tornando `row` undefined

## Solução
- Substituir computed por `data.innerList` e sincronizar com `watch` em `value`
- Usar `push`/`splice` para adicionar/remover e depois emit; bind `:table-tr="innerList.length || 1"`
- Adicionar `v-if="row"` nos templates de coluna como defesa de renderização

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/277.md
- Arquivos: EducationTable.vue, AgencyPersonnelDetail.vue, CertificateList.vue, zs-table.vue, zs-table-column.vue, ServiceSchemePanel.vue
- Projeto: 苏州市房地产监测V3; Sessão: 3893ccfd-88f3-46aa-bc62-e0f4d3d00ac6; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_computed_vmodel_fix",
  "source_extraction_id": "5d98e1c12360479781ab28931522b2f2",
  "version": 1,
  "memory_type": "entities"
}
-->