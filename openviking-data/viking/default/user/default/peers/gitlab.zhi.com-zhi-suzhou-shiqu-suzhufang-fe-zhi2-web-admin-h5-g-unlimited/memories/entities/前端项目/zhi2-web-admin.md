# zhi2-web-admin
zhi2-web-admin 是“苏住房G”前端项目，由苏住房前端 Lead 负责开发与视觉验收。

## 项目信息
- 仓库根路径 D:/repository/苏住房G（Windows，D: 盘）；Navbar 组件 src/layout/components/Navbar.vue；视觉回归用例 e2e/home-v2/navbar-visual.spec.mjs。
- 全图 E2E 视觉验收门槛为相似度 99.5%。

## 任务与基线
- 视觉任务 worktree：worktrees/task2468-navbar-visual，对应任务 2468（Navbar 视觉一致性）；2026-11-15 本机站点已恢复到基线提交 0e14875de，候选改动仅保留在 worktree 中。
- 2026-11-15 两个 Navbar 视觉任务分支相对项目主线均为 0 ahead / 0 behind；先只暂存 Navbar 源码与对应资源。
- 2026-11-15 子模块暂存 Navbar、映射/生成代码与 36 个图标及背景资源；`git diff --cached --check` 通过，生成脚本末尾多余空行已修正并通过 `node --check`，按先子模块后父仓顺序提交。
- 2026-11-15 用户明确指示提交推送代码到主分支，遂先核对工作树、子模块与远端主分支再走提交流程；92.707% 仍不作为视觉验收通过。

## 提交与构建
- 2026-11-15 子模块提交 9ba4ccc0dcbae04ac8460854186587b2a1391f0b（`feat(navbar): restyle top navigation`），父仓提交 ba246959ba1477131c03d88af11b850ff9e6b976（`feat(navbar): update submodule and add visual E2E`），已推送主线 develop/v2.6.2-suzhufang。
- 远端 SHA 已核对一致，本机主线检出已快进；未纳入其他未提交文件，也未部署。
- 提交后生产构建通过，构建哈希与子模块提交一致。

## 验收情况
- 2026-11-15 最佳候选为 Navbar 背景高度 105%，全图 E2E 相似度 92.707%，未达 99.5% 门槛。
- 活动标签以 15px 临时试验样式出图为 92.712%，与保留源码版 92.707% 仅差约 0.005 个百分点，试验样式未保留。
- 官方 E2E 中导航溢出、滚动箭头与空权限检查通过；排除图标区域的诊断分数 94.168% 不作为验收分数。
- Navbar lint、E2E 脚本语法检查和构建均通过；临时诊断钩子已清除，预提交审查未发现调试钩子。
- 默认 profile.png 仅改为与参考图一致的用户轮廓，占位图场景生效、真实头像仍显示。

## 相关规范
- 视觉候选调整中，真实 meta.icon 优先于标题 fallback 显示。

<!-- MEMORY_FIELDS
{
  "category": "前端项目",
  "name": "zhi2-web-admin",
  "source_extraction_id": "4aa6beebaa4b4fbbab23b04a93eba51d",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 6,
  "memory_type": "entities"
}
-->