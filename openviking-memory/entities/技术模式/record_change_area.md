# Lista de alterações de registro usa administrativeArea
No Suzhou Real Estate Monitoring V3, a lista de alterações de credenciamento de instituições teve o parâmetro de consulta alterado de `regionCode` para `administrativeArea` para adaptar à nova interface.

## Problema
- Parâmetro `regionCode` não adaptado à nova interface `administrativeArea`, causando anomalia de filtro

## 解决方案
- Em `change/index.vue`, parâmetro de consulta alterado para `administrativeArea`
- Coluna de tabela usa `type='dict'` e `dict-url='ECONOMIC_INSTITUTIONS_REGION'`, removendo `formatRegion`
- `companyRecord.js` adiciona JSDoc para `pageCompanyRecordChanges` e nova interface `addCompanyRecordChange`

## Verificação e arquivos
- 验证证据: src=苏州市房地产监测V3-rest/124.md
- 涉及文件: change/index.vue, change/detail.vue, companyRecord.js, companyBasicInfoContent.js, companyRecordAgency/index.vue, CompanyBasicInfoForm.vue, detail.vue, company-record-change.spec.js
- Sessão: 81bf5be6-c0ce-46ce-b29f-c26f9c1c7127; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_change_area",
  "source_extraction_id": "dde3fbc9f6c8407fb1b50b1438772b93",
  "version": 1,
  "memory_type": "entities"
}
-->