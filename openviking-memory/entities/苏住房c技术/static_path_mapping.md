# resolveStaticUrl 按文件名映射分包
苏住房C(zhi2-mobile-shimin)的 `resolveStaticUrl` 原按路由推断静态图分包，导致跨包加载失败，后改为按文件名映射。

## 问题根因
- `resolveStaticUrl` 按当前页面路由推断 `images/szf/*` 分包，在 `pages_main/houseMap` 误解析至 `pages_main/static` 致 500

## 修复做法
- 于 `src/utils/index.js` 改为按文件名映射至正确分包（如 `pages_transaction`）
- 配套脚本 `scripts/fix-relative-static-paths.mjs` 与 `src/utils/mainStaticPaths.js` 辅助路径修正

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：src=苏住房C/056.md；来源会话ID：7f47849c-ba9e-4b0a-8c84-2445f8137134；代码基线：none
- 涉及文件：src/pages_main/houseMap/houseMap.vue、src/components/ZsImage/ZsImage.vue、src/utils/index.js、scripts/fix-relative-static-paths.mjs、src/utils/mainStaticPaths.js、src/components/collectBtn/collectBtn.vue、src/pages_main/houseMap/components/StockHouse.vue、src/pages_main/houseMap/components/NewHouse.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "static_path_mapping",
  "source_extraction_id": "0c1492527b224b2dbfcc5af50d5ed5cf",
  "version": 1,
  "memory_type": "entities"
}
-->