# @property动画自定义角度在getComputedStyle不暴露
对通过 `@property` 注册并由 CSS animation 驱动的自定义属性，在动画进行中用 getComputedStyle 往往返回初始值，不能据此判定动画未运行。

## 现象与根因
- 如 `--guide-ring-angle` 在动画中 `getComputedStyle(el).getPropertyValue('--guide-ring-angle')` 常返回 `0deg`
- 这是注册属性中间值不暴露给 JS 的常见行为

## 验收建议
- 验收旋转类边框动效应依赖逐帧截图/像素 diff 或 DevTools 动画面板，而非只读 computed 自定义属性

## 验证与归属
- UnifiedLogin 环绕光带会话明确记录：样式动画已用帧差证明生效，但 getPropertyValue 仍为 0deg
- 涉及 zhi2-web-admin/src/views/home/UnifiedLogin.vue；所属项目：门户；来源会话 session_d1e620fe90b6ddbb66e074177230a456；代码基线 dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "css_property_animation_computed",
  "source_extraction_id": "06deb50548ec4b1da053721f776eb879",
  "version": 1,
  "memory_type": "entities"
}
-->