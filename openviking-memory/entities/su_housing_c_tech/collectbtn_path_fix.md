# 房源地图组件路径引用修复
苏住房C 小程序 `pages_main/houseMap/components/` 下 `StockHouse.vue` 与 `NewHouse.vue` 因引用已删除的相对路径导致组件找不到，已修正为绝对路径。

## 问题根因
- `StockHouse.vue` 与 `NewHouse.vue` 使用了已删除的相对路径 `./../collect/components/collectBtn.vue`
- 该路径对应的文件已被移除，编译时报组件找不到

## 修复要点
- 将两个文件的引用改为 `@/components/collectBtn/collectBtn.vue`
- 重新编译后报错消失

## 涉及文件
- `pages_main/houseMap/components/StockHouse.vue`
- `pages_main/houseMap/components/NewHouse.vue`
- `@/components/collectBtn/collectBtn.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：3ae4dee9-19f6-4db4-8759-c97af7318eb7
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "collectbtn_path_fix",
  "source_extraction_id": "613eaf05d69d4f6fb7772b66d4276670",
  "version": 1,
  "memory_type": "entities"
}
-->