# 分包迁移后静态图需SUBPACKAGE_STATIC_IMAGES映射回退pages_main
苏住房C小程序空态图迁到分包后代码仍写主包路径，resolveStaticUrl未登记致500空白，需映射表回退pages_main。

## 问题现象
- 空态图 empty.png / apply-empty.png 从主包迁入各分包后，代码仍写 images/empty.png
- 微信开发者工具报「Failed to load local image resource /static/images/empty.png … 500」，整块空态图空白

## 根因
- 静态地址统一走 resolveStaticUrl，按当前页面所属分包推断真实目录
- 主包 Tab 页（pages/index/*）路由根是 pages 无法推断分包；未单独登记的分包也推不出，都落默认 /static/images/，主包文件已迁走故 500

## 解决方案
- 在 src/utils/index.js 增加 SUBPACKAGE_STATIC_IMAGES 映射表（分包 → 该包内实有图片名）
- resolveStaticUrl 改为「当前分包有该图用当前分包，否则回退 pages_main/static/images/<file>」
- 后续图片迁包须同步映射表与 scripts 下迁移脚本，两者同一口径

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 9b92579b 报错「Failed to load local resource /static/images/empty.png 500」；定位 17443e68 迁包提交，加映射表并回退 pages_main
- 涉及文件：src/utils/index.js、components/ZsImage/ZsImage.vue、utils/mainStaticPaths.js、scripts/prune-main-static.mjs
- 所属项目：苏住房C；来源会话ID：9b92579b-9f3a-4e44-a8e1-f17d395f2790；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpackage_static_fallback",
  "source_extraction_id": "fe7c48b530a64b4a9825c5f0ecbd6ae5",
  "version": 1,
  "memory_type": "entities"
}
-->