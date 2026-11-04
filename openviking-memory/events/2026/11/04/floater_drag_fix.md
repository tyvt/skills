# Summary
The HomeRobotFloater component in src/components/HomeRobotFloater/HomeRobotFloater.vue was adjusted: container changed to 114x152rpx, touch events update left/top (cover-view lacks transform support), release position cached in local storage key home_robot_floater_pos, and movement under 8px still triggers openHomeRobot click. The original 152x152 box with cover-image distorted the 50x67 vertical image jqr_2.png.
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】preference
【标题】HomeRobotFloater 图比错且不可拖动
【内容】`jqr_2.png` 实际为 50×67 竖图，`HomeRobotFloater` 原用 152×152 方框与 `cover-image` 铺满导致变形，且组件仅 `position: fixed` 缺少 `touchmove` 拖动逻辑。在 `src/components/HomeRobotFloater/HomeRobotFloater.vue` 将容器改为 114×152rpx，用 touch 更新 `left/top`（`cover-view` 不支持 `transform`），松手位置存本地缓存 `home_robot_floater_pos`，移动 <8px 仍触发 `openHomeRobot` 点击。
【验证证据】src=苏住房C/070.md
【涉及文件】D:/repository/苏住房C/zhi2-mobile-shimin/src/components/HomeRobotFloater/HomeRobotFloater.vue ; D:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/home.vue ; D:/repository/苏住房C/zhi2-mobile-shimin/src/utils/openAutomaticRobot.js ; D:/repository/苏住房C/zhi2-mobile-shimin/src/pages_tab/components/Home_Suzhufang.vue ; D:/repository/苏住房C/zhi2-mobile-shimin/src/utils/mainStaticPaths.js ; src/components/HomeRobotFloater/HomeRobotFloater.vue
【来源会话ID】01a162cf-1392-70c5-a400-75f6929f5246
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "floater_drag_fix",
  "goal": "Fix draggable robot floater",
  "summary": "The HomeRobotFloater component in src/components/HomeRobotFloater/HomeRobotFloater.vue was adjusted: container changed to 114x152rpx, touch events update left/top (cover-view lacks transform support), release position cached in local storage key home_robot_floater_pos, and movement under 8px still triggers openHomeRobot click. The original 152x152 box with cover-image distorted the 50x67 vertical image jqr_2.png.",
  "ranges": "0-5",
  "source_extraction_id": "1f9551ad6bc2466fbbeb54613828c3ca",
  "version": 1,
  "memory_type": "events"
}
-->