
# Perda de ID ao retroceder passo de registro
No projeto 苏州市房地产监测V3, `@prev` do Step3 chamava `goStep2` sem argumento, escrevendo `companyRegisterId` como `undefined` e limpando `queryRegisterRecord`.

## Problema
- `goStep2` sem parâmetro fez URL `companyRegisterId=undefined`, limpou `queryRegisterRecord`, causando falha de echo de info admin e erro de ID ausente no próximo passo.

## Solução
- `index.vue` unificou `goStep(step)` preservando ID de rota; mudança de rota chama `loadRegisterDetailIfNeeded()` para buscar detalhes.
- `institutionRegister.js` adicionou `getInstitutionRegisterDetail` com `noMessage/noReject` para evitar erro global.

## Verificação e Arquivos
- Evidência: src=苏州市房地产监测V3-rest/020.md; sessão 9fe9ee18-7352-4a5c-bc63-a249f00380ff.
- Arquivos: d:/repository/苏州市房地产监测V3/路由信息.json, institutionRegister/index.vue, Step2AdminInfo.vue, Step3Appendix.vue, Step1BasicInfo.vue, src/api/institution/institutionRegister.js, companyRegister.vue, e2e/company/institution-register-flow.spec.js.


<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "register_step_id_loss",
  "source_extraction_id": "261683e4b6f6441e994fe34ffbde724a",
  "version": 1,
  "memory_type": "entities"
}
-->