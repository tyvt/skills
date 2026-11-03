# Linha de recibo conciliado exibia botão de baixa incorretamente
No projeto Park Public Benefit (zhi2-web-admin), a função bankReceiptOperateButtons em pubBankDetailDay/index.vue não verificava o status de conciliação e sempre exibia o botão de baixa.

## Causa raiz
- bankReceiptOperateButtons não distinguia por status de conciliação, exibindo baixa também em linhas conciliadas
- Faltava proteção para o status conciliado

## Solução
- Nova função isBankReceiptReconciled(row) exibe botões de visualizar/baixa/nenhum conforme condição
- handleReceiptWriteOff recebeu proteção para status conciliado

## Arquivos envolvidos
- src/views/benefit/pubBankDetailDay/index.vue
- src/views/benefit/components/BankReconciliation.vue
- src/views/maintenance/maintenanceRec/index.vue
- src/components/zs-operate-column/zs-operate-column.vue
- src/api/benefit/pubBankReceiptDetail.js
- src/views/benefit/bankDetailDay/index.vue
- src/views/benefit/components/BankReceiptForm.vue
- src/views/benefit/pubCheckoutManage/index.vue

## Verificação e atribuição
- Projeto: Park Public Benefit; sessão: 6a315793-11fc-4e4d-9c27-2ea581a2e486; base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "receipt_writeoff_btn",
  "source_extraction_id": "3c18306e48da4914b8243df1c7df3e52",
  "version": 1,
  "memory_type": "entities"
}
-->