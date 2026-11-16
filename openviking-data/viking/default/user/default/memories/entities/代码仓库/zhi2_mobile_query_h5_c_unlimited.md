# zhi2-mobile-query-h5-c-unlimited
苏住房防汛 C 端移动查询 H5 前端仓库；`fix/home-visual-20261114` 已于 2026-11-15 快进合并进 `dev` 并推送 `origin/dev`。

## 仓库属性
- GitLab 项目路径：`gitlab.zhi.com/zhi-suzhou-shiqu-suzhufang-fe/zhi2-mobile-query-h5-c-unlimited`。
- 非嵌套子模块，提交后无需回写父仓 gitlink；由 Lead 负责任务分配与构建协调。

## 提交与首页改造
- 2026-11-14 提交 `a8f6c97`（`a8f6c97652f4ae242135198bc2e3e335f73b527d`）推送 `fix/home-visual-20261114`，本地与远端同步（ahead=0 behind=0）；改动 `src/pages/home/index.vue`、`src/utils/portalData.ts`、`src/styles/theme.css`、`src/components/BottomNav.vue`、`.task-state/home-visual-screenshot-final.png`。
- 首页接入公告、待办、banner、学习与新闻数据映射，调整卡片、标签、空态与图片展示；底栏保留默认五项，仅「我的」改为「个人中心」。
- 2026-11-15 `dev` 仍在共同基线 `04e305a`、`a8f6c97` 为其后代；为避开主 worktree 的 14 处未提交改动，在独立临时 worktree 完成快进合并并推送 `origin/dev`。

<!-- MEMORY_FIELDS
{
  "category": "代码仓库",
  "name": "zhi2_mobile_query_h5_c_unlimited",
  "source_extraction_id": "2a8d15abfb4640798db0219c5c50bf31",
  "version": 14,
  "memory_type": "entities"
}
-->