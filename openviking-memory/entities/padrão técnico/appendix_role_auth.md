# Exibição de anexos por papel com prioridade de pacote de autorização
No projeto Suzhou Real Estate Monitoring V3, anexos exigidos são mostrados conforme papel do operador, priorizando pacote de autorização em duplicação.

## Regras de Exibição
- Operador não contrato vê apenas carteira de identidade
- Operador de contrato vê carteira de identidade e procuração
- Pacote de registro (`备案包`) mantém só identidade; pacote `zljghtsq` oferece identidade e autorização
- Em duplicação com registro, priorizar pacote de autorização e mesclar removendo duplicados

## Arquivos Envolvidos
- `views/institution/leasePersonnel/components/LeasePersonnelDetail.vue`
- `api/company/leasePersonnel.js`
- `views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue`
- `docs/suzhou-2016-presale-contract-diff-checklist.md`
- `views/institution/agencyPersonnel/components/AgencyPersonnelAddAppendix.vue`
- `components/AppendixPackageSection/index.vue`
- `e2e/fixtures/appendix-package-helpers.js`
- `components/AnnexUpload/index.vue`

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3/027.md
- ID de sessão: 77fa1a75-24f0-43b1-bb5c-38c9efb094bb
- Projeto: Suzhou Real Estate Monitoring V3; linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "appendix_role_auth",
  "source_extraction_id": "6fc8792e24d54a0aa777d242fbe84ee6",
  "version": 1,
  "memory_type": "entities"
}
-->