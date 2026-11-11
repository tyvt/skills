# Summary
2026-11-11 cost-meter 插件新增 bareReasoningEscalate 规则：连续第 2 个纯推理步（规则 A 连续触发）从软提示升格为「下一步第一件事必须是工具调用」，对应审计 P0#1；maxReasoningTokens 硬上限经核实不可行（reasoningEffort 在 turn 开始固定，pre-step 仅能 enter/reject 无法中途降档）。selftest 新增 3 用例全绿，改动随提交 db769807 落地（仅提交未推送）。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 下面按「日志证据 → DSH 可落地的改进」组织。证据都取自你这份 `session.v4.json` 的 seq 与 token 计数。

## 一、最大浪费：推理空转（reasoning-only step）

**证据**
- `cost-meter` 连续触发 `bareReasoning`：step 13 输出 3k、step 18 输出 8k、step 20 输出 4k、step 32 输出 3k，且都「无工具调用」。
- step 13 单步 `outputTokens: 4985`，step 18 `7666`，step 32 `3380`，全是 reasoning 文本。
- 内容形态高度重复：反复罗列「Option A/B/C」「我到底要不要看截图」「要不要改 fetchHome」，正是 `AGENTS.md` 明令禁止的「Option 1/2/3 并列推演」。

**DSH 建议**
1. 把 `cost-meter` 的 `bareReasoning` 从「提示」升级为**硬中断**：同一 turn 连续 2 个无工具调用的 step 后，强制注入一条 user 消息「必须下一步调用工具或直接收尾」，并暂时下调 `reasoningEffort`。
2. 在 system prompt 增加**反空转条款**并给判定词：「出现 Option 1/2/3、『要不要』、『我纠结』即视为缺事实，立即调一条命令取数」。
3. 对 `auto/hy3` 的 `low` 档加 `maxReasoningTokens` 上限（日志证明 low 仍会产 5k+ reasoning，档位没压住）。

## 二、大文件整读，随后被压缩「白读」

**证据**
- 整读 `home/index.vue`(208 行)、`portalData.ts`(302 行)、`api/portal.ts`(209 行)、`mine/index.vue`(358 行)、`list/index.vue`(219 行)。
- 紧接着 `compaction/prune` 把这些结果全部 shadowed（seq 86/91/96/101/120/125/185），`shadowedTokenCount: 25800`；step 24 又 `read portalData.ts offset:125` 重读，step 27 再读 `portal.ts`。
- 这就是典型的「读进来 → 压缩掉 → 再读一遍」。

**DSH 建议**
1. `read` 工具加**读前守卫**：文件 >150 行且本 turn 未先 `grep` 该文件时，返回提示而非直接全文（提示模板可复用 `zentao-analyzer` 的「grep 定位后 read offset/limit」）。
2. **压缩保留策略**：prune 时优先保留「被 edit 过 / 被后续 step 引用」的文件片段，而不是整段丢弃。日志里 `portalData.ts` 被编辑后又被 prune，直接导致重读。
3. 提供**文件摘要缓存**：同一 turn 内二次 read 同一文件时返回 digest + 变更 diff。

## 三、工具参数错误的无谓重试

**证据**
- `grep include: "*.ts,*.vue"` 报错 `include must be one glob`（seq 148→149），再试 `*.{ts,vue}` 才成（seq 155）。
- `git rev-parse ... @{u}` 在 pwsh 里被当 hash literal，`ParserError`（seq 338→341），加引号 `'@{u}'` 才成（seq 345）。

**DSH 建议**
1. 错误返回里**直接给修正后的调用**：`did you mean include: "*.{ts,vue}"?` / `PowerShell 中 @{...} 是哈希字面量，git 的 @{u} 需加引号`。比让模型自己重试省一轮。
2. pwsh 工具可在发送前做**预解析 lint**，命中 `@{` 且非 hash 语境时告警。
3. 把 `tool-call-hygiene` 的「INVALID_ARGS 自愈」做成**运行时自动重试一次**（工具层），而不是等模型自己读 skill。

