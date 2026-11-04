# Campo novo lv=2 causa recuo incorreto de subitens de saldo de fundos
Em mapTipRows, 3 campos (ex.: 本年新增账户数) com lv=2 e padding-left:20px para imitar recuo de subitens de receita/despesa causa desalinhamento.

## 问题根因
- 3 campos em mapTipRows tinham lv definido como 2 com padding-left:20px imitando recuo de receita/despesa de fundos.
- Isso causa recuo incorreto dos subitens de saldo de fundos.

## 解决方案
- Mudar lv para 1, ficando no mesmo nível de "资金余额" (saldo de fundos).
- Ajustar ordem para: saldo de fundos → 3 campos → receita/despesa (lv:2).

## Verificação e proveniência
- Arquivo: src/views/benefit/mapOverview/index.vue.
- Sessão: 0c9c218b-0876-4484-af0e-4452a8f8c076; código base: none.

<!-- MEMORY_FIELDS
{
  "category": "已知缺陷",
  "name": "map_rows_indent",
  "source_extraction_id": "7493d2e07b614c8495b8ab8a2d8d67a3",
  "version": 1,
  "memory_type": "entities"
}
-->