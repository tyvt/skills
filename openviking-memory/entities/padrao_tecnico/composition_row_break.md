# composition-row quebra número de certificado em duas linhas
`addHouse.vue` usa layout vertical `composition-row` (`flex-direction: column`) para o número de certificado de propriedade, dividindo o texto em duas linhas.

## Causa raiz
- `addHouse.vue` aplica `composition-row` (column) ao número de certificado de imóvel
- O texto é quebrado em duas linhas indevidamente

## Correção
- Trocar para layout de linha única `flex items-center`
- Manter consistência com `stockHouseSign/apply.vue`

## Arquivos e verificação
- `src/pages_owner/house/owner/addHouse.vue`, `src/pages_transaction/publishHouse/verification.vue`, `src/pages_transaction/stockHouseSign/apply.vue`
- Projeto: 苏住房C (zhi2-mobile-shimin); sessão: 54f4fa88-f084-46ed-a03b-0f245a7026be

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "composition_row_break",
  "source_extraction_id": "5a1866481797438eaa3b151fc58e6948",
  "version": 1,
  "memory_type": "entities"
}
-->