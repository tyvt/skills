# Script de estado de login aguardava rota e não gerava zsbase
No zhi2-web-admin (produto 2.0) o antigo save-auth-state.mjs usava meta.filePath de rota dinâmica como fim de login, falhando em produção e não gerando zsbase.json.
## 问题根因
- save-auth-state.mjs dependia de meta.filePath de rota dinâmica como sinal de login concluído.
- Em produção a condição raramente era satisfeita, causando timeout e storageState() não executava.
## 解决方案
- Detectar Admin-Token ou saída de /login para salvar automaticamente.
- Permitir salvamento manual via Enter no terminal.
## 验证与归属
- 验证证据: cursor session=441e5287-5448-4821-9c2e-13e82e944aa5
- 涉及文件: price-filing-routes.spec.js, price-filing-view-refresh.spec.js, price-filing-console-audit.spec.js, price-filing-admin-probe.spec.js, auth-helpers.js, crud-helpers.js, package.json, playwright.config.js
- 所属项目: 2-0; código base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "auth_state_save_token",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->