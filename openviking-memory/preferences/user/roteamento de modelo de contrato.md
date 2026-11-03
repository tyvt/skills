- Em navegação de modelo de contrato, evita nome de rota hardcoded; usa `buildNavigationByFilePath` buscando por `contract/index` e `pathHint` para diferenciar pré-venda de venda direta, preenchendo `templateId`
- Quando rota não encontrada, avisa para contatar administrador e `router.push` usa `.catch` para evitar erro de navegação duplicada
- Evidência: src=苏州市房地产监测V3-rest/038.md; Sessão: abab47cb-8bf9-42ce-b594-9c7268af90e8

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Roteamento de modelo de contrato",
  "source_extraction_id": "a7d4b155515447d4b59be6579654e5d2",
  "version": 1,
  "memory_type": "preferences"
}
-->