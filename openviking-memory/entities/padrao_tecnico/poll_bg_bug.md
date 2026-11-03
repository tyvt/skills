# Falha de imagem de fundo em pages_poll por uso de ../../
Os arquivos `src/pages_poll/result.vue` e `form.vue` usaram incorretamente `../../static/images/bg_szf.png`, resolvendo para um diretório static inexistente; corrigido com caminho de alias.

## Causa raiz
- `src/pages_poll/result.vue` e `form.vue` usaram caminho relativo `../../static/images/bg_szf.png`
- O caminho resolveu para o diretório raiz static inexistente, causando falha de carregamento

## Solução
- Substituído por caminho de alias `url("@/static/images/bg_szf.png")` para corrigir a referência

## Verificação e origem
- Evidência: extracted source=cursor session=1b86fe06-0678-4ce4-b9df-fbd51273d5c6
- Arquivos: src/pages_poll/result.vue, src/pages_poll/form.vue
- Projeto: Huishan Fase 2 H5; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "poll_bg_bug",
  "source_extraction_id": "17091e7715aa4ddb9e280040c40385ed",
  "version": 1,
  "memory_type": "entities"
}
-->