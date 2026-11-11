# Agent 规则

细节按需加载，不要把 skill 整篇读进上下文。简单 Bug（文案、显隐、单字段、明显空值、换一个已知 URL）只加载当前任务必须的那一个 skill。Token、编排器阈值、编码默认走编排器：加载 `dsh-token-policy`，此处不展开。

## 落地

- 用户指定的 worktree / 目录是硬约束：不进、不改、不合并他人 worktree。
- 开工：加载 `worktree-snapshot`，只读它的输出。禁止现场拼 `git status` / `git worktree list`，禁止递归列举 worktree 目录。
- 提交：加载 `submodule-commit`，按清单执行，不临场推演顺序。
- 出现 Option 1/2/3 并列推演 = 缺事实，立刻查一条命令。
- 意图含「修改/修复/实现 + 验证 + 提交」时，先 `todo_write` 把阶段外化，不在推理里反复重述阶段目标。

## 禁止

- 未知具体路径时，禁止全仓 `grep` / `read`；禁止 `src/**` 全量 grep，先缩到具体模块。
- 找不到文件先 `mcp__openviking__search`（`mode=context`，`detail=abstract`）。不要把 `viking://` 当磁盘路径读。
- DBX 长文本读不全时改 `git log` 或 `UNION ALL` 分段（细则在 `zentao-analyzer` 的 `references/dbx.md`），禁止同一形态连试三次。
- 禁止提交 `env/.env` 与 `public/version.json`。`git pull` / `git rebase` 前先 `git status --short`，脏的环境文件先 stash。
- 自动化环境的 `git commit` / `rebase --continue` / `merge` 必须先设 `GIT_EDITOR=true`。
- 未跑构建必须写「未执行」。构建、部署、回写证据不齐不收尾。

## 提问与收尾

- 修改、修复、配置、实现直接做完可逆部分并验证。只有高风险、不可逆、越权，或缺少无法推断的信息时才问。
- 要用户选择时只用 `ask_user_question`，禁止在正文末尾提问。已回答且范围未变的不重复问。
- 改动落在 Git 仓库时，收尾问：仅提交 / 提交并推送 / 暂不处理。用户本轮已明确说不用提交或直接提交推送时不再问。
- 收尾前 `job_list`，停掉不再需要的后台任务。工具参数报错先加载 `tool-call-hygiene` 再重试一次。
- `repo-safety`、`web-deploy` 仅当本会话技能目录已经列出时才加载；未注册则忽略，不要因此报错。
