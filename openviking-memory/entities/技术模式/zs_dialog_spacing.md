# Empate de prioridade de estilo zs-dialog causa duplo espaçamento
No 苏州市房地产监测V3, o estilo global `.dialog-left` (`margin-right:20px;padding:20px`) do `zs-dialog` empatou em prioridade com novo estilo de componente e não surtiu efeito, gerando duplo espaçamento no painel esquerdo do diálogo.

## 问题根因
- Estilo global `.dialog-left` de `zs-dialog` com `margin-right:20px;padding:20px`
- Novo estilo de componente empatou em prioridade e não foi aplicado
- Resultou em duplo espaçamento entre painel esquerdo e direito do diálogo

## 解决方案
- `BuildingUnitLazyTree.vue` elevou seletor para `.dialog-box .dialog-left.building-unit-lazy-tree`
- `ContractDialog.vue`, `NoticeContractDialog.vue`, `buildingTreeDialog.vue` adicionaram classe específica e sobrescreveram `gap:16px`, removeram `margin-right` e ajustaram `padding`

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-leftover/054.md
- 涉及文件: chooseHouseDialog.vue, BuildingUnitLazyTree.vue, ContractDialog.vue, buildingTreeDialog.vue, NoticeContractDialog.vue, HouseSelectDialog.vue, zs-select-dialog.vue, BuildingDialog.vue
- 所属项目: 苏州市房地产监测V3; Sessão: 7342d846-a274-472d-aa53-0402cfe58bdb; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_spacing",
  "source_extraction_id": "cdba16e1b48b43e19c67c704e7a4b0f6",
  "version": 1,
  "memory_type": "entities"
}
-->