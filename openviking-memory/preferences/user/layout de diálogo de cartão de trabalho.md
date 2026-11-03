- `InfoCardDialog.vue` e `WorkCardDialog.vue` devem usar container flex centralizado, rótulos de campo fixos em 5.5em alinhados à direita, cartão com `max-width:100%` e centralizado horizontalmente.
- Causa raiz: `vue-qr` padrão tem `margin=20` em `:size="50"` causando excesso de margem branca, agravado por `padding:4px` no container; rótulos com larguras inconsistentes e falta de restrição de largura.
- Correção QR: `WorkCardDialog.vue` e `InfoCardDialog.vue` recebem `:margin="0"` e `:white-margin="false"`; remover `padding` de `.work-card__qr-wrap`/`.info-card__qr-wrap` fixando em `50×50px` alinhado ao design.
- Arquivos envolvidos: `AgencyPersonnelDetail.vue`, `WorkCardDialog.vue`, `InfoCardDialog.vue`, `AgencyPersonnelList.vue`, `QrCodeDialog.vue`, `qrCode.vue`, `agency-personnel-real-api-flow.spec.js`, `CashsaleDetail.vue`, `CashsaleInfoPanel.vue`, `RecordCertificateDialog.vue`.
- Evidência: src=苏州市房地产监测V3-leftover/038.md; sessão: 3bb79189-7e5a-4f02-909b-f9bdf9a2ecb3; também src=苏州市房地产监测V3-rest/113.md; sessão: 271fe773-92e0-4ead-a113-8889fcea1743; projeto: 苏州市房地产监测V3.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Layout de diálogo de cartão de trabalho",
  "source_extraction_id": "c214f8dac06a4cb6a5b1a6943e986c4d",
  "version": 2,
  "memory_type": "preferences"
}
-->