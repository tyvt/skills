# ListTemplate + listMixins em vendas imobiliárias e fundos de reparo
Páginas de lista de commercialHousingSales e repairFunds foram refatoradas para ListTemplate + listMixins.

## Contexto
- 5 páginas convertidas: contractView, specialcontract, exchangeContract, verifyRecord e finance/rec
- 所属项目: zhi2-web-admin (produto 2.0)

## Pontos-chave
- Configurado módulo presale
- Preservada a coluna condicional isSuzhouzhizai e o getList customizado
- Injetado o componente ChooseHouseDialog

## Arquivos
- Views: commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue, commercialHousingSales/presale/{contractView,specialcontract,exchangeContract}/index.vue, repairFunds/{verifyRecord,finance/rec}/index.vue
- Mixins: mixins/ListTemplate.js e mixins/listMixins.js

## Verificação
- Sessão cursor: 43c84fe7-2b4f-4b61-b5ff-d697d2feb8ba

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_listtemplate",
  "source_extraction_id": "738f08956f814c1794657ebf13c3e648",
  "version": 1,
  "memory_type": "entities"
}
-->