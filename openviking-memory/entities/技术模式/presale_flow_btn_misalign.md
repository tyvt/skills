# Botão de visualização de fluxo da pré-venda desalinhado e auditoria redundante
Na pré-venda do sistema de monitoramento imobiliário de Suzhou V3, o botão «visualizar fluxo» estava desalinhado e o bloco de registro de aprovação redundante.

## Problema
- O botão «流程查看» (visualizar fluxo) em `OperationBtnGroup/index.vue` estava posicionado incorretamente
- O bloco de registro de aprovação na parte inferior era redundante nas páginas de detalhe

## 解决方案
- Moveu-se o botão para após «返回» (voltar) e adicionou-se `data-testid="flow-view-btn"`
- Cinco páginas de detalhe usaram `:show-audit="showFlowViewButton"` para renderização condicional substituindo o bloco fixo

## Arquivos e Verificação
- 涉及文件: `OperationBtnGroup/index.vue`, `OperationContainer/index.vue`, `stock/contract/detail.vue`, `OperationBtnGroup/attachmentDraw.vue`, `presale/cashsale/components/CashsaleDetail.vue`, `presale/permitExtend/detail.vue`, `presale/permitCancel/detail.vue`, `presale/permit/components/detail.vue`
- 验证证据: src=苏州市房地产监测V3/081.md
- Sessão: 3042833a-7ef3-4a0c-a806-d3d5885f5ff1; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_flow_btn_misalign",
  "source_extraction_id": "76e4ca67ffce43169e9634f0f346d6db",
  "version": 1,
  "memory_type": "entities"
}
-->