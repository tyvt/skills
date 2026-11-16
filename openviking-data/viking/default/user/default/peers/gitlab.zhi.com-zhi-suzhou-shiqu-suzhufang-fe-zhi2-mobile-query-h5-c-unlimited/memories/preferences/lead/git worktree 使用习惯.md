- 执行合并、构建、截图验证等操作时，习惯另建独立临时 worktree，以避开主 worktree 上已有的未提交改动。
- 临时 worktree 中直接完成快进合并并推送到远程分支（如 `origin/dev`），不改动主 worktree 的工作区状态。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "user": "Lead",
  "topic": "Git worktree 使用习惯",
  "source_extraction_id": "09f35e1116ed4a0899df637631e372f0",
  "version": 1,
  "memory_type": "preferences"
}
-->