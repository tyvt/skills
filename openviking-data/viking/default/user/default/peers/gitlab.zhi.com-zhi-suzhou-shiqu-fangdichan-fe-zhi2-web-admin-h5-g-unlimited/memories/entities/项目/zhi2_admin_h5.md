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


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_admin_h5",
  "source_extraction_id": "09cd59afd80b47e4b4195cc488f5fd72",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 8,
  "memory_type": "entities"
}
-->