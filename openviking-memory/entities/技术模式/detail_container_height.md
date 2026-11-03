# Ajuste de altura do detail-container
O zhi2-web-admin do projeto 苏州市房地产监测V3 tinha .detail-container com height: calc(100vh - 120px) causando excesso de espaço inferior e truncamento de título.

## Problema
- `.detail-container` em src/styles/index.scss fixava height: calc(100vh - 120px)
- Valor real do cabeçalho era 104px, então deduzia 16px a mais
- Causava 40px de espaço em branco inferior e truncamento do título

## Correção
- Restringir escopo via `#app-main.app-main:has(> .detail-container)`
- Isolar 468 referências dentro de el-dialog

## Verificação
- Evidência: src=苏州市房地产监测V3/141.md
- Projeto: 苏州市房地产监测V3; sessão: 21609fbb-aecf-47c4-8d70-955eeb1e9b2b; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_container_height",
  "source_extraction_id": "2f6669c1d0ad4e90a1d5ad451cb4d376",
  "version": 1,
  "memory_type": "entities"
}
-->