# Topo sem menu superior preserva operação à direita
Correção: ocultar o menu superior horizontal causava deslocamento da área de operações para a esquerda no portal.

## Problema
- Ao ocultar top-nav-container (flex:1), restava apenas a área de operações à direita sob space-between, colando à esquerda
- Nome de usuário e ícone de mensagem ficavam deslocados

## Solução
- Adicionar classe navbar--no-top-nav quando não há menu superior
- Aplicar justify-content: flex-end para a área de operações à direita
- Logo/título à esquerda mantêm posicionamento absoluto

## Arquivos
- src/views/home/config/homeLayout.js e src/layout/index.vue (lógica de layout)
- src/views/home/index-new.vue, HomeLayoutSidebar.vue, UnifiedLogin.vue (páginas)
- src/layout/components/Navbar.vue, homeDataMixin.js, src/settings.js (apoio)

## Verificação
- Evidência: src=门户/021.md; sessão: f0d5550d-7371-4ca0-ba93-0e9506808d82

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "top_nav_hidden_flex",
  "source_extraction_id": "eedff5713f73492399aa37cd69b61f82",
  "version": 1,
  "memory_type": "entities"
}
-->