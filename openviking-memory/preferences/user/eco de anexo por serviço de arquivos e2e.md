- `sample.png` é arquivo de teste Playwright E2E em `zhi2-web-admin/e2e/assets/test-files/`; `company-register.spec.js` usa `uploadAnonymous` com só `busCode: '040100'` (sem `busId`), upload anônimo.
- Quando ambiente local/E2E compartilha o serviço de arquivos, o backend `listAppendixPackage` insere arquivos históricos em `packages[].appendices` causando eco na página; isolar o serviço de arquivos ou limpar os itens carregados por `initAppendix` em `CompanyRegisterSingleForm`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Eco de anexo por serviço de arquivos E2E",
  "source_extraction_id": "bc24b503fbae49f6a34aceca79c91074",
  "version": 1,
  "memory_type": "preferences"
}
-->