# Clique na tabela de edifícios sem resposta devido a projectId nulo
No módulo customerProject do zhi2-web-admin, `openBuildingTable()` retornava silenciosamente porque `form.projectId` era null.

## Problema
- `openBuildingTable()` em `customerProject/detail.vue` tinha retorno silencioso quando `form.projectId` era null causando clique sem resposta
- O valor `form.projectId` era null sem erro no console

## 解决方案
- Usou-se cadeia de fallback: `this.form.projectId || this.id || this.$route.params.tableId || this.$route.query.id` para obter projectId

## Arquivos e Verificação
- 涉及文件: `projectManagement/customerProject/detail.vue`, `utils/ruoyi.js`, `e2e/projectManagement/building-table-debug.spec.js`, `e2e/projectManagement/building-table-meixiang.spec.js`
- 验证证据: src=苏州市房地产监测V3/082.md
- Sessão: 01a16159-63a8-7295-ba46-c2ad374e49ae; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "customer_project_null_id",
  "source_extraction_id": "76e4ca67ffce43169e9634f0f346d6db",
  "version": 1,
  "memory_type": "entities"
}
-->