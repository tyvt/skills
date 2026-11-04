# Dicionário INDUSTRY não traduzido mostra valor bruto no detalhe
No projeto 苏州市房地产监测V3, `companyApplyAudit/detail.vue` e `institutionRegister/detail.vue` não aplicam tradução do dicionário `INDUSTRY_ASSOCIATION`.

## 问题根因
- `companyApplyAudit/detail.vue` e `institutionRegister/detail.vue` não carregam dicionário `INDUSTRY_ASSOCIATION`
- Exibem valor original e comparação de tipos incompatível

## 解决方案
- Ambos os arquivos carregam dicionário em `created`
- Usar `String()` para comparar compatibilizando número e string
- Exibir nome do dicionário via `industryAssociationLabel` ou `displayValue`

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-leftover/069.md; src=苏州市房地产监测V3/269.md
- 涉及文件: CompanyBasicInfoDetail.vue, companyApply/detail.vue, companyApplyAudit/detail.vue, institutionRegister/detail.vue, institution/record/detail.vue
- 所属项目: 苏州市房地产监测V3; Sessão: a2724dfa-738f-4f54-bbf4-4303a1e6cf98; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "industry_dict_fix",
  "source_extraction_id": "8b596fb5c71140e8af7f969beaff9a2d",
  "version": 2,
  "memory_type": "entities"
}
-->