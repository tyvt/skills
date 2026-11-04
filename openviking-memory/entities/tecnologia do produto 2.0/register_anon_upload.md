# Upload anônimo de anexos de registro de empresa
O upload de anexos de registro de empresa é um fluxo anônimo e não requer autenticação; o frontend não deve enviar Authorization e deve limpar tokens E2E.

## 问题根因
- A interface de upload de registro empresarial (`/file/appendix/uploadAnonymous`, busCode=040100) é anônima e não precisa de autenticação.
- Quando há Admin-Token expirado residual no sessionStorage, `uploadAppendixFile` ainda envia cabeçalho Authorization, e o backend retorna 401 ("token deve ser válido").
- Isso é diferente da cadeia de `$get` em caminho whitelist secreto que retorna 405; a causa é semântica de autenticação no cabeçalho, não método de requisição.
- O upload de licença comercial no backend administrativo usa `/file/file/upload` e não está no escopo desta correção.

## 解决方案
- `companyRegister.js` deve modificar `xhr.open` para `/file/appendix/uploadAnonymous` e `uploadAppendixFile` não envia Authorization explicitamente.
- `Step3` de `RegisterUploadItem` e componentes relacionados (bankTable.vue, dialog.vue, index.vue, ImageUpload/index.vue, Step3Appendix.vue) chamam esta interface; E2E `e2e/fixtures/register-mocks.js` sincronizado.
- E2E remove token hardcoded REAL_API_TOKEN, adiciona `ensureRegisterAnonymousSession()`, limpa Admin-Token/Tmp-Token antes de entrar e após carregar; `injectRealApiAuth` marcado deprecated.
- E2E usa `setupHybridUploadMock` para ambientes que ainda validam token no gateway.
- Se o gateway direto ainda retorna 401, indica que whitelist do gateway não liberou o caminho de upload, não é problema frontend.

## 验证与归属
- Sessão c3f9e4f8: companyRegister.js sem Authorization, register-helpers.js com ensureRegisterAnonymousSession(), injectRealApiAuth deprecated.
- Sessão 70beb6e7: ajuste para endpoint `/file/appendix/uploadAnonymous`, arquivos envolvidos conforme lista.
- Efeito: Step3 passou de falha a sucesso; Step4 ainda reporta "faltando requisitos" por Mock não persistir.
- 涉及文件: src/api/company/companyRegister.js, e2e/fixtures/register-helpers.js, e2e/company/real-api-flow.spec.js, e2e/fixtures/auth-helpers.js, e2e/fixtures/register-mocks.js, views/company/companyRegister/*, views/register/components/*.
- 所属项目: Produto 2.0; baseline de código: 5169909; evidência 产品2.0/062.md.

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia do Produto 2.0",
  "name": "register_anon_upload",
  "source_extraction_id": "3767eb61220a4803b7b3738f9ee63044",
  "version": 2,
  "memory_type": "entities"
}
-->