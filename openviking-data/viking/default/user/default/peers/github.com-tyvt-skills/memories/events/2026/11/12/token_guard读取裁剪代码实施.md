# Summary
2026-11-12，助手修改 ~/.dsh/token-guard/lib/index.js（capPwsh 结构化返回、读取类>200行头120尾40落盘）、selftest.mjs（新增测试矩阵）、cordis.patch.yml（新增 pwshReadMaxLines 等配置），node selftest.mjs 全绿，备份于 ~/.dsh/token-guard/_bak_20261112-160336，改动未提交，需重载生效。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: # 会话 token 成本分析：agent 调用可优化项

## 一、总体诊断：瓶颈是「长前缀重复计费」，不是模型啰嗦

| 指标 | 数值 | 解读 |
|---|---|---|
| 输入 / 输出 | 3.61M / 16.5k | 输入输出比 **219:1**，输出极其克制 |
| 缓存读 / 未命中 | 3.57M / 41.2k | 命中率 99%，每步增量很小 |
| 步数 | 70 步 | 平均 **51.6k tokens/步** 的上下文前缀 |
| 等效成本 | 155k（中途已告警） | 几乎全部来自反复重读的大前缀 |

**结论**：模型输出不是问题，问题是大体积工具结果一旦进入上下文，就被后续每一步重复读取。会话里 `login.vue`（1028 行读了两段）、`router/index.js`（读了三段）、远程 `index.html` 全文、基线 lint 输出等，合计占了大半前缀。**优化重点是让这些大结果尽量少进上下文。**

---

## 二、具体浪费点（按收益排序）

### 1. 用 `pwsh Get-Content` 读文件，绕过 `read` 的剪枝与 spill（最大项）

| 事件 | 行为 | 问题 |
|---|---|---|
| seq 40 | `Get-Content "...ad6fccb128c9-read.txt" \| Select-Object -Skip 400` | 先 `read` 产生 spill，再用 pwsh 读 spill 文件，结果只回了几行，**纯浪费一次往返 + 一段输出** |
| seq 82 / 94 / 221 | `Get-Content auth.js / router/index.js / request.js \| Select-Object -First N` | 这些文件 `read` 工具本来支持 offset/limit，pwsh 输出是**未剪枝原文**直接进上下文 |
| seq 116 | `Invoke-WebRequest ... $r.Content` 打印整个 `index.html` | 只为了确认构建 commit / script 标签，却灌入 5KB+ 全文 |

**替代做法**：源文件一律 `read`（带 offset/limit）；HTML 用 `grep` 找 `<script src` / `build-info`；spill 文件用 `read` 加 offset 读，不要 pwsh 二次搬运。按这个改，前缀预计可降 **30%–40%**。

### 2. 重复探测 / 失败重试，白白烧掉 10+ 次往返

| 事件 | 尝试 | 结果 |
|---|---|---|
| seq 123 → 130 → 144 | `Invoke-WebRequest` header 构造 3 次 | 第一次把 `@{...}` 当字符串传 `-Headers` 报错；第二次命令里混入 `iars` 拼写错误；第三次才成功 |
| seq 137 | 一次探测 `/prod-api`、`/api`、`/system` 三个前缀 | 但 `VITE_APP_BASE_API='api/v2.0'` 其实早就该先读出来 |
| seq 158 → 165 → 172 → 179 | 找 `.env` 文件 4 次 | 一直在 `zhi2-web-admin/` 下找，最后 `cmd /c dir env` 才发现文件在**父仓的 `env/` 目录** |
| seq 52 | `grep permission.js` | 文件不存在，直接报错 |

**替代做法**：涉及路径未知的探索，先用 `glob "**/.env*"` / `glob "**/permission*.js"` 一次定位；读 env 应排在最前（它是 baseURL 的唯一真源）；PowerShell 构造 `-Headers` 应一次性写好字典对象，或用 `curl.exe` 更稳。

### 3. `orchestrate plan_review` 基本空转（8.2k 编排 token）

编排器在 `cwd=D:\repository\skills\dsh\langgraph-orchestrator` 下执行，它去读 `src/router/index.js` 当然找不到；`planner` 模型调用直接失败（`planner model=null ok=false`）；最后 summarize 给出的结论自己都承认「**未能拿到真实代码做逐行比对**」。等于花了 8.2k token 换来一份静态意见。

