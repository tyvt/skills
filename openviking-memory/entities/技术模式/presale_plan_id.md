# Falha ao salvar/visualizar plano de pré-venda por nome de campo de ID
O backend `PresalePlanSaveVo` retorna `presalePlanId` em vez de `planId`; o `plan/detail.vue` original com `resolveResponseId(res, 'planId')` não lia o ID do plano.

## Pontos de contrato
- Backend `PresalePlanSaveVo` retorna `presalePlanId` em vez de `planId`
- `plan/detail.vue` original usava `resolveResponseId(res, 'planId')` e não lia o ID do plano
- `extractPlanId` passou a aceitar ambos os campos, resolvendo `presalePlanId` no sucesso do salvamento
- Helpers E2E adicionaram `extractPlanIdFromSaveResponse` para garantir o fluxo de dados

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/109.md
- Arquivos: presale/permit/components/detail.vue, presale/permit/permitConstants.js, presale/permit/plan/detail.vue, presale/permit/components/PermitPlanPanel.vue, e2e/fixtures/presale-permit-helpers.js, e2e/presale/presale-permit-real-api-flow.spec.js, presale/cashsale/plan/detail.vue, package.json
- Projeto: 苏州市房地产监测V3; sessão: 77643a80-744f-419d-abfc-21a4685e8d9f; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_id",
  "source_extraction_id": "ffbc88f6ff83419787a66226a5f2572d",
  "version": 1,
  "memory_type": "entities"
}
-->