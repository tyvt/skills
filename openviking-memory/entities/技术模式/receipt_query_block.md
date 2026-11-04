# Validação do modo de recibo bancário bloqueia consulta conciliada
No projeto Park Public Benefit (zhi2-web-admin), as funções validateBankReceiptQueryParams e shouldUseBankReceiptMode em pubBankDetailDay/index.vue restringiam incorretamente o status de conciliação a "não conciliado", impedindo a consulta de recibos já conciliados.

## 问题根因
- validateBankReceiptQueryParams e shouldUseBankReceiptMode forçavam o status como não conciliado
- Dados conciliados eram bloqueados por não atenderem à condição, impossibilitando a consulta

## 解决方案
- Removida a validação de não conciliado, mantida apenas a condição de baixa manual
- Suporte para exibir recibos bancários conciliados e não conciliados

## Arquivos envolvidos
- src/views/benefit/pubBankDetailDay/index.vue
- src/views/benefit/components/BankReconciliation.vue

## Verificação e atribuição
- 所属项目: Park Public Benefit; sessão: 859f5de6-bf9f-4503-94b7-53f26a6002a5; base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "receipt_query_block",
  "source_extraction_id": "3c18306e48da4914b8243df1c7df3e52",
  "version": 1,
  "memory_type": "entities"
}
-->