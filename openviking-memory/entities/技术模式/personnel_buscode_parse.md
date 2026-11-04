# Parsing de busCode de Mudança de Pessoal por Rota e Tipo
No projeto 苏州市房地产监测V3, lógica original confundia códigos de registro (cyryba/zlcyryba) com códigos de mudança.

## Correção em personnelRecord.js
- `resolvePersonnelChangeBusCode` reescrito: se meta da rota acerta busCode de mudança, confia diretamente; senão mapeia por tipo de instituição (corretora agencyPersonnel→jgcyrybg).

## Correção em companyChangeManage/index.vue
- `CHANGE_DETAIL_TARGET_BY_BUS_CODE` adiciona jgcyrybg→institution/agencyPersonnel/detail.

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/129.md
- 涉及文件: personnelRecord.js, personnelRecordMenuConstants.js, staffManagement/components/index.vue, agencyBranchChange.js, companyChangeManage/index.vue, staffManagement/components/detail.vue, AgencyPersonnelDetail.vue, LeasePersonnelDetail.vue
- Sessão: 01a16232-5377-7628-b520-45bedf400542; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_buscode_parse",
  "source_extraction_id": "9a72ed1246ed49b9a2c86e9dac3adbdd",
  "version": 1,
  "memory_type": "entities"
}
-->