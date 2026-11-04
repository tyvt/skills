# Portal Broker Branch
Coluna de arquivo de instituição ficava em branco em lista de filiais no BrokerPages.

## Descrição
- Slot da coluna de arquivo só renderizava quando `state==='list' && kind==='agencies'`; em `view=stores` a condição falhava.
- Após correção, mostra informações básicas também em lista de filiais e `isBrokerList`, chamando `openRecord`.

## Arquivos
- `BrokerPages.vue`, `RentalPages.vue`, `UnifiedLogin.vue`, `mock/brokers.js`, `tests/e2e/public-portal-interactions.spec.ts`

## Verificação
- Sessão de origem: `01c99a3c-2693-474a-bcc9-5c73f2538cbe`

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "portal_broker_branch",
  "source_extraction_id": "89580cadf96140df80249b734eb2a264",
  "version": 1,
  "memory_type": "entities"
}
-->