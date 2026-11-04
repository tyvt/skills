# Normalização de currentRoute em minúsculas
No zhi2-web-admin (produto 2.0) o currentRoute não era convertido para minúsculas, causando falha na lógica de rota.
## Causa raiz
- currentRoute não era uniformizado em minúsculas, falhando a verificação de rota.
- Rotas duplicadas e pop-ups de exceção não fechavam automaticamente.
## Solução
- Normalizar currentRoute para minúsculas.
- Remover duplicação de rotas e fechar pop-ups de exceção automaticamente.
- 69 testes E2E de menu Playwright passaram.
## Verificação e origem
- Evidência: cursor session=758460b0-2a05-4d83-8594-0821de46c25c
- Arquivos: auth-helpers.js, company-personnel-flow.spec.js, playwright.config.js, 路由信息.json, package.json, recordPriceMngSuzhou/index.vue, src/main.js, src/store/modules/permission.js
- Projeto: 2-0; código base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "route_lowercase_fix",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->