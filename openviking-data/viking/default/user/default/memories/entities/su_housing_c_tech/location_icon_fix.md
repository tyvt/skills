# 地图marker图标location-red.png加载失败修复
苏住房C(zhi2-mobile-shimin)中 houseMap.vue 引用的 location-red.png 因主包静态资源被清理导致加载500，已改用分包路径修复。

## 问题根因
- location-red.png 已从主包迁到各分包静态目录，构建后 prune-main-static.mjs 会删掉主包里的 /static/icon/location-red.png
- houseMap.vue（位于 pages_main 分包）仍通过 import 引用主包路径，运行时请求返回 500，地图 marker 退回默认图标

## 修复内容
- 将图标复制到 src/pages_main/static/icon/location-red.png
- 在 SUBPACKAGE_STATIC_IMAGES 中为 pages_main 增加 location-red.png 映射
- houseMap.vue 改为使用分包路径：通过 resolveStaticUrl("icon/location-red.png", "pages_main") 解析

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_main/houseMap/houseMap.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：bb55af39-97ad-4deb-943d-2c10c3c7ff61；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "location_icon_fix",
  "source_extraction_id": "319434979eb5456683b6c30a531f83cd",
  "version": 1,
  "memory_type": "entities"
}
-->