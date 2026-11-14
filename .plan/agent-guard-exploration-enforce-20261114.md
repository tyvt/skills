# agent-guard 探索门禁落地 + 规则/实现对齐（2026-11-14）

status: approved
human_confirmed: true
approved_sha256: 912dc3e14c32b77450a266e6a5e0c797df5e0e891582a3f2646d12397c298d5d
approved_version: 1
implement_scope: agent-guard config 默认值（开 exploration 门禁为 warn）+ AGENTS.md 第16行措辞对齐 + 扇出节补子代理行号锚点（零业务代码）
commit: 仅提交

## 一、前因后果

本会话复盘暴露 7 类行为问题（glob 盲搜 4 次全败、grep 2 次被拒、整读 289/284 行触发截断、op 选型错、plan_review 参数、子代理无行号锚点、skill 加载太晚）。核查发现这些规则**早已写进 `dsh/AGENTS.md`**（第 16/17/74/82 行等），但仍复发——因为真正生效的是 agent-guard 硬拦截，而**探索漂移拦截的默认配置是关闭的**。规则文本声称"已生效、warn 灰度中"，与代码 `mode:'off'` 脱节，形成"规则在、门禁不在、行为照旧"。

## 二、现状与证据

- **门禁默认关闭（核心根因）**：`dsh/agent-guard/lib/config.js:62-64` → `exploration: { enabled:false, mode:'off', maxWholeReadLines:300, firstReadLimit:60, minRepeatPattern:3, globRepeatWindowMs:60000 }`。拦整读/重复盲搜/未知根 glob 三规则全在，但 `enabled:false` 导致不生效。
- **规则文本与实现脱节**：`dsh/AGENTS.md:16` 写"agent-guard `exploration` 拦截已生效（整读门槛/重复盲搜/未知根试错，子代理豁免），warn 灰度中"——实际是 off，属失实陈述，误导主控以为有兜底。
- **规则层已覆盖，不需再加文案**：`.plan/general-issues-remediation-20261114.md`（approved）A1–A6 + C-a 已把"拒绝即改形态/plan_path/reasoning/一次问清/被拒不 abort/OpenViking 失败即换"落成 AGENTS.md 文案（现存于第 16/17/74/82/25 行）。本轮**不重复写文案**。
- **加载时机问题**：`dsh/AGENTS.md:3` 与 `dsh-token-policy` 已要求"skill 按需加载、不整篇读"，但缺"开工先读哪个 skill 的哪一段"的时序锚点。

## 三、实施方案

1. **打开探索门禁（灰度 warn 起步）**：把 `config.js:62-64` 的 `exploration.enabled` 由 `false` 改 `true`、`mode` 由 `'off'` 改 `'warn'`（先 warn 观察误伤，稳定后再评估 block）。参数 `maxWholeReadLines:300 / firstReadLimit:60 / minRepeatPattern:3` 保持。**这是真正的止损点**——规则文本已够，缺的是门禁生效。
2. **对齐 AGENTS.md 措辞**：把 `dsh/AGENTS.md:16` 末句"拦截已生效…warn 灰度中"改为与配置一致的口径（"因 warn 灰度，拦截仅告警不阻断；主控仍须按本行优先级执行"），去掉失实的"已生效"断言（消除失实陈述）。
3. **子代理行号锚点规则（纳入）**：复盘"task-2 只给文件路径致 fork 子代理中途放弃"，是上一轮子代理放弃的直接原因。在 `dsh/AGENTS.md` 扇出节补一句："派发子代理批量改文件时须给 **文件:行号锚点**（如 `evaluation.ts:36/45/55…`），不只给文件路径。"
4. ~~补时序锚点~~ **（用户否决，不加）**：`dsh-token-policy` 已写"按需加载"，再加时序锚点属重复文案，且上轮复盘证明文案非瓶颈。

## 四、验证计划

- `node --check dsh/agent-guard/lib/config.js` 语法检查。
- **断言排查（已前置核实）**：`selftest.mjs` 中 `decideExplorationDrift` 全部**直接传 cfg 参数**调用（第 695–752 行，如 `{firstReadLimit:60}`），不依赖 `config.js` 默认值；`selftest.mjs:33 "mode=off 一律放行"` 测的是 ask-guard 非 exploration。故改 `exploration.enabled/mode` **不破既有断言**，无需改期望（实施时仍全库再核一次 `exploration`/`mode:'off'` 兜底）。
- **补正向断言**：新增 unit——用 `loadConfig({})`（或等价默认加载函数）断言 `exploration.enabled===true && exploration.mode==='warn'`；并注明子代理豁免实现位置（`decideExplorationDrift` 内应有 `isSubagent`/会话类型判断，实施时定位确认其在 warn 下仍 allow 子代理）。
- 跑 `dsh/agent-guard/selftest.mjs` 与 `integration-test.mjs` 全绿。
- 文案核对：改完后人工核对 `AGENTS.md` 第 3、16 行文案与 `config.js` 实际值一致。
- 新开一次会话实测：无范围 read >300 行应触发 warn 而非静默放行；子代理会话应豁免。
- 回滚：变更受 git 管理，`git revert` 即可。
