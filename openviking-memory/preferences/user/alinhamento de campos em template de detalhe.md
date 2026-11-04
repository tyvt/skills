- Em DetailTemplate, células de linha usam align-items: stretch para altura igual; rótulo e valor usam flex + align-items: center para centralização vertical
- pubPaymentNotice/detail.vue remove align:'center' para alinhar campos de valor (ex.: valor monetário) à esquerda, condizente com demais campos da linha
- 涉及文件: benefit/pubPaymentNotice/detail.vue, components/detail-template/detail-template.vue, benefit/pubAllotNotice/detail.vue
- 验证证据: cursor sessão=b7d66167-3cc1-4c06-a65e-79b9682fb8f3

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Alinhamento de campos em template de detalhe",
  "source_extraction_id": "c5b76c7f353b4c2186e12cd717b9e62b",
  "version": 1,
  "memory_type": "preferences"
}
-->