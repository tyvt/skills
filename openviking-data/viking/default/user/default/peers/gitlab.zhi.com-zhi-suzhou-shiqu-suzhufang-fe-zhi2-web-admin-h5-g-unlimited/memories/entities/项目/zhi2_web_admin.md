# zhi2-web-admin（苏住房前端）
苏住房管理后台前端项目，由该项目 Lead 负责任务分配与实现方案决策。

## 项目规则
- 提交须在独立 worktree 完成，避免覆盖主工作区与其他 worktree 的保留改动
- 基线构建与后续验证在原始仓库根按标准路径运行，复用同一套已装依赖
- 隔离 worktree 依赖根布局可能未命中项目 Vite，导致基线构建 1 秒内退出，并非源码错误
- Vite 把父仓目录当作 `env` 与 `dist` 根，隔离 worktree 须保留完整父仓结构，避免候选项误读环境或写错输出目录
- 候选与正式构建均显式设置绝对 staging `outDir`；正式 `dist` 仅在 staging 完整 E2E 与版本校验通过后备份替换，失败或扫描到测试标记可恢复备份
- E2E 验收须覆盖空权限、双向滚动、活动项可见性与测试标记扫描；`vite.config.js` 主检出构建输出为仓库根 `dist`，与本地 nginx 站点落点一致
- E2E 执行采用一次性 watchdog 包装器，在 `finally` 中通过 UI helper 禁用后重启启用原配置以恢复原站点，不直接改写 enabled 配置文件；候选站点 HTTP 响应须与 worktree 构建一致，2026-11-14 已确认一致

- 构建日志出现 120 秒无输出时可能仍在运行，随后可正常结束，无需重跑

## 任务
- 当前推进任务 2468（导航栏视觉改版），进展见任务实体
- 2026-11-15 任务 2468 构建完成（退出码 0），下一步只做一次候选部署与正式 E2E，低于门槛即恢复基线
- 2026-11-15 最终候选已构建、E2E 已跑通，原站点版本已恢复；剩余差距主要为真实菜单图标：本地 `/zhi2-pro/...` 路径 404、上游返回 HTML，待向用户索取可用图片地址或文件

## 关系
- 归属 peer（苏住房前端项目Lead），禅道账号 tiany

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "f63219e86f4b47a58797d3da05e71791",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 11,
  "memory_type": "entities"
}
-->