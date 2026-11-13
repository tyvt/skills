---
status: approved
session: p0-audit-optimization-20261113
created: 2026-11-13
human_confirmed: true
review_override: false
---

# 会话审计 P0 六项优化：规则层 + 机制层

## 前因后果

对一次 CSS 微调会话（~11 分钟、未命中 108.3k）审计出 6 个 P0，按真实成本分级：**T1 成本大头** = P0-2（整读 26.6k 输入/6.3k 未命中）、P0-1（编排器接管窄检索，18k 未命中+2.2k 编排器）；**T2 时间黑洞** = P0-3（240s stall+1.6k）；**T3 机制放大器** = P0-6（cost-meter 无刹车）、P0-4（跨轮二次 ask）、P0-5（git 输出回灌 ~2k，量级最小）。与 `.plan/orchestrator-p0-optimization-20261113.md`（检索路由/guard/summarize，已 approved）是不同问题集：那个管「选型路由与编排器可靠性」，本计划管「定位习惯、gate 豁免、ask 窗口、输出瘦身、cost-meter 刹车」。

## 现状与证据

- P0-2：step 3 整读 1–400 行（输入 26,613、未命中 6,298），step 4 再读 400–483；实际只改 L379–430 两条 CSS，script 零依赖。未先 grep 拿行号。
- P0-1：step 1 orchestrate full 让编排器 grep 三关键词，返回「无法访问 D 盘」模板，未命中 18k；step 2 内置 grep 命中 17 处仅 1,227 token。
- P0-3：step 8/13 两次 full 跑 build 均 120s stall（`dsh\langgraph-orchestrator\config.yaml:162` pwsh_timeout:180；`src\graph.py:416/875` _run_pwsh；stall 判定在 @deepseek-ai/dsh 插件 wrapper lib/index.js 的 stallMs 检测，2026-11-12 修复）；step 25 才下「CSS-only」结论。
- P0-6：cost-meter 只有 notice 无 enforcement（`dsh\cost-meter\lib\index.js:28` 单步 10k 门槛、:166 连续大未命中仅改提醒措辞、:237/:239 文案），step 2/3、16–17 告警后走势未变。
- P0-4：step 10 确认实施、step 14 问提交方式，跨轮未拦；ask-guard（`dsh\agent-guard\lib\ask-guard.js:21` FORESEEABLE_WORDS）只看「上一轮漏了什么」，无 turn 级提交方式前置检查。
- P0-5：`git pull --rebase` 的 diffstat（22 文件/2909 insertions）随 rebase 摘要整段回灌（step 18 单步输入 1,444，有效占比低）；父仓 `status --short` 未限定子模块路径（step 21）。浪费主要是「未限定路径+未截尾」，量级 ~2k。

## 分布实施方案

第一批（规则/skill 文本）：
1. **R1（P0-2/P0-1）**：AGENTS.md 选型节追加「单目录+关键词已知 grep」直跑豁免；局部改动固定 grep→read ±30 行；整读判据收紧为**双门槛：同目录文件数 ≤5 且唯一命中、且预估读取 ≤150 行**，两条件同时满足才允许整读，否则 grep 缩行号（用 P0-2 样本回放验证：唯一命中但 400 行的场景不得放行）。
2. **R2/M2 重写（P0-3）基线异步化**：开工（edit/write 之前）即 run_in_background 异步起基线 build（并发 ≤1，结果落 `.task-state/build-baseline.state.json`）或取最近 CI 结果；本仓无 CI，只走异步 build 分支；CSS-only 豁免**仅限改动前声明**——一旦已开始改文件，必须有基线或明确写「未执行+原因」，禁止改完再豁免。
3. **R3 stall 熔断**：同会话同命令 stall 一次打标记，再调必须换形态（查 `.task-state/*.state.json`）或写「未执行+原因」。state 文件 schema：`{name, cmd, status, heartbeatAt, stderrTail≤500}`，由 task-watchdog.ps1 已有机制写入（本仓现状即此），TTL=会话级，收尾清理。
4. **R4 ask 窗口（P0-4，hook 改动，随第二批单独送审）**：ask-guard（ask-guard.js）加 turn 级检查——含 edit/write 的 turn 首个 ask 未覆盖提交方式时给合并模板；兜底 warning **仅当改动位于 git 仓库内**。
5. **R5（P0-5）**：submodule-commit skill 固化 rebase/pull 加 `-q`，**仅截断 stdout 尾部，保留 stderr 与 exit code 完整**（防丢冲突文件列表/错误首行），完整日志落盘 `.task-state/`；父仓状态限定 `git status --short <submodule>`；status/pull 封进 `git-ab.mjs`。

第二批（hook/编排器代码，单独送审）：
6. **M1（P0-6）cost-meter 刹车**（`cost-meter\lib\index.js:166` 起）：连续 2 步未命中 >10k → 下一步白名单 `{read(offset/limit), grep(path+include), edit, write}`——**edit/write 放行不拦**，只禁整读/全仓 grep；会话等效成本 >150k 拒 `op:"full"`。灰度定义：warning 模式观测指标 = 未命中/步、白名单误伤次数（必要整读被拦）；连续 2 会话无误伤且未命中/步下降 ≥30% → 切 enforce；误伤 ≥3 次/会话 → 回退 warning（revert 白名单开关）。
7. **M3 stall 摘要（拆出后本计划仅此项）**：编排器 stall 时解析 stderr 尾部输出一句话结论，替代全量回灌。实现约束：仅 exit≠0 或命中已知模板（弃用警告/ENOENT/timeout）时生成摘要，保留原始日志路径，样本 stderr 先验证再上。检索路由部分（planner 含本地路径时直出 `rg -n`、无执行响应熔断）**指向既有编排器计划 P0-1/P0-3 条目**，不在本计划重复实现。

## 风险与回滚

- R1 放宽直跑的回流 → fanout streak（连续 5 次 read/grep 拒绝）兜底；R2 豁免收紧后 CSS 任务改前起异步基线，不阻塞主流程。
- M1 白名单误伤 → warning 灰度后再 enforce。
- 回滚：① AGENTS.md ② build-gate/ask-guard ③ submodule-commit skill ④ M1/M3 各自独立提交，互不影响。

## 验证计划

- R1：下一局部改动实测先 grep 后窄读，单步输入较 26.6k 基线降 ≥80%。
- R2：CSS 任务开工即起异步基线/取 CI；改后不出现「改完再豁免」。
- R3：人为制造 stall，第二次同命令调用被要求换形态。
- R4：含 edit/write 的 turn 二次问提交方式时给合并模板；git 仓外改动不提示。
- R5：rebase/status 输出 ≤15 行且限定子模块。
- 总目标与口径：可量化节省 = R1+R2 约 60k（P0-2 的 26.6k 整读 + P0-1 的 18k 未命中 + P0-3 的 1.6k 与 240s）+ 既有告警后止损约 15k ≈ 75k→落在 40–55k；R3/R4/R5 为时间与机制收益，不单独承诺 token 数字。<40k 为尽力目标，验收以「未命中较基线降 ≥50%」为准；耗时 11min→4–5min（主要来自 R3 消除 240s stall 与 R4 少一轮 ask）。
