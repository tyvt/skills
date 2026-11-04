# Coluna custom de largura fixa não participa de divisão em zs-table
Sistema Suzhou Real Estate Monitoring V3: zs-table tratava coluna fixa como esticável, causando espaço em branco; corrigido para usar slot-width.

## 问题根因
- `zs-table` via `type="custom"` e `slot-width` tratava coluna fixa como esticável em divisão de largura restante, gerando espaço à direita

## Correção
- `zs-table-column.vue` não inclui mais coluna fixa custom na divisão
- `getBaseWidth` usa diretamente `slot-width` alinhando largura real

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/039.md
- 涉及文件: zs-table-column.vue, zs-table.vue, FranchiseTable.vue, detail-template.vue, houseTable.vue, appendix.js, README.md, companyApplyAudit/detail.vue
- 所属项目: Suzhou Real Estate Monitoring V3; Sessão: 00b4659f-08fb-4133-a80c-e461befbd2cf; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_fixed_col",
  "source_extraction_id": "a7d4b155515447d4b59be6579654e5d2",
  "version": 1,
  "memory_type": "entities"
}
-->