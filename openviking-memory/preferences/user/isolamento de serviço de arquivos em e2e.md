- Em testes E2E de Playwright, `sample.png` (`zhi2-web-admin/e2e/assets/test-files/sample.png`) é enviado anonimamente via `uploadAllAppendixItems` em `register-helpers.js` sem `busId`; se o serviço de arquivos local e E2E forem compartilhados, o backend `listAppendixPackage` retorna anexos históricos por `busCode: '040100'` e a página exibe `sample.png` indevidamente. Deve-se isolar ambientes ou limpar dados de teste.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Isolamento de serviço de arquivos em E2E",
  "source_extraction_id": "cdba16e1b48b43e19c67c704e7a4b0f6",
  "version": 1,
  "memory_type": "preferences"
}
-->