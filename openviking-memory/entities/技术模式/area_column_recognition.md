# Reconhecimento Uniforme de Coluna Area
Props de tabela com "Area" devem ser identificados por `isMeasureColumnProp` para evitar dano acidental e sobreposição de alinhamento.

## Regra
- Props de tabela com Area em `src/views` devem ser identificados por `isMeasureColumnProp`
- Substituição de texto de divisão administrativa deve corresponder às regras de exclusão de `tableColumnMeasure`

## Motivo
- Evita que expressão regular nua `Area$` ferira colunas e sobrescreva `align`

## Verificação
- 验证证据: src=苏州市房地产监测V3-rest/089.md
- 涉及文件: 路由信息.json, company/companyRegister/index.vue, mixins/ListTemplate.js, zs-table-column.vue, utils/tableColumnMeasure.js, formatters/index.js, package.json
- Sessão: 211494e9-a81b-4b9a-af2c-3ec7d67b86e9; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "area_column_recognition",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 1,
  "memory_type": "entities"
}
-->