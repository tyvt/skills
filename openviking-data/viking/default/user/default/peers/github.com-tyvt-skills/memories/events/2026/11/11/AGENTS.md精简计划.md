# Summary
2026-11-11 用户提出 AGENTS.md 只应作短地图（建议控制在150行以内），助理对齐既有三层模型后确认：dsh/AGENTS.md 仅保留三句指针（开工走快照技能、提交走提交技能、纯文案只加载一个技能），删除流程性文字与脚本细节，规则冲突优先级也只写简短一条，不再新写 prose。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 你问的是“AGENTS.md、Skill、还是插件”，但日志暴露的问题**不是三选一**，而是**放错了层级**。核心判断依据一句话：**指令是概率，Hook 是保证；Skill 是按需加载的流程，AGENTS.md 是每次都在的“地图”，插件只是把前几样打包分发**。

## 一、先给结论

| 层 | 角色 | 确定性 | 上下文成本 | 日志中该放哪 |
|---|---|---|---|---|
| **AGENTS.md** | 每次会话必读的“地图”：项目约定、落点规则、边界 | ❌ 建议性，模型可能忽略 | 每轮都付费，**建议 <200 行** | 只放“精简决策规则”，不放脚本细节 |
| **Skill** | 按需加载的**可复用流程/脚本** | ❌ 模型决定是否套用 | 常驻仅 30–50 tokens，触发才载全文 | 开工快照、提交序列、PowerShell 封装 |
| **Hook** | 生命周期事件上的**确定性代码** | ✅ 强制，Agent 跳不过 | 几乎为零 | worktree 落点守卫、step budget、commit 门禁 |
| **Plugin** | 把 Hook+Skill+MCP 打包跨仓分发 | 取决于内部内容 | 全部内容之和 | 稳定后再打包，**不是第一步** |...
...
**user [peer=github.com-tyvt-skills]**: ...- 没有原生 step budget 时，可以用 `PostToolUse` 计数器 + `PreToolUse` deny 组合实现。

**AGENTS.md 只保留一句话**：“出现 Option 1/2/3 并列推演 = 缺事实，立刻查一条命令。”——作为“地图”提示，不作为唯一控制手段。

### 5. 规则冲突（flood-page-guard vs 简单文案只加载一个 skill）

**这是真正适合 AGENTS.md 的内容**：一条**优先级收敛规则**，例如：

> 纯文案/显隐/单字段改动：只加载 `zentao-analyzer`，不加载 `flood-page-guard`；涉及表单/子表/加密接口才加载后者。

这种“每次都要知道的约定”正是 AGENTS.md 的职责。但注意 **AGENTS.md 要控制体量**：Codex 默认 32 KiB 会截断，Claude Code 超过约 200 行后遵从度明显下降。所以这条规则要短，不要展开。

### 6. 提交序列（子模块 → worktree → gitlink → 父仓）

**不适合 AGENTS.md**（细节太多、每次加载太贵），**适合 Skill**。

把“在分支 worktree 编辑 → eslint → commit → push → 主检出 checkout 新 SHA → 父仓 `git add` → commit → push → `ls-remote` 复核”封装成 `suzhufang-submodule-commit` Skill。Agent 按需加载，AGENTS.md 只写一句“提交走 `suzhufang-submodule-commit` 技能”。

---

## 三、推荐的落地结构

