# Swiper 预挂载空数组导致 fileSite 错误
页面 `pages_transaction/stockHouse/detail` 在数据加载前挂载了 `swiper-component` 且未使用 `v-if`，导致在数组为空时访问 `allList[currentSlide].fileSite` 产生错误。

## 问题根因
- 在数据加载前挂载 `swiper-component`，且缺少 `v-if` 守卫
- 当数组为空时，访问 `allList[currentSlide].fileSite` 失败
- `currentSlide` 使用硬编码值，存在索引越界风险

## 修复
- 在 `swiperComponent.vue` 的视频层添加 `v-if` 守卫
- 消除 `currentSlide` 中因硬编码索引导致的越界风险

## 文件与验证
- `src/pages_transaction/stockHouse/detail.vue`
- `src/pages/commonNew/swiperComponent.vue`, `src/components/commonNew/swiperComponent.vue`
- 所属项目: 苏住房C (zhi2-mobile-shimin); 会话: db381270-844e-45c8-899a-a19894dde18f

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：db381270-844e-45c8-899a-a19894dde18f


<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "swiper_premount_empty",
  "source_extraction_id": "5a1866481797438eaa3b151fc58e6948",
  "version": 1,
  "memory_type": "entities"
}
-->