**替代做法**：送审时**把关键代码片段内联进 request**，而不是让编排器去文件系统里找；或者对「审一段 50 行 diff」这种小任务，直接用一次普通模型调用，不必走 `op:"full"` 的 decompose→dispatch。

### 4. `eslint --fix` 改了无关历史行，又写脚本还原（seq 343 → 357）

`--fix` 把 20+ 处历史 `arrow-parens` 全改了，导致 diff 从 50 行膨胀到 79 行，然后又写一段 PowerShell `foreach` 替换还原。这是**自找的两轮往返**。

**替代做法**：先跑基线（seq 329 已经做过），确认基线 15 个错误后，直接**手工只改自己新增的行**，或 `eslint --fix` 后只 `git checkout -p` 挑回无关行——但更省的是：新增代码从一开始就写成项目风格（带括号），根本不用 `--fix`。

### 5. 交互与门禁的重复确认

- 三次 `ask_user_question`：`scope`（seq 235）、`confirm`（seq 296）、`commit`（seq 400）。
- `scope` 那次用户明确说了「先出修复计划」，其实可以直接按推荐方案走，**省一轮**。
- `confirm` 是计划门禁硬性要求，保留。
- `commit` 是仓库规则要求，保留。

### 6. `pwsh` 每次都是独立 job，产生大量 `job/registered` / `job/settled` 事件

整个会话 30+ 次 pwsh，每次一对 job 事件，这些事件本身也占上下文。短命令（`Select-String`、`cmd dir`）应尽量合并成一次 pwsh 调用里的多条语句。

---

## 三、量化估算（可省多少）

| 优化项 | 预计节省 |
|---|---|
| 源文件/HTML 改用 `read`+`grep` 窄读取 | 前缀降 30%–40%，约 **40–55k 等效成本** |
| env / API 前缀 / header 探测各合并为 1–2 次 | 少 ~10 次往返，约 **8–12k** |
| plan_review 内联代码替代编排器读盘 | 省 **8k 编排 token** + 一次失败重试 |
| 避免 `--fix` 误改无关行 | 少 2 轮往返，约 **3–5k** |

**合计可省约 60–80k 等效成本（当前 155k 的 40%–50%）。**

---

## 四、可固化成规则的建议

1. **读文件纪律**：源文件只用 `read`（offset/limit），HTML/JSON 用 `grep` 定位，spill 文件用 `read` 续读——禁止 `pwsh Get-Content` 读源文件。
2. **未知路径先 glob**：`**/.env*`、`**/*.config.js` 一次定位，禁止连续 3 次以上 `Get-ChildItem` 猜目录。
3. **编排器审小改动**：把 diff/关键片段内联进 `request`，不让编排器自己去读盘；小任务不走 `op:"full"`。
4. **`--fix` 只修自己新增行**：改完先 `git diff` 看是否误伤历史行。
5. **交互合并**：用户已表态的方案选择不再重复问。
**assistant [peer=github.com-tyvt-skills]**: I'll start by understanding the current state and what teammates are available.
...
**assistant [peer=github.com-tyvt-skills]**: The plan has been approved by the senior reviewer. Now, per the mandatory workflow, I need your human confirmation before touching the live plugin code. Here's the summary:

**计划：token-guard 给「非 build 类 pwsh 大输出」加头尾裁剪 + 落盘**

