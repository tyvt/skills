# ZsButton外边距失效修复
苏住房C小程序中写在ZsButton上的margin不生效，已通过原生view包裹并设置margin修复。
## 问题根因
- 微信小程序里写在 `ZsButton` 等自定义组件上的 `margin`（含UnoCSS `mt-80`）不作用到实际按钮
- 导致之前调整间距看起来没效果
## 修复内容
- 用原生 `view` 包裹「下一步」按钮
- 包裹层 `.next-step-btn` 设 `margin-top: 80rpx`
- `.publish-type-box` 加 `flex` 纵向布局避免外边距折叠
## 验证与归属
- 重新编译预览，间距应正确；若仍不对可告知期望距离继续调
- 涉及文件：publishHouse/type.vue、publishHouse/verification.vue、owner/authentication.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：a2751523-b238-42d9-b41f-5da721879c3a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zsbutton_margin_fix",
  "source_extraction_id": "92d5861c1a484f0989ce3fb58fc3482b",
  "version": 1,
  "memory_type": "entities"
}
-->