```
AGENTS.md                     # <150 行，只放“地图”和硬规则指针
  - 项目约定、落点规则（简短）
  - 规则冲突优先级（flood-page-guard vs zentao-analyzer）
  - “提交走 xxx skill，开工先跑 worktree-snapshot”...
...
**user [peer=github.com-tyvt-skills]**: ...- `submodule-commit`：替代 Step 12–16 的临时推演。

3. **最后精简 AGENTS.md**
   - 删除重复的流程性文字，只保留“地图”和指向 Skill 的指针。...
...
**assistant [peer=github.com-tyvt-skills]**: 这篇分析的方向对，但落点要按你这边已经定过的三层来改，不能按 Claude Code 的 `PreToolUse` 原样搬。

## 先对齐事实

你 11-10 已经定过，而且和这篇不冲突：

| 层 | 你已有的机制 | 管什么 | 这篇建议里对得上的 |
|---|---|---|---|
| 硬 | 子模块 `pre-commit` | 可判定缺件（防汛改了却没台账） | 只有「提交时能用 git 判定」的才算保证 |
| 半硬 | DSH 插件注入 notice（现有 cost-meter 同款） | 时机：纯文本超长、收尾漏自查 | step budget、收尾自查 |
| 软 | skill 清单 / 固定脚本 | 开工快照、提交顺序、PowerShell 模板 | worktree-snapshot、submodule-commit |
| 地图 | `dsh/AGENTS.md`（现在约 6KB） | 优先级和指针，不写脚本 | 规则冲突、指向 skill |

Claude Code 的 `PreToolUse` deny 在这套 DSH 里没有对等物。插件目前是**注入提醒**，不是拦 `Edit`/`Write`。所以「worktree 落点守卫直接 deny」在这里是假保证，不要当成第一步。

## 方案：四件事，按这个顺序

**1. 不再加 prose（现在就停）**
`AGENTS.md` 只留三句指针：开工走快照 skill、提交走提交 skill、纯文案只加载一个 skill。流程、命令、`@{u}` 写法全部移走。超过这个就继续被忽略。

**2. 半硬只加在现有 cost-meter 插件上，不新开一套 Hook**

- 一步结束：输出 >1500 tokens 且没有 tool call → 注入「停止推演，调一次工具或直接下结论」。
- turn 正常结束：本轮有 `git commit` 但没跑 token-optimizer → 注入收尾提醒。

这是唯一能打中「11k reasoning」的时机。git hook 看不到 reasoning。

**3. 两个 skill，不写进 AGENTS.md**

- `worktree-snapshot`：一条命令给出父仓、子模块、各 worktree 的分支 / detached / 脏净 / HEAD。会话开头读结果，禁止现场拼 `git status`。
- `submodule-commit`：分支 worktree 里改 → eslint → commit → push → 主检出对齐 SHA → 父仓 gitlink。Agent 只按清单执行。

PowerShell 语法不靠 lint hook。命令收进这两个脚本，Agent 不自己拼 `@{u}`、`head`、`tail`。

**4. 硬门禁维持现状，插件打包先不做**
防汛台账继续只放子模块 `pre-commit`。worktree「禁止在 detached 主检出上改文件」要等 DSH 插件 API 真能 deny 工具再做；现在做 shell 脚本只是又一条建议。Plugin 等第二个仓库要同一套时再打包。

## 不做的

- 不把 worktree / step budget / 提交序列再写进 `AGENTS.md`。
- 不建 `.claude/hooks` 或假装 `PreToolUse` 能拦写文件。
- 不先做 Plugin。

预期：重复 `git status` 和提交序列靠 skill 降下来；超长空转靠插件提醒打断，但不能 100% 阻止模型再写一段。真正强制的仍然只有 commit 时能判定的缺件。

<!-- MEMORY_FIELDS
{
  "event_name": "AGENTS.md精简计划",
  "goal": "AGENTS.md精简为短地图",
  "summary": "2026-11-11 用户提出 AGENTS.md 只应作短地图（建议控制在150行以内），助理对齐既有三层模型后确认：dsh/AGENTS.md 仅保留三句指针（开工走快照技能、提交走提交技能、纯文案只加载一个技能），删除流程性文字与脚本细节，规则冲突优先级也只写简短一条，不再新写 prose。",
  "ranges": "0-3,16-22,30,43-55",
  "source_extraction_id": "cab19e04d9184da3b1ad3626e78acf22",
  "version": 1,
  "memory_type": "events"
}
-->