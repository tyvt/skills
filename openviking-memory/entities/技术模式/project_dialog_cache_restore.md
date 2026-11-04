# Restauração de cache de diálogo de seleção de projeto global
Na camada de layout/home, o diálogo de seleção de projeto imobiliário usa localStorage + validação de permissão para restauração estável sem reabrir após refresh.

## Fenômeno
- Implementação original abria diálogo de seleção de projeto (comunidade) a cada refresh, má experiência
- Visibilidade não ligada a cache local, perdia estado «já selecionado» após refresh

## 解决方案
- bProjectDialog.vue novo tryRestoreFromCache(): lê currentProjectId do localStorage, se na lista de áreas operáveis (permissão) restaura seleção, sincroniza Vuex, fecha diálogo
- Usar cacheRestored para evitar que restauração automática seja vista como troca manual e feche errado
- layout/index.vue não abre por padrão; syncProjectDialogVisibility: cache válido não abre, inválido limpa e abre

## Restrições
- Cache deve validar com lista de permissão; inválido limpar e reabrir, não só checar existência de key

## Relacionados
- 涉及文件: zhi2-web-admin/src/views/home/bProjectDialog.vue, index-wrapper.vue, layout/index.vue; 所属项目: 园区物管2.0; sessão: d3445a30-e077-4745-9bfa-b18a1203606d; baseline: 036.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_dialog_cache_restore",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 2,
  "memory_type": "entities"
}
-->