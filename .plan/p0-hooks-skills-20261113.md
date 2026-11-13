---
status: approved
human_confirmed: true
session: p0-hooks-skills-plan
created: 2026-11-13
---

# P0 会话耗时硬约束落地计划

## 前因后果
会话耗时审计显示三大可判定耗时源：两次 ask（~250-500s）、e2e 未预检（~300s）、定位顺序/lint 模板不统一（~300-360s）。结论：动作可判定的 P0-1/P0-3 用 hook 硬卡；语义类 P0-2/P0-4 落 skill；AGENTS.md 只加索引三行，避免变厚被跳过。

## 现状与证据
- hook 机制已存在：`dsh/agent-guard` 插件（cordis patch，`insert` 新增 id），`~/.dsh/profiles/web/cordis.patch.yml` 可做 profile 级覆盖。
- `szfc-page-guard` skill 不存在（需新建）；`zentao-analyzer/SKILL.md` 已存在（增量 edit）。
- AGENTS.md = `dsh/AGENTS.md`，顶部「编排器选型」段已定位。
- 业务仓暂未发现 `e2e/` 目录，`e2e/scripts/preflight.mjs` 落点仓库待用户指定。

## 实施步骤
1. **AGENTS.md 索引**：edit `dsh/AGENTS.md`，「编排器选型」前插入「## 会话时间硬约束（P0）」三行（用户给定文案），≤8 行。
2. **P0-1 hook（拦截二次 ask，初始 warn 模式）**：agent-guard 新增规则（feature flag `askGuard.enabled`，初始 `mode: warn`）。**判定链（伪代码）**：`mode==off → return`；本会话 ask <2 → return；phase=本会话首个 ask 的 task_phase（优先级：计划文件路径 > ask header 字段 > 会话首 ask 哈希）；跨 phase 不拦；命中高危词表 → 记 ledger(high_risk) 放行；**取同 phase 上一次 ask，计算其未覆盖的可预见项 missing（词表：提交/推送/是否重建/部署/是否合并）**；本次 ask 在补问 missing → warn（提示应上一轮一次问清）。即看「上一轮漏了什么」，不看本轮问了什么。**计数起点 = 本会话第一次 ask，无条件成立**；plan/approve 语义仅作 phase 边界加速信号，非计数前提。用户回答引入的新问题（回答文本关键词不在 missing 词表）不拦截。高危场景（删除/强推/发布/权限/费用/生产）永不拦截仅记 ledger。落 `dsh/agent-guard/cordis.patch.yml` insert 块 + `lib/rules.js`（独立提交，flag 一键关闭）。
3. **P0-3 preflight（暂缓）**：按用户确认，`e2e/scripts/preflight.mjs` 本轮**不实施**；hook 规则与 ledger schema 设计保留在计划附录，落点仓确定后再启动。
4. **P0-2 skill 增补（用户确认后取消新建 szfc-page-guard）**：实施前先在灰度会话验证 skills 目录写入即被发现可加载（以现有 skill 目录机制为准）；`zentao-analyzer/SKILL.md` 增补「定位顺序」与「lint 命令模板」小节（已完成）。
5. **P0-4 lint 模板**：写进两个 skill：命令原文 + 一句预期输出说明（如「lint 报 N 个 error 为基线，只看新增」）。
6. **灰度判据与切换脚本**：判据 = 连续 2 个灰度会话中 agent-guard-ledger.jsonl 无误伤告警（warn 触发均为真实违规）→ 运行 `dsh/scripts/ask-guard-promote.ps1` 将 `mode: warn` 切 `mode: block`；脚本同时支持切回 warn 回滚。
7. **验证**：`node dsh/agent-guard/selftest.mjs` 与 `integration-test.mjs` 跑通；用例覆盖——阶段内第 2 次 ask（含词表命中/未命中）、高危豁免、mode 三档映射（off/warn/block，warn 一律不阻断）、灰度切换脚本；AGENTS.md diff 确认仅 +≤8 行；报告落 `dsh/reports/`。

