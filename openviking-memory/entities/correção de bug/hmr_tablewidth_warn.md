# Aviso de propriedade Vue por computed não registrado no HMR
No projeto Suzhou Housing G, o template referenciava computed `tableWidth` não registrado após HMR, causando warnings.

## Causa e solução
- Template usava computed independente `tableWidth` que falhava em hot update.
- Em buildStatColumnWidths, adicionado campo `tableWidth` no retorno.
- Template passou a usar `columnWidths.tableWidth`.
- Removidos computed redundante `tableWidth` e `firstColWidth` (primeira coluna 280px já tratada pela util).

## Arquivos envolvidos
- src/views/publicQuery/monthlyReportStat/detail.vue
- src/utils/monthlyReport.js

## Verificação
- Evidência: 苏住房G/089.md (documento interno).
- Sessão de origem: e2b799d6-2c74-4d75-98c4-123b9c9d51db.
- Linha de base de código: none.

<!-- MEMORY_FIELDS
{
  "category": "Correção de bug",
  "name": "hmr_tablewidth_warn",
  "source_extraction_id": "d932d4a67f654d5dbfff00e631306d33",
  "version": 1,
  "memory_type": "entities"
}
-->