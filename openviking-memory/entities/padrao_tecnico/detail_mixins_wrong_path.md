# detailMixins Concatena Caminho Errado Causando Requisição Incorreta
No projeto Suzhou Real Estate Monitoring V3, `detailMixins` no `formMode:'view'` monta caminho errado `/company/institutionRegister/detail` via `moduleName+businessName`, fazendo detalhe requisitar API errada.

## Sintoma
- `detailMixins` em `formMode:'view'` `init()` monta caminho errado `/company/institutionRegister/detail`

## Solução
- `detail.vue` sobrescreve `init()` para evitar requisição automática
- Mantém `loadDetail()` em `created()` chamando `/company/companyRegister/detail`
- Páginas wrapper como `zljg` compartilham efeito

## Verificação e Atribuição
- Evidência: src=苏州市房地产监测V3/181.md
- Arquivos: api/company/institutionRegister.js, api/institution/institutionRegister.js, company/institutionRegister/detail.vue, institutionRegister/InstitutionRegisterPage.vue, mixins/detailMixins.js, mixins/form.js, zljg/institutionRegister/detail.vue, OperationBtnGroup/index.vue
- Projeto: Suzhou Real Estate Monitoring V3; Sessão: 1412adc3-5a64-46ef-9d42-ab80e4e6c02f; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "detail_mixins_wrong_path",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 2,
  "memory_type": "entities"
}
-->