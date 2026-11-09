# Altura do seletor de banco de supervisão limitada a 38px
O seletor de banco de supervisão à esquerda teve sua altura de input fixada em 38px via :deep, sem afetar estilos globais.

## Causa e contexto
- O seletor .supervise-bank-select precisava de altura consistente de 38px
- Apenas o dropdown esquerdo de banco de supervisão deve ser afetado, não o global

## Solução
- .supervise-bank-select com :deep ajusta .el-input e .el-input__inner para altura/line-height 38px
- Complemento :deep(.el-input__suffix){display:flex;align-items:center;} para centralizar seta

## Arquivos envolvidos
- src/views/supervision/bank/superviseBank/detail.vue
- src/styles/element-ui.scss e src/styles/index.scss

## Verificação
- Evidência: src=苏州市房地产监测V3-leftover/055.md; Sessão: 0bafd576-0208-4918-be87-43b71abea60c

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "supervise_bank_height",
  "source_extraction_id": "2ad82671c0ec46a89bf7f8171f0d0fa6",
  "version": 1,
  "memory_type": "entities"
}
-->