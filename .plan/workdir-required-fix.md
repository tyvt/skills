---
plan: 修复 orchestrate op="full" 缺省 workdir 直接 WORKDIR_REQUIRED 的问题
status: approved
human_confirmed: true
reviewed_by: workbuddy/deepseek-v4.1-flash
review_rounds: 4
created: 2026-11-13
---

# 1. 前因后果

用户在会话中反复报告：调用 `orchestrate {op:"full", request:"..."}` 时永远返回 `WORKDIR_REQUIRED`，从未真正进入 LangGraph 路径，因此“看不到 composer”（编排器没有产生任何输出/轨迹）。上一轮结论是“要带绝对 workdir”，但这把系统缺陷当成了使用纪律。

**关键事实：这个错误不是用户漏参数，是插件 schema 与 Python 侧校验不一致的必然结果。**

# 2. 现状与证据

| 位置 | 内容 |
|---|---|
| `dsh/orchestrator/lib/index.js:381` | schema 声明 `workdir` 为 **optional**（无 `required`），描述文字却写 “required for every full request” |
| `dsh/orchestrator/lib/index.js:412,457-463` | `execute` 原样把 `args.workdir` 透传，缺省即 `undefined` → JSON 里该键缺失 |
| `dsh/langgraph-orchestrator/src/jsonbridge.py:63` | `req.get("workdir", "")` → 空串 |
| `dsh/langgraph-orchestrator/src/api.py:365-369` | `run_full`：空串或非绝对路径 → 直接 `return {"ok": false, "error": "WORKDIR_REQUIRED"}` |

结论：**只要模型不显式写 workdir（这是最常见、也是文档默认的用法），就 100% 命中 365 行早退，graph 一次都不会构建。** 且返回体只有一行 `error`，没有任何修复指引，模型只能瞎猜重试。

`execution` 分支（`execution.py:87`）有同样的空 workdir 早退，但它语义上确实必须显式 workdir（要跑具体命令），可保留。

# 3. 补充事实（针对审核 P1-1/P1-3 的核实结果）

**P1-1 核实：子进程 cwd 假设成立。**
`dsh/orchestrator/lib/index.js:94` 已显式 `spawn(config.pythonExe, args, { cwd: config.projectDir, ... })`；
`lib/config.js:35-37` 强制 `projectDir` 必填且不能为空（否则插件启动即报错）。
所以 `os.getcwd()` 在本链路上**确定等于** `projectDir`（编排器工程根），不是任意目录。
但审核建议更强：由插件**显式**传递，不靠隐式 cwd。**采纳**：插件侧新增传 `projectCwd: config.projectDir`，Python 侧优先用它，`os.getcwd()` 降为最后兜底。

**P1-3 核实：全文引用已扫干净。** `WORKDIR_REQUIRED` 仅 4 处命中：
- `src/api.py:367,369`（本次改）
- `src/execution.py:87`（保留，语义要求显式）
- `tests/test_plan_versions_p0.py:103`（本次改）
- `dsh/scripts/preflight-p0.mjs:7` 用的是 `WORKDIR_NOT_FOUND`，与 full 无关，不动。

`"required for every full request"` 仅 1 处：`lib/index.js:381`（本次改）。

# 4. 分布实施方案

**改动点 A（主修复）：`src/api.py` `run_full` 三级解析**

签名：`run_full(request, config_path, session_id, workdir="", project_cwd="")`

**规范定义（P0 冲突修正：显式路径先 abspath 归一化，不再要求原始输入是绝对）**：

```
_is_blank(v) = v is None or str(v).strip() == ""
# 相对路径解析基准：优先 project_cwd（若合法）否则进程 cwd
_base = project_cwd if (not _is_blank(project_cwd) and Path(project_cwd).is_dir()) else os.getcwd()

1) 若 not _is_blank(workdir):
     p = (Path(_base) / Path(workdir).expanduser()).resolve() if not Path(workdir).is_absolute() \
         else Path(workdir).expanduser().resolve()
     if p.is_dir():  → 采用，workdir_source = "workdir"
     else:           → {"ok": False, "error": "WORKDIR_NOT_FOUND", "cwd": str(p), "hint": ...}  # 终止
2) elif not _is_blank(project_cwd):
     p = Path(project_cwd).expanduser().resolve()
     if p.is_dir():  → 采用，workdir_source = "project_cwd"        # ← 枚举统一
     else:           → 下洩到 3)
3) else:
     p = Path(os.getcwd()).resolve()
     if p.is_dir():  → 采用，workdir_source = "process_cwd"
     else:           → {"ok": False, "error": "WORKDIR_REQUIRED", "hint": ...}   # 兵底
```

**关键点**：
- **`workdir_source` 枚举统一为 `workdir` / `project_cwd` / `process_cwd`**（原计划写的 `project_dir` 是错的，已改），消费方与文档同步。
- **相对 workdir 以 `project_cwd` 为基准解析**（无则用进程 cwd），避免 `"."`/`"build"` 解析到错误目录；返回体带解析后的绝对 `workdir`。
- **`"."` → 成功**，`workdir_source="workdir"`（归一化后是目录）。与失败规则不矛盾：失败指的是归一化后**仍不是目录**。
- **显式给了 workdir 就严格**：归一化后不是目录 → NOT_FOUND 立即终止，**不**静默下洩。
- `project_cwd` 不可用 → **不报错**，下洩到 process_cwd。
- **`process_cwd` 兜底打 info 日志告警**（P1-3 采纳）：告知“本次未显式指定 workdir，使用进程 cwd=<path>”，避免在预期外目录执行而不自知。
- `WORKDIR_REQUIRED` 保留作**最终不可达兵底**，满足兼容性。

