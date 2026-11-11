# session.v4.json 审计优化落地报告

- 日期：2026-11-11
- 范围：用户选择「落地全部可实现项（P0–P5）」
- 代码仓：`D:\repository\skills`（DSH 插件与技能）
- 结论：**19 条里 13 条已落成可运行的代码/规则/脚本，6 条受平台限制只能标注（其中 2 条已有等价缓解、1 条审计本身滞后已于早前实现）。**

## 一、逐条落地状态

| 编号 | 审计建议 | 状态 | 落点 |
|---|---|---|---|
| P0-1 | grep 结果分级：>20 命中只回文件清单+计数 | ✅ 已落地 | `dsh/token-guard/lib/index.js` `capGrep`/`grepStats` |
| P0-2 | read 大文件门禁：无 offset/limit 且 >300 行不回内容 | ✅ 已落地 | `dsh/token-guard/lib/index.js` `cappedText`(read) |
| P0-3 | 禁用递归列举（`Get-ChildItem -Recurse` / `-r` / `/s`） | ✅ 已落地 | `dsh/agent-guard/lib/scope.js` `decidePwshInterception` |
| P0-4 | cost-meter 触发后的工具白名单 | 🟡 行为层已落地 | `dsh/cost-meter/lib/index.js`（连续大未命中→白名单文案）；硬工具白名单需跨插件共享状态，属平台限制，结构层由 P0-2/P0-3 拦截兜底 |
| P1-5 | pwsh POSIX 预检（head/tail/cat 改写，grep/sed/awk/wc/find 告警） | ✅ 已落地 | `dsh/agent-guard/lib/rules.js` `repairPwshPosix` |
| P1-6 | glob 绝对路径分隔符规范化（`/`→`\`） | ✅ 已落地 | `dsh/agent-guard/lib/rules.js` `repairGlobPath` |
| P1-7 | 重复读取检测（同会话重复整读拒绝） | ✅ 已落地 | `dsh/agent-guard/lib/rules.js` `shouldRejectDuplicateRead` + `lib/index.js` |
| P1-8 | SQL 合并 / 长文本先 LENGTH 再分段 | ✅ 已落地（规则） | `zentao-analyzer/references/dbx.md` |
| P2-9 | 流中截断推理 | ❌ 平台限制 | 生成过程无法拦截；现有 cost-meter 下一步升级提醒已缓解 |
| P2-10 | 按阶段调 reasoningEffort | ❌ 平台限制 | `reasoningEffort` 在 turn 开始时固定，pre-step 只能在 enter/reject 间选 |
| P3-11 | 意图→todo 自动外化 | ✅ 已落地 | `dsh/cost-meter/lib/index.js` `intentTodo` |
| P3-12 | 改前 build 基线 | ✅ 已落地 | `dsh/cost-meter/lib/index.js` `buildBaseline` |
| P3-13 | 验证证据门禁 | ✅ 已落地 | `dsh/cost-meter/lib/index.js` `closingCheck` 文案 |
| P3-14 | ahead/behind 语义封装 | ✅ 已落地 | `submodule-commit/scripts/git-ab.mjs` + `SKILL.md` |
| P4-15 | 技能 catalog 瘦身 | ❌/🟡 平台注入层控制 | 由 DSH 本体生成 catalog，插件改不到描述注入 |
| P4-16 | AGENTS.md 分级（AGENTS.d） | ❌/🟡 平台 include 支持 | 需要 DSH 本体支持按任务注入子文件 |
| P4-17 | 稳定前缀 cache | ❌ 平台限制 | 前缀由平台注入层决定 |
| P5-18 | dbx 复合事务工具 | ❌ 平台限制 | MCP 服务端工具，非本地插件可加；`zentao-resolve.mjs` 已固化 8 步序列 |
| P5-19 | resolve `--comment-b64` / `--execute` | ✅ 部分（b64 早已支持） | 审计滞后：`zentao-resolve.mjs` 已支持 `--comment-file`/`--comment-b64`；`--execute` 需 MCP 会话编排，平台限制 |

## 二、改动文件

| 文件 | 改动 |
|---|---|
| `dsh/agent-guard/lib/rules.js` | 新增 `repairPwshPosix`(P1-5)、`repairGlobPath`(P1-6)、`isWholeFileRead`/`shouldRejectDuplicateRead`(P1-7)；挂入 `repairArguments` semantics |
| `dsh/agent-guard/lib/scope.js` | `decideInterception` 新增 pwsh 递归列举拦截(P0-3) |
| `dsh/agent-guard/lib/index.js` | 按 session 维护已整读集合，guard 内重复整读拒绝(P1-7) |
| `dsh/agent-guard/selftest.mjs` | 4 条规则正例+不误伤用例 |
| `dsh/token-guard/lib/index.js` | grep 折叠为文件清单(P0-1)、read 门禁(P0-2) |
| `dsh/token-guard/selftest.mjs` | 同步 4 条新用例 |
| `dsh/cost-meter/lib/index.js` | 白名单文案(P0-4)、intentTodo(P3-11)、buildBaseline(P3-12)、closingCheck(P3-13)，acc 工厂化 |
| `dsh/cost-meter/selftest.mjs` | 3 组新用例 |
| `submodule-commit/scripts/git-ab.mjs` | 新增 ahead/behind 封装脚本(P3-14) |
| `submodule-commit/SKILL.md` | 步骤 0/5 改用 git-ab.mjs |
| `zentao-analyzer/references/dbx.md` | SQL 合并/长文本规则(P1-8)、回写链路现状(P5-18/19) |
| `dsh-token-policy/SKILL.md` | 新增「运行时守卫」「平台限制」两节 |

## 三、验证证据

```
agent-guard : node --check 全部通过；node selftest.mjs → PASS passed=79 failed=0
token-guard : node --check 通过；node selftest.mjs → token-guard selftest: ALL PASS
cost-meter  : node --check 通过；node selftest.mjs → cost-meter selftest: ALL PASS
git-ab.mjs  : 在 skills 仓实测 → ahead=8 behind=0 upstream=origin/main（冒烟通过）
```
> cost-meter 的 `session.v4.jsonl` 夹具本机不存在（`C:/Users/Administrator/Downloads/`），夹具区块按原逻辑跳过；新增 P3-11/P3-12/P0-4 用例在夹具检查之前执行并通过。

## 四、生效方式与注意

- 三插件为 profile 外零依赖 bundle，改动在**下次 DSH 会话/profile 重载**后生效；当前会话已在运行的实例不热更新。
- P0-1/P0-2 是**结果侧裁剪**（工具照常执行，只改回给模型的内容），不影响工具语义。
- P0-3/P1-7 是**执行前拒绝**：返回字符串即拒绝并把改法回给模型，不会真正执行该命令。
- P1-5 只自动改写 `head/tail/cat` 三种语义唯一的命令；`grep/sed/awk/wc/find` 仅告警不改命令，避免改写语义出错。
- P0-2 的 300 行门禁为硬编码；如需按仓调整，可在 `dsh/token-guard` 后续加 config（本次未加，保持零配置）。
