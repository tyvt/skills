# tab_key_fix
Colisão de chave de aba causa falha de exclusão mútua e dados vazios de sub-tabela no projeto 苏州市房地产监测V3.
## Causa raiz
- Abrigo/decoração refinada compartilham `versionId` e `deliverType`, chave `versionId_deliverType` colide ativando ambos
- Sub-tabela solicita dados antes de `currentTab` estar pronta, retornando vazio
## Solução
- Nome de aba alterado para índice de linha `0,1,2...` garantindo exclusão mútua
- `cardValue` padrão `0` com validação; sub-tabela usa `watch currentTab` (`immediate`) e após pronta chama `getColumn`/`getList` com parâmetros de paginação
## Arquivos
- unblock/usemoney/detail.vue, plan/detail.vue, AppropriateTable.vue, PlanDetailsTable.vue, planChange/detail.vue, BuildingTable.vue, RelatedBuildingsTable.vue
## Verificação
- Fonte: 苏州市房地产监测V3/053.md; Sessão: 66577926-e9f6-4492-b968-4c342f004cbe

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "tab_key_fix",
  "source_extraction_id": "ecf2b490657f45b9bed88b23d9e2450a",
  "version": 1,
  "memory_type": "entities"
}
-->