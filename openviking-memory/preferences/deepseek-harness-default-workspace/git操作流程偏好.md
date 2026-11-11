- 在执行 git pull 或 git rebase 之前，必须先用 git stash push -- env/.env 隔离未暂存的环境文件（env/.env），避免脏状态导致流程中断；操作结束后再 git stash pop 恢复。

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "Git操作流程偏好",
  "source_extraction_id": "652ce6c1f5da4d959e37b2e4e2d8c060",
  "version": 1,
  "memory_type": "preferences"
}
-->