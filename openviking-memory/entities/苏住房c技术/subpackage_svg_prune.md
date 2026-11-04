# 子包的SVG需要映射否则构建后失败
在 zhi2-mobile-shimin 的构建中，主包中位于 `static/svg/` 的 SVG 文件被裁剪并在运行时从 `/pages_main/static/svg/` 加载，要求进行映射注册。

## 原因
- 主包中 `static/svg/` 下同名文件在构建时被裁剪。
- 在运行时加载发生于 `/pages_main/static/svg/`，如果未映射则导致失败。

## 解决方案
- 在 `src/utils/index.js` 中注册映射，例如：`'svg/headphone.svg': ['pages_main']`。
- 其他要点：utils/mainStaticPaths.js, package.json, scripts/prune-main-static.mjs。

## 文件与验证
- 涉及：pages_main/about/AboutUs.vue, ZsImage.vue, pages.json, pages/about/AboutUs.vue, utils/index.js。
- 验证证据: src=苏住房C/030.md; 会话 e7e357b4-638f-4ace-8ca0-7fa9ff707a43; base none.

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia SuzhouC",
  "name": "subpackage_svg_prune",
  "source_extraction_id": "195ef044b5d84cc697c2bf15d158b46d",
  "version": 1,
  "memory_type": "entities"
}
-->