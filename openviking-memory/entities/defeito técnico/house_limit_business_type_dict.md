# Coluna de tipo de negócio sem dictUrl exibia número bruto
No projeto 苏州市房地产监测V3, a coluna "tipo de negócio" exibia o código numérico bruto por falta de `dictUrl`; corrigido com configuração de dicionário.

## Causa raiz
- A coluna "tipo de negócio" em `houseLimitAudit/index.vue` usava `type: 'tag'` sem `dictUrl`
- O componente recuava para dicionário errado, exibindo o código como número bruto

## Solução
- A coluna da lista recebeu `dictUrl: HOUSE_LIMIT_BUSINESS_TYPE_DICT`
- O item de busca passou a `type: 'dict'` + `dictUrl`

## Verificação e origem
- Evidência: src=cursor session=a4b95ede-26b5-43a3-8433-7a4a7725ca8c
- Arquivos: building/houseLimitAudit/index.vue, building/houseLimit/houseLimitConstants.js, mixins/ListTemplate.js, components/zs-table-column/zs-table-column.vue, components/dict-tag/dict-tag.vue, building/houseLimit/limitFormMixin.js, components/zs-search-form/SearchFormItem.vue
- Projeto: 苏州市房地产监测V3; sessão: a4b95ede-26b5-43a3-8433-7a4a7725ca8c

<!-- MEMORY_FIELDS
{
  "category": "Defeito técnico",
  "name": "house_limit_business_type_dict",
  "source_extraction_id": "ba65b1d725fd4ce6a4a63d7ccdd79309",
  "version": 1,
  "memory_type": "entities"
}
-->