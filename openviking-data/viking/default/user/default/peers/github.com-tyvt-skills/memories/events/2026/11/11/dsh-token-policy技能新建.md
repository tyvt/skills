# Summary
用户建议将Token策略、编排器路由从AGENTS.md迁到skill；助手于2026-11-11新建 dsh-token-policy/SKILL.md，包含阈值、截图、编排器回退、编码默认、收尾自查，AGENTS.md仅留一句指向。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 结合上一轮的成本复盘，我的核心判断是：**问题不在“AGENTS.md 还是 skill 还是插件”三选一，而在于三条边界没有划清——什么必须每轮都在、什么按需加载、什么应该固化成代码而不是文字。** 上一轮 200k 量级的浪费，大部分来自把“可确定性执行的事”写成了需要模型反复推理的文字。

---

## 一、先给结论：四层分工，各管一段

行业里逐渐收敛的划分方式，是按**激活时机和上下文成本**来分层，而不是按文件类型：

| 层 | 载体 | 激活方式 | 上下文成本 | 只放什么 |
|---|---|---|---|---|
| **常驻指令** | `AGENTS.md` | 每轮必加载 | 始终在窗口内，**< 50 行** | 安全边界、落地位置约束、禁止项 |
| **按需能力** | `SKILL.md` | 语义触发，按需加载 | **50–200 行** | 工作流、检查清单、组织事实 |
| **子场景合同** | `references/*.md` | 由 skill 显式读 | 只在子场景 | 字段格式、接口契约、脚本细节 |
| **确定性执行** | Hooks / 脚本 / 插件 | 生命周期自动触发 | **零上下文** | worktree 快照、提交序列、DBX 事务 |

一句话概括：**AGENTS.md 管“不许做什么”，skill 管“该怎么做”，references 管“细节长什么样”，插件/脚本管“不用想直接执行”**。

上一轮的问题恰恰是：**安全边界、禁止项、确定性操作，三样都散落在 skill 正文里，靠模型每轮重新读、重新推。**

---

## 二、针对 DSH 的具体建议

DSH 的设计原则是“一切皆插件”——工具、技能、会话、沙箱、agent 循环、子 agent、工作流甚至 UI 都是可插拔的插件。这意味着你可以比普通项目更激进地把“文字约束”换成“插件/钩子约束”。

### 2.1 AGENTS.md：从“手册”压成“边界卡”

目前你的 `~/.dsh/AGENTS.md` 已经偏长，里面混了“简单 Bug 只加载一个 skill”“重活走 orchestrate”“token 守则”等多类内容。建议**只保留四类**，其余全部迁走：

- **落地位置约束**（“用户指定的 worktree 是硬约束”）
- **禁止项**（“禁止全 src 全量 grep”“禁止递归列举 worktree 目录”“DBX 长文本读不到直接 git log”）
- **验证门槛**（“未跑构建必须写未执行”）
- **指向 skill 的目录**（“开工先 `worktree-snapshot`，提交先 `submodule-commit`”）

行业实践反复验证了一个数字：**根文件 20–30 行效果最好，超过这个量级，重复内容会可测量地拉低 agent 表现**。AGENTS.md 增长到一定规模后，正确做法是把它变成“目录”，把大块内容移到 skills 或 `docs/`。

具体到你的文件：把“Token”“重活不进主模型”“编码默认走编排器”这三段挪到 `dsh-token-policy` 或 `orchestrate-routing` 这类 skill 里；AGENTS.md 只留一句“涉及构建/检索/账单先调 orchestrate，细则见对应 skill”。

### 2.2 skill：拆掉“万能 skill”，控制数量和体积

上一轮 `zentao-analyzer` 一次性加载了 19k tokens，里面包含了决策树、DBX 手册、截图 API、提交序列、脚本表——**它是一个典型的“文档倾倒型 skill”**。

证据很硬：skill 超过 1,600 词会稀释上下文，增益从 +19.0pp 跌到 +10.1pp；**活跃 skill 超过 8 个就有上下文稀释风险**。另一组实践把 47 个 skill 砍到 12 个，健康区间是 **9–15 个**。SWE-Skills-Bench 甚至发现，技能描述过于丰富会**扩大决策空间**，让模型在不必要的设计选择上反复权衡，反而降低表现。

