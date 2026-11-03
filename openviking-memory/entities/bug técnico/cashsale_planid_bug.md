# Erro de parse de cashsalePlanId
A API de salvamento retorna cashsalePlanId, mas a página de plano usava resolveResponseId(res,'planId'), deixando planId vazio e desabilitando o botão de visualização.
## Causa
- Backend retorna campo cashsalePlanId, frontend parseava como planId.
- sessionStorage com planId nulo desabilita botão de ver.
## Correção
- Adicionar buildPlanPageResult em cashsaleConstants.js para ler com extractPlanId.
- plan/detail.vue usa essa função para construir sessionStorage de retorno.
## Verificação
- Fonte: 苏州市房地产监测V3-leftover/005.md; sessão 5c4d5204-0c97-4a4d-bcb7-2b81ff546339.
- Arquivos: CashsaleDetail.vue, PermitPlanPanel.vue, plan/detail.vue, cashsaleConstants.js, ruoyi.js, permitConstants.js.

<!-- MEMORY_FIELDS
{
  "category": "Bug técnico",
  "name": "cashsale_planid_bug",
  "source_extraction_id": "96963c4591f34599a58a91018404b608",
  "version": 1,
  "memory_type": "entities"
}
-->