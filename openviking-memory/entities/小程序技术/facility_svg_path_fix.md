# 设施页SVG图标路径修复
泰兴小程序设施设备页因 import SVG 路径无效导致图标不显示，已通过将图标放入主包并使用 ZsImage 字符串路径修复。

## 问题根因
- 通过 `import xxx.svg` 引入后构建结果指向 `/pages_facility/static/type_*.svg`，但 `dist/dev/mp-weixin/pages_facility/static/` 下无这些文件，`<image>` 加载失败。
- 与项目惯例不一致：首页等本地图标放在主包 `src/static/`，用 `ZsImage` 走 `/static/images/..` 路径；分包内 `import` 的 SVG 不会稳定落到小程序可访问目录。

## 修复方案
- 将 5 个图标复制到 `src/static/images/facility/`（主包 static，会打进小程序）。
- `index.vue` 改用 `ZsImage`，`iconMap` 使用 `images/facility/type_*.svg` 字符串路径。
- 同步修复 `facility.vue` 中相同用法（列表按钮图标也会不显示）。

## 验证与归属
- 编译后可在 `dist/dev/mp-weixin/static/images/facility/` 看到对应 SVG。
- 若仍有个别图标空白，可能是 SVG 里 `linearGradient` 在微信端兼容问题。
- 涉及文件：`index.vue`、`facility.vue` 等；所属项目：泰兴小程序；来源会话ID：53b40878-aa25-43cb-931e-2a1d70f719c9

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "facility_svg_path_fix",
  "source_extraction_id": "f14ea4addc6543e1b47221f41498e9f0",
  "version": 1,
  "memory_type": "entities"
}
-->