成功返回新增 `workdir`（解析后绝对路径）+ `workdir_source`；**不改原有字段**。

**改动点 B（错误返回自解释）：保留 `WORKDIR_REQUIRED` 以兼容（P1-2 采纳）**

审核建议 2/3：删 `WORKDIR_REQUIRED` 属对外契约变更，grep 无法覆盖 HTTP 客户端。**改方案**：
- **保留** `WORKDIR_REQUIRED` 这个 code 名（不删），但**仅在所有三级解析全部失败且无任何可用目录时**返回（实际几乎不可达）。
- 主要失败路径（显式传了但不存在/非目录/非绝对）→ `WORKDIR_NOT_FOUND` + `hint`。
- 成功返回新增 `workdir` + `workdir_source`，**不改变原有字段**。
- 如此：无任何调用方会看到 code 消失，兼容性无损。

**改动点 C（一致性）：`lib/index.js` schema 描述 + 显式传参**

- `workdir` 描述改为：`optional for full graph mode; required when execution is set`（与 A 的规则精确对应，不再说 “defaults to projectDir”）。
- **不改** schema 的 optional 属性。
- `execute` 的 full 分支额外传 `projectCwd: config.projectDir`。

**execution 场景不变（P1-2 澄清）**：`args.execution` 存在时走 `lib/index.js:450-455` 的 `preflight`，它要求合法 workdir；缺失时返回 `code:"WORKDIR_NOT_FOUND"`（非 REQUIRED）——这是**现有行为，本次不改**。graph 模式（无 execution）才是兜底路径。两条路径互不影响。

**契约变更说明（P1-3）**：`full` 模式下 `WORKDIR_REQUIRED` → `WORKDIR_NOT_FOUND`（+`hint`）。已确认全局无外部消费方依赖该 code（仅测试引用），属可接受变更。

**不改动**：`execution.py` 严格校验；`plan_review` 的 workdir 语义；`preflight-p0.mjs`。

# 6. 风险与回滚

| 风险 | 评估 | 缓解 |
|---|---|---|
| 兜底到工程根导致相对路径错位 | 中。默认 cwd 是编排器工程根，不是用户业务仓 | 返回体带 `workdir` + `workdir_source`，调用方可一眼识别；跨仓操作仍应显式传 workdir；`hint` 中也提醒 |
| 删除 `WORKDIR_REQUIRED` 影响外部调用方 | 低 | 已扫：仅 execution 路径保留该 code，full 路径无其它消费方 |
| 已有测试断言 `WORKDIR_REQUIRED` | 中。`tests/test_plan_versions_p0.py:103` | 同步更新：`('', …)` 与 `('.', …)` 两例改为断言兜底行为 |

**回滚**：api.py 函数级改动，`git checkout -- src/api.py` 完全回滚；index.js 仅描述文字 + 一个参数。

# 8. 验证计划（按三级解析 + workdir_source 分例）

1. 基线：`python -m pytest tests -q` → **123 passed**（已跑，无预存在失败）。
2. 完整矩阵（**含 P1-2 主要失败路径**）：

| # | 入参 | 期望 |
|---|---|---|
| 1 | **未传 workdir** + project_cwd 有值 | 成功；`workdir_source="project_cwd"` |
| 2 | **未传 workdir** + project_cwd 也缺 | 成功；`workdir_source="process_cwd"` |
| 3 | `workdir=""` / `"   "` + project_cwd | 成功；`workdir_source="project_cwd"` |
| 4 | `workdir="."` | 成功；`workdir_source="workdir"`；`workdir` 为解析后绝对路径 |
| 5 | `workdir=<相对子目录>`（project_cwd 有值） | 成功；以 **project_cwd 为基准**解析；source=workdir |
| 6 | `workdir=<tempdir 下不存在的路径>` | `error="WORKDIR_NOT_FOUND"` + `hint` |
| 7 | `workdir=<一个文件路径>`（用 `__file__`） | `error="WORKDIR_NOT_FOUND"`（非目录） |
| 8 | project_cwd 指向不存在目录 + workdir 未传 | 不报错；下洩到 `workdir_source="process_cwd"` |

非法路径统一用 `os.path.join(tempfile.gettempdir(), "nope-" + uuid4().hex)`（**跨平台**，不用 `Z:/`）。文件路径用例用 `__file__`。

**实现硬要求**：判定用 `_is_blank(v)`，**禁止** `v == ""`（正是原 bug 形态）。

3. 新增用例：`project_cwd` 确实被插件透传（monkeypatch 桩 `build_graph`/`load_config`）。
4. 回归：`python -m pytest tests -q` **全绿**。
5. 真实链路（关键）：`orchestrate {op:"full", request:"列出当前目录文件"}`（**不传 workdir**），确认 `mode=full`、`ok=true`、`plan`/`steps`/`final` 非空，**而非 `WORKDIR_REQUIRED`**。
