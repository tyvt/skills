# Exclusão de acionista exige confirmação
No Suzhou Real Estate Monitoring V3, exclusões de acionistas (linha única e em lote) passaram a exigir popup de confirmação para evitar exclusão acidental.

## Alterações no componente
- `Step4Shareholders.vue` adiciona `confirmDelete(message)` chamando `$confirm` do Element UI
- Exclusões única e em lote confirmam antes de executar

## Alterações no helper
- `register-helpers.js` adiciona `confirmDeleteDialog(page)`
- `deleteShareholderByName` e `batchDeleteShareholders` confirmam antes de executar

## Verificação e arquivos
- Evidência: src=苏州市房地产监测V3-rest/125.md e src=苏州市房地产监测V3/169.md
- Arquivos: Step4Shareholders.vue, register-helpers.js, detailMixins.js, shareholderTable.vue, permit/detail.vue, company-register-branch.spec.js, shareholder/index.vue, listMixins.js
- Sessão: be083398-3966-4e2a-b4e7-52daef8b2c73; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "shareholder_delete_confirm",
  "source_extraction_id": "77174234a0a04fd3bf6b0d9c3b1c7f88",
  "version": 2,
  "memory_type": "entities"
}
-->