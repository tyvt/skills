# Summary
2026-11-11，submodule-commit 加第0步 fetch 与 behind 先 rebase，构建放在 commit 之后；gitlink 冲突取后代提交。源于用户建议6、7。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...### 建议 6：submodule-commit 固定顺序
- 在 `submodule-commit` 技能里把顺序写死为：`commit → build（拿正确 hash）→ resolve`，并在第 0 步加 `git fetch && git status -sb`，ahead/behind 非 0 先 rebase 再动手。可避免 step 24 的旧 hash 构建与 step 32–39 的 push 往返。

### 建议 7：push 前预检
- 工具/技能层：`git push` 前自动跑 `git fetch origin <branch>` + 比较本地与远端，若 behind 则先 `pull --rebase`；对 submodule gitlink 冲突，预置「取后代提交」的解析策略（日志中 agent 手工判断 63d1e2c1a 是 1dd0f0d93 的后代，逻辑正确但可自动化）。

### 建议 8：多步意图提示 todo...
...
**assistant [peer=github.com-tyvt-skills]**: ...| commit 后再构建、push 前预检 | `submodule-commit` 加第 0 步 fetch 与 behind 先 rebase，构建放在 commit 之后；gitlink 冲突取后代提交 |...

<!-- MEMORY_FIELDS
{
  "event_name": "submodule-commit流程固定",
  "goal": "记录技能变更",
  "summary": "2026-11-11，submodule-commit 加第0步 fetch 与 behind 先 rebase，构建放在 commit 之后；gitlink 冲突取后代提交。源于用户建议6、7。",
  "ranges": "23-25,99",
  "source_extraction_id": "114cae7623bc498d9bf1b83f57880dd7",
  "version": 1,
  "memory_type": "events"
}
-->