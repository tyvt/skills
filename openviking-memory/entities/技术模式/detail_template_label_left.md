# Alinhamento esquerdo de rótulos no detail-template
No Suzhou Real Estate Monitoring V3, o `detail-template.vue` teve o alinhamento padrão de rótulos alterado para esquerda.

## Alterações no componente
- `getLabelAlignClass` muda `labelAlign` padrão de `right` para `left`
- `getLabelContentStyle` muda padrão e fallback para `flex-start`
- CSS `.detail-label` e `.detail-label-main` com `justify-content: flex-start` e `text-align: left`
- Itens individuais ainda podem sobrescrever via `labelAlign`

## Arquivos e Atribuição
- 验证证据: src=苏州市房地产监测V3/168.md
- 涉及文件: CashsaleInfoPanel.vue, detail-template.vue, detail-template-long-labels.md, README.md, detail-template-CrrkOgnH.css, migrate-detail-framework.mjs
- Sessão: 0e6522ee-5877-4b0d-9156-b0f67a688a71; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_label_left",
  "source_extraction_id": "77174234a0a04fd3bf6b0d9c3b1c7f88",
  "version": 1,
  "memory_type": "entities"
}
-->