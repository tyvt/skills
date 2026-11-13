---
status: approved
human_confirmed: true
session: plan-review-input-slim
title: plan_review 送审输入精简（降低 grok token/时延）
review_verdict: pass
review_score: 74
review_p0: 0
approved_sha256: ef398563b25cc9c9d8976e87dbe8c90dfa4c2269c04ed0c3c203511381a439c1
---

# plan_review 送审输入精简

## 前因后果
grok 首选 plan_review，token 越多越慢（实测 1.7k tok→27s，15k tok→173s）。当前计划 <16000 字会**逐字全量**送审（api.py:296-299 仅 >16000 才 raise 拒绝），prose/空行/装饰线全计入 token，拖慢 grok。目标：送审前做无损结构压缩，降低输入 token，不降低审核质量。

## 现状与证据
- `api.py:28` `PLAN_REVIEW_CLIP_CHARS = 16000`；`api.py:296-299`：`plan = prepared["plan_markdown"]`，仅当 `len(plan) > 16000` 才 `raise` 拒绝，<16000 **逐字全量送审**（`_clip_plan` L176 全仓仅定义处 1 次命中、未被调用，是死代码）。
- `api.py:313-321` 送审 user_content = context + `## 待审核计划` + **原样 plan**。
- `_PLAN_REVIEW_SYSTEM`(L29-47) 明确"不要复述计划"、输出≤3 issue×180字，说明审核只需**要点**非全文。
- 实测 grok token→时延近似线性（11ms/tok），压缩输入直接省时延。

## 实施方案
0. 加开关：`api.py` 顶部 `import os`；`PLAN_REVIEW_CONDENSE = os.getenv("PLAN_REVIEW_CONDENSE","true")=="true"`。**默认 true**，置 false 即整体回退（送审原样 plan，等价当前行为）。
1. 新增 `_condense_plan(plan)->(condensed, ratio)`，**状态机逐行扫描**（严禁全局正则替换）。维护 `in_code`；空行计数 `blank_count`。逐行规则（顺序即优先级）：
   - **(红线1) Fenced code block**：`line.strip().startswith('```')` 翻转 `in_code` 并把该行原样入栈；`in_code==True` 时**任何行一字不改**原样入栈（含 `---`/空行/缩进），并清零 `blank_count`。
   - **红线2 空行折叠**：非代码块内空行累计；仅 `blank_count==1` 时压入一个 `''`，>1 丢弃。**`blank_count` 在任意状态切换处（进入/离开 code block、frontmatter 段、表格段）一律清零**，避免跨段累加。
   - **(红线3) Frontmatter**：用「开头段」布尔状态处理——若文件首行是纯 `---`，则其后直到下一个纯 `---`（含）的所有行**原样保留**，期间不做任何装饰线删除/空行折叠；该段结束后 `blank_count=0`。
   - **装饰线/setext 判定**：`is_decoration=整行只由 - * _ 空格 制表 组成`。满足则依次排除：① 在开头 frontmatter 段内→保留；② 含 `|`（GFM 表格分隔行）→保留；③ 上一行非空且不以 `#` 开头（setext 下划线如 `===`）→保留；④ 否则纯装饰线→**删除**。
   - **普通内容行**：一律原样入栈（**不删行尾空格**保护硬换行，不改行内内容）。`ratio=len(condensed)/len(plan)`。
2. `run_plan_review` 送审：开关开则 `condensed,ratio=_condense_plan(plan)` 显式解包，`plan_for_review=condensed`，否则原样；再对 plan_for_review 套 `PLAN_REVIEW_CLIP_CHARS` 上限（先condense后clip，>16000才raise）；user_content 只拼 plan_for_review；日志记 original/condensed 字符数与 token 预估 `round(len/1.5)` 及 ratio。sha/version 按原 plan 算，压缩仅在拼接层。
3. 单测 `tests/test_condense_plan.py`：喂变态 Markdown（开头 frontmatter + 连续3空行 + 含 `---` 的代码块 + GFM 表格 + 正文 `---` 分隔线 + setext `===` 标题 + 行尾双空格硬换行）。**断言口径（消除“删hr vs HTML全等”矛盾）**：
   - 红线项：代码块内与 frontmatter 段逐字保留、GFM 表格分隔行保留、setext 下划线保留、硬换行（行尾两空格）保留、连续空行折叠为 1。
   - 允许的变化：**正文纯装饰线（渲染为 `<hr>`）被删除是预期行为**，故不做“HTML 全等”断言；改为断言「**文本内容一字未少**（所有含字母/数字/中文/`|` 的行原样出现）+ 去除 `<hr>` 与空行归一后 HTML 结构一致」。
   - `ratio<1`。

## 风险与回滚
- 状态机边界漏判 → 误删 frontmatter/代码块行/setext下划线。缓解：三红线显式分支 + 所有状态切换处 `blank_count=0` + 变态样例单测 + “文本内容一字未少”断言；开关 `PLAN_REVIEW_CONDENSE=false` 一键回退。
- 回滚：置环境变量 false，或送审改回原样 plan。

## 验证计划
- `python -m pytest tests/test_condense_plan.py -q` 全绿（覆盖 frontmatter/代码块/表格/setext/硬换行；**验证口径＝内容行一字未少 + 去除 `<hr>`/空行归一后结构一致**，不要求 HTML 严格全等）。
- 端到端：取一份真实 ≈8k 字计划，condense 开/关分别调 plan_review，对比 grok 的 verdict 与 issues 完全一致。

## 范围与成本
- 只改 `api.py` + 新增 1 测试文件。送审计划照旧由主控写（不改 AGENTS.md）。

## 实施注记（plan_review PASS 74 分后落库的 P1 细则）
- `blank_count`：**每轮循环结束统一按「本行是否空行」重算**，且在删除装饰线/进入任意段后都归 0；不做“未定义的重置”。
- `ratio`：**先 `"\n".join(out_lines)` 得到字符串再算 `len(condensed)/len(plan)`**（字符长度比，空则 ratio=1）；CLIP 只做 `>16000` 检查并 raise，不引入截断歧义。
- 测试断言口径以「内容行一字未少 + 结构归一后一致」为准，装饰线限 3 行以上纯 `-*_` 才算，避免误删单字符行。
