# Filtro de propriedade sobrescrevia dicionário e exibia número na coluna de tipo de vaga
No projeto Park Public Benefit (zhi2-web-admin), a função onParkingSpaceTypeChange em parkingSpace/index.vue substituía parkingSpaceTypeOptions por um subconjunto de dicionário, fazendo o dictFormatter falhar e exibir o número 1.

## Causa raiz
- onParkingSpaceTypeChange substituía parkingSpaceTypeOptions pelo subconjunto de filtro
- dictFormatter não encontrava correspondência e exibia o número original 1 na coluna de tipo de vaga

## Solução
- Separadas as opções: parkingSpaceTypeFilterOptions para filtro e parkingSpaceTypeOptions completo (benefit_parking_type) para formatação

## Arquivos envolvidos
- src/views/benefit/parkingSpace/index.vue
- src/views/benefit/pubParkingSpace/components/parkingTable.vue
- src/mixins/listMixins.js
- src/mixins/table.js
- src/main.js
- src/views/benefit/parkingSpace/detail.vue
- src/views/benefit/parkingManage/index.vue
- src/views/benefit/pubParkingSpaceDetailChange/index.vue

## Verificação e atribuição
- Projeto: Park Public Benefit; sessão: 8f234827-4934-41b5-9ea5-1d36dd635cc0; base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "parking_dict_override",
  "source_extraction_id": "3c18306e48da4914b8243df1c7df3e52",
  "version": 1,
  "memory_type": "entities"
}
-->