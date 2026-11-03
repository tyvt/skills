# Menu de link externo sem normalize InnerLink causa 404
Rotas de menu externo não seguem padrão InnerLink, gerando interceptação de guarda e 404.

## Causa raiz
- Menu com `path` `https://` não casa com Vue Router interno.
- `sso/bTerminalRedirect/index` não passa por normalização de rota `InnerLink` em `permission.js`, guarda intercepta `/404` como não autorizado.

## Solução
- Em `permission.js`, incluir `bTerminalRedirect` na normalização de rota iframe.
- Ajustar `RecursiveMenu` para usar `router-link` nesse componente, evitando nova janela.

## Verificação e arquivos
- Verificação: src=无锡市区G/002.md
- Arquivos: api/security/oauth2.js, sso/bTerminalRedirect/index.vue, property/culturalTourism/index.vue, store/permission.js, api/index.js, api/property/cultourPlatform.js, components/iFrame/index.vue, InnerLink/index.vue
- Sessão: 2c02c8f7-aee0-47dd-b23d-d8d8f94a007a; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "external_menu_404",
  "source_extraction_id": "dddbe66f1d9f49389bae575d92bc71c9",
  "version": 1,
  "memory_type": "entities"
}
-->