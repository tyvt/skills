# Dicionário INDUSTRY não traduzido mostra valor bruto no detalhe
No projeto 苏州市房地产监测V3, `companyApplyAudit/detail.vue` e `institutionRegister/detail.vue` não aplicam tradução do dicionário `INDUSTRY_ASSOCIATION`.

## Causa raiz
- `companyApplyAudit/detail.vue` e `institutionRegister/detail.vue` não carregam dicionário `INDUSTRY_ASSOCIATION`
- Exibem valor original e comparação de tipos incompatível

## Solução
- Ambos os arquivos carregam dicionário em `created`
- Usar `String()` para comparar compatibilizando número e string
- Exibir nome do dicionário via `industryAssociationLabel` ou `displayValue`

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3-leftover/069.md
- Arquivos: CompanyBasicInfoDetail.vue, companyApply/detail.vue, companyApplyAudit/detail.vue, institutionRegister/detail.vue, institution/record/detail.vue
- Projeto: 苏州市房地产监测V3; Sessão: a2724dfa-738f-4f54-bbf4-4303a1e6cf98; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "industry_dict_fix",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 1,
  "memory_type": "entities"
}
-->