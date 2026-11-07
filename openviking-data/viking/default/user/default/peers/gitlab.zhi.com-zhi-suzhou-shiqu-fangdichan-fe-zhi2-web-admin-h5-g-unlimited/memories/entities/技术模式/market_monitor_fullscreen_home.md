# 市场监测大屏默认全屏与返回首页
门户（zhi2-web-admin）项目市场监测大屏（/market-monitor）改为进入即默认全屏，右上角全屏切换按钮替换为「返回首页」按钮。

## 现象与约束
- 浏览器 Fullscreen API 必须由用户手势触发，无法在页面加载（mount）时自动全屏。
- 原右上角「全屏展示/退出全屏」按钮在需求变更后不再需要。

## 解决方案
- MarketHeader.vue 右上角按钮改为「返回首页」（house 图标），点击 emit `go-home`。
- index.vue 新增 goHome()：若处于浏览器全屏先 exitFullscreen()，再 router.push('/index') 回门户首页；组件销毁时自动退出全屏。
- 默认全屏在首页入口手势内实现：index-new.vue 的 handleStatsMore() 点击手势中先 router.push('/market-monitor') 再 requestFullscreen()，两者处于同一同步点击手势内以保留浏览器用户手势；SPA 路由切换保留全屏；平台不支持时优雅降级为直接进入（页面本身铺满视口）。

## 验证与归属
- 验证：Playwright 实测旧全屏按钮 0 个、返回首页按钮 1 个；真实点击手势后 fullscreenElement 为 true；点返回首页后 fullscreenElement 为 false 且跳转 /index（登录态即门户首页）。
- 涉及文件：zhi2-web-admin/src/views/property/marketMonitor/components/MarketHeader.vue、zhi2-web-admin/src/views/property/marketMonitor/index.vue、zhi2-web-admin/src/views/home/index-new.vue
- 所属项目：门户（zhi2-web-admin）；来源会话：2026-11-04；改动已提交并推送：子模块 develop/v2.6.2-portal 提交 1f012e5e4，父仓库门户 gitlink 提交 d128bee（均推送至 develop/v2.6.2-portal）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "market_monitor_fullscreen_home",
  "source_extraction_id": "ae98c876300744728dfdd1ae31501cb6",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->