建议把 `zentao-analyzer` 按“入口 + references”拆开：

- **`zentao-bug`（入口，≤80 行）**：只留决策树骨架和“先读 `zt_action` 备注”这一条铁律，其余全部指向 references。
- **`references/dbx.md`**：DBX 查询/回写模板（现在 DBX.md 的 102 行）。
- **`references/attach.md`**：REST Token 取截图/附件。
- **`references/worktree.md`**：开工前置 + 收尾对账。
- **`references/commit.md`**：子模块提交序列。

这样模型只在真正进入“回写”子场景时才读 DBX 细节，而不是一加载 skill 就把 102 行手册全灌进去。**references 的判定标准是“仅由一个入口拥有、在子场景成立时读取”**。

### 2.3 把“确定性操作”从 skill 里拿出来，固化成 hook 或脚本

这是上一轮最大的浪费源，也是最容易改的：

- **`Get-ChildItem worktrees -Recurse`**（58KB 输出）：worktree 快照完全可以是**一个 hook 或一个脚本**，session 开始时自动跑 `git worktree list` × 父仓+各子模块，输出结构化摘要（3 行），而不是让模型自己拼命令、自己过滤。
- **DBX 回写 8 步事务**：上一轮你手工走了 open/begin/update/insert/复核/commit/close，脚本只“打印”不执行。**把 `zentao-resolve.mjs` 升级为可执行版**，内部完成整条事务并返回结果，模型只需传 bugId 和 comment。这就是 hook/脚本该做的事——**确定性、高信号、零误报**。
- **提交序列**：`submodule-commit` 如果只是文字清单，模型会重新推演“先 add 还是先 push”。固化成脚本或 hook（pre-commit 已经帮你做了 lint-staged，但 commit/push 顺序仍靠人推）能直接消掉 step 13 那类绕路。

**判断标准很简单**：如果一个步骤的“正确顺序”是固定的、不需要模型判断，就不该写在 SKILL.md 里让模型每轮重读。

### 2.4 插件：管“分发”，不管“每轮加载”

插件是打包层，把 skills、MCP 配置、hooks、子 agent 打成一个可安装的包。你现在真正需要“插件化”的只有两样：

1. **`苏住房G` 项目专属包**：包含 `szfc` 相关 skills、`dbx`/`openviking`/`magpie-vision` 的 MCP 配置、以及 worktree/commit 的 hooks。这样换机器或给同事，一条命令装齐，而不是逐个配置。
2. **`zentao` 通用包**：禅道相关的 skills + references + 回写脚本，可以跨项目复用。

但**插件不要用来承载“每轮必须知道的规则”**——那还是 AGENTS.md 的事。插件的价值是“可安装、可分享、可版本化”，不是“减少每轮 token”。

---

## 三、优先级与落地顺序

**P0（本周就能改，收益最大）**

1. **AGENTS.md 瘦身到 30 行以内**，把 Token 策略、编排器路由、技能清单挪走。
2. **`zentao-analyzer` 拆成入口 + 4 个 references**，入口压到 80 行以内。
3. **把“禁止递归列举 worktree”“禁止全 src grep”“DBX 长文本读不到用 git log”写进 AGENTS.md 的禁止项**，而不是放在 skill 正文里靠模型自己回忆。

**P1（一到两周）**

4. **worktree 快照做成 hook 或一键脚本**，session 启动自动输出 3 行摘要。
5. **`zentao-resolve.mjs` 改成可执行版**，修掉漏传 `session_id` 的缺陷。
6. **统计每个 skill 的触发频率和加载成本**，砍掉“每次都要重新改写大部分内容”的 skill——这是判断 skill 该不该留的核心标准。

**P2（一个月）**

7. **把 szfc 项目资产打成插件**，包含 skills + MCP 配置 + hooks，支持一键安装。
8. **给 skill 加 lint**：description 是否只有一个稳定意图、是否超过 200 行、是否与已有 skill 触发词重叠。

