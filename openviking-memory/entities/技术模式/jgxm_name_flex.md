# Layout flex para nome de projeto de supervisão com sufixo à direita
No projeto 苏州市房地产监测V3, o campo "监管项目名称" em `supervision/agreement/jgxm/detail.vue` usa flex para alinhar o segmento de número de prédio à direita.

## 描述
- No modo edição, `regulator-project-name-fields` flex com nome principal `flex:1` e sufixo `regulator-project-name-suffix` com `margin-left:auto`
- Parênteses全角 `（` `）`; modo visual concatena `${name}（${short}）`

## Detalhes de Implementação
- Largura de entrada de prédio ~140px, `:deep(.el-input){width:100%}` no flex
- Envolvido em `ProjectNameDialog.vue` e `detailLayout.js`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/233.md
- 涉及文件: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/jgxm/detail.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/unblock/InformationPush/detail.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/detailLayout.js; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/jgxm/components/ProjectNameDialog.vue
- Sessão de origem: 8ed69fd8-6062-4732-bc26-b18e22054b54; linha de base: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "jgxm_name_flex",
  "source_extraction_id": "ed4340c4032043b1baf185a8b9851f9f",
  "version": 1,
  "memory_type": "entities"
}
-->