# StatisticsDialog limita altura da viewport
No zhi2-web-admin (produto 2.0), o StatisticsDialog.vue estourava a viewport por falta de limite de altura no zs-dialog.

## Problema
- zs-dialog calculava altura automática pelo conteúdo; múltiplos blocos de dados faziam o StatisticsDialog.vue estourar a viewport

## 解决方案
- Definir max-height: 88vh no componente
- Área de conteúdo .dialog-box recebe overflow-y: auto
- Barra de título fixa garante botão de fechar visível

## 验证与归属
- 涉及文件: property/complex/detail.vue, property/complex/components/StatisticsDialog.vue, building/complexSearch/components/buildDialog.vue, property/complexMeterRecord/detail.vue, components/zs-dialog/zs-dialog.vue, property/complexService/detail.vue, property/subdistrict/components/SubdistrictDialog.vue
- 验证证据: src=产品2.0/074.md; sessão fe6a9c71-d8dc-4321-9d4d-34e4729e5e46; base none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "statistics_dialog_maxheight",
  "source_extraction_id": "0edb7cc648894aa9871156f6c2fe3d68",
  "version": 1,
  "memory_type": "entities"
}
-->