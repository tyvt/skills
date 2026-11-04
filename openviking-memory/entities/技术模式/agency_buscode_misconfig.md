# busCode jgcyrybg incorreto em anexos de requerimento de agência
No projeto 苏州市房地产监测V3 (zhi2-web-admin), o `resolvePersonnelAppendixBusCode` puxava anexos com `busCode` errado `jgcyrybg` por causa de menu mal configurado, quando o correto é `jgcyryba`.

## 问题根因
- Menu de requerimento de agência (经纪机构备案) configurou incorretamente `jgcyrybg`
- `listAppendixPackage` recebia `busCode` errado via `resolvePersonnelAppendixBusCode`
- Valor correto deveria ser `jgcyryba`

## 解决方案
- `src/api/company/personnelRecord.js` ganhou constante `AGENCY_PERSONNEL_APPENDIX_BUS_CODE = 'jgcyryba'`
- Função `normalizeAgencyPersonnelAppendixBusCode` corrige a codificação
- `resolvePersonnelAppendixBusCode` corrige uniformemente paths `institution/agencyPersonnel*` e usa `jgcyryba` como fallback quando não há config de menu

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3/291.md
- 涉及文件: AgencyPersonnelAddAppendix.vue, AgencyPersonnelDetail.vue, personnelRecord.js, personnelRecordMenuConstants.js, agencyPersonnelApply/detail.vue, AppendixPackageSection/index.vue, institution-agency-personnel-menu.js, fix-appendix.cjs
- 所属项目: 苏州市房地产监测V3; Sessão: 01a162ef-99c3-70c5-a400-7629c04d71f7; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_buscode_misconfig",
  "source_extraction_id": "ea52cb840c62465ab3fb0dba5f6a6e78",
  "version": 1,
  "memory_type": "entities"
}
-->