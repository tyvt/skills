# 首页AI问答面板在B端侧栏被拉伸修复
门户 B 端（经纪机构/开发企业皮肤）首页右侧栏的 AI 智能问答助手面板(HomeAiPanel) 曾被竖向拉伸成整列高度，本文记录其根因与最小修复方案。

## 问题根因
- HomeAiPanel 根节点用 height:100%，在 HomeLayoutSidebar 的 .sidebar-panel（height:100% flex 列，被左侧高内容经 align-items:stretch 撑高）里解析为整列高
- 面板作为非弹性项无高度上限，吃满整列，公示公告 flex:1 被压到 2px
- 内容垂直居中致标题/问法/CTA 挤到卡片中部偏下，机器人图标被 overflow:hidden 裁切

## 修复要点
- HomeAiPanel.vue：根 .home-ai-panel 由 height:100% 改为 height:auto（保留 min-height:194px），__inner 去掉 height:100%，卡片随内容紧凑自适应
- HomeLayoutSidebar.vue：.sidebar-ai-panel 增加 flex:0 0 auto; align-self:flex-start，不再被拉伸

## 验证与归属
- Playwright 独立复现（挂载同套 HomeLayoutSidebar + 真实 public 资源），broker 皮肤渲染为紧凑 AI 卡片（标题+胶囊问法+CTA+机器人），公示公告保留下方，与管理员首页一致
- 真实构建 node scripts/vite-build.mjs 通过，nginx 站点门户.conf（端口 8092，root 指向本项目 dist）reload 后 http://127.0.0.1:8092 返回 200
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeAiPanel.vue、zhi2-web-admin/src/views/home/components/layouts/HomeLayoutSidebar.vue
- 子模块 zhi2-web-admin @ develop/v2.6.2-portal 提交 1a8d32ed7；父仓库门户提交 3d16b94；均已于 2026-11-06 推送远程

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "ai_panel_stretch",
  "source_extraction_id": "c7df36941731438991d6c42c07cc2318",
  "version": 1,
  "memory_type": "entities"
}
-->