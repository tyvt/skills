# 昆山G物管前端 Git 与构建
昆山G物管前端仓库（wuguan-fe-zhi1-web-admin-h5-g）的 git 分支、worktree 与本地构建约定。

## 分支与 Worktree
- 主分支为 main/v1.47.1，功能分支命名如 task/1736-reject-notice-auto-download
- Worktree 路径约定：D:\repository\昆山G-wt-<task>（如 昆山G-wt-task1736），用完即 git worktree remove

## 构建验证
- 本地 npm run build 可能因 node_modules 缺失 vue-cli-service 跑不通
- 须在 package.json 所在目录先 npm install，再 npm run build 并部署 dist 到 nginx UI 验 UI
- 主工作区未提交改动（package.json、vue.config.js、bun.lock、bunfig.toml）会影响构建，需先处理

## 关联任务
- 禅道任务 #1736（Story #1240）：维修资金使用流程驳回时自动下载问题告知书
- 提交 680ff4226 合入 main/v1.47.1，完成人 tiany，完成时间 2026-11-06

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "kunshan_g_git",
  "source_extraction_id": "880be84bcf0a4e5baff156b2ceab170f",
  "version": 1,
  "memory_type": "entities"
}
-->