# Recarregamento de iframe por destruição de InnerLink ao trocar aba
Solução de pool de visualização de iframe persistente para evitar recarregamento ao trocar páginas com abas.

## Causa raiz
- `AppMain.vue` usa `<router-view :key="$route.fullPath">` e o projeto não tem keep-alive.
- Trocar aba destrói componente `InnerLink`, removendo iframe do DOM e causando recarregamento.

## Solução
- Criar `src/utils/innerLink.js` e `src/layout/components/iframeToggle/index.vue` para renderização persistente do pool de iframes das abas abertas.

## Verificação e arquivos
- Verificação: src=无锡市区G/001.md
- Arquivos: AppMain.vue, InnerLink/index.vue, utils/innerLink.js, store/tagsView.js, store/permission.js, TagsView/index.vue
- Sessão: 2a5bfa8e-2977-4228-8985-a83a230944d2; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "tab_switch_iframe",
  "source_extraction_id": "dddbe66f1d9f49389bae575d92bc71c9",
  "version": 1,
  "memory_type": "entities"
}
-->