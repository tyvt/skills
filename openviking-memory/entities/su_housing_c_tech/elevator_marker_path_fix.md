# 加梯申请页地图marker图片路径错误修复
苏住房C小程序加梯申请页地图 marker 图片 location-red.png 因路径引用错误导致500，已修复。

## 问题根因
- 代码用 `@/static/icon/location-red.png` 引用，实际文件在 `pages_main/static/icon/` 下
- 微信解析为 `/static/icon/location-red.png` 导致 500

## 修复方案
- 改用 `resolveStaticUrl('icon/location-red.png', 'pages_main')`（与 houseMap.vue 同方式）

## 验证与归属
- 涉及文件：addAlone.vue、houseMap.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：85a3ba6b-0da3-48e5-b7f4-7ebc9f354ad6

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elevator_marker_path_fix",
  "source_extraction_id": "ded0ed38cdde4845819e8eaacaabeb1a",
  "version": 1,
  "memory_type": "entities"
}
-->