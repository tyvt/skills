# Título da Navbar lido do store com fallback de env
No zhi2-web-admin (produto 2.0) Navbar.vue tinha o título fixo em variável de ambiente, não lendo o nome da plataforma do store.
## Causa raiz
- Navbar.vue definia title em data como import.meta.env.VITE_APP_PROJECT_NAME fixo.
## Solução
- Adicionar computed title() retornando this.platformConfig.platformName || import.meta.env.VITE_APP_PROJECT_NAME.
- Remover definição de title em data.
## Verificação e origem
- Evidência: cursor session=6a14ed22-6423-4953-948b-32e9d3050f1b
- Arquivos: src/layout/components/Navbar.vue, src/store/modules/app.js
- Projeto: 2-0; código base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "navbar_title_store",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->