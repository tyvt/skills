# APIs de exclusão inconsistentes nos fluxos de registro
No projeto 苏州市房地产监测V3, os três fluxos de registro têm implementação inconsistente de exclusão de anexos no Step3.

## Problema
- As APIs de exclusão de upload de anexos no Step3 dos três fluxos de registro são inconsistentes.
- O repositório só possui `uploadAnonymous` e não tem `deleteAnonymous`.

## Padrão de componentes
- Instituições de corretagem e de locação compartilham componentes de página.
- Diferem apenas em `busCode` e na rota de entrada.

## Arquivos
- `companyRegister.js`, `institutionRegister.js`, `Step3Appendix.vue`, `RegisterUploadItem.vue`, `InstitutionUploadItem.vue`, `前端技术信息.md`, `路由信息.json`.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "register_delete_gap",
  "source_extraction_id": "c214f8dac06a4cb6a5b1a6943e986c4d",
  "version": 1,
  "memory_type": "entities"
}
-->