## 四、环境问题未预检

**证据**
- step 29 跑 `npx vitest` 直接 `ERR_PACKAGE_PATH_NOT_EXPORTED`（vitest 5.0.5 与 vite 5.2.8 不匹配），step 30-31 才改用 `vue-tsc`。

**DSH 建议**
1. 会话初始化做一次**轻量环境探测**（node/npm/bun 版本、关键依赖可解析性），结果写入 runtime context，避免 agent 现场踩坑。
2. 维护**命令失败缓存**：同一条 test/build 命令失败后，本 turn 内不再重试，直接走备用路径。

## 五、Skill 引用文件一次性加载

**证据**
- `zentao-analyzer` 明说「细节按需加载」，但 agent 一次性读了 `dbx.md`(90 行)+`worktree.md`+`attach.md`。
- 压缩后 `dbx.md` 又被 `replace` 回填（seq 197，shadowedRange 32），说明 skill 内容也被压了。

**DSH 建议**
1. 注入 `skill_content` 时，对 `references/*` 做**懒加载占位**：只给「文件名 + 何时读」，不让模型主动全文 read。
2. skill 正文/引用应标记为**高优先级、不参与压缩**，避免「压了又回填」的抖动。

## 六、截图决策反复纠结

**证据**
- step 13/14/17 花大段 reasoning 权衡「43k token 截图要不要看」，最终没看。

**DSH 建议**
1. 在 system prompt 注入**截图默认策略**：文案/显隐/单字段/计数口径类默认不看；涉及布局/像素/多字段对照才看。
2. `analyze_image` 提供**低成本模式**（指定区域 OCR / 关键字段提取），替代整图 43k。

## 七、重复注入与上下文过载

**证据**
- skill catalog 在 seq 16 与 seq 304 各注入一次完整列表。
- OpenViking memory 在 seq 3 与 seq 17 重复；runtime context 在 seq 15 与 seq 303 重复。
- step 1 首步 `perStep` 未命中就 **17k**（system prompt + 全部 tools + memory + catalog 过大）。

**DSH 建议**
1. catalog/memory/runtime snapshot 改为**增量 diff 注入**，只在变化时发 delta。
2. tools 做**按需注册**（MCP 工具懒暴露），首屏别把所有工具 schema 塞满。

## 八、压缩时机

**证据**
- compaction 在 step 18 后触发，但 agent 还在「探索期」（没开始写），压缩后立刻要重读。

**DSH 建议**
- 压缩前判断阶段：探索期（未发生 edit）少压、保留最近读取文件索引；实现期再激进压缩。
- 压缩摘要里带上**关键代码骨架**（如 `fetchHome` 的 Promise.all 结构），而不是只写「已读 portalData.ts」。

## 九、会话结构与 step 预算

**证据**
- turn 1 共 48 个 step，大量是 reasoning-only + 一次 text 收尾。

**DSH 建议**
- 给 turn 设**step budget**（如 30），接近上限时强制「总结 + 收尾」，避免无限打磨。

## 优先级建议（投入产出比）

| 优先级 | 改进 | 预计收益 |
|---|---|---|
| P0 | reasoning 空转硬中断 + maxReasoningTokens | 直接砍掉本会话最大浪费（多步 3–8k） |
| P0 | read 读前守卫 + 压缩保留已编辑文件 | 消除「白读→重读」循环（≈25k+） |
| P1 | 工具错误返回修正建议 / 自动重试一次 | 省 2–4 轮无效 step |
| P1 | 增量注入 catalog/memory/tools 懒注册 | 降低首步 17k 未命中 |
| P2 | 环境预检 + 命令失败缓存 | 避免 vitest 类踩坑 |
| P2 | 截图默认策略 + 低成本看图 | 减少决策纠结 |
| P3 | skill references 懒加载 | 小幅但稳定 |

