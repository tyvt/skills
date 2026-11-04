# Estilo de diálogo de autorização de pavilhão não sincronizado com branch yuanqu
O layout e interação de BuildingDialogAuth.vue no branch atual divergem do padrão do branch yuanqu.

## 问题根因
- BuildingDialogAuth.vue no branch atual tem layout e interação inconsistentes com o padrão do branch yuanqu.

## 解决方案
- Sincronizar com commit cd9696539.
- Alterar botão de confirmação inferior, botão de transferência de texto, paginação de selecionados, largura 96vw, tabela com 8 linhas fixas etc.

## Verificação e proveniência
- 涉及文件: src/views/property/complexBuildingAuth/detail.vue; src/views/components/BuildingDialogAuth.vue; BuildingDialogAuth.vue do branch atual.
- Sessão: dc881812-1513-477b-8342-59b5f3fc62ac; código base: none.

<!-- MEMORY_FIELDS
{
  "category": "已知缺陷",
  "name": "building_auth_sync",
  "source_extraction_id": "7493d2e07b614c8495b8ab8a2d8d67a3",
  "version": 1,
  "memory_type": "entities"
}
-->