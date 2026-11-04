# Filtro de propriedade sobrescrevia dicionário e exibia número na coluna de tipo de vaga
No projeto Park Public Benefit (zhi2-web-admin), a função onParkingSpaceTypeChange em parkingSpace/index.vue substituía parkingSpaceTypeOptions por um subconjunto de dicionário, fazendo o dictFormatter falhar e exibir o número 1.

## 问题根因
- onParkingSpaceTypeChange substituía parkingSpaceTypeOptions pelo subconjunto de filtro
- dictFormatter não encontrava correspondência e exibia o número original 1 na coluna de tipo de vaga

## 解决方案
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
- 所属项目: Park Public Benefit; sessão: 8f234827-4934-41b5-9ea5-1d36dd635cc0; base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parking_dict_override",
  "source_extraction_id": "3c18306e48da4914b8243df1c7df3e52",
  "version": 1,
  "memory_type": "entities"
}
-->