
# Retorno de pendências com backUrl alimentado à Vue Router 3
No projeto zhi2-web-admin (Huishan Fase 2G), no cenário "pendência flowable → detalhe de negócio → retorno", definição de como a string backUrl é passada de forma válida e segura à Vue Router 3.

## Contexto
- `utils/ruoyi.js` `navigateToTodoTask` grava `query.backUrl`; `goBack` em `main.js`/`OperationBtnGroup` usa `resolveBackNavigationPath` + `router.push({ path, query: { type: 'back' } })`.
- `resolveBackNavigationTarget` em `utils/ruoyi.js` foi corrigido para retornar corretamente à lista, complementar `backUrl`, reconhecer rota `directDetail` e unificar o caminho de detalhe.

## Problemas e correções
- Problema 1 (parse Vue Router 3): endereço com `?pageNum=2` inserido cru em `path` falha ou 404; dividir por `?`/`#` ou usar `new URL(backUrl, origin)` antes de push, ou proibir query em backUrl e validar na entrada.
- Problema 2 (segurança): `query.backUrl`/`options.backUrl` sem validação permite redirecionamento malicioso (`//evil.com`, scheme); aceitar apenas path interno começando por único `/` (rejeitar `//`, `:`, `http`), senão ignorar e voltar por caminho.
- Problema 3 (perda de estado MEDIUM): `navigateToTodoTask` registra apenas `current.path` sem query, retorno de lista com filtro/paginação perde estado; usar `fullPath` ou query serializada para restauração completa.
- Bug específico (session 1f86f5fa): pendência na home entrando em detalhe via `navigateToTodoTask` sem `backUrl`; antigo `lastIndexOf('/')` cortava `detail/{id}` caindo em página casca sem ID causando erro de parâmetro; rota `directDetail` não reconhecida. Corrigido em `utils/ruoyi.js` `resolveBackNavigationTarget` para retornar lista, adicionar `backUrl`, reconhecer `directDetail` e uniformizar caminho de detalhe.

## Arquivos envolvidos
- utils/ruoyi.js, main.js, components/OperationBtnGroup/index.vue
- views/autonomy/record/components/detail.vue, components/detail-template/detail-template.vue, views/autonomy/record/components/directDetail.vue, mixins/detailMixins.js, mixins/form.js

## 验证与归属
- Sessões: 26959102 (HIGH incompatibilidade router.push com query; HIGH backUrl sem validação; MEDIUM perda de query), 1f86f5fa-6621-449b-b902-a3be952fcbd5 (bug backUrl pendências)
- 所属项目: Huishan Fase 2G; base de código: adccd7e (e none para o novo)


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_backurl_router",
  "source_extraction_id": "bd420326a12843babc324cc305cc151c",
  "version": 2,
  "memory_type": "entities"
}
-->