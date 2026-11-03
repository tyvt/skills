- Prefere que colunas de valor desativem slots de exibição e usem `:formatter` com `amountFormatter` para alinhamento à direita; colunas numéricas puras alinham à direita por título com separador de milhar.
- O script `zhi2-web-admin/scripts/scan-format-slots.py` verifica `zs-table-column` para garantir ausência de slots `amountFormatter`.
- `amountFormatter` é usado apenas em `:formatter`, linha de total ou corpo de método.

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "Formatação de colunas de valor",
  "source_extraction_id": "c7ea67c41536451ea2f1166b9de5c647",
  "version": 1,
  "memory_type": "preferences"
}
-->