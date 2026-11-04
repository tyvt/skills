# Presale Flow Btn
Ajuste do botão de visualização de fluxo e unificação de exibição de registro de aprovação em páginas de detalhe de pré-venda no projeto 苏州市房地产监测V3.

## Pontos de Implementação
- Em `zhi2-web-admin/src/components/OperationBtnGroup/index.vue`, mover "流程查看" após "返回" e adicionar `data-testid="flow-view-btn"`.
- Cinco páginas de detalhe (`presale/permit/components/detail.vue`, `presale/cashsale/components/CashsaleDetail.vue`, `permitExtend/detail.vue`, `permitCancel/detail.vue`, `surveyChange/detail.vue`) removam bloco inferior "审批记录" e usem `:show-audit="showFlowViewButton"` (estado de visualização + salvo + `bizState!=='0'`).
- Aplicação de permissão de pré-venda remove adicionalmente conforme indicado.

## Arquivos Envolvidos
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/OperationContainer/index.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/stock/contract/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/OperationBtnGroup/attachmentDraw.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/cashsale/components/CashsaleDetail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitExtend/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitCancel/detail.vue

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/025.md
- Sessão: 3042833a-7ef3-4a0c-a806-d3d5885f5ff1
- 所属项目: 苏州市房地产监测V3; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_flow_btn",
  "source_extraction_id": "2541e120aaed44a78ac4d8041d820fd0",
  "version": 1,
  "memory_type": "entities"
}
-->