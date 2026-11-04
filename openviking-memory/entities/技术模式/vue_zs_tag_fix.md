# Correção de tags de fechamento Vue com prefixo zs
No projeto 苏州市房地产监测V3, tags de fechamento `</el-input>` e `</el-button-group>` foram erroneamente escritas como `</zs-input>` e `</zs-button-group>` causando erro de compilação Vite.

## 描述
- Erro de correspondência de tags em templates Vue de diretórios commercialHousingSales e contract
- 所属项目: 苏州市房地产监测V3

## 问题根因
- Em `contractRevoke/detail.vue` linha 207 e `saleAgencyDialog.vue` linha 38, tags de fechamento usaram prefixo `zs-` em vez de `el-`

## 解决方案
- Corrigidas para tags corretas com prefixo `el-`
- Após correção, varredura de templates dos diretórios `commercialHousingSales` e `contract` passou

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/032.md
- 涉及文件: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/commercialHousingSales/presale/contractRevoke/detail.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/tables/MortgageEntitiesTable.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/tables/CommercialHousingTable.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/chapters/cash/chapter1.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/tables/PricingModeTable.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/dialogs/saleAgencyDialog.vue
- Sessão de origem: c7884ca9-0f78-4e4e-9359-8fa478960362; linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_zs_tag_fix",
  "source_extraction_id": "9e8fdb1f8e9d4c00b0343d17cab91324",
  "version": 1,
  "memory_type": "entities"
}
-->