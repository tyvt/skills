# Erro de busCode jgcyrybg em anexo de instituição
No projeto 苏州市房地产监测V3, ao solicitar anexos de registro de pessoal de agência (经纪机构备案), o menu usou erroneamente o código de alteração `jgcyrybg`, fazendo `listAppendixPackage` enviar busCode errado; o valor correto é `jgcyryba`.

## 问题根因
- Menu de solicitação de anexos usou código de alteração `jgcyrybg` em vez de `jgcyryba`
- `listAppendixPackage` recebeu busCode incorreto

## 解决方案
- Adicionar constantes `AGENCY_PERSONNEL_APPENDIX_BUS_CODE` e `normalizeAgencyPersonnelAppendixBusCode` em `src/api/company/personnelRecord.js`
- Em `resolvePersonnelAppendixBusCode`, corrigir uniformemente caminhos `institution/agencyPersonnel*` e fazer fallback quando sem configuração

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-leftover/091.md
- 涉及文件: AgencyPersonnelAddAppendix.vue, AgencyPersonnelDetail.vue, personnelRecord.js, personnelRecordMenuConstants.js, agencyPersonnelApply/detail.vue, AppendixPackageSection/index.vue, institution-agency-personnel-menu.js, fix-appendix.cjs
- 所属项目: 苏州市房地产监测V3; Sessão: 01a162ef-99c3-70c5-a400-7629c04d71f7; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_appendix_buscode",
  "source_extraction_id": "804f3591fe264d2e93c18d6c856df3ec",
  "version": 1,
  "memory_type": "entities"
}
-->