
# Falta de espaço em branco de 16px em tabelas e zs-form
Ao mover o preenchimento horizontal de .collapse-content para lista branca de filhos diretos, tabelas e zs-form perderam margem lateral de 16px.

## Causa do problema
- Whitelist de preenchimento horizontal não incluiu sub-container, zs-table e zs-form
- Resultou em falta de 16px de espaço esquerdo/direito nessas áreas

## Correção necessária
- Complementar whitelist em index.scss com sub-container e zs-form
- Conferir diferenças FORM_COL_THREE e HALF_LAYOUT em brand/detail

## Arquivos envolvidos
- src/styles/detail-form.scss, Headline/index.vue, index.scss
- companyScheme/detail.vue, AgencyBasicInfoForm.vue, brand/detail.vue, repairFunds/finance/rec/detail.vue, detail-template.vue

## Verificação
- Evidência: src=苏州市房地产监测V3-rest/129.md
- Projeto: 苏州市房地产监测V3; sessão: e0841e83-95db-4936-a337-ee597853b74f; baseline: none


<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "detail_whitespace_gap",
  "source_extraction_id": "b54e474b6aa74ee0b9f522a7fb39bc63",
  "version": 1,
  "memory_type": "entities"
}
-->