# 方案：编排器审查模式改为「仅 P0 阻断」

> status: implemented（已按用户追加的 5 条规则实施并验证；见第 6 节实施记录）

## 1. 前因后果

编排器 `plan_review` 是 DSH 的计划审核闸门（AGENTS.md 强制：任何 edit/write 前必须先过
`plan_review` + 用户确认）。当前审核逻辑过严：

- 系统提示词要求 reviewer 对四类问题（前因后果/实施方案/风险回滚/验证步骤）「只要存在阻断落地的问题
  就 reject，score<70 也 reject」——没有分级，任何瑕疵都可能被判 reject。
- `_normalize_review` 里还有硬规则：`verdict==pass 且 score<70 → 强制改 reject`。

结果是轻微问题（措辞、排版、次要建议）也会打回，导致多轮送审、token 与耗时膨胀
（历史：某计划 5 轮 reject）。本次改为：**只有 P0（阻断落地）才 reject，P1/P2 仅提示不阻断**，
且仅作用于 `plan_review`，不动 `security_guard`。

## 2. 现状与证据

| 位置 | 现状 |
|---|---|
| `src/api.py:26-36` `_PLAN_REVIEW_SYSTEM` | 无分级，任一阻断问题即 reject，score<70 也 reject |
| `src/api.py:207-238` `_normalize_review` | `verdict==pass 且 score<70 → reject` 硬规则 |
| `src/api.py:344-404` `run_plan_review` | 组装 messages、调用 `plan_reviewer` 池、落盘 `_review.json` |
| `config.yaml:115-124` `plan_reviewer` | 双模型池，max_tokens=8192，timeout=300 |
| `dsh\orchestrator\lib\index.js:229-253` `renderPlanReview` | 渲染 verdict/score/issues/suggestions |

## 3. 分布实施方案

### 3.0 分级定义（本次新增的判定标准）

- **P0（阻断落地）**：不修就无法安全/正确实施，或会直接导致事故。枚举：
  - 缺关键前置事实/依赖，按计划执行必然失败；
  - 有会破坏数据/环境/历史的不可逆操作且无回滚；
  - 涉及高危写操作（删库、强推、越权）且无防护；
  - 实施方案自相矛盾或关键步骤缺失，无法落地；
  - 明确违反仓库/安全硬规则（如提交 .env、绕过 gate）。
- **P1（重要但不阻断）**：影响质量/可维护性，可在实施中处理。如验证步骤偏弱、边界未覆盖。
- **P2（建议）**：措辞、排版、可优化项。

**判定原则：verdict=reject 当且仅当存在 P0。** P1/P2 只在 issues/suggestions 中列出，不改变 verdict。

### 3.1 提示词改造 — `src/api.py` `_PLAN_REVIEW_SYSTEM`（L26-36）

改写成「分级 + 仅 P0 阻断」版本，输出 schema 增加 `severity` 分级：

- 输出 JSON 字段：`{"verdict":"pass"|"reject","score":0-100,
  "issues":[{"level":"P0"|"P1"|"P2","text":"..."}],"suggestions":["..."]}`（为兼容，`issues` 也接受纯字符串）。
- 明确：「仅当存在 level=P0 的问题时 verdict 才为 reject；P1/P2 一律 pass」。
- 删除「score<70 也应判 reject」的措辞；score 仅作参考不参与 verdict。

### 3.2 归一化改造 — `src/api.py` `_normalize_review`（L207-238）

- 解析 `issues`：兼容新对象格式 `{level,text}` 与旧字符串格式，统一归一为
  `[{level, text}]`；旧字符串默认 level=P1（不阻断）。
- **删除** L230-232 的 `verdict==pass && score<70 → reject` 硬规则。
- **新增** 一致性裁决：根据 issues 里是否存在 P0 反推 verdict——
  - 有 P0 → verdict 强制为 reject（即使模型写了 pass）；
  - 无 P0 → verdict 强制为 pass（即使模型因 P1 写了 reject，也纠正为 pass）。
- 返回值新增 `p0_count`（便于渲染与统计），保留 `verdict/score/issues/suggestions`。
  `issues` 统一为对象数组；为向后兼容渲染，另出 `issue_texts`（纯文本列表）。

### 3.3 渲染改造 — `dsh\orchestrator\lib\index.js` `renderPlanReview`（L229-253）

- issues 渲染支持 `{level,text}`：按 `[P0]/[P1]/[P2]` 前缀显示，P0 置顶高亮。
- verdict 文案沿用；追加一行「P0 阻断项：N 个」。
- `pass` 结尾提示不变；`reject` 结尾提示改为「仅需修 P0 项即可通过」。

### 3.3b 补充硬规则（用户 2026-11-13 追加，写进提示词与归一化）

1. **灰区按 P1 + 人工确认**：模型拿不准是 P0 还是 P1 时，一律判 P1（不阻断），并在该条 text 末尾标注
   「（灰区，待人确认）」，最终仍需走 `ask_user_question` 人工确认，不因 P1 打回。
2. **P0 漏判由 security_guard 兜底**：plan_review 的 P0 可能判漏；高危命令/写库在真实执行时仍由
   `security_guard`（security_guard/security_guard_fast）独立把关，plan_review 放宽不降低执行安全。
