# Campos de visualização/edição de pessoal inconsistentes causam divergência de contagem
No projeto 苏州市房地产监测V3, a lógica de exibição de campos nos modos de visualização e edição de pessoal está separada, fazendo com que a visualização de corretores/profissionais exiba a mais ou falte o campo «人员角色» (função do pessoal).

## 问题根因
- A lógica de exibição de campos nos modos de visualização e edição está separada, sem ordem nem visibilidade unificadas
- A visualização de corretores/profissionais exibe a mais ou falta o campo «人员角色»

## 解决方案
- Extrair `resolveAgencyPersonnelBasicInfoFields` em agencyPersonnelBasicInfoFields.js para unificar ordem e visibilidade de `basicInfoView` e `AgencyPersonnelBasicInfoFormFields`
- Na visualização G, definir `showPersonnelRoleField` como true

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/277.md
- 涉及文件: AgencyPersonnelDetail.vue, agencyBasicInfoContent.js, agencyPersonnelBasicInfoFields.js, detailLayout.js, AgencyPersonnelBasicInfoFormFields.vue
- 所属项目: 苏州市房地产监测V3; Sessão: 78eb4f58-a263-44aa-9a8e-3ccff66ca115; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_field_visibility_unify",
  "source_extraction_id": "5d98e1c12360479781ab28931522b2f2",
  "version": 1,
  "memory_type": "entities"
}
-->