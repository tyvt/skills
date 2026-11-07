# 存量房详情页轮播空值报错修复
苏住房C 小程序 `pages_transaction/stockHouse/detail.vue` 与 `swiperComponent.vue` 因轮播数据空值保护缺失导致 `Cannot read property 'fileSite' of undefined`，已修复。

## 问题原因
- `swiperComponent` 在图片列表为空或索引越界时仍访问 `allList[currentSlide].fileSite`
- `stockHouse/detail` 页面数据加载前就挂载 `swiper-component`，此时 `allImg` 为空数组 `[]`
- 模板原无 `v-if` 守卫，`allList[0]` 为 `undefined` 时报错
- 点击「图集」时 `currentSlide` 硬编码为 `1`，无视频时第一张图索引 `0` 会越界
- `imageUrl` 按逗号拆分可能产生空字符串项

## 修复要点
- `swiperComponent.vue` 视频弹层加 `v-if` 守卫，使用 `allList[currentSlide]?.fileSite`
- 修正 `currentSlide` 硬编码越界问题
- 处理 `imageUrl` 拆分空字符串项

## 涉及文件
- src/pages_transaction/stockHouse/detail.vue
- src/components/commonNew/swiperComponent.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话：db381270-844e-45c8-899a-a19894dde18f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "stockhouse_swiper_fix",
  "source_extraction_id": "72b5a7991bd24f12a5931971c8afda85",
  "version": 1,
  "memory_type": "entities"
}
-->