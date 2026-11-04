- `buildQualificationListPayload` em `registerQualification.js` só emite linhas com conteúdo real (tipo de qualificação padrão não conta como preenchido)
- Com `strict: false`, linhas não preenchidas passam; meias preenchidas são interceptadas por `validateRow`
- `Step4Shareholders.vue` usa `strict: false` na validação de submissão
- `buildSubmitPayload` inclui o campo `qualificationList` apenas quando `qualificationList.length > 0`, evitando objeto vazio

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Validação de qualificação empresarial",
  "source_extraction_id": "9949a745ce6a40b6bab523d20bf2a550",
  "version": 1,
  "memory_type": "preferences"
}
-->