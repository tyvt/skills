# zhi2-admin-h5
zhi2-admin-h5 是苏州市房地产监管平台后台 H5 前端项目（含管理员与非管理员经纪机构/开发企业皮肤对内首页），本地 nginx 站点端口 8092。

## 描述
- 非管理员首页用 HomeLayoutSidebar.vue 布局，右侧栏为用户卡 + AI问答助手面板(HomeAiPanel) + 公示公告（原快捷入口 HomeQuickLinks 已移除）
- 管理员首页具备 AI 问答助手板块 HomeAiPanel 及问答弹窗 HomeAiChatDialog
- 布局结构：#app > .app-viewport(min-height:100vh) > .app-wrapper(height:100%) > .main-container > .right-container > .app-main；B 端首页 .right-container 加 .portal-home-layout（overflow:auto，app-main 变 height:auto;min-height:100%）

## 组件
- HomeLayoutSidebar.vue：非管理员首页侧栏布局组件
- HomeQuickLinks：快捷入口组件（仅管理员首页仍用，非管理员已移除）
- HomeAiPanel / HomeAiChatDialog：管理员首页 AI 问答板块与弹窗

## 关系
- 2026-11-04 非管理员首页快捷入口替换为 AI 问答板块并接弹窗，e2e 用例 portal-home-visual.spec.ts 同步更新；子模块 develop/v2.6.2-portal 提交 04ff25537，父仓库门户提交 879c169
- 首页「查看更多数据」按钮（HomeStatsBar 的 more 事件）跳转房地产市场运行监测决策大屏（#/market-monitor）
- 2026-11-07 该 #/market-monitor 路由经幂等补丁指向由最新 React 源码构建的内联单文件大屏，与参考站像素级一致（E2E ≥99.97%）
- 超管首页「被改坏」实为独立 GetInfo 登录态 bug（parentId='0' 触发 dept/detail?deptId=0 失败，角色兜底 ROLE_DEFAULT 误走侧栏），04ff25537 未动管理员布局

## 修复记录
- 2026-11-06 修 B 端侧栏 AI 面板竖向拉伸：HomeAiPanel 根改 height:auto，.sidebar-ai-panel 加 flex:0 0 auto; align-self:flex-start；子模块 1a8d32ed7、父仓库 3d16b94 已推送
- 2026-11-06 修 B 端首页待办/公示公告卡片未撑满底部留白：.home-layout-sidebar 加 flex:1 1 auto; min-height:0；子模块 a5662a037、父仓库 d267b1d 已推送，部署 8092 返回 200
- 2026-11-06 修布局根 .app-wrapper 未撑满视口：加 min-height:100vh; box-sizing:border-box；子模块 8e4c32ad4、父仓库 b587375 已推送，部署 8092 验证生效
- 本地 8092 可用测试账号：91320505MA1X866218 / ZS0001Aa!（开发企业/测试法人，用户 2026-11-06 提供）

## 市场监测页功能（2026-11-09 改造）
- MarketHeader.vue：左上角 logo 读 platformConfig.sysLogo（mapState + resolveServerAssetUrl 渲染 <img>，w-9 h-9 容器 overflow-hidden）；未配置或 @error 加载失败回退静态 house SVG；标题静态「苏州市房地产市场数据分析平台」
- /market-monitor 在路由白名单，守卫不拉平台配置，故 MarketHeader mounted 主动 dispatch('app/getPlatformConfig')（store 已去重）
- 返回首页按钮由 reset-overview 改为 emit go-home（tooltip「返回对内主页」）；goHome() 先退浏览器全屏，据 beforeRouteEnter 记录 from.fullPath 判断：from.matched 有值（门户内页 SPA 进入）$router.go(-1) 真正后退；直接/新标签打开兜底 $router.replace('/index') 回对内主页；不使用 history.state/length（直接打开时 history.length=2 且 state 非空会误判离开站点）
- 遗留：PORTING-SPEC.md 与 market-monitor-alignment.md 仍写「返回首页＝重置全域」（上一轮对齐文档，本轮未改）；market-monitor.standalone.html 离线单文件仍旧行为（非交付对象）
- 区域切换：仅切换数据、布局保持不变、移除返回按钮白底高亮（用户 2026-11-09 选择）
- 购房人面板（户籍+年龄维度）与 KPI 卡片趋势图（yAxis 隐藏但自动缩放）位于 market-monitor 页
- 未售房源图右 y 轴因 max: v.max*1.05 破坏 eCharts nice 刻度取整（显示 23.5935/20/15 异常刻度），改用 boundaryGap 修复（2026-11-09）
- 验证：区域切换前后布局字节级一致，返回按钮保持半透明无白底（2026-11-09）

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_admin_h5",
  "source_extraction_id": "50d83b9cc77b474f8d8a951a6bf47bd4",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 10,
  "memory_type": "entities"
}
-->