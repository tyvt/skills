# Import do subVenueTable com caminho incorreto
O import de subVenueTable em leaseApply/detail.vue apontava para pubUseMoneyApply/components em vez do próprio pacote.

## Problema
- Caminho de import de subVenueTable em leaseApply/detail.vue apontava para pubUseMoneyApply/components.
- Erro de módulo não encontrado (module not found).

## Solução
- Corrigido para @/views/benefit/leaseApply/components/subVenueTable.vue.
- Erros de tipo TS preexistentes eram irrelevantes.

## Arquivos e origem
- Arquivos: benefit/leaseApply/detail.vue; benefit/leaseApply/components/subVenueTable.vue.
- Evidência: sessão cursor e9d0317f-8909-475d-8300-5760a17efba4.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "subvenue_import_path",
  "source_extraction_id": "9e5325997abb4bf8bfb4d64dabe6b2a1",
  "version": 1,
  "memory_type": "entities"
}
-->