- No fluxo de verificação, enviar apenas `{ receiptDetailId }` via `POST /benefit/pubReceiptVerification` e usar `receiptVerificationId` retornado para abrir detalhe em `formMode:'view'`.
- Se já existir verificação, pular direto para detalhe; remover `buildReceiptVerificationPayload` e lógica de direção débito/crédito.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Fluxo de verificação de recebimento",
  "source_extraction_id": "3227bb6e122946bcad3020c0c46e6188",
  "version": 1,
  "memory_type": "preferences"
}
-->