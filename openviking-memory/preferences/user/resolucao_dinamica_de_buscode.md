
- No módulo de alteração de levantamento (`surveyChange`), `busCode` deve ser resolvido dinamicamente do `meta` da rota do menu ou `filePath`, eliminando constantes hardcoded.
- Remover constantes em `surveyChangeConstants.js`.
- `detail.vue` e `ApprovalDialog.vue` transmitem `busCode` via propriedade computada `surveyChangeBusCode` e prop `busCode` respectivamente.
- Se o menu não configurar `busCode`, deve alertar para verificar a configuração.


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Resolução dinâmica de busCode",
  "source_extraction_id": "adc3e1ae8ecc450c8f127414246b355e",
  "version": 1,
  "memory_type": "preferences"
}
-->