# Diálogo com gap substitui margens sobrepostas
Ajuste de espaçamento em diálogo onde margens esquerda/direita causavam folga excessiva.

## Descrição
- `.dialog-box` usava `margin-right:24px` à esquerda e `padding-left:20px` à direita, somando ~44px de vazio.
- Alterado para `gap:16px` removendo espaçamentos laterais, podendo ajustar para `12px`.

## Arquivos afetados
- `zs-dialog.vue`, `chooseHouseDialog.vue`, `HouseSelectDialog.vue`, `contractMainInfo/index.vue` entre outros.

## Verificação
- Fonte: 苏州市房地产监测V3/073.md; sessão aa2afcf7-1398-4cdf-93b4-30183eff923a.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "dialog_box_gap_margin_replace",
  "source_extraction_id": "c7bc53bcb27a4ee29de6d3657fdd1479",
  "version": 1,
  "memory_type": "entities"
}
-->