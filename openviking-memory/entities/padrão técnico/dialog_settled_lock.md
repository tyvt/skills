# SelectDialog confirm inválido por reject sobrepor resolve
Bug em `zs-select-dialog-func.vue`: ao clicar em confirmar, `setData` era seguido de `resolve`, mas o fechamento acionava `reject('cancel')` que sobrescrevia, fazendo catch de `handleAdd` silenciar erro e lista não atualizar.

## Problema
- `SelectDialog.open` confirm inválido porque `reject` cobria `resolve` sem trava

## Solução
- Adicionado bloqueio `settled` em `zs-select-dialog-func.vue` para garantir apenas uma liquidação
- Novo `openUnionBankWdmcSelect` em `unionBankWdmc.js` unifica seleção de banco conforme `/system/unionBank/page`

## Arquivos
- supervision/bank/superviseBank/index.vue
- supervision/bank/jgwd/index.vue
- supervision/utils/selectDialog/prefund.js
- presale/permit/components/index.vue
- supervision/agreement/account/detail.vue
- supervision/bank/jgwd/detail.vue
- supervision/bank/superviseBank/detail.vue

## Validação
- Evidência: src=苏州市房地产监测V3/028.md
- Sessão: b1936cf8-2758-4591-92a8-a76aef6e1db5

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "dialog_settled_lock",
  "source_extraction_id": "c7ea67c41536451ea2f1166b9de5c647",
  "version": 1,
  "memory_type": "entities"
}
-->