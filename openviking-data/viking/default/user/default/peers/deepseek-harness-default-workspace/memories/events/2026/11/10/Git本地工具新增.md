# Summary
在 langgraph-orchestrator 的 config.yaml 新增 local:true 的本地 git 工具（不进模型池），仅执行 git status --short 与 git diff --stat，合计超20行截断；rebase/stash 冲突仅回 Conflict detected 与冲突文件名，不回灌 Git hint；pwsh 生成的 git 命令输出同样走此截断（2026-11-10 落地）。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: ...禁止输出超过 20 个字的说明。”
封装一个轻量级的 Git 工具（或者直接在 orchestrate 里加一个分支），默认执行 git status --short 和 git diff --stat 时，如果输出超过 20 行，就直接截断。如果遇到 rebase 或 stash 冲突，只返回发生冲突的文件名和一句 Conflict detected，不要把大段的 git 建议文本原样回灌给主模型。
在 AGENTS.md 的「任务收尾」里补一条：

“执行 Git 提交前，先运行 git status --short。如果存在与本次修改无关的未暂存文件（如 env/.env），必须先使用 git stash 或 git checkout -- 将其暂时隔离，严禁直接执行 pull 或 rebase。
...
**assistant [peer=deepseek-harness-default-workspace]**: 编排器的 `file_reader` 读不到本地仓库，我改为直接改已定位的源码：给无文件权限的模型加上禁止臆造的系统提示，并在执行路径里截断 Git 输出。
...
**assistant [peer=deepseek-harness-default-workspace]**: `git` 工具不该进模型池。我改成无模型本地工具，避免路由器拿假模型去调网关。
...
**assistant [peer=deepseek-harness-default-workspace]**: 三处都已落地，Git 摘要断言脚本跑通（输出 `ok`）。pytest 本体在这台机器上因插件内部错误起不来，和这次改动无关。

**系统提示词**
`file_reader` 和 `code_editor` 每次调用都会带上这条系统提示：读不到目标路径时只能回 `[ERROR] 无法读取本地文件，请宿主提供源码片段。`，禁止猜测代码。位置在 [graph.py](D:/repository/skills/dsh/langgraph-orchestrator/src/graph.py) 的 `NO_LOCAL_FILE_SYSTEM`。

**Git 摘要**
新增本地工具 `git`（[config.yaml](D:/repository/skills/dsh/langgraph-orchestrator/config.yaml)，`local: true`，不进模型池）。它只跑 `git status --short` 和 `git diff --stat`，合计超过 20 行就截断。rebase 或 stash 冲突只回 `Conflict detected` 和冲突文件名，不回灌 Git 的 hint。`pwsh` 里如果模型仍生成了 `git` 命令，输出同样走这套截断。

**任务收尾**
[AGENTS.md](D:/repository/skills/dsh/AGENTS.md) 第 6 条已加上：提交前先 `git status --short`，与本次无关的未暂存文件（如 `env/.env`）必须先 `git stash` 或 `git checkout --` 隔离，禁止直接 pull 或 rebase。

<!-- MEMORY_FIELDS
{
  "event_name": "Git本地工具新增",
  "goal": "记录Git工具变更",
  "summary": "在 langgraph-orchestrator 的 config.yaml 新增 local:true 的本地 git 工具（不进模型池），仅执行 git status --short 与 git diff --stat，合计超20行截断；rebase/stash 冲突仅回 Conflict detected 与冲突文件名，不回灌 Git hint；pwsh 生成的 git 命令输出同样走此截断（2026-11-10 落地）。",
  "ranges": "1-3,30,37,60-64",
  "source_extraction_id": "7240c132c3ca4a33a634b1327c171132",
  "version": 1,
  "memory_type": "events"
}
-->