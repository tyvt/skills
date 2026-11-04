
# Cursor consome muita memória por índice amplo e serviço TS
O projeto 苏州市房地产监测V3 teve alto consumo de memória no editor Cursor por configuração inadequada de serviço de linguagem e índice.

## Causa e ajuste
- Consumo excessivo veio de limite alto do TS server, índice amplo e MCP redundante
- settings.json: maxTsServerMemory/maxOldSpaceSize reduzidos de 8192 para 2048
- mcp.json: removido processo chrome-devtools MCP
- jsconfig.json: include restrito a src/**/* e criado .cursorignore excluindo node_modules/, dist/ etc.

## Arquivos envolvidos
- vite.config.js, mcp-servers.json, extensions.json, package.json (raiz e zhi2-web-admin), jsconfig.json, settings.json, mcp.json

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/177.md e src=苏州市房地产监测V3-rest/144.md
- Sessão de origem: 5d1c2a9f-7bac-4b86-936c-8870cfdb6c90
- 所属项目: 苏州市房地产监测V3; baseline de código: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_memory_tune",
  "source_extraction_id": "637076c2ee6643d5b35f55f28e70f356",
  "version": 2,
  "memory_type": "entities"
}
-->