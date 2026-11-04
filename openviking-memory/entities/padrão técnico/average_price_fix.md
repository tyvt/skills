# Correção de Resposta das Tabelas de Preço Médio
Componentes de tabela de preço médio foram ajustados para compatibilidade de retorno da API.

## Causa
- APIs `averagePrice` retornam array em `data`, mas três componentes usavam `response.rows` falhando

## Solução
- Padronizado para `response.rows || response.data || []` para compatibilidade

## Arquivos Envolvidos
- `src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/AveragePriceTable.vue`
- Mesma pasta: `BuildRecordTable.vue`, `historicalPrice.vue`, `detail.vue`
- `src/api/pricemng/recordPriceMng.js`, `src/api/presale/recordPriceMng.js`, `src/api/index.js`, `src/utils/request.js`

## Verificação e Origem
- Evidência: extraído do cursor session=a9f5fddf-6da7-4aa2-811e-c9b3d7941b5e
- Linha de base: none; projeto: Produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "average_price_fix",
  "source_extraction_id": "ea712054da3f4c828e9962a4a272fca7",
  "version": 1,
  "memory_type": "entities"
}
-->