一句话总结：这份日志的核心病症是**「推理代替取数」+「整读后被压缩再重读」**，两者叠加把等效成本推到 154k。DSH 侧优先做「空转硬中断」和「读前守卫 + 压缩保留」，收益最大；其余是打磨。
优化
...
**assistant [peer=github.com-tyvt-skills]**: Now I'll implement. Starting with the highest-value code change: **cost-meter bare-reasoning escalation** (P0 #1). Current `bareReasoning` fires a soft identical notice each step. I'll add a consecutive-bare counter and escalate to a hard "下一步必须调工具" after 2 consecutive bare steps — matching the "无工具调用连续 2 步" recommendation, without the infeasible reasoningEffort downgrade (documented separately).

Let me edit the cost-meter plugin.
**assistant [peer=github.com-tyvt-skills]**: The array uses `[key, hit, text]` triple with the first element as string. Let me re-read the exact lines.
**assistant [peer=github.com-tyvt-skills]**: Now I'll make the precise edits: gate `bareReasoning` to streak<2, add the escalation rule, and add `bareReasoningEscalate` to repeatable set.
**assistant [peer=github.com-tyvt-skills]**: Now let me add a selftest for the escalation and run it. Let me check the selftest's existing bare-reasoning coverage — it doesn't test bare. I'll append a test block.
**assistant [peer=github.com-tyvt-skills]**: The cost-meter is telling me I've already hit 154k equivalent cost — exactly the kind of session the audit describes. I should stop expanding scope, finish the code change with selftest verification, and land the rules compactly rather than sprawling. Let me run the selftest now.
...
**assistant [peer=github.com-tyvt-skills]**: Now verify the cost-meter changes are coherent by re-running both selftests, and lint the JS files I touched for syntax.
...
**assistant [peer=github.com-tyvt-skills]**: 已提交（`db769807`，仅提交，未推送）。下面是落实情况。

## 核心发现：审计部分滞后于代码
核对当前工作区后发现，审计里若干 P0/P1 项**已经实现**，真正缺的是少数几块。所以我没有盲目重写 10 个文件，而是只补真正的缺口 + 把平台限制说清：

- 已实现（审计以为是缺口）：`agent-guard` 已做 `grep.glob→include`、`openviking queries→query`、`todo_write`/`update_goal` 字段越界、`justification` 落单、类型收敛等**执行前自动修复**（P1）；`token-guard` 已对 >500 行/超预算 read 做头尾裁剪+落盘（P0 read 侧）；`cost-meter` 已有「连续大未命中→强制取数」（P0 未命中侧）；`agent-guard` 已有供应商 503/429 额外重试（P2）。
- 真缺口，本次补上：见下表。

## 逐条落点（审计项 → 落点 → 验证）

| 审计节 | 落点 | 验证 |
|---|---|---|
| **P0 一·推理空转** | `cost-meter` 新增 `bareReasoningEscalate`：连续第 2 个纯推理步从软提示升格为「下一步第一件事必须是工具调用」 | selftest 新增 3 用例，全绿 |...

<!-- MEMORY_FIELDS
{
  "event_name": "cost-meter推理空转硬中断升级",
  "goal": "落地审计P0推理空转修复",
  "summary": "2026-11-11 cost-meter 插件新增 bareReasoningEscalate 规则：连续第 2 个纯推理步（规则 A 连续触发）从软提示升格为「下一步第一件事必须是工具调用」，对应审计 P0#1；maxReasoningTokens 硬上限经核实不可行（reasoningEffort 在 turn 开始固定，pre-step 仅能 enter/reject 无法中途降档）。selftest 新增 3 用例全绿，改动随提交 db769807 落地（仅提交未推送）。",
  "ranges": "0-31,77-89,120,138-141",
  "source_extraction_id": "1f27ab40cc384df3b5d5f20510736253",
  "version": 1,
  "memory_type": "events"
}
-->