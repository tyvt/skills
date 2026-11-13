# openviking
Open-source memory service: session storage, vector index, memory extraction; used by DSH as long-term memory.

## Basic
- Version 0.5.3, port 1933, auth_mode=dev (no auth); /health returns {"status":"ok","healthy":true}
- Data dir ~/.openviking; memory path data/viking/default/user/default/memories/ (identity/soul/entities/events/preferences)
- Installed in C:\Program Files\Python310\Lib\site-packages\openviking; config ~/.openviking/ov.conf
- start-server.bat starts Ollama then server; auto-start shortcut; cold start recovers within 12s

## Config & Components
- Embed model bge-m3-ov (dim 1024, num_batch=1024, num_ctx=8192)
- Extract VLM: openai/auto/hy3 via magpie; VLM max_concurrent=8 (raised from 4 on 2026-11-09); session_commit max_concurrent default 8, VLM is bottleneck
- DSH plugin @openviking/dsh-memory-plugin writes mirror; allow_metadata_override:true
- Per-round injection logged in .recall_log.json (e.g., dsh-session-fe39d020 turn 2524 logged 10 URIs)
- 2026-11-05 import dsh-session-fe39d020: pending_tokens~7459, commit_count 42, memories_extracted 29

## CLI
- ov CLI needs ovcli.conf; add-memory auto-classifies; mv/rm keep index consistent; reindex --mode vectors_only --wait true rebuilds (async, may timeout but continues)

## 2026-11-09 Audit
- False alarm: /debug/health and /observer falsely false due to Embedding Errors=2 (in_progress=1) counted by NamedQueue._has_active_errors; reset_status never called
- Real endpoint memories=4428; Requeued 1008 frozen, not active failure; all queues empty
- Pre-fix throughput: VLM conc=4 + serial commit ~3min; 38/39 session_commit done (p50 163.6s)
- Fix: patched _has_active_errors to 900s window, restarted (pid 14796) → healthy; VLM 4→8 retest 8/8 success; stuck e5c4be47 auto-failed, total 5102
- 14:23 check: port 1933 LISTENING, healthy, total_memories 5116; VLM 3425 and Ollama 11434 LISTENING
- 2026-11-12 排查：2026-11-04→11-12 共 1032 次 API 请求（97.2% 为 200），错误含 22×404、2×409、2×405、8 次 find 检索错误
- 检索延迟：search p50 5.2s / p90 7.0s / p99 11.9s / max 51.4s；find 单次平均约 50s
- VLM（auto/hy3）累计 38.0M input + 31.8M output token；query_planner 角色在每次 search 改写查询，约 17 万 token/search，为最大成本与最慢路径（ov.conf 仅配 vlm=auto/hy3，query_planner 默认继承）
- 凌晨 0–6 点仍稳定消耗约 100k+ VLM token/小时，与真实业务量脱钩，疑似常驻/定时抽取或查询改写空转
- 2026-11-12 已产出分析与优化计划文档，用户选择仅规划、未落任何配置/脚本改动

## 2026-11-13 优化计划与空转根因
- 决定性证据（2026-11-13）：DSH 插件每 turn 自动召回 → 凌晨无人时段每小时仍 9–26 次 search（UTC 03 时 22 次），9k in+9k out/次 VLM 消耗同步；UTC 13 时检索为 0 却仍有 hy3 38k+9.6k token → 后台记忆抽取为第二来源
- 成本（2026-11-13）：27h 窗口 hy3 合计 1.84M in + 1.67M out（≈130k tok/h 持续），按 3/15 元每 M 估算 ≈ ¥31/天；bge-m3 本地零成本
- 优化计划 .plan/openviking-optimization-20261113.md 于 2026-11-13 置为 approved / human_confirmed: true（修订后通过审核，原带 11 条 P1/P2 意见）
- 落地顺序：A 可观测性（新增 A0 caller 埋点作为 B 的进入 gate）→ B 成本 → C 行为；B2 保留定时路径 feature flag + 漏抽检测
- 验收指标：A 阶段错误明细零缺口/404·409 零新增；B 阶段 hy3 24h 日均 token 降 ≥70%、深夜归零、p50 不超 A0 基线×1.1、灰度命中率降 >10% 即回滚；C 阶段前后对照 10 会话基线
- 实施：A0/A1/A3 需改插件源码（目标 0.5.32，走 worktree+分支），插件源码仓不在 D:epository 顶层，候选 ~/.dsh/patches；B1 的 ov.conf 改动涉及服务重启，选低峰执行
- 本会话成本已 157k，建议下个会话以该计划为蓝本开始阶段 A

<!-- MEMORY_FIELDS
{
  "category": "记忆服务程序",
  "name": "openviking",
  "source_extraction_id": "e9bbb5fc9fe84cc8b7906037ebb25f31",
  "version": 30,
  "memory_type": "entities"
}
-->