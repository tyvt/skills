# Diálogo de ponto de arrecadação integra bankBranch e valida
No projeto 苏州市房地产监测V3, o PaymentOutletDialog.vue foi integrado à API bankBranch e ajustado para validar e preencher endereço de agência bancária.

## 解决方案
- PaymentOutletDialog.vue chama /prefund/bankBranch/page via buildQueryParams() passando só campos com valor (padrão isStart: '1') e mounted() carrega fallback
- notice/detail.vue showVisionOfBank() e other_record/detail.vue showBranchName() validam conta centralizada/bankId e preenchem bankBranchAddress com limpeza ao trocar

## Verificação e arquivos
- Verificação: src=苏州市房地产监测V3/180.md
- 涉及文件: PaymentOutletDialog.vue, notice/detail.vue, SelectDialog.vue, RegulatoryAccountDialog.vue, supervision-bank-helpers.js, WdmcDialog.vue, BranchOneDialog.vue, xy/detail.vue, table.js
- Sessão: c1d229b5-5e70-4279-8177-940f8e52a440

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "payment_outlet_dialog",
  "source_extraction_id": "658e5df35c0a45f2b7e6422f9dd57d90",
  "version": 1,
  "memory_type": "entities"
}
-->