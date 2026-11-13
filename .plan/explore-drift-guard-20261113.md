---
id: explore-drift-guard-20261113
title: 宿主探索漂移硬拦截与探索外包
created: 2026-11-13
status: approved
human_confirmed: true
confirmed_at: 2026-11-13
approved_sha256: 5b66890323116b569d88a8e2eacd529c2e8e192b2007e15391a20891f1930c23
approved_version: 2
review_note: 78/100 过审 0 P0；三个 P1 灰区（首读改写/parent链探针/Map清理）实施时先探针验证再分支实现
---

# 背景（前因后果）

- 2026-11-13 账单复盘：编排器子进程全史仅 1.53M token（占宿主计费输入 ~0.03%），宿主等效成本 1006M。探索类动作（整读、盲 grep、未知根 glob 试错）全部发生在宿主主模型，绕过了编排器模型池的全部优化。
- 现有防线均为事后或劝告型：cost-meter 只在连续 2 步未命中 >10k 后提醒（本会话触发 2 次）；AGENTS.md 规则靠模型自觉。缺事前阻断。
- 用户决策（2026-11-13）：按「hook 硬拦截 + 探索外包 + 规则沉淀」三步出方案。

# 现状与证据

- agent-guard 唯一可靠拦截点 = `ctx.tools.guard`（host plane 全局层，lib/index.js:203；`tools/pre-execute` 跨 plane 收不到，注释有实测记录）。
- 已有拦截先例：scope（全仓 grep/递归拒绝）、重复整读（P1-7/C3，sessionReads 记 whole/ranges）、ask-guard（warn/block 灰度 + ledger + ask-guard-promote.ps1 提升脚本）。
- 规则纯函数集中在 lib/rules.js（decideInterception 等），selftest.mjs（28.5k）可直接扩展用例。
- `~/.dsh/agent-guard` 是 `D:\repository\skills\dsh\agent-guard` 的 symlink，改源仓即生效；配置入口为 cordis.patch.yml config 块。

# 分布实施方案（分步，每步落点与验证）

## M1 探索漂移拦截（rules.js + index.js，纯增量）

- rules.js 新增 `decideExplorationDrift(sessionState, tool, args)` 纯函数，三条规则（返回统一 `{verdict: block|pass, message}`）：
  1. **整读门槛**：read 无 offset/limit 且文件 >300 行 → 拒绝，message 附「改用 offset/limit 或先 grep 行号」（行数用首次 read 缓存，未知时放行先读 60 行）；
  2. **重复盲搜熔断**（可预判形态，不依赖执行结果）：同会话连续 3 次调用 grep/glob 且 pattern 完全相同（无论命中与否）→ 第 3 次拒绝，message 附「换关键词或先 Get-ChildItem 列目录」。0 命中属执行后信号，guard 在执行前判定拿不到，故不采用（采纳审核 P0 修正）；
  3. **未知根试错**：glob 无 path 且 60s 内同 pattern 第 2 次 → 拒绝。
- 作用域豁免：spawn_teammate 派生的子代理会话（session header 带 parent 链）对 M1 三规则整体豁免——外包探索正是要放开读，主会话才拦（采纳审核 P1-2）。
- index.js guard 回调挂接：复用 sessionReads 模式新增 sessionDrift Map 记 `{grepSeq, lastPattern, lastGlobTs, fileLines}`；判定链全部走纯函数，拒绝时 counters.rejected++ + ledger 记 `kind:'explore-drift'`。
- 灰度与 promote 量化门槛：cordis.patch.yml config 新增 `exploration: { enabled:true, mode:'warn' }`，mode=warn 只记 ledger 不阻断（沿用 ask-guard 模式）。**promote 条件（采纳审核 P1-3）**：warn 运行 ≥2 天且 explore-drift 行 ≥20 条中误拦（模型改参数后调用成功且无再犯）比例 <10%，才切 block；并补 block 模式冒烟用例（selftest 断言 verdict=block 时返回串以 `[explore-drift:BLOCKED]` 开头）。

## M2 探索外包（新 skill + AGENTS.md 一段）

- 新 skill `dsh-explore`：封装「spawn_teammate(fresh) 只读探索代理」模板——prompt 模板（目标/根/返回≤30行结论+行号）、编排器扇出（≥3 对象强制）、只返回浓缩结论。
- AGENTS.md 探索纪律段追加一行：未知代码库定位必须先走 dsh-explore 或带 path 的窄 grep，禁主模型裸 grep 探索（解释 hook 拦截依据）。

## M3 验证与沉淀

- selftest.mjs 追加 M1 三规则用例（整读/盲搜/未知根各 1 正 1 反）。
- README/AGENTS.md 收尾更新； REPORT 若有落盘按 submodule-commit 链提交。

# 风险与回滚

- 误拦合规读（大配置文件首读）：M1 用「先读 60 行」放行策略 + warn 灰度先行，promote 前查 ledger 误拦率。
- 跨插件冲突：token-guard 只裁剪输出不拦截，agent-guard 拒绝先于 repair，无叠加风险。
- 回滚：mode 改回 off 即全链路关闭（config 一行），无数据迁移。

# 验证计划

- selftest 全绿（原 28.5k 内容不回退）+ 新用例 ≥6 条；
- 实机冒烟：主会话连续 2 次同 pattern grep 后第 3 次 → warn 落 ledger；selftest 断言子代理会话（带 parent）三规则全 pass（豁免生效）。
- ledger 抽查：explore-drift 行含 tool/message/session_id 字段。
