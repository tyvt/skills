# detail-template alinha rótulos à esquerda
No Suzhou Real Estate Monitoring V3, o componente `detail-template.vue` teve o alinhamento padrão dos rótulos alterado de direita para esquerda globalmente.

## Alterações no script
- `getLabelAlignClass` padrão de `'right'` para `'left'`
- `getLabelContentStyle` padrão `'left'` e fallback de `flex-end` para `flex-start`

## Alterações no CSS
- `.detail-label` e `.detail-label-main` definem `justify-content: flex-start` e `text-align: left`

## Verificação e arquivos
- Evidência: src=苏州市房地产监测V3-rest/125.md
- Arquivos: CashsaleInfoPanel.vue, detail-template.vue, detail-template-long-labels.md, README.md, detail-template-CrrkOgnH.css, migrate-detail-framework.mjs
- Sessão: 0e6522ee-5877-4b0d-9156-b0f67a688a71; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "detail_template_align",
  "source_extraction_id": "dde3fbc9f6c8407fb1b50b1438772b93",
  "version": 1,
  "memory_type": "entities"
}
-->