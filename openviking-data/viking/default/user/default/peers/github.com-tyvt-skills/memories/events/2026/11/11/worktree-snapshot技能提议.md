# Summary
2026-11-11 提议创建 worktree-snapshot 技能：一条命令输出父仓、子模块、各 worktree 的分支/detached/脏净/HEAD 状态，会话开头读结果文件，禁止现场拼 git status，以替代零散查询，且不写进 AGENTS.md。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...**不该放在 AGENTS.md。** 因为“开工先查全 worktree”这句话已经写在技能里了，Agent 仍然漏掉；再加一句 prose 不会变。

**正确落点：Hook（PreToolUse）+ Skill（快照脚本）**

- **Hook 守卫**：`PreToolUse` 拦截 `Edit` / `Write`，如果目标路径位于 **detached HEAD 的 submodule 主检出**，直接 deny，并返回提示“该检出不是分支所在 worktree，请先确认落点”。Claude Code 的 `PreToolUse` 可以在工具执行前阻断，且不受权限模式绕过影响。
- **Skill 快照**：把上一轮建议的“一条脚本拉全父仓 + 子模块 + 每个 worktree 的分支/脏净/最新提交”封装成 `worktree-snapshot` Skill，Agent 在开工时按需调用，而不是现场拼命令。

### 2. 重复 `git status` 与零散查询（Step 1–6）

**不该放在 AGENTS.md。** 规则写“不要重复查”是建议，Agent 在上下文压力下会忘。

**正确落点：Hook（SessionStart）+ Skill 缓存**...
...
**user [peer=github.com-tyvt-skills]**: ...- `step-budget-guard`：直接杀掉 11k reasoning 自我辩论。

2. **再做两个 Skill（减少重复劳动）**
   - `worktree-snapshot`：替代 Step 1–6 的零散查询。...
...
**assistant [peer=github.com-tyvt-skills]**: ...**3. 两个 skill，不写进 AGENTS.md**

- `worktree-snapshot`：一条命令给出父仓、子模块、各 worktree 的分支 / detached / 脏净 / HEAD。会话开头读结果，禁止现场拼 `git status`。
- `submodule-commit`：分支 worktree 里改 → eslint → commit → push → 主检出对齐 SHA → 父仓 gitlink。...

<!-- MEMORY_FIELDS
{
  "event_name": "worktree-snapshot技能提议",
  "goal": "创建worktree快照技能",
  "summary": "2026-11-11 提议创建 worktree-snapshot 技能：一条命令输出父仓、子模块、各 worktree 的分支/detached/脏净/HEAD 状态，会话开头读结果文件，禁止现场拼 git status，以替代零散查询，且不写进 AGENTS.md。",
  "ranges": "6-9,29,50-51",
  "source_extraction_id": "cab19e04d9184da3b1ad3626e78acf22",
  "version": 1,
  "memory_type": "events"
}
-->