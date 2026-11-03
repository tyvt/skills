- Em zs-table-column, alterar slot-scope="scope" para slot-scope="{ scope }" para acessar dados da linha via scope.row.
- Aplicar a alteração apenas quando o elemento externo for realmente zs-table-column (ex.: CommercialHousingTable.vue); colunas nativas el-table-column (ex.: PricingModeTable.vue) permanecem inalteradas.
- Arquivos: contractRequest.js, vendeeAgentDialog/index.vue, vendeeTab.vue, chapter1.vue, contractMainInfo/index.vue, BuyerTable.vue, zs-table-column.vue, sz-contract.scss. Evidência: 苏州市房地产监测V3-rest/003.md.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Desestruturação de slot zs-table-column",
  "source_extraction_id": "772b51dcf2dd4e5b954bbf2076058ae6",
  "version": 1,
  "memory_type": "preferences"
}
-->