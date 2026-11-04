# company_change_bizstate_multivalue
Após commit c2ab33f8b mudar bizState globalmente para múltipla seleção, chamada em companyManagement/components/index.vue para /company/companyRecordChange/page serializava incorretamente como string multi-valor '1,2'.

## Ação
- Normalizar formato de passagem de bizState nesse arquivo.
- 涉及文件: companyManagement/components/index.vue, userManagement/operator/index.vue, change/index.vue, utils/companyListQuery.js, zs-search-form.vue, layout/index.vue, userManagement/companyRecordAuth/index.vue, mixins/listMixins.js.
- 所属项目: 苏住房G; 验证证据: src=苏住房G/056.md; sessão: 04c6f559-f726-4199-99cd-5e92be1922e5.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_bizstate_multivalue",
  "source_extraction_id": "365bab52c52f4179bd3a6d0ab0e8c6cc",
  "version": 1,
  "memory_type": "entities"
}
-->