- **改什么**：`~/.dsh/token-guard/lib/index.js` 的 `capPwsh` 从「只管 build/lint/test」扩展到也管**读取类** pwsh（`Get-Content`/`Select-String`/`Get-ChildItem`/`gc`/`cat`/`type`/`more` 等）。
- **怎么裁**：读取类输出 ≤200 行原样；超过则保留头 120 + 尾 40，中间折叠成「省略N行」提示，并把**全文落盘**（可 read 回读）——直接命中分析里「用 Get-Content 读源文件灌满上下文」这个最大浪费项。
- **保底**：build 分支裁剪文本**逐字不变**（`npm test` 基线必过）；`text:null` 表示不改原文；落盘失败也返回有界文本、绝不回灌全文。
- **配置**：新增 `pwshReadMaxLines/pwshHeadLines/pwshTailLines`（默认 200/120/40，可配）。
- **影响面**：只影响 pwsh 的读取类大输出；普通命令与 build 零影响。改完跑 `node selftest.mjs` 全绿。**插件生效需重载**（本会话内以 selftest 证明逻辑，生效项会如实标注）。
- **回滚**：还原三个文件即可。
**assistant [peer=github.com-tyvt-skills]**: Confirmed. Let me update the plan status to approved, then implement. First mark it human-confirmed.
**assistant [peer=github.com-tyvt-skills]**: Now implement. First back up the three files, then edit `lib/index.js`. Let me back up.
**assistant [peer=github.com-tyvt-skills]**: Now edit `lib/index.js`. First, add config fields to `normalizeConfig`:
**assistant [peer=github.com-tyvt-skills]**: Now replace `capPwsh` with the structured-return version, and add the READ_CMD regex. Let me edit.
**assistant [peer=github.com-tyvt-skills]**: Now update `cappedText` to return structured objects for all branches, and pass pwsh config. Let me read the current `cappedText`/`apply` region.
**assistant [peer=github.com-tyvt-skills]**: Now I'll rewrite `cappedText` to return structured `{text, spillRequested}` for all branches, and rewrite the `apply` post-execute handler to handle the new semantics (including `text===null` keeps original, spill driven by `spillRequested`, spill uses pre-trim original, bounded fallback).
**assistant [peer=github.com-tyvt-skills]**: Now there's a subtle issue: for non-pwsh non-trimmed tools, I now `return decision` at `capped.text === null`, which is correct. But for read/grep/skill that DO trim but aren't "watched" (e.g. grep), previously it returned `{kind:accept, content}` (trimmed). With my new code, if `spillRequested` is false (grep/read/skill/orchestrate all false), it falls to the "其它工具沿用旧逻辑" block: `if (!watched.has(exec.name) || priceContent<=threshold) return {kind:accept, content}`. Good — grep not watched → returns trimmed content. read is watched → if price>threshold does spill, else returns trimmed. That preserves old behavior.

Let me verify the full edited file reads correctly and run a syntax check.
**assistant [peer=github.com-tyvt-skills]**: Now update `selftest.mjs` with the new test matrix. First I need to update existing pwsh test (it now expects structured handling — the existing test at L102-109 uses `capHandler` which is the post-execute handler, so it still validates the output text). But the existing pwsh test used `readBudgetTokens: 100000, inlineTokens: 1000` config — with `npm test` build path, it returns `[警告]...` which is < threshold, so it returns `{kind:accept, content:[{text:[警告]...}]}`. Good, the existing assertions still hold since output starts with `[警告]` and includes the substrings.

Let me add new test cases. I'll append before the final `console.log`.
**assistant [peer=github.com-tyvt-skills]**: The existing build test at L102-109 uses `capHandler` (config: readBudgetTokens 100000, inlineTokens 1000). Build path returns spillRequested=false text `[警告]...`. In my new handler: `capped.text !== null` → content replaced, then `spillRequested===true`? no. Falls to "其它工具" block: `watched.has('pwsh')` is now true, `priceContent(content) <= threshold(100000)`? The [警告] text is small → `return {kind:accept, content}`. Good, assertions pass. Also asserts `spillRequested` should be false & saveText=0 — but `capHandler`'s spillStore saveText is a no-op stub returning `{locator:'x'}`. Let me add explicit saveText call counting and the new read-class tests. Let me append the new block before final console.log.
**assistant [peer=github.com-tyvt-skills]**: The first old test (read big text) failed: `saved.text` is undefined. That's the read-tool spill test at top (L27-38). My handler change: for `read` with big text, `capped.text` — read gate at 300 lines: bigText is 2000 chars of 'x' = 1 line, so not >300 lines → `{text:null}`. Then `capped.text===null` → `return decision` — **this skips the old read-spill path**! Previously, read with big single-line text (2000 chars ≈ 500 tokens > threshold 100) would fall through to spill. Now null returns decision immediately.

The old behavior: `shortened` null → keep content → `watched.has('read')` true → priceContent(500)>threshold(100) → spill. I broke this by returning decision on `text===null` unconditionally. The `text===null` "keep original" return should only short-circuit for pwsh; for other watched tools (read), it must still fall through to the size-based spill.

Let me fix: only short-circuit on null for pwsh (or generally, but then continue to the watched/price-based spill for non-pwsh). Restructure: don't early-return; set content = original when null, then continue to the size-based spill block for non-pwsh.
**assistant [peer=github.com-tyvt-skills]**: Wait — there's a subtle bug: for non-watched tools (grep etc) that DID trim (capped.text !== null), old code returned `{kind:accept, content}` (trimmed). My new line `return capped.text !== null ? {kind:accept, content} : decision;` handles that. For watched non-trimmed (read, null) with price<=threshold → returns `decision` (unchanged). Good. For read null and price>threshold → falls through to spill. Good.

