# Título da Navbar lido do store com fallback de env
No zhi2-web-admin (produto 2.0) Navbar.vue tinha o título fixo em variável de ambiente, não lendo o nome da plataforma do store.
## 问题根因
- Navbar.vue definia title em data como import.meta.env.VITE_APP_PROJECT_NAME fixo.
## 解决方案
- Adicionar computed title() retornando this.platformConfig.platformName || import.meta.env.VITE_APP_PROJECT_NAME.
- Remover definição de title em data.
## 验证与归属
- 验证证据: cursor session=6a14ed22-6423-4953-948b-32e9d3050f1b
- 涉及文件: src/layout/components/Navbar.vue, src/store/modules/app.js
- 所属项目: 2-0; código base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_title_store",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->