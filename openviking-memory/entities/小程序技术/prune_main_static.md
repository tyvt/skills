# 主包静态图被裁导致跨包import 500
苏住房C 小程序为压主包体积将公共图标拆到各分包 static，构建后 prune-main-static 删主包同名文件，仍用主包路径 import 的页面运行时 500 且静默退默认 marker。

## 问题现象
- 微信开发者工具报「Failed to load local image resource /static/icon/location-red.png … status 500」并提示「改为用默认 marker」
- pages_main/houseMap/houseMap.vue 红色定位图标变系统默认图标
- 生产包中其他地图页（pages_transaction、pages_owner 等）用 @/static/... 也可能同样 500

## 根因
- 项目把公共图标拆到各分包 static 目录，scripts/prune-main-static.mjs 构建后删主包同名文件
- 页面仍 import redImage from "@/static/icon/location-red.png"（主包绝对路径），产物路径不存在请求 500
- 小程序不报编译错，只静默退回默认 marker

## 解决方案
- 需要图的页面把图标复制到自身分包 static 目录（如 src/pages_main/static/icon/location-red.png）
- 在 utils 的 SUBPACKAGE_STATIC_IMAGES 映射表为该分包补文件名登记
- 页面改用 import { resolveStaticUrl } from "@/utils" 后 const markerIcon = resolveStaticUrl("icon/location-red.png", "pages_main")
- 全仓排查同类 @/static/... import 写法改为带分包名 resolveStaticUrl；新增静态图先确认主包/分包，分包用图必登记映射

## 验证与归属
- 验证：会话 bb55af39（基线 8fc3cc5）报 location-red.png 500 与「改为用默认marker」
- 涉及文件：pages_main/houseMap/houseMap.vue、utils/index.js、pages_main/static/icon/location-red.png、scripts/prune-main-static.mjs
- 所属项目：苏住房C；来源会话ID：bb55af39-97ad-4deb-943d-2c10c3c7ff61；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "prune_main_static",
  "source_extraction_id": "ed684869517947daa729ceb5239a72e0",
  "version": 1,
  "memory_type": "entities"
}
-->