# HomeRobotFloater 拖拽与图比修复
苏住房C 移动端 HomeRobotFloater 组件因固定方框铺满导致竖图变形且缺少拖动逻辑，已改为按图比容器并用 touch 更新位置。

## 问题根因
- `jqr_2.png` 实际为 50×67 竖图，原用 152×152 方框与 `cover-image` 铺满导致变形
- 组件仅 `position: fixed` 缺少 `touchmove` 拖动逻辑

## 修复要点
- 容器改为 114×152rpx，用 touch 更新 `left/top`（`cover-view` 不支持 `transform`）
- 松手位置存本地缓存 `home_robot_floater_pos`
- 移动 <8px 仍触发 `openHomeRobot` 点击

## 涉及文件
- src/components/HomeRobotFloater/HomeRobotFloater.vue
- src/pages/index/home.vue
- src/utils/openAutomaticRobot.js
- src/pages_tab/components/Home_Suzhufang.vue
- src/utils/mainStaticPaths.js

## 验证与归属
- 验证证据：src=苏住房C/070.md
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：01a162cf-1392-70c5-a400-75f6929f5246

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_floater_fix",
  "source_extraction_id": "792ac32c904246d5a8d095eccd5645e4",
  "version": 1,
  "memory_type": "entities"
}
-->