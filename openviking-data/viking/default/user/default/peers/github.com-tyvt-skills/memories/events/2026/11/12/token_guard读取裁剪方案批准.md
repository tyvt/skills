# Summary
2026-11-12，针对 token-guard 插件增加非 build 类 pwsh 大输出头尾裁剪与落盘的改造方案，经 senior reviewer (cursor/grok-4.7@256k) 四轮评审第4轮批准，并由用户确认后实施。
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
**assistant [peer=github.com-tyvt-skills]**: Plan written. Now send it for senior-model review via the orchestrator's `plan_review`. Per the analysis's own lesson (#3: don't let the orchestrator read files it can't find), I'll inline the key code context into the request. Let me check what op the orchestrator exposes.
**assistant [peer=github.com-tyvt-skills]**: `plan_review` is an op. The reviewer is `cursor/grok-4.7@256k`. Let me submit the plan with the key code inlined so the reviewer doesn't need to read disk.
**assistant [peer=github.com-tyvt-skills]**: The reviewer rejected with substantive, valid issues. Key fixes needed:
1. Branch ordering: build/lint/test checked first (short-circuit) before read-class.
2. `capPwsh` should return a structured `{text, spillRequested, omittedLines}` rather than `string|null` to carry spill intent cleanly.
3. Threshold math: head 120 + tail 40 = 160 retained; omitted = total − 160. Rename for clarity.
4. spill failure must still return bounded text, not full original.
5. build-class never spills; read-class spills once only.
6. Add tests: negative cases (npm test/build/pnpm lint not caught by read), Select-String case, -Type/more, spill-failure, build-no-spill.

Let me revise the plan to address all of these, then resubmit.
**assistant [peer=github.com-tyvt-skills]**: Now resubmit the revised plan for review.
**assistant [peer=github.com-tyvt-skills]**: The planner model was unavailable this round. Let me retry the review once with the same reviewer.
**assistant [peer=github.com-tyvt-skills]**: The orchestrator's planner pool (`workbuddy/deepseek-v4.1-flash`) is down — it's failing structurally, not producing real reviews. The `plan_reviewer` pool is `cursor/grok-4.7@256k`, but the `plan_review` op routes through the planner step first and that's what's failing. Let me check health and try a direct call to the reviewer model via a single tool, bypassing the two-step plan routing.
**assistant [peer=github.com-tyvt-skills]**: The gateway is up and `cursor/grok-4.7@256k` exists. The `plan_review` op's internal planner step (`workbuddy/deepseek-v4.1-flash`) is what's failing. Let me call the reviewer model directly via the chat completions endpoint, so the plan gets a genuine senior review.
**assistant [peer=github.com-tyvt-skills]**: Escaping issue in the heredoc. Let me write the request body to a file and post it with curl.
**assistant [peer=github.com-tyvt-skills]**: Grok timed out too. Let me check whether this model endpoint is actually responsive with a tiny call, and check gateway logs/health.
**assistant [peer=github.com-tyvt-skills]**: Grok works but is slow (~9s for 10 tokens). A full plan review with ~2k output tokens may exceed 120s. Let me give it more time and run in background while I prepare. Actually — the review is the blocker. Let me just run with a longer timeout in background.
**assistant [peer=github.com-tyvt-skills]**: While that runs, let me verify the plan's technical soundness myself by checking a couple of facts: how `capGrep`/`capOrchestrate` etc. return, and whether my structured-return plan touches the `cappedText` callers correctly. I already have the full `apply`/`cappedText` code. Let me wait for the review and meanwhile note: I should also confirm the plan file has no issues with the actual `retainContent`/`formatNotice` signatures (already read — they take `content` array and `ref`). My plan is consistent.

Let me wait for the review.
**assistant [peer=github.com-tyvt-skills]**: Grok consistently times out on the full plan. The plugin review pipeline is unreliable. Let me take a different approach: reduce the review to the essential decision content (not the full plan file) with a hard timeout, and treat this as a genuine review check.
**assistant [peer=github.com-tyvt-skills]**: The `@(...)` array of hashtable in a one-liner with quoted strings is breaking the parser. Let me write it as a proper script file.
**assistant [peer=github.com-tyvt-skills]**: The response has mojibake (encoding) but it's a real review. Decoding the issues:
1. build 分支"文本逐字不变"可能被实现成"直接返回未裁剪原文"，破坏回归（[警告]/省略15行错误/error line 29 必须仍成立）—— build 裁剪必须独立保留，spillRequested=false。
2. 读取类超200行才先出头120+尾40，但又要求 price>threshold 才落盘，两个阈值不一致：price 是裁剪后文本判断，裁剪后可能不超 threshold → 全文既不落盘也不进上下文 = 内容丢失，与"spill失败才返回有界文本"矛盾。
3. pwshReadMaxLines(200) 硬编码 vs 头120+尾40+省略total-160：200 是触发上限，201 行只保留160行，说明 >200 才触发，数字一致性问题；head+tail 关系未约束。
4. 补：阈值需要校验 head+tail<=maxLines，省略=total-head-tail，只有 total>maxLines 才裁。
5. 读取类大小写/别名 token 匹配，type/more 子串误判；gc/cat/ls/dir 别名是否算读取且非build。
6. selftest 具体期望：Get-Content 250行省略90行(250-120-40)头120尾40, spillRequested=true 且非原文; 20行原样; select-string大小写; spill抛错有界; npm test回归; build后saveText=0。

These are valid refinements. Let me address them precisely, then resubmit for a third round.
**assistant [peer=github.com-tyvt-skills]**: Now let me revise the key sections to resolve the 3 issues: (A) decouple capPwsh's own threshold from spill threshold — if already trimmed by capPwsh, prevent full-text loss; (B) explicit head/tail/max config with validation; (C) clarify build branch独立返回裁剪文本; (D) precise selftest expectations (250→省略90行).
**assistant [peer=github.com-tyvt-skills]**: Now update the selftest matrix with precise expectations (250→省略90行, spillRequested true; build uncut baseline; negative cases; saveText=0 for build).
**assistant [peer=github.com-tyvt-skills]**: Now resubmit round 3 to grok with the revised plan (compact), in background.
**assistant [peer=github.com-tyvt-skills]**: Round 3 reject with two precise, valid issues:
1. **Literal 200/120/40 vs configurable conflict**: Plan #1 hardcodes "省略=total-160" while #5 says configurable with `省略=total-head-tail`. Must resolve config FIRST, then trim using resolved head/tail/max.
2. **`text:null` handling**: Must explicitly state that `text===null` means **do not replace content** (keep original), otherwise empty-string would wipe content.

Plus suggestions: exact substring matching (`省略 15 行错误` with space for build vs `省略90行` no space for read), saveText=pre-trim fullTextOf, and a non-default config test (max=100/head=30/tail=20/total=101→省略51行).

Both are real defects. Let me fix the plan precisely.
**assistant [peer=github.com-tyvt-skills]**: Now update §5 config wording (resolve-first) and §6 selftest (exact substrings + non-default config case). Let me read current §5/§6.
**assistant [peer=github.com-tyvt-skills]**: Now round 4 review. Update the review script prompt to reflect the fixes for these two issues.
**assistant [peer=github.com-tyvt-skills]**: The revised plan is **approved** by the senior reviewer (`cursor/grok-4.7@256k`), with no issues and no suggestions. Let me update the plan frontmatter and todo, then get your human confirmation as the mandatory gate requires before any code edit.
**assistant [peer=github.com-tyvt-skills]**: The plan has been approved by the senior reviewer. Now, per the mandatory workflow, I need your human confirmation before touching the live plugin code. Here's the summary:

**计划：token-guard 给「非 build 类 pwsh 大输出」加头尾裁剪 + 落盘**

- **改什么**：`~/.dsh/token-guard/lib/index.js` 的 `capPwsh` 从「只管 build/lint/test」扩展到也管**读取类** pwsh（`Get-Content`/`Select-String`/`Get-ChildItem`/`gc`/`cat`/`type`/`more` 等）。
- **怎么裁**：读取类输出 ≤200 行原样；超过则保留头 120 + 尾 40，中间折叠成「省略N行」提示，并把**全文落盘**（可 read 回读）——直接命中分析里「用 Get-Content 读源文件灌满上下文」这个最大浪费项。
- **保底**：build 分支裁剪文本**逐字不变**（`npm test` 基线必过）；`text:null` 表示不改原文；落盘失败也返回有界文本、绝不回灌全文。
- **配置**：新增 `pwshReadMaxLines/pwshHeadLines/pwshTailLines`（默认 200/120/40，可配）。
- **影响面**：只影响 pwsh 的读取类大输出；普通命令与 build 零影响。改完跑 `node selftest.mjs` 全绿。**插件生效需重载**（本会话内以 selftest 证明逻辑，生效项会如实标注）。
- **回滚**：还原三个文件即可。
**assistant [peer=github.com-tyvt-skills]**: Confirmed. Let me update the plan status to approved, then implement. First mark it human-confirmed.

<!-- MEMORY_FIELDS
{
  "event_name": "token_guard读取裁剪方案批准",
  "goal": "记录方案评审通过",
  "summary": "2026-11-12，针对 token-guard 插件增加非 build 类 pwsh 大输出头尾裁剪与落盘的改造方案，经 senior reviewer (cursor/grok-4.7@256k) 四轮评审第4轮批准，并由用户确认后实施。",
  "ranges": "0-26,75-144",
  "source_extraction_id": "2a76057ea4d44a3e8b5b64e97cc32fc5",
  "version": 1,
  "memory_type": "events"
}
-->