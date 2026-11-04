- Em `CancelReasonDialog.vue`, o `overflow:hidden` do `zs-dialog` corta as mensagens de erro de validação; `revokeReason` e outros usam `trigger` apenas em `blur`, e ao abrir não chama `clearValidate`, deixando estado de validação residual e exibição incompleta.
- Correção aplicada: adicionar `custom-class` para alterar o fluxo do documento, incluir `change` no `trigger`, e chamar `clearValidate` em `onOpen`.
- Arquivos envolvidos: autonomy/option/detail.vue, components/CancelReasonDialog.vue, styles/index.scss, maintenance/depositNotice/components/CancelReasonDialog.vue, styles/element-ui.scss, autonomy/multiply/components/VotingItemsDialog.vue, components/zs-dialog/zs-dialog.vue, components/zs-textarea/zs-textarea.vue
- 验证证据: session=cursor a5325fb9-2e64-40bc-b6ba-0a3479233656

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "dica de validação de diálogo incompleta por overflow e gatilho",
  "source_extraction_id": "bd4b0a8c2e31430396eca479ecc7d5f4",
  "version": 1,
  "memory_type": "preferences"
}
-->