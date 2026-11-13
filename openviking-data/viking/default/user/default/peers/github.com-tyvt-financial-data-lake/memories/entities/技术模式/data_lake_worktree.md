# 数据湖 Git Worktree 工作流
数据湖（financial-data-lake）仓库采用独立 worktree 开发，改完 fast-forward 合并 main 后删除 worktree。

## 工作流
- 在 `D:\repository\` 下建独立 worktree，命名如 `数据湖-wt-<功能>-<日期>`（例：数据湖-wt-plan-ui-20261106）
- 功能分支命名 `feat/<功能描述>`（例：feat/plan-ui-clarity）
- 提交后 fast-forward 合并回 `main`（例：提交 43c340cb）
- worktree 用完即删；是否推送远程由用户每次选择（2026-11-06 实例中用户选不推送）
- `.gitignore` 明确 `data/` 数据湖本体应纳入版本控制（"按需完整纳入，不在此忽略"），parquet 增删为预期改动而非误提交
- 大批量改动按目录分组提交（如 `分析产出/`、`data/`、`logs/+configs/` 各一笔），不夹带无关文件

## 验证注意
- 改动按用户 spec 落地；合并后向用户汇报分支、提交号与 worktree 清理结果

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "data_lake_worktree",
  "source_extraction_id": "92db1cd49e1a4e329acd0234b1488034",
  "peer_id": "github.com-tyvt-financial-data-lake",
  "version": 2,
  "memory_type": "entities"
}
-->