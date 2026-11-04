# Falta de rangeId no redirecionamento de eleição impede exibição
No projeto 苏住房C (zhi2-mobile-shimin), o redirecionamento para "Minha Eleição" sem rangeId causava consulta vazia na API.

## 问题根因
- `elect/index.vue` não transmitia `rangeId` ao redirecionar para "Minha Eleição"
- A API retornava vazia por falta do parâmetro
- `DecisionResult.vue` não carregava detalhes da eleição nem registros complementares

## Correção
- Complementar `rangeId` no redirecionamento
- `DecisionResult.vue` carrega detalhes da eleição recente exibindo candidatos e abstenções
- A lista completa nomes e resumos via `getDecisionRecordDetail`

## 验证与归属
- 所属项目: 苏住房C (zhi2-mobile-shimin)
- Sessão de origem: ebfaaf3c-dafe-4784-b0a0-fc04dca7dec7
- 涉及文件: src/pages_owner/elect/index.vue, src/pages_owner/elect/DecisionResult.vue, src/pages_vote/elect/index.vue, src/pages_vote/elect/DecisionResult.vue, src/pages_vote/decision/common/DecisionResult.vue, src/pages.json
- Linha de base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "elect_rangeid_bug",
  "source_extraction_id": "b438ec69459f48eabe3a9c05d4b7bd23",
  "version": 1,
  "memory_type": "entities"
}
-->