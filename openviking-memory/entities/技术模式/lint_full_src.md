
# npm run lint com nome de arquivo ainda linta todo src
`npm run lint -- BuildingChangeDialog.vue` na verdade executa lint em todo o diretório `src` (cerca de 19 mil alertas), `npx eslint --no-fix` em arquivo único resulta em 0 erro, 15 avisos.

## Comportamento
- `npm run lint -- BuildingChangeDialog.vue` linta todo `src` (≈19k alertas)
- `npx eslint --no-fix` em arquivo único: 0 erro, 15 avisos (`prefer-zs-components`: sugere `zs-form-item`/`zs-select` no lugar de `el-form-item`/`el-select`), consistente com NodeDetailsDialog e PaymentBuildingDialog, não introduzido por esta mudança

## Sugestões de correção
- Antes do merge, modificar `v-money:2` em `el-option` e condição `disabled` de `el-select` em `BuildingChangeDialog.vue`
- ESLint não cobre esses dois pontos

## Verificação e origem
- Evidência: src=苏州市房地产监测V3-leftover/064.md; src=苏州市房地产监测V3/264.md
- Arquivos: BuildingChangeDialog.vue, NodeDetailsDialog.vue, PaymentBuildingDialog.vue, zs-dialog.vue, RealEstateDialog.vue
- Projeto: 苏州市房地产监测V3; sessão: 7123fc41-c4b5-4ca1-afc5-aec23b0dd06d; base de código: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lint_full_src",
  "source_extraction_id": "8c43efc6d6ef4f45aa6e706fcd941499",
  "version": 2,
  "memory_type": "entities"
}
-->