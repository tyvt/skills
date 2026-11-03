# Correção de tags de fechamento Vue com prefixo zs
No projeto 苏州市房地产监测V3, tags de fechamento `</el-input>` e `</el-button-group>` foram erroneamente escritas como `</zs-input>` e `</zs-button-group>` causando erro de compilação Vite.

## Descrição
- Erro de correspondência de tags em templates Vue de diretórios commercialHousingSales e contract
- Projeto: 苏州市房地产监测V3

## Causa Raiz
- Em `contractRevoke/detail.vue` linha 207 e `saleAgencyDialog.vue` linha 38, tags de fechamento usaram prefixo `zs-` em vez de `el-`

## Solução
- Corrigidas para tags corretas com prefixo `el-`
- Após correção, varredura de templates dos diretórios `commercialHousingSales` e `contract` passou

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3-leftover/032.md
- Arquivos: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/commercialHousingSales/presale/contractRevoke/detail.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/tables/MortgageEntitiesTable.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/tables/CommercialHousingTable.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/chapters/cash/chapter1.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/tables/PricingModeTable.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/dialogs/saleAgencyDialog.vue
- Sessão de origem: c7884ca9-0f78-4e4e-9359-8fa478960362; linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "vue_zs_tag_fix",
  "source_extraction_id": "9e8fdb1f8e9d4c00b0343d17cab91324",
  "version": 1,
  "memory_type": "entities"
}
-->