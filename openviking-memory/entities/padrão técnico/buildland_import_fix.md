# Correção do Caminho de Importação Buildland
O `projectManagement/buildland/detail.vue` teve o caminho de importação corrigido para buildar.

## Causa
- Referência errada `../project/components/buildingTable.vue` causava falha de build

## Solução
- Alterado para `@/views/building/project/components/buildingTable.vue` importando componente que suporta `landPlotId`

## Arquivos Envolvidos
- `src/views/projectManagement/buildland/detail.vue`
- `src/views/building/project/components/buildingTable.vue`, `package.json`

## Verificação e Origem
- Evidência: extraído do cursor session=a4b83bc3-a943-4439-b513-3c52d63c3302
- Linha de base: none; projeto: Produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "buildland_import_fix",
  "source_extraction_id": "ea712054da3f4c828e9962a4a272fca7",
  "version": 1,
  "memory_type": "entities"
}
-->