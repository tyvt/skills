# Opção de dicionário declarada em prop e data dispara aviso Vue
No projeto 苏州市房地产监测V3, `bizStateOptions` declarado em `props` e `data()` do `InfoCardDialog.vue` dispara aviso do Vue.

## 问题根因
- `bizStateOptions` declarado em `props` e `data()` de `institution/agencyPersonnel/components/InfoCardDialog.vue`
- Dispara aviso do Vue por nome duplicado

## Correção
- Remover esse prop e adicionar `personnelStatusOptions`
- Em `loadCredential` chamar `getDicts('personnel_business_status')` para autocarregar o dicionário
- Componente pai remove o parâmetro passado

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/110.md
- 涉及文件: InfoCardDialog.vue, AgencyPersonnelList.vue, WorkCardDialog.vue, personnelStatus.js, AgencyPersonnelDetail.vue, zs-table-column.vue, listMixins.js, table.js
- 所属项目: 苏州市房地产监测V3; sessão: c7e8e793-52a0-4fb3-835f-ca02c35c1248; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_options_dup_warn",
  "source_extraction_id": "af40fe024dd843b9ac721da449decb68",
  "version": 1,
  "memory_type": "entities"
}
-->