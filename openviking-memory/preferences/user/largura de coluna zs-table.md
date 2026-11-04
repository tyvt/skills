- Evitar flicker de largura de coluna em `zs-table`: não sobrepor lógica assíncrona de `scheduleDistributeRemainingWidth` (rAF + setTimeout 16ms) com `scheduleDomWidthMeasure` (rAF).
- Adicionar `queueDistributeAfterColumnsUpdated` em `zs-table.vue` executado após mudança de `tableData` com `$nextTick`.
- Mudar `scheduleDistributeRemainingWidth` para `rAF + $nextTick` removendo atraso 16ms.
- 验证证据: src=苏州市房地产监测V3-leftover/021.md; sessão 533e9595-631f-446e-8081-9e0ce442a190.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "largura de coluna zs-table",
  "source_extraction_id": "5cb4457da8b74ad0b105228a1b4260cf",
  "version": 1,
  "memory_type": "preferences"
}
-->