---
audit_status: invalid
last_checked: 2026-11-26T15:44:40+08:00
verdict_note: 苏住房C源码：HomeRobotFloater、clampPosition、RobotFloater、悬浮均0命中(仅memory归档出现)。所述悬浮按钮组件及其left/top修复在当前代码无实证，判无效。
---
# HomeRobotFloater悬浮按钮固定left仅纵向
根因在 `HomeRobotFloater.vue` 中 `clampPosition` 与 `onTouchMove` 同时变更 `left` 和 `top` 致可拖至屏幕中间。

## 问题根因
- `clampPosition` 与 `onTouchMove` 同时变更 `left` 和 `top` 致可拖至屏幕中间

## 解决方案
- `clampPosition` 固定 `left` 为 `windowWidth - 按钮宽度` 仅约束 `top` 安全区
- `onTouchMove` 仅按 `dy` 更新纵向位移且不响应横向
- 加载时仅取保存的 `top` 贴右缘

## 验证与归属
- 涉及文件：HomeRobotFloater.vue
- 验证：src=苏住房C/084.md；来源会话：01a16312-67e2-70c5-a400-764ecaeff705
- 项目：苏住房C（zhi2-mobile-shimin 市民端）

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "home_robot_floater",
  "source_extraction_id": "f6592072a2364f72844e36ea1d0776c5",
  "version": 1,
  "memory_type": "entities"
}
-->