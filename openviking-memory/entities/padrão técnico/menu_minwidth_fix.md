# Correção de min-width de menu fixo que ocupava a tela
No menu de usuário com `position: fixed`, `min-width: max(100%, 132px)` calculava `100%` pela largura da viewport, esticando o dropdown e cobrindo a barra lateral.

## Problema
- Menu de usuário usa `position: fixed`
- `min-width: max(100%, 132px)` faz `100%` igual à largura da viewport
- Dropdown estica e cobre a barra lateral

## Solução
- Remove `max(100%, …)` do `min-width`
- Em `updateDesktopDropdownPosition`, calcula `minWidth` pela largura real da área do avatar (mínimo 132px)

## Arquivos e origem
- Arquivos: Navbar.vue, variables.css, index.vue, AppMain.vue, TagsView/index.vue, index.scss, ruoyi.scss, facility/index.vue
- Sessão: eaeb4d6a-1209-47e7-a761-4c6b265f74bc

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "menu_minwidth_fix",
  "source_extraction_id": "76f2d71ba1c4492cb8ab951b1612621d",
  "version": 1,
  "memory_type": "entities"
}
-->