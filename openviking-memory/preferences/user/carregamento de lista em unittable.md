- Remover `immediate:true` do `watch` de `buildingId` em `unitTable`; o primeiro carregamento deve usar apenas `init()` de `subTableMixins`.
- Evitar chamadas duplicadas de `getList()` causadas por `init()` e `watch(immediate:true)` ambos invocando a função.
- Mudanças de `buildingId` continuam a disparar atualização via `watch` após o carregamento inicial.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Carregamento de lista em unitTable",
  "source_extraction_id": "3227bb6e122946bcad3020c0c46e6188",
  "version": 1,
  "memory_type": "preferences"
}
-->