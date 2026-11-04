# Retorno em branco por goBack sobrescrever query
A tela de detalhe de registro (备案) do projeto 淮安物管 abria em branco porque o retorno perdia os parâmetros de query.

## 问题根因
- `committeeTable.vue` passava `backUrl` apenas com o path, sem `formMode=view`.
- `main.js` tinha `goBack()` que sobrescrevia o `query`, impedindo o `init()` da tela de detalhe.

## Correção
- `goBack()` passou a chamar direto `router.push(backUrl)` preservando o query completo.
- `backUrl` passou a carregar os parâmetros necessários (como `formMode=view`).

## Arquivos envolvidos
- `publicQuery/complex/detail.vue`
- `publicQuery/complex/components/committeeTable.vue`
- `main.js`, `mixins/detailMixins.js`, `mixins/form.js`
- `store/modules/tagsView.js`, `layout/components/AppMain.vue`
- `publicQuery/complex/components/managementOrgPanel.vue`

## Verificação
- Sessão cursor: e6ed7dbc-1d6e-459f-aec6-1548de9852da
- 所属项目: 淮安物管 zhi2-web-admin; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "goback_query_blank",
  "source_extraction_id": "f67373fbed294ece99126a068db590fe",
  "version": 1,
  "memory_type": "entities"
}
-->