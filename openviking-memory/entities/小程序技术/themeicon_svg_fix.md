# 泰兴小程序图标完整修复方案
泰兴小程序设施设备页图标样式异常，根因是 CSS mask-image 不可靠及双色图标分层错误，已通过还原 SVG 并新增 ThemeIcon 组件修复。

## 问题根因
- CSS `mask-image` 在小程序里不可靠，图标可能只显示色块或完全不显示。
- 双色图标分层错误：圆形背景和扳手/瞳孔放在同一 mask 层，白色层叠在上面盖住前景主题色元素。
- SVG 被拆碎：`type_4` 等图标路径被简化，和原版不一致。

## 修复方案
- 从 `origin/` 还原完整 SVG（`type_3`、`type_4`、`sssb_5` 等），保留 `#0A3D62` 主题色 + `#FFFFFF` 白色。
- 新增 `ThemeIcon` 组件：小程序端用 `<image>` 加载本地 SVG 文件（稳定）；需换色时通过 `icons.js` 里的 SVG 字符串动态替换颜色。
- 重写 `facility.vue` / `index.vue`：去掉 mask 叠加方案，统一用 `ThemeIcon`。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：`icons.js`、`facility.vue`、`index.vue`。
- 来源会话ID：dbdb0fbe-e155-41e3-9463-05450ef8377d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "themeicon_svg_fix",
  "source_extraction_id": "73b155aac32a4c42aabee05de66ae54e",
  "version": 1,
  "memory_type": "entities"
}
-->