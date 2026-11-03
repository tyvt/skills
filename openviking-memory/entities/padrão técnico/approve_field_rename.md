# Renomeação do campo de aprovação comment para approveMessage
No projeto 苏州市房地产监测V3, o campo de "意见说明" da interface de aprovação foi unificado de `comment` para `approveMessage` para alinhar com o fluxo principal de pré-venda.

## Descrição
- Ajuste de nomenclatura de campo em diálogos de aprovação e helpers e2e
- Projeto: 苏州市房地产监测V3

## Causa Raiz
- O campo `comment` não estava alinhado com o fluxo principal de pré-venda (`approveMessage`)

## Solução
- Modificados `src/views/presale/permitCancel/components/ApprovalDialog.vue`, `src/views/presale/permitExtend/components/ApprovalDialog.vue`, `src/views/presale/permit/components/PermitApprovalDialog.vue`
- Atualizadas asserções em `e2e/fixtures/presale-cancel-helpers.js` e `e2e/fixtures/presale-extend-helpers.js`

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3-leftover/032.md
- Arquivos: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitCancel/components/ApprovalDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitExtend/components/ApprovalDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/PermitApprovalDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/presale-cancel-helpers.js; d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/presale-extend-helpers.js
- Sessão de origem: cf534ef4-25d6-4a32-b82b-358de4a68ed6; linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "approve_field_rename",
  "source_extraction_id": "9e8fdb1f8e9d4c00b0343d17cab91324",
  "version": 1,
  "memory_type": "entities"
}
-->