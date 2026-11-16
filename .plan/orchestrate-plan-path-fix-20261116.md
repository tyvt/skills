---
status: approved
reviewer: plan_reviewer (workbuddy/deepseek-v4.1-flash)
review_verdict: pass
review_score: 80
approved_sha256: 3c143d344bc6eccf46e9d89d178e026317d85092db714b81dec7e5ac31952deb
approved_version: 3
human_confirmed: true
human_confirmed_at: 2026-11-16T09:01+08:00
---

# orchestrate plan_review：plan_path 契约打通（P0-1）

## 前因后果

`orchestrate {op:"plan_review", plan_path:...}` 文档写明可用 plan_path 送审，但实测只给
plan_path、不给内联正文时会报 `orchestrate: op=plan_review 需要 plan 参数`；即便绕过该报错，
Python 侧 `prepare()` 也不读 plan_path 指向的文件、直接 raise「plan is empty」。两层各断一处，
导致「工具承诺的用法不可用」，被迫每次把整篇计划正文塞进请求，既浪费 token 又易超送审长度上限。

## 现状与证据

- JS 层：`dsh/orchestrator/lib/index.js:447` 校验条件
  `if ((!args.plan || !String(args.plan).trim()) && !args.delta?.length) throw ...`
  —— 完全不看 `args.plan_path`（但 plan_path 已在 schema :412 声明，并在 :457 透传给 Python）。
- Python 层：`dsh/langgraph-orchestrator/src/plan_versions.py:77`
  `if not isinstance(text,str) or not text.strip(): raise ValueError('plan is empty')`
  —— **不读文件**；`resolve_plan`(:29) 只解析路径（含 `.plan` 边界与 .md 后缀校验），不加载内容。
- 现有测试：`tests/test_plan_versions_p0.py` 直接用 `prepare(tmp_path, plan_path, session_id, text)`，
  全部传内联 text，无「text 空 + 文件存在」用例，故回归盲区。

## 实施方案

1. JS `dsh/orchestrator/lib/index.js:446-449`：抛错条件放宽——`plan`、`plan_path`、`delta` 三者皆空才报错；
   文案改「需要 plan 或 plan_path 参数（plan 正文或 plan_path 相对 workdir 的 md）」。**轻量预检（阻塞点③）**：
   `plan_path` 语义 = **相对 workdir 的路径**（与 `resolve_plan` 的 `root / target` 一致，**禁止再拼 .plan**）；
   给了 plan_path 且 workdir 可解析时，用 `path.resolve(workdir, plan_path)` 判存在性，不存在即 JS 报
   「plan_path 文件不存在」。即调用方传 `.plan/x.md`（resolves 到 workdir/.plan/x.md），不传 `x.md`。
2. Python `dsh/langgraph-orchestrator/src/plan_versions.py:prepare`：`text` 为空时，若 `target`
   （resolve_plan 产出、受 .plan 边界与 .md 约束）存在 → `target.read_text(encoding='utf-8')` 作为 text。
   - **digest 一致性（阻塞点①）**：直接把 `read_text` 原始结果赋给 text，**不 strip、不做任何改写**；
     空判只用 `text.strip()` 判空但不回写 text。`plan_sha` 内部 `canonical_plan` 已统一 CRLF/BOM→\n，
     故「文件读入」与「内联同内容」digest **必然一致**，approved_sha256 版本比对不漂移。
   - **大小上限（阻塞点②）**：读入前先 `target.stat().st_size` 限大小，**先 stat 后读**避免整读进内存；
     超 `MAX_PLAN_CHARS`（模块常量=16000，镜像 api.PLAN_REVIEW_CLIP_CHARS）→ raise「plan exceeds review size limit」。
   - **delta 与 plan_path 互斥**：text 空且同时有 delta 时，走 delta 分支（text 取自 latest），**不读 plan_path**；
     仅当「text 空且无 delta」才读文件。空文件/目录/解码失败 → ValueError。boundary=workdir/.plan（:35），
     `resolve_plan` 对 `target.resolve()`（跟随符号链接）后 `is_relative_to(boundary)`，符号链接逸出被拒（:38-41）。
3. 测试 `tests/test_plan_versions_p0.py` 新增：①写 x.md + text 空 → plan_markdown==原文件、且
   `plan_sha(文件内容)==prepare 的 plan_sha256`；②不存在文件 → raise；③空文件 → raise；
   ④`../` 越界 → raise；⑤`.plan` 内符号链接指向外部 → raise；⑥text 与 plan_path 同内容时 digest 相等（阻塞点①回归）；
   ⑦超长文件 → raise（阻塞点②回归）。
4. JS 测试：①仅 plan_path 不抛；②三者皆空才抛；③plan_path 指向不存在文件时 JS 预检报错；更新旧文案断言。
5. 兼容/回滚：放宽 JS 校验只松不紧、向后兼容；确认无调用方依赖「缺 plan 快速失败」触发 fallback。
   变更受 git 管理，git revert 即可。

## 验证计划

1. `cd dsh/orchestrator && node --check lib/index.js`（JS 语法）。
2. **JS 用例跑真（阻塞点②）**：`cd dsh/orchestrator && node selftest.mjs`（无则 `node --test`），覆盖：
   ① 仅给 plan_path（.plan/x.md 存在）不抛；② plan/plan_path/delta 三者皆空才抛；③ plan_path 不存在 → JS 预检报错。
3. `cd dsh/langgraph-orchestrator && python -m pytest tests/test_plan_versions_p0.py tests/test_plan_review_p0.py -q` → 全绿（含新增 7 + 集成 1）。
4. 集成测试：tmp .plan 写样例（plan_path='.plan/x.md'）+ monkeypatch 返回 pass，`api.run_plan_review('', workdir, session_id, plan_path='.plan/x.md')` 断言不抛且 verdict=='pass'、plan_markdown 来自文件。
5. 手工：`orchestrate {op:"plan_review", plan_path:".plan/<某>.md", workdir:...}` 只给 plan_path 正常返回。

## 范围说明（诚实交代）

本计划只完成上一轮 P0-1 的 **(a) plan_path 契约**：消除 step14 的参数 bug 与被迫内联整篇的 token 浪费。
未触及 **(b) plan_review 改异步 job + 按 diff 规模触发**——那需宿主 job 基础设施，非本仓单点可验证，
55.3s 同步墙钟阻塞仍在，另立计划处理。
