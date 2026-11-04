# 筛选弹窗中重复的 Data() 导致图标丢失
在 Su Zhu Fang C，conditionScreening.vue 存在重复的 `data()` 覆盖了 `resetIcon` 并导致其丢失；已移除重复的 data 并使用 ZsImage 加载 svg。

## 问题根因
- `conditionScreening.vue` 存在重复的 `data()` 覆盖了 `resetIcon` 并导致其丢失，且引用了不存在的 `reset.png`
- 一些页面的间距不符合设计

## 解决方案
- 移除重复的 `data()`，使用 `ZsImage` 加载 `images/szf/reset.svg` 以及 flex 布局的 footer
- 多个 `newHouse` 页面：`.page-top`/`.house-list` 的 padding 改为 12px
- “两个智能一个完整”页面：搜索框间距 20px，图片圆角等。

## 验证
- 验证证据: cursor 会话 efe288e0-e72c-42af-848b-9bb1cbfc98d8
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