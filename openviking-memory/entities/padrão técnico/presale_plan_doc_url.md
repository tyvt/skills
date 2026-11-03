# Resolução de URL de PDF do Plano de Pré-venda
No Suzhou Real Estate Monitoring V3, o PDF do plano de pré-venda deve ler `planDocSite` para evitar navegação de fallback para a página do plano.

## Causa Raiz
- O caminho do PDF da interface está em `data.plan.planDocSite`; o código antigo lia `planUrl` inexistente, causando fallback para a página do plano.

## Solução
- Adicionado `resolvePlanDocUrl()` em `permitConstants.js` para ler `planDocSite`/`planUrl` sequencialmente.
- Chamado por `handleQueryPlan()` e `canQueryPlan`.
- `vite.config.js` precisa proxy `/zhi2-dev` para recursos estáticos.

## Verificação
- Evidência: src=苏州市房地产监测V3/092.md
- Arquivos: presale/permit/components/detail.vue, PermitPlanPanel.vue, resolveServerAssetUrl.js, companyApplyAudit/detail.vue, detailMixins.js, form.js, .workbuddy/memory/MEMORY.md, .workbuddy/memory/2026-09-11.md
- Sessão de origem: 6976122d-456e-461d-a9a7-8ac465dc9b76; baseline de código: none


<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "presale_plan_doc_url",
  "source_extraction_id": "001ba47e03e9421b8f9ada51bc0b7ab9",
  "version": 2,
  "memory_type": "entities"
}
-->