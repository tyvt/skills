# Gradiente da caixa de busca e remoção de margem do banner
Ajuste de UI da página inicial do Su Zhu Fang C: caixa de busca com gradiente vertical, imagem do banner com aspectFill para remover margem, e news-card não renderizado sem dados.

## Ajuste
- Em `Home_Suzhufang.vue`, `.search-strip` alterado para `linear-gradient(180deg,...)` gradiente vertical
- Em `.banner-img-wrap`, `mode` da imagem alterado para `aspectFill` para remover margem, remover fundo cinza, adicionar `line-height:0`
- Sem dados, não renderizar `news-card` para evitar bloco vazio

## Arquivos Envolvidos
- pages.json, pages/index/home.vue, Home_Suzhufang.vue (vários caminhos), OnlineServiceGrid.vue, HotAppsHome.vue, MidModuleGrid.vue, AppTabBar.vue

## Verificação
- 验证证据: sessão cursor f12bdce7-635e-42f0-b034-e806a17e8c7e
- 所属项目: Su Zhu Fang C (zhi2-mobile-shimin); baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Su Zhu Fang C",
  "name": "home_search_gradient_banner",
  "source_extraction_id": "eec437de5242407b850f6604b409be7a",
  "version": 1,
  "memory_type": "entities"
}
-->