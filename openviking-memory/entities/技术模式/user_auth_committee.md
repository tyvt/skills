# Campo de nome de organização integrado à consulta de lista de autorização de usuário
Causa raiz: o campo de nome de organização `committeeName` do backend não estava conectado ao frontend. Correção chave: `autonomy/userAuth/index.vue` teve `queryParams` e `formItems` com suporte a `committeeName` para busca fuzzy, e `columns` ganhou coluna «Nome da organização» mapeando esse campo.

## Evidência de verificação
- Fonte extraída de sessão cursor a64c833f-c485-4bfe-899a-5d177a83f9f3

## Arquivos envolvidos
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/autonomy/userAuth/index.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/autonomy/userAuth/detail.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/autonomy/change/industry/index.vue
- autonomy/userAuth/index.vue

## Afiliação
- 所属项目: 园区物管2.0
- Sessão de origem: a64c833f-c485-4bfe-899a-5d177a83f9f3
- Baseline de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_auth_committee",
  "source_extraction_id": "7450b259a3f74eb1a01721b1303c3886",
  "version": 3,
  "memory_type": "entities"
}
-->