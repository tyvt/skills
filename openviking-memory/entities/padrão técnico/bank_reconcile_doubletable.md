# Estilo de formulário e tabela dupla em conciliação bancária
Padrão técnico para erros de ordem de campo e estilo de caixa de diálogo em reconciliação de negócios.
## Causa raiz
- Ordem de campos do formulário de busca não conforme design.
- Banco responsável não somente leitura, texto de botão incorreto.
- Estilo de caixa de prompt não unificado, tabelas duplas não lado a lado.
## Solução
- Ajustar ordem de campos, adicionar placeholder, banco responsável readonly.
- Texto de botão alinhado à direita, caixa de prompt com borda laranja 8px vertical e esquerda, tabelas duplas lado a lado com estilo unificado.
## Arquivos e verificação
- Arquivos: BankReconciliation.vue, pubBankDetailDay/index.vue, bankDetailDay/index.vue, ListOperationButtonContainer/index.vue, SearchFormItem.vue, pubBankReceiptApply/detail.vue.
- Sessão de origem: a42d5cdd-87c9-4207-ab15-4eaa0e897ab6; linha de base: none.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "bank_reconcile_doubletable",
  "source_extraction_id": "fbb3c51bf7d04a09abe11b116bf5d283",
  "version": 1,
  "memory_type": "entities"
}
-->