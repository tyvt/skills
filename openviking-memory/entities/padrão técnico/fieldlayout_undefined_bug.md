# Componente detail-template usa fieldLayout não definido
O módulo constante `fieldLayout` não foi definido em `contentInfo`, causando ReferenceError no projeto 苏州市房地产监测V3.

## Problema
- `fieldLayout` não definido em `contentInfo` causa ReferenceError
- 4 referências a `fieldLayout` precisam de substituição

## Solução
- Importar `FORM_COL_TWO` de `@/utils/detailLayout` (valor `{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }`)
- Substituir 4 referências de `fieldLayout` por `FORM_COL_TWO`

## Arquivos
- `zhi2-web-admin/src/components/detail-template/detail-template.vue`
- `zhi2-web-admin/src/views/supervision/unblock/usemoneyRevoke/detail.vue`
- `zhi2-web-admin/src/views/supervision/deposit/refund/detail.vue`
- `zhi2-web-admin/src/views/supervision/agreement/jgxm/detail.vue`
- `zhi2-web-admin/src/utils/detailLayout.js`

## Verificação
- Evidência: src=苏州市房地产监测V3/234.md
- Sessão de origem: c9e3f7f1-e112-4668-b0d4-4bad6d731b08
- Projeto: 苏州市房地产监测V3; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "fieldlayout_undefined_bug",
  "source_extraction_id": "5a368dde30334afa99f7154d2f5147cf",
  "version": 2,
  "memory_type": "entities"
}
-->