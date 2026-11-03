# Regulatory Agreement Print Pattern
Padrão de que impressão de acordo regulatório depende de backend, frontend só ajusta página.

## Description
- Repositório não inclui `zhi2-benefit-server` (Java) de acordo regulatório; impressão vinculada deve ser feita em backend benefit e config de impressão.
- `zhi2-web-admin` detail.vue ajusta ordem de campos por protótipo: "备注" de acordo de receita pública movido para módulo "其他"; modo de disputa ganha fallback de dicionário.

## Verification and Attribution
- Evidência: src=苏住房G/038.md
- Arquivos: benefit/pubRegulatoryAgreement/detail.vue, OperationBtnGroup/index.vue, property/propertyAgreement/detail.vue, ZsPrint/index.vue, detailMixins.js
- Projeto: 苏住房G; Sessão: fcec66f6-3880-4027-9916-7ed4c8786fe9; Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "regulatory_agreement_print",
  "source_extraction_id": "c6f4b8de214b47529df7b54c7e26ac75",
  "version": 1,
  "memory_type": "entities"
}
-->