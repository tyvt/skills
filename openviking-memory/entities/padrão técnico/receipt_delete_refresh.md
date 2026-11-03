# Exclusão de comprovante não atualiza página pai e mantém valor antigo
No projeto 园区公共收益 (zhi2-web-admin), o `handleDelete` do `table.js` só atualiza a tabela filha e não notifica o pai; a página de detalhe mantém o valor antigo em «valor desta verificação».

## Causa raiz
- O `handleDelete` do `table.js` só atualiza a tabela filha, sem notificar o pai
- A página de detalhe mantém o valor antigo em «valor desta verificação»

## Solução
- Adicionar `deleteSuccessCallback` em `VerificationReceiptDetailTable.vue`
- Chamar `this.$emit('refresh')` para disparar `getDetail` e recarregar detalhes

## Arquivos envolvidos
- `detail.vue` e `VerificationReceiptDetailTable.vue` (página de detalhe e tabela)
- `VerificationReceiptDetailDialog.vue` e `ReconciliationBusinessTable.vue`
- Mixins: `subTableMixins.js`, `table.js`, `detailMixins.js`

## Verificação e origem
- Evidência: extracted source=cursor session=dca7c647-3133-4108-a280-c82a7ee0abb4
- Projeto: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "receipt_delete_refresh",
  "source_extraction_id": "421380447a664b42a4a5d20500dc7f5e",
  "version": 1,
  "memory_type": "entities"
}
-->