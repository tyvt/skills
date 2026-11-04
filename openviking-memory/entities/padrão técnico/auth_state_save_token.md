# Script de estado de login aguardava rota e não gerava zsbase
No zhi2-web-admin (produto 2.0) o antigo save-auth-state.mjs usava meta.filePath de rota dinâmica como fim de login, falhando em produção e não gerando zsbase.json.
## Causa raiz
- save-auth-state.mjs dependia de meta.filePath de rota dinâmica como sinal de login concluído.
- Em produção a condição raramente era satisfeita, causando timeout e storageState() não executava.
## Solução
- Detectar Admin-Token ou saída de /login para salvar automaticamente.
- Permitir salvamento manual via Enter no terminal.
## Verificação e origem
- Evidência: cursor session=441e5287-5448-4821-9c2e-13e82e944aa5
- Arquivos: price-filing-routes.spec.js, price-filing-view-refresh.spec.js, price-filing-console-audit.spec.js, price-filing-admin-probe.spec.js, auth-helpers.js, crud-helpers.js, package.json, playwright.config.js
- Projeto: 2-0; código base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "auth_state_save_token",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->