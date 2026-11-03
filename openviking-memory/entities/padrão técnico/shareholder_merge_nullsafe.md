# Formatação segura para fusão de tabela de acionistas
`ShareholderPlainTable.vue` adiciona prop `beforeRows` para modo de fusão; valores `undefined` de um lado devem usar formatter seguro em vez de `percentFormatter`.

## Causa Raiz
- `rimraf` bloqueado por guarda de deleção segura deixou resíduo `.tmp-verify-dist` exigindo limpeza manual
- Fusão de linhas com `undefined` de um lado causava `undefined%` ao usar `percentFormatter`

## Solução
- `ShareholderPlainTable.vue` recebe prop `beforeRows` para ativar modo de fusão
- `mergedRows` faz correspondência por `shareholderId`→`idNumber`→nome do acionista (fallback)
- Usar formatter com segurança de nulo para lado `undefined`, não `percentFormatter`

## Arquivos e Atribuição
- Evidência: src=苏州市房地产监测V3-rest/122.md
- Arquivos: ShareholderChangeSection.vue, ShareholderPlainTable.vue, SurveyChangeHouseTable.vue (toB/companyRecord e presale/surveyChange), DeveloperBasicInfoForm.vue, formatters/index.js, main.js, element.js
- Projeto: 苏州市房地产监测V3; sessão: f1fe42af-7198-4586-90dc-5a34ed97f963; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "shareholder_merge_nullsafe",
  "source_extraction_id": "9949a745ce6a40b6bab523d20bf2a550",
  "version": 1,
  "memory_type": "entities"
}
-->