# Resolução de lista de acionistas do detail
O zhi2-web-admin do projeto 苏州市房地产监测V3 adiciona função em companyBasicInfoShared.js para extrair shareholderList da resposta de companyRecord/detail com fallback via getOwnCompany.

## Implementação
- Em `zhi2-web-admin/src/views/company/companyManagement/components/companyBasicInfoShared.js` nova função `resolveShareholderListFromDetailPayload` parseia `shareholderList` da resposta `/company/companyRecord/detail`
- `DeveloperBasicInfoDetail.vue` `loadShareholderList()` chama interface detail quando existe `companyRecordId`
- `detailCallback` usa `getOwnCompany` como fallback e depois sobrescreve; falha mantém fallback

## Arquivos
- companyBasicInfoShared.js, DeveloperBasicInfoDetail.vue, ShareholderPlainTable.vue
- companyManagement/companyBasicInfo/detail.vue, companyRegister/detail.vue
- api/company/companyRecord.js, utils/registerQualification.js, toB/companyRecord/detail.vue

## Verificação
- Evidência: src=苏州市房地产监测V3/140.md
- Projeto: 苏州市房地产监测V3; sessão: 4d9d7fb3-9c0c-440d-b3de-166a2d7335a9; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "resolve_shareholder_detail",
  "source_extraction_id": "2f6669c1d0ad4e90a1d5ad451cb4d376",
  "version": 2,
  "memory_type": "entities"
}
-->