---

## 四、一句话回答“AGENTS.md 还是 skill 还是插件”

- **每轮不能错的事** → AGENTS.md（≤30 行）。
- **做某类任务才需要知道的事** → SKILL.md（≤200 行），细节下沉 references。
- **有固定正确顺序、不需要判断的事** → 脚本或 hook，**不要写成文字**。
- **需要跨项目/跨机器复用的能力组合** → 插件。

上一轮的 200k 不是模型笨，是**把太多“确定性”交给了推理**。把这三条边界划清，同量级的 bug 压到 120k 以内是合理的预期。
**assistant [peer=github.com-tyvt-skills]**: 上一轮的边界已经清楚：先核对现有 `AGENTS.md` 和 `zentao-analyzer` 的实际体积与落点，再按 P0 把常驻边界、入口 skill 和 references 拆开。
...
**assistant [peer=github.com-tyvt-skills]**: 现状和备忘录有偏差：`AGENTS.md` 已是符号链接、约 59 行；`zentao-analyzer` 入口约 82 行，DBX 已拆出。按 P0 把仍塞在入口里的附件、worktree、提交说明下沉，并把常驻长文收成边界卡。
...
**assistant [peer=github.com-tyvt-skills]**: P0 已落到磁盘。和备忘录的前提有两处对不上，我按文件现状改，没有按“102 行 / 19k”去重写一遍。

**核对结果**

- `~/.dsh/AGENTS.md` 是指向 `dsh/AGENTS.md` 的符号链接，改一份即可。改前 59 行，不是“已经很长的手册”，但 Token、编排器阈值、收尾自查确实每轮都在。
- `zentao-analyzer/SKILL.md` 改前 82 行（约 6.9KB）。DBX 手册已经在 `DBX.md`（102 行）。上一轮那 19k 主要是整包加载，不是入口本身有 19k。
- `zentao-resolve.mjs` 仍然只打印事务序列，不执行。可执行版留在 P1，这次没动。

**已改**

| 文件 | 现在 |
|---|---|
| `dsh/AGENTS.md` | 边界卡：落地、禁止、提问与收尾。Token / 编排器细则改为一句，指向 `dsh-token-policy` |
| `dsh-token-policy/SKILL.md` | 新建。阈值、截图、编排器回退、编码默认、收尾自查 |
| `zentao-analyzer/SKILL.md` | 10 条入口 + 脚本表，子场景才读 references |
| `zentao-analyzer/references/dbx.md` | 原 DBX 手册，并写明脚本只打印、不执行 |
| `references/attach.md`、`worktree.md`、`commit.md` | 从入口拆出的附件、开工、提交 |
| `DBX.md` | 只留一行迁移指针，避免两份手册继续分叉 |

禁止项已写进常驻层：不递归列 worktree、不全仓 grep、DBX 长文本读不全就换 `git log` 或 `UNION ALL`，同一形态不连试三次。

**还没做（原 P1/P2）**

- worktree 快照 hook、`zentao-resolve.mjs` 改成真正执行并补上 `session_id`
- skill 触发频率统计、szfc 插件打包、skill lint
- `dsh-token-policy` 尚未在 `~/.dsh/skills` 建符号链接，当前会话目录里也还没有它；下次开工前需要接上，否则 AGENTS.md 里的“加载它”会落空

构建未执行：这次只改 markdown，没有可构建目标。

<!-- MEMORY_FIELDS
{
  "event_name": "dsh-token-policy技能新建",
  "goal": "迁移Token与编排策略",
  "summary": "用户建议将Token策略、编排器路由从AGENTS.md迁到skill；助手于2026-11-11新建 dsh-token-policy/SKILL.md，包含阈值、截图、编排器回退、编码默认、收尾自查，AGENTS.md仅留一句指向。",
  "ranges": "0-30,31,54,63-71",
  "source_extraction_id": "2ca078caa8e64070bda00022bb082ae8",
  "version": 1,
  "memory_type": "events"
}
-->