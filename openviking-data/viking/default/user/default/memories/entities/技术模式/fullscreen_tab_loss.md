# 大屏全屏穿透丢失综合大屏页签（Bug 6217）
榆林G 项目（园区物管2.0）系统监控-综合大屏在全屏模式下穿透后，会丢失「综合大屏」页签。
## 问题根因
- 大屏全屏使用「内容全屏」机制：layout/index.vue 中 tags-view 用 v-if="outLink != 1 && needTagsView && !contentFullscreen" 控制。
- 进入全屏 → tags-view 组件整体被卸载；全屏下穿透（goMenu 先 setContentFullscreen(false) 再 router.push）退出全屏 → tags-view 重新挂载。
- TagsView 的 mounted() 会执行 delAllVisitedViews() 清空所有非固定（affix）页签，时序竞态下「综合大屏」页签被误关。
- contentFullscreen 是全屏当前页通用机制（TagsView 右键菜单也有），故任何页全屏后导航都会触发同类问题。
## 解决方案
- 修改 zhi2-web-admin/src/layout/index.vue：tags-view 外层保留 v-if="outLink != 1 && needTagsView"，内层显示控制改为 v-show="!contentFullscreen"。
- 全屏切换仅做 CSS 显隐、不再卸载重建，彻底消除重建导致的 delAllVisitedViews 竞态。
## 验证与归属
- 构建验证（Playwright + 本地 nginx 部署真实构建）：原码页签容器事件序列 [false,true,false,true]（全屏卸载、穿透返回重建）；修复后 [false,true]（全程不卸载），穿透后页签栏为「首页 / 综合大屏 / 物业管理区域备案」。
- 为避免并行任务争用共享仓库根 dist（vite.config rootDir 解析到父目录 D:/repository/榆林G，多个 worktree 构建会互相覆盖），验证改用独立 --outDir 隔离 dist 目录部署。
- 来源会话：2026-11-05 修复 bug 6217；文件 zhi2-web-admin/src/layout/index.vue；分支 develop/v2.6.2-yulin；子模块提交 44f86d045→合并 e840b7e99，父仓库 榆林G 提交 6fcb185；禅道 bug 6217 回写 resolved/fixed 指派回 zhunan（action #87585）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fullscreen_tab_loss",
  "source_extraction_id": "5588aafc654f41eabeb1a56ff7d1a4d4",
  "version": 1,
  "memory_type": "entities"
}
-->