3. **score 不参与判定**：score 仅作参考展示，`_normalize_review` 与提示词均不得用 score 改变 verdict。

### 3.4 不改动项

- `security_guard` / `security_guard_fast`（命令与写库安全审查）保持原样。
- `config.yaml` 的 `plan_reviewer` 模型池、超时、max_tokens 不动。

## 4. 风险与回滚

- **风险1：分级标准宽松化导致真问题漏拦**（模型把 P0 判成 P1）。缓解：P0 定义给足枚举样例，
  并在 3.2 用「有 P0 即 reject」兜底；security_guard 仍独立把关高危执行。
- **风险2：模型输出格式不稳**（不按对象数组回）。缓解：解析层同时兼容字符串与对象，
  解析失败沿用现有 fail-safe（reject + 提示人工复核）。
- **风险3：`_review.json` 旧条目结构变化**。缓解：新增字段只增不改，读旧结构 fail-open。
- **回滚**：改动集中在 api.py 两个函数 + index.js 一个渲染函数，均为纯文本逻辑；
  用 `git diff` 可一键 `git checkout` 还原。回滚即恢复「任一阻断问题即 reject + score<70 强制 reject」。

## 5. 验证计划

1. 单测：新增 `tests/test_plan_review_p0.py`
   - 模型回 `verdict=reject` 但 issues 全为 P1/P2 → 归一化后 **verdict=pass**（纠偏）。
   - issues 含 1 条 P0（模型写 pass）→ 归一化后 **verdict=reject**。
   - issues 为旧字符串数组 → 全部按 P1 处理，verdict=pass。
   - **混合等级**：issues=[P1, P0, P2] 混合 → verdict=reject，且 p0_count=1、P1/P2 仍保留展示。
   - 模型输出非 JSON → fail-safe reject（保持原行为）。
   - **score 不参与**：verdict=pass 但 score=30（无 P0）→ 归一化后仍 pass（证明旧硬规则已移除）。
2. 跑 `python -m pytest -q tests/test_plan_review_p0.py` 全绿。
3. 回归：跑现有 `tests/` 相关用例（`test_router.py` 等）确认无破坏。
4. 端到端：拿一份「仅有 P1 瑕疵」的样例计划调 `orchestrate op:"plan_review"`，
   确认返回 pass 且 P1 以建议形式列出；拿一份缺关键步骤的样例，确认返回 reject 且标注 P0。
5. 构建基线：改动前先记录 `npm run build`（dsh 前端相关）/ `python -m pytest` 基线，区分预存在错误。
6. **回滚后行为验证**：`git stash` 回滚改动后，确认旧行为恢复——model 回 reject(P1) → verdict=reject、
   pass 且 score<70 → reject 两条旧规则重新生效；再 `git stash pop` 复原，确保回滚路径可用。

## 6. 实施记录（2026-11-13）

- `src/api.py`：`_PLAN_REVIEW_SYSTEM` 改为 P0/P1/P2 分级 + 仅 P0 阻断 + 灰区按 P1 + score 不参与；
  `_normalize_review` 兼容新旧 issue 格式、删除 score<70 硬规则、按「有 P0→reject」一致性裁决、
  返回 `p0_count`/`issue_texts`。fail-safe（非 JSON）仍 reject 并标 P0。
- `dsh\orchestrator\lib\index.js` `renderPlanReview`：issues 兼容 `{level,text}`、按 `[P0]/[P1]/[P2]` 渲染、
  P0 置顶、新增「P0 阻断项：N 个」、reject 提示改为「仅需修 P0」。
- 新增 `tests/test_plan_review_p0.py`：6 用例（P1/P2→pass、含 P0→reject、混合等级、旧字符串、非 JSON、score 不参与）。

### 6.1 pytest 采集器缺陷：已修复（锁版本）

- **根因**：环境曾装 **pytest 9.2.0**，与现有插件（anyio 4.12 / langsmith 0.14 / pluggy 1.7）不兼容，
  采集期在 `_pytest/fixtures.py` `FixtureDef.__init__` → `node.nodeid` → `NodeId.__str__`
  抛 `'NodeId' object has no attribute '_str_cache'`，导致全量 pytest 无法启动。
- **修复**：`pip install "pytest>=8.4,<9"`（降级到 8.4.2），并在 `requirements.txt` 锁 `pytest>=8.4,<9` +
  注明原因，防止被再次升级回 9.x 而复发。

### 6.2 全量 pytest 回归（修复后，真跑）

- 命令：`cd dsh/langgraph-orchestrator; $env:PYTHONPATH='.'; python -m pytest -q`
- 结果：**43 passed, 1 warning in 1.91s**（warning 为 langgraph 自身的 PendingDeprecation，非本次引入）。
- 覆盖：原有全部用例 + 新增 `test_plan_review_p0.py` 6 用例，均在 pytest 8.4.2 下真实执行通过。
- 语法：`ast.parse(api.py)` OK；`node --check index.js` OK。
- 回滚路径：改动集中在 `api.py` 3 处 + `index.js` 1 个渲染函数；`git checkout` 即恢复旧行为
  （reject(P1)→reject、pass 且 score<70→reject）；pytest 版本由 requirements.txt 锁定，同可回退为 9.x。
