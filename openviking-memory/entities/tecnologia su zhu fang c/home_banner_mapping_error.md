# Erro de mapeamento de dados do banner da página inicial
O mini-programa Su Zhu Fang C usava prioridade a configuração local homeBanner e o pickBannerImg não reconhecia campos como pictureUrl; foi unificado o mapeamento em Home_Suzhufang.vue.

## 问题根因
- O mini-programa usava prioridade `app.suzhufang.config` `homeBanner` em vez da interface `/system/banner/page?bannerType=1` do APP
- `pickBannerImg` não reconhecia campos como `pictureUrl`

## 解决方案
- Priorizar a interface de carrossel em `Home_Suzhufang.vue`
- Complementar mapeamento `pictureUrl`, unificar `normalizeBannerItem` mapeando `linkUrl`→`url`, `jumpConfiguration`→`level`
- `homeBanner` como fallback

## Verificação
- 验证证据: sessão cursor 5b209d2f-cd82-4005-8b65-1e07b8e31017
- 涉及文件: pages/index/home.vue, Home_Suzhufang.vue (vários caminhos), store/menu.js, menus.fallback.json, HotAppsHome.vue, MidModuleGrid.vue, api/system.js
- 所属项目: Su Zhu Fang C (zhi2-mobile-shimin); baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Su Zhu Fang C",
  "name": "home_banner_mapping_error",
  "source_extraction_id": "eec437de5242407b850f6604b409be7a",
  "version": 1,
  "memory_type": "entities"
}
-->