# Presale Plan ID Parse Bug
A visualização do plano de pré-venda ficava sem valores porque o ID não era parseado do retorno `presalePlanId`.

## 描述
- Backend `PresalePlanSaveVo` retorna `presalePlanId` em vez de `planId`.
- `plan/detail.vue` usava `resolveResponseId(res, 'planId')` e não lia o ID.

## 解决方案
- Modificado para `extractPlanId(res.data)` para resolver o ID do plano.
- Helpers E2E ganharam `extractPlanIdFromSaveResponse`.

## Verificação e Atribuição
- 验证证据: src=苏州市房地产监测V3-rest/069.md
- 涉及文件: presale/permit/components/detail.vue, permitConstants.js, permit/plan/detail.vue, PermitPlanPanel.vue, e2e/fixtures/presale-permit-helpers.js, e2e/presale/presale-permit-real-api-flow.spec.js, presale/cashsale/plan/detail.vue, package.json
- 所属项目: 苏州市房地产监测V3; Sessão: 77643a80-744f-419d-abfc-21a4685e8d9f; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_id_parse",
  "source_extraction_id": "871325fa12334107afbf4d507d0400dd",
  "version": 1,
  "memory_type": "entities"
}
-->