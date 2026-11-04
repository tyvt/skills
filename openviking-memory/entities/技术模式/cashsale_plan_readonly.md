# Componente separado para manutenção de plano de venda à vista distingue edição e leitura
No projeto Suzhou Real Estate Monitoring V3, `CashsaleDetail.vue` usa `openPlanPage(false)` para edição e `openPlanPage(true)` para somente leitura, com componente dedicado `CashsalePlanFillForm.vue`.

## Distinção de modos
- Manutenção chama `openPlanPage(false)` habilitando edição
- Visualização chama `openPlanPage(true)` em modo somente leitura
- `CashsalePlanFillForm.vue` é componente dedicado à venda à vista

## Diferenças de componente
- Contém 5 abas
- Remove abas específicas de pré-venda (ex.: monitoramento de fundos)
- Separado de `PresalePlanFillForm.vue`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/070.md
- 涉及文件: cashsale-apply-menu-config.js, presale/cashsale/plan/detail.vue, presale/permit/plan/detail.vue, CashsaleDetail.vue, PresalePlanFillForm.vue, Headline/index.vue, AnnexUpload/index.vue, cashsale-apply-helpers.js
- Sessão: c9033c2c-3a69-4b73-b22e-394f818a3b2b; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_plan_readonly",
  "source_extraction_id": "3b0e49c9a828485693063aa7ee803883",
  "version": 1,
  "memory_type": "entities"
}
-->