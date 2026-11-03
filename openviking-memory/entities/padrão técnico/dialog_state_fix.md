# Nome de estado em data() divergente causa undefined
No projeto 苏州市房地产监测V3, `chooseHouseDialog.vue` declarava `selection.origin/target` em `data()` mas os methods usavam `selectedOrigin/Target`, gerando erro em `forEach`.

## Causa raiz
- `data()` de `chooseHouseDialog.vue` declara `selection.origin/target`
- methods usam `selectedOrigin/Target` não inicializados, erro em chamada `forEach`

## Solução
- `data()` passou a declarar `selectedOrigin: []` e `selectedTarget: []`, removendo `selection`
- `onClose` reseta estados; `handleDown/Up` retornam quando não há seleção

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3/269.md
- Arquivos: chooseHouseDialog.vue, index.vue (commercialHousingSales/presale/contractMainInfo), contract-sign-helpers.js
- Projeto: 苏州市房地产监测V3; Sessão: 62a1ffcb-1ad7-433b-9cc8-6f6f5585bd2e; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "dialog_state_fix",
  "source_extraction_id": "8b596fb5c71140e8af7f969beaff9a2d",
  "version": 1,
  "memory_type": "entities"
}
-->