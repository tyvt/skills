# Correção de Parsing de busCode para Código de Mudança
`resolvePersonnelChangeBusCode` originalmente confundia código de arquivamento com código de mudança, sendo corrigido por constantes e lógica por rota.

## Causa Raiz
- Função original tratava códigos de arquivamento `cyryba`/`zlcyryba` como códigos de mudança

## Correção
- Em `src/api/company/personnelRecord.js` adicionaram-se constantes como `AGENCY_PERSONNEL_CHANGE_BUS_CODE` e reescreveu-se função por `meta` de rota ou tipo de organização
- `companyChangeManage/index.vue` teve `CHANGE_DETAIL_TARGET_BY_BUS_CODE` complementado com mapeamento `jgcyrybg`

## Verificação
- Evidência: src=苏州市房地产监测V3-rest/089.md
- Arquivos: personnelRecord.js, personnelRecordMenuConstants.js, staffManagement/components/index.vue, agencyBranchChange.js, companyChangeManage/index.vue, staffManagement/components/detail.vue, AgencyPersonnelDetail.vue, LeasePersonnelDetail.vue
- Sessão: 01a16232-5377-7628-b520-45bedf400542; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "buscode_parse_fix",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 1,
  "memory_type": "entities"
}
-->