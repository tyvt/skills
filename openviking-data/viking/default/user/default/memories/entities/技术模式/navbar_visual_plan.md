# Navbar视觉对齐计划（task-2468）
苏住房G 任务2468 的 Navbar 视觉对齐与 E2E 验证计划，审核通过后经用户确认实施。

## 验证门槛
- 截图相似度至少 99.5%，并非像素差为零；两项截图门槛必须同时通过
- 使用 1366px 视口验证菜单滚动与空权限状态
- 截至 2026-11-14 用户确认前，未运行 E2E、构建或部署，也未提交推送

## 版本与推送约束
- 版本号必须匹配 staging 构建时的子模块 HEAD
- 推送顺序固定：先完成子模块远端确认，再更新父仓 gitlink
- 禁止强推；提交推送沿用此前授权

## 流程与文件
- 工作区规则要求计划审核通过后再由用户确认，dsh-plan-gate 才允许修改源码
- 计划文件位于 D:/repository/苏住房G/.plan/task-2468-navbar-visual-e2e.md
- 2026-11-14 用户回复“确认实施”，助手开始按计划实施并核对父仓、子模块与 worktree 状态

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_visual_plan",
  "source_extraction_id": "46df6c0a0eb840a6868c9f28d66979db",
  "version": 1,
  "memory_type": "entities"
}
-->