Let me re-run selftest.
**assistant [peer=github.com-tyvt-skills]**: All tests pass, including the new read-class cases and preserving all old ones. Now update `cordis.patch.yml` to expose the config (optional but plan says add).
**assistant [peer=github.com-tyvt-skills]**: Now run the full selftest once more to confirm nothing broke, and update todos. Also let me double-check: does the plugin reload automatically, or does the change need a session restart? Since the plugin is loaded in-process, changes take effect on reload/restart. But the selftest runs the module fresh, proving logic. Let me do a final verification pass and confirm the edited file is coherent.
**assistant [peer=github.com-tyvt-skills]**: Selftest passes. Let me produce a clean diff for review against the backup, so I can verify the changes are exactly as intended (Lead should review the final diff).
**assistant [peer=github.com-tyvt-skills]**: Diff is as intended: index.js refactored capPwsh/cappedText/apply (+116/−31), selftest +93 new lines, config +4. Let me update todos and clean up review scripts.
**assistant [peer=github.com-tyvt-skills]**: Let me verify there are no leftover background jobs, then give the final summary.
**assistant [peer=github.com-tyvt-skills]**: All background jobs are completed (nothing running). Here's the completion summary.

## 完成：token-guard 已按计划改造（selftest 全绿）

按你贴的成本分析「第二节#1 最大浪费项——用 `pwsh Get-Content` 读源文件灌满上下文」做的针对性改动。全程遵循强制计划门禁：**计划先送审、经 3 轮 reject→修订、第 4 轮 grok approve，再由你确认后才动代码**。

### 改了什么（`~/.dsh/token-guard/`）
| 文件 | 改动 |
|---|---|
| `lib/index.js` | `capPwsh` 改结构化返回 `{text,spillRequested,omittedLines}`；build 分支**逐字保留**；新增读取类（`Get-Content`/`Select-String`/`Get-ChildItem`/`gc`/`cat`/`type`/`more` 等）裁剪：>200 行→头 120+尾 40+落盘。`apply` 落盘由 `spillRequested` 驱动（用裁剪前原文落盘、保证可回读），落盘失败返回**有界**文本不灌全文。`text:null` 表示不改原文（不清空）。 |
| `selftest.mjs` | 新增测试矩阵：默认 250 行→`省略90行`、非默认配置→`省略51行`、20 行原样、build 回归、build 负向不误伤、别名/大小写、spill 失败有界、saveText 次数。 |
| `cordis.patch.yml` | 新增 `pwshReadMaxLines/pwshHeadLines/pwshTailLines`（200/120/40）。 |

### 验证
- `node selftest.mjs` → **ALL PASS**（含全部原有用例 + 新增读取类用例）。
- diff：`index.js` +116/−31、`selftest.mjs` +93、config +4；备份在 `~/.dsh/token-guard/_bak_20261112-160336`。
- 未执行项：**插件生效需重载/重启会话**——本会话内以 selftest 证明逻辑正确，重载后对实际会话生效。

### 需要客测确认点
1. 真实 `Get-Content 大文件` 现在应返回头尾+「省略N行」+落盘路径，而非全文；`read offset/limit` 可回读。
2. `npm run build` 等 build 输出裁剪格式**不变**（仍 `[警告]...省略 N 行错误`）。

该 token-guard 目录是 `~/.dsh` 下的插件（非 `D:\repository\skills` 的 git 仓库）。需要我把这次改动**提交**吗，还是**暂不处理**（保持文件已改、未提交）？

相关文件：计划 [token-guard-pwsh-read-cap.md](.plan/token-guard-pwsh-read-cap.md)

<!-- MEMORY_FIELDS
{
  "event_name": "token_guard读取裁剪代码实施",
  "goal": "记录代码改造完成",
  "summary": "2026-11-12，助手修改 ~/.dsh/token-guard/lib/index.js（capPwsh 结构化返回、读取类>200行头120尾40落盘）、selftest.mjs（新增测试矩阵）、cordis.patch.yml（新增 pwshReadMaxLines 等配置），node selftest.mjs 全绿，备份于 ~/.dsh/token-guard/_bak_20261112-160336，改动未提交，需重载生效。",
  "ranges": "0-26,142-193",
  "source_extraction_id": "2a76057ea4d44a3e8b5b64e97cc32fc5",
  "version": 1,
  "memory_type": "events"
}
-->