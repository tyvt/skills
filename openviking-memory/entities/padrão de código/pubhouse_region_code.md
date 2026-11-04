# Correção de código de região em pubHouse

Ao submeter `/benefit/pubHouse` faltava `regionCode` e `subdistrict`/`community` eram convertidos em nomes, mas o backend precisa de códigos.

## Descrição
- Em `index.vue` e `detail.vue` adicionou-se `regionCode`.
- Ao selecionar área de gerenciamento de propriedade, atribui-se diretamente o código.
- No B-end, preenche-se `regionCode` com `project.region` por padrão.

## Relações
- Arquivos: `benefit/pubHouse/index.vue`, `benefit/pubHouse/components/pubHouseDialog.vue`, `benefit/pubHouse/detail.vue`, `benefit/pubVenue/detail.vue`, `benefit/pubParkingSpace/detail.vue`.
- Fonte: sessão cursor b86fe772-d48c-4f14-83ed-0fae40ff6861.

<!-- MEMORY_FIELDS
{
  "category": "padrão de código",
  "name": "pubhouse_region_code",
  "source_extraction_id": "e24be3328bc94fe9a65179d03859c6a6",
  "version": 1,
  "memory_type": "entities"
}
-->