# Salto para detalhe de instalação a partir da lista de registros de baixa
Correção em `scrappedRecord/index.vue` para tornar o nome da instalação clicável e abrir o detalhe do equipamento.

## 描述
- O arquivo `scrappedRecord/index.vue` importa `getRouterPathByFilePath`.
- Coluna "设施设备名称" (nome da instalação) recebe `function: this.handleViewFacility`.
- A função usa `row.facilityId` para navegar até `maintenance/facility/detail` com `formMode: 'view'`.

## Arquivos Envolvidos
- `d:/repository/产品2.0/zhi2-web-admin/src/views/dataProperty/scrappedRecord/index.vue`
- `d:/repository/产品2.0/zhi2-web-admin/src/mixins/listMixins.js`
- `d:/repository/产品2.0/zhi2-web-admin/src/views/dataProperty/scrappedRecord/detail.vue`
- `d:/repository/产品2.0/zhi2-web-admin/src/views/maintenance/repair/index.vue`

## Verificação
- 来源: cursor session=71a2b0ad-3e39-4680-9567-9bb5c7e84b89
- Linha de base de código: none

<!-- MEMORY_FIELDS
{
  "category": "defeito",
  "name": "scrapped_facility_jump",
  "source_extraction_id": "0470ca24980e46c381bede7a0ebe5a55",
  "version": 1,
  "memory_type": "entities"
}
-->