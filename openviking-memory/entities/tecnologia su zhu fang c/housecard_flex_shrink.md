# Ícone da barra de endereço do card sem flex-shrink
No Su Zhu Fang C, o ícone `.orientation` em houseCard.vue não tinha `flex-shrink: 0` e era comprimido a 0 em cards estreitos de duas colunas; foram adicionados estilos.

## Causa Raiz
- No layout flex da barra de endereço de `houseCard.vue`, o ícone `.orientation` não tinha `flex-shrink: 0`
- Em cards estreitos de duas colunas a largura era comprimida a 0

## Solução
- Adicionar `flex-shrink: 0` e estilos de dimensão a `.house-card-top-box .orientation`
- Aplicar às três listas de abas da página Su Zhao Fang

## Verificação
- Evidência: sessão cursor 61371a3a-6a5f-4dcd-a98f-26224110a6a9
- Arquivos: houseCard.vue, Project_Suzhufang.vue (vários caminhos), index/project.vue, utils/index.js, houseSupermarket/index.vue, ZsImage.vue
- Projeto: Su Zhu Fang C (zhi2-mobile-shimin); baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Su Zhu Fang C",
  "name": "housecard_flex_shrink",
  "source_extraction_id": "eec437de5242407b850f6604b409be7a",
  "version": 1,
  "memory_type": "entities"
}
-->