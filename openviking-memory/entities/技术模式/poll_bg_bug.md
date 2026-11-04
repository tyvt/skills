# Falha de imagem de fundo em pages_poll por uso de ../../
Os arquivos `src/pages_poll/result.vue` e `form.vue` usaram incorretamente `../../static/images/bg_szf.png`, resolvendo para um diretório static inexistente; corrigido com caminho de alias.

## 问题根因
- `src/pages_poll/result.vue` e `form.vue` usaram caminho relativo `../../static/images/bg_szf.png`
- O caminho resolveu para o diretório raiz static inexistente, causando falha de carregamento

## 解决方案
- Substituído por caminho de alias `url("@/static/images/bg_szf.png")` para corrigir a referência

## 验证与归属
- 验证证据: extracted source=cursor session=1b86fe06-0678-4ce4-b9df-fbd51273d5c6
- 涉及文件: src/pages_poll/result.vue, src/pages_poll/form.vue
- 所属项目: Huishan Fase 2 H5; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "poll_bg_bug",
  "source_extraction_id": "17091e7715aa4ddb9e280040c40385ed",
  "version": 1,
  "memory_type": "entities"
}
-->