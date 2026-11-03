# Diálogo antigo oculto por falta de prop visible
No projeto Suzhou Real Estate Monitoring V3, ao montar com `propsData: { visible: true }`, diálogos antigos sem prop `visible` declarado eram ocultados pelo Vue 2; corrigido via Shell `render` passando `visible` em `props` e `attrs`.

## Causa raiz
- Diálogos antigos (ex.: `superviseDialog.vue`) não declaravam prop `visible`
- Vue 2 descartava campo não declarado em `propsData`
- Após montagem, o diálogo ficava oculto

## Correção
- `mountDialog.js` passou a usar Shell `render` e transmitir `visible` via `props` e `attrs`
- Componentes de diálogo adicionaram definições `visible`/`syncVisible`
- Afeta página de detalhe de registro de risco (`riskregister/detail.vue`)

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/069.md
- Arquivos: riskregister/detail.vue, superviseDialog.vue, selectDialog/index.js, superviseProject.js, generic.js, mountDialog.js, detailMixins.js, zs-input.vue
- Sessão: 643201ce-b344-4b8f-9d1d-ca5948636201; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "mount_dialog_visible",
  "source_extraction_id": "3b0e49c9a828485693063aa7ee803883",
  "version": 1,
  "memory_type": "entities"
}
-->