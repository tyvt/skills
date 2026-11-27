# Summary
2026-11-27 用户验证禅道任务2953后反馈工作台存在问题：UI错乱、跳转链接错误、跳转页面为hash路由且不能用新窗口打开。排查确认根因：①.section-card 固定 height:310rpx，常用功能8项两行溢出压到设施设备标题；②openH5 用 ${H5_BASE}${route} 路径式URL，而C端为hash路由（需 /#），且 window.open(_blank) 被手持端WebView拦截。
# 2026-11-27 (Friday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-yulin-all-wuguan-fe-zhi2-mobile-shimin-h5-b-unlimited]**: 禅道任务2953，我验证了一下，有问题。UI错乱。跳转链接不对，跳转的页面是hash路由，而且不能用新窗口打开
...
**assistant [peer=gitlab.zhi.com-zhi-yulin-all-wuguan-fe-zhi2-mobile-shimin-h5-b-unlimited]**: Confirmed both root causes:
1. **UI错乱**: `.section-card` has fixed `height: 310rpx` but "常用功能" has 8 items (2 rows), so row 2 overflows and collides with the next card's "设施设备" title.
2. **跳转链接**: `openH5` builds `${H5_BASE}${route}` (path-style), but C端 is hash-routed (`"mode":"hash"`), and uses `window.open(_blank)` which mobile WebView blocks.

Let me check the deploy panel for local access and load browser instructions.

<!-- MEMORY_FIELDS
{
  "event_name": "工作台UI与跳转问题根因确认",
  "goal": "记录问题根因",
  "summary": "2026-11-27 用户验证禅道任务2953后反馈工作台存在问题：UI错乱、跳转链接错误、跳转页面为hash路由且不能用新窗口打开。排查确认根因：①.section-card 固定 height:310rpx，常用功能8项两行溢出压到设施设备标题；②openH5 用 ${H5_BASE}${route} 路径式URL，而C端为hash路由（需 /#），且 window.open(_blank) 被手持端WebView拦截。",
  "ranges": "0,69",
  "source_extraction_id": "2ba72c8d28a54f51a107077b9ec618b3",
  "version": 1,
  "memory_type": "events"
}
-->