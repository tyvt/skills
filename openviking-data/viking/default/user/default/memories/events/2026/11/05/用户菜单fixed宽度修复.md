# Summary
截至2026-11-05，用户确认修复用户菜单position:fixed后min-width:max(100%,132px)导致下拉撑满视口遮挡左侧的问题：去掉max(100%,…)，在updateDesktopDropdownPosition用头像触发区实际宽度计算minWidth至少132px，菜单固定在右上角头像下方不再遮挡。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】bug
【标题】没有处理好
【内容】### 原因 用户菜单改成 `position: fixed` 之后，样式里仍保留了 `min-width: max(100%, 132px)`。 在 **fixed** 定位下，这里的 `100%` 会按**视口宽度**算，下拉最小宽度几乎等于整屏，再叠上 `right` 定位，就会出现你截图里那种**左侧整片白块**，把侧栏和表格都挡住。 ### 修复 - 去掉会撑满视口的 `max(100%, …)` - 在 `updateDesktopDropdownPosition` 里用头像触发区的实际宽度计算 `minWidth`（至少 132px） - 菜单仍固定在右上角头像下方 请刷新后再点右上角「管理员」：下拉应只在头像下方出现窄白条，不再盖住左侧。若还有异常，说一下页面路径和操作步骤。
【验证证据】extracted source=cursor project=苏州市房地产监测V3
【涉及文件】涉及文件：d:\repository\苏州市房地产监测V3\zhi2-web-admin\src\layout\components\Navbar.vue、d:\repository\苏州市房地产监测V3\zhi2-web-admin\src\layout、d:\repository\苏州市房地产监测V3\zhi2-web-admin\src\styles\variables.css
【所属项目】苏州市房地产监测V3
【来源会话ID】eaeb4d6a-1209-47e7-a761-4c6b265f74bc
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "用户菜单fixed宽度修复",
  "goal": "记录菜单遮挡修复",
  "summary": "截至2026-11-05，用户确认修复用户菜单position:fixed后min-width:max(100%,132px)导致下拉撑满视口遮挡左侧的问题：去掉max(100%,…)，在updateDesktopDropdownPosition用头像触发区实际宽度计算minWidth至少132px，菜单固定在右上角头像下方不再遮挡。",
  "ranges": "20-24",
  "source_extraction_id": "330aa71e016942a688d066d37dc6c289",
  "version": 1,
  "memory_type": "events"
}
-->