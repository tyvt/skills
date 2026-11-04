# Data() duplicado no popup de filtro causava perda de ícone
No Su Zhu Fang C, conditionScreening.vue tinha `data()` duplicado que sobrescrevia e perdia `resetIcon`; foi removido o data duplicado e usado ZsImage para svg.

## 问题根因
- `conditionScreening.vue` tinha `data()` duplicado que sobrescrevia e perdia `resetIcon`, e referenciava `reset.png` inexistente
- Alguns espaçamentos de página não seguiam o design

## 解决方案
- Remover `data()` duplicado, usar `ZsImage` para carregar `images/szf/reset.svg` e footer em flex
- Várias páginas `newHouse`: padding de `.page-top`/`.house-list` alterado para 12px
- Páginas "dois inteligentes um completo": espaçamento da caixa de busca 20px, imagens com cantos arredondados, etc.

## Verificação
- 验证证据: sessão cursor efe288e0-e72c-42af-848b-9bb1cbfc98d8
- 涉及文件: newHouse/index.vue, newHouse/indexMore.vue, newHouse/houseTypeList.vue, conditionScreening.vue, goodProject/index.vue, stockHouse/components/moreForm.vue, uno.config.ts, ZsImage.vue
- 所属项目: Su Zhu Fang C (zhi2-mobile-shimin); baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Su Zhu Fang C",
  "name": "conditionscreening_duplicate_data",
  "source_extraction_id": "eec437de5242407b850f6604b409be7a",
  "version": 1,
  "memory_type": "entities"
}
-->