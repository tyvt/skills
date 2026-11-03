# Espaçamento vertical de formulário de detalhe unificado em 24px
O `padding-bottom` original de `.el-form-item` somado ao `row-gap` de `section-form` causava espaçamento anômalo; unificou `--detail-block-gap` para 24px e zerou o padding do item.

## Pontos de contrato
- `padding-bottom` de `.el-form-item` somado ao `row-gap` de `section-form` causava espaçamento anômalo
- `--detail-block-gap` em `variables.css` alterado para `24px`
- Em `detail-form.scss`, `padding-bottom:0` do item de formulário, exceto quando `.el-dialog__body` não tem `el-row` e empilha `el-col` direto, onde usa a variável para evitar sobreposição

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/109.md
- Arquivos: styles/detail-form.scss, vite.config.js, styles/index.scss, styles/variables.css, styles/element-ui.scss, presale/entrustSale/detail.vue, zs-dialog/zs-dialog.vue
- Projeto: 苏州市房地产监测V3; sessão: 14ac23b1-f562-46c6-80d9-d8e3b7a96870; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_form_gap",
  "source_extraction_id": "ffbc88f6ff83419787a66226a5f2572d",
  "version": 1,
  "memory_type": "entities"
}
-->