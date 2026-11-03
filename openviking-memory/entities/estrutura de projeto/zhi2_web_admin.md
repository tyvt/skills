
# Submódulo front-end zhi2-web-admin
O código front-end real do projeto 苏州市房地产监测V3 está no submódulo zhi2-web-admin; o repositório raiz é monorepo sem back-end Java.

## Stack técnica
- Vue 2.7 + Element UI + Axios + Vite

## Escopo do repositório
- `src` e `e2e` (excluindo dependências) têm 253 caminhos únicos `/list` e 239 `/page`
- Repositório é monorepo front-end, não contém código-fonte back-end Java
- `saveLegalPersonInfo` e textos de erro existem apenas na camada de chamada front-end e relatórios E2E; buscas não precisam checar back-end

## Verificação e origem
- Evidência: src=苏州市房地产监测V3-rest/104.md e src=苏州市房地产监测V3-rest/128.md
- Arquivos: raiz package.json, front-end tech info.md, zhi2-web-admin/src/utils/request.js, idCard.js, e2e/fixtures/auth-helpers.js, register/components/Step2LegalPerson.vue, companyRegister.js, patterns/index.js, Step4Shareholders.vue
- Projeto: 苏州市房地产监测V3; sessões: f8662de4-770a-4c03-be01-82c3d4c46154, da1f55b0-ae33-4080-aba0-5b657c8f820e; baseline: none


<!-- MEMORY_FIELDS
{
  "category": "Estrutura de projeto",
  "name": "zhi2_web_admin",
  "source_extraction_id": "b54e474b6aa74ee0b9f522a7fb39bc63",
  "version": 2,
  "memory_type": "entities"
}
-->