## 风险与回滚
- hook 误拦截 → 两规则均以 warn 模式灰度一轮，确认无误伤再切 block；回滚 = cordis.patch.yml 移除对应 insert 块 + rules.js 独立提交回退，flag 一键关闭。
- preflight.mjs 依赖各仓环境 → 放业务仓不进 skills 仓；提供 E2E_PREFLIGHT_BYPASS（记原因）；回滚删文件即可。
- AGENTS.md 增厚 → 只加索引三行（见下），细节全部外置。

## AGENTS.md 新增文案（原样）
```markdown
## 会话时间硬约束（P0，细节见 skill/hook）
- 计划确认轮必须把可预见待定项（提交方式/推送/是否重建）一次问清（hook 拦截二次 ask）。
- 跑 `playwright test` 前必须先过 `node e2e/scripts/preflight.mjs`（hook 拦截）。
- 定位顺序与 lint 命令模板见 `zentao-analyzer` / `szfc-page-guard` skill。
```

## 灰度期 P1 处理（实施时落地）
- ask guard 自身写最小 ledger，**P0 阶段字段即定全**：`{ts, session_id, phase, hit_word, ask_seq_in_phase, high_risk, user_answered, user_bypass, bypass_reason, mode, verdict}`；user_bypass 由 ask 结果（空选择/跳过）或回答含「不用/别拦/继续」推断。切换脚本读 ledger 自动算误伤率。
- 高危豁免记录抽检核对均为真实高危场景。
- 「一次问全」可操作定义：上一轮 ask 是否覆盖当前 phase 全部可预见项；灰度期以误报率（真实违规占比 ≥80%）为切换参考。
- P0-D 验证方法：临时建测试 skill 目录 + marker，会话日志出现即成功；失败则回退手动注册并暂缓 szfc-page-guard。
- 高危词表优先于 warn 词表（部署/发布、推送/强推、合并/生产 各补一条判定用例）。
- 切换脚本注明 pwsh 7+；flag = `askGuard.enabled/mode`；回退顺序：切回 warn → 移除 patch insert → 回退 rules.js 提交。

## 验证计划
- selftest/integration-test 全绿；触发用例日志记录到 `dsh/reports/`。
- 用例矩阵：阶段内补问 missing（warn）、**合法二次 ask 不拦截（第1次问实施确认→用户答「确认但先问是否影响存量数据」→第2次问新问题，期望不 warn 不 block）**、高危豁免（deploy/publish 等各 1 条）、mode 三档映射、灰度切换脚本、ledger user_bypass 推断。
- 灰度会话中观察 ledger（agent-guard-ledger.jsonl）无误伤后切阻断。

## 附录：preflight 设计（暂缓，落点仓确定后启动）
- `e2e/scripts/preflight.mjs`：检查 dev server 端口/环境变量/testid 存活性，exit code 可判定。
- 状态 ledger `dsh/reports/preflight-ledger.jsonl`，schema **单键 session_id**（方案 A）：`{session_id, repo_path, preflight_cmd, exit_code, timestamp, bypass}`；匹配仅用 session_id；**repo_path 保留字段仅用于审计展示，不参与匹配**。

## 附录：实施期判定细节（对应审核 P1）
- phase(ask) 为同一函数，对首 ask 与本次 ask 各算一次：优先计划文件路径 > ask header > 会话首 ask 哈希；两者相等才进入 missing 判定。
- missing = 可预见项词表 − prev_ask 已覆盖 − 用户回答中已提及关键词。
- 高危命中仅记 ledger 放行系有意设计（高危确认不能被自动化卡死）；ledger 中 high_risk=true 供人工复核。
- user_bypass 以结构化信号为主（空选择/跳过），关键词仅辅助；误伤率 = user_bypass 的 warn 次数 / 总 warn 次数，按会话窗口统计。
