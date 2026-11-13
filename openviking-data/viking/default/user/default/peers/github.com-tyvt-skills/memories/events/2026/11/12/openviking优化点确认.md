# Summary
基于 usage_audit.sqlite3（2026-11-04→11-12，1032 次请求，97.2% 成功）分析，确认检索链路（search/find 延迟 p50 5.2s、max 51.4s；find 平均约 50s）与 VLM token 双高（auto/hy3 累计 38M input + 31.8M output；query_planner 每次 search 约 17 万 token）为最需优化点；报告写入 openviking-analysis-2026-11-12.md。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 排查openviking最近的调用情况，和其本身的错误，警告日志，分析出最需要优化的点
**assistant [peer=github.com-tyvt-skills]**: I'll start by understanding the OpenViking setup and where its logs live.
**assistant [peer=github.com-tyvt-skills]**: No teammates yet. Let me locate the OpenViking installation and its logs.
**assistant [peer=github.com-tyvt-skills]**: Key logs: `watchdog.log`, `state\server.err.log`, `state\server.out.log`, `state\ollama.*.log`, plus `usage_audit`. Let me inspect the config, start script, and log sizes/tails.
**assistant [peer=github.com-tyvt-skills]**: `server.err.log` is stale (Nov 2). The live data is in `usage_audit.sqlite3` (with a 4MB WAL — growing). That's the real source for "recent call activity." Let me inspect its schema and the watchdog log tail.
**assistant [peer=github.com-tyvt-skills]**: `request_audit` (1032 rows, with status_code/error_code/duration_ms) is the goldmine for "recent calls + errors/warnings." Let me run a thorough analysis query.
**assistant [peer=github.com-tyvt-skills]**: Very clear signal: **search latency dominates** (avg 7.3s, max 51s; `find` avg ~50s). Let me dig into token usage (cost), session message volume, and the 404 sources — these tell the full story.
**assistant [peer=github.com-tyvt-skills]**: Now I have the full picture. Let me verify a few things: whether there's a live server log (state logs are stale from Nov 2), search result bloat, and the WAL growth concern.
**assistant [peer=github.com-tyvt-skills]**: WAL shrank to 1 byte (checkpointed). The live activity log is `data\vectordb\context\store\001617.log` (2.8MB, updated 20:11). Let me inspect it for errors/warnings, and check the server's real stdout destination via the task definition.
**assistant [peer=github.com-tyvt-skills]**: `001617.log` is binary (bytes, not text lines) — it's the vector store log, not useful for text scanning. The real operational telemetry is the `usage_audit` DB. Now I have enough to quantify. Let me build a comprehensive latency/token breakdown to nail the #1 optimization point, plus session-message volume and cost estimate.
**assistant [peer=github.com-tyvt-skills]**: I have a complete, evidence-backed picture. No teammates are needed — this is analysis, read-only. Let me get one more critical angle: the search error cases (8 `find` errors, what caused them) and correlate VLM token spend with search (VLM = hy3, used for query rewrite/expansion per call → this is the cost driver).
**assistant [peer=github.com-tyvt-skills]**: I now have a complete evidence base. Key derived insight: VLM (`auto/hy3`) burns **~120k input + ~105k output tokens every single hour, around the clock**, even at 3 AM — that's ~2.25M VLM tokens/hour-day, far exceeding search's own volume of ~a few dozen calls. This is the dominant cost. And search latency p50 = 5.2s, max 51s.

Let me quantify the VLM idle/cron overhead precisely and confirm the search-call-to-VLM ratio.
**assistant [peer=github.com-tyvt-skills]**: The numbers are decisive. I have everything needed. Let me write up the analysis. Since this is pure analysis (no code edits), per AGENTS.md no plan-review gate is needed — I'll deliver the report directly.

Let me compile the key figures:

- **Activity window**: 2026-11-04 → 2026-11-12, 1032 API requests, 1003 ok (97.2%)
- **Search latency**: p50 5.2s / p90 7.0s / p99 11.9s / **max 51.4s**; `find` avg ~50s
- **VLM tokens (auto/hy3)**: 38.0M input + 31.8M output all-time; **~3.05M tokens today alone for just 18 search calls** → ~170k tokens per search
- **Embedding (bge-m3)**: 9.6M tokens
- **Errors**: 22× 404 NOT_FOUND (16 unmatched routes + 5 content/read, 1 POST), 2× 409 ALREADY_EXISTS, 2× 405, and 8 `find` retrieval errors (in usage_retrieval_hourly, not surfaced in request_audit)
- **watchdog.log**: 212KB of "OK" heartbeats every 60s — pure noise, no rotation
- **WAL**: ballooned to 4.2MB before checkpoint
- **Stale logs**: server.err.log (Nov 2, aiohttp loop tracebacks), server.out.log, ollama.*.log — all abandoned; no live server logging to a file
- **Retrieval result bloat**: search returns avg 7.3 results but query tables show 11,122 results across 1,598 reqs = ~7/req, fine; but find returns 236/43 ≈ 5.5

Let me write the report file.
**assistant [peer=github.com-tyvt-skills]**: The gate wants a todo plan first, and a build baseline. This report is a pure documentation deliverable (no code change), but I'll satisfy the gate: record the plan via todo_write. Note the build gate is spurious for a Markdown analysis file (no code touched) — I'll record that fact rather than run a full build for a doc.
**assistant [peer=github.com-tyvt-skills]**: Now let me retry the write. The build-gate concern doesn't apply — this is a Markdown analysis document, not source code; there's no build in `D:\repository\skills` for a report file. Let me confirm the repo has no build step to run, then write.
**assistant [peer=github.com-tyvt-skills]**: Confirmed: no `package.json` at the repo root — this is a skills/docs directory, not a buildable app. No npm build applies; my deliverable is a standalone Markdown analysis file with zero code impact. Build-gate baseline is therefore N/A (no code touched). Retrying the write.
**assistant [peer=github.com-tyvt-skills]**: 排查完成。以下是结论。

## OpenViking 调用与错误日志排查结论

数据来自 `usage_audit.sqlite3`（1032 条请求，2026-11-04 → 11-12）、`watchdog.log`、`state\*.log`、`ov.conf` 与看门狗脚本。服务本身健康稳定（200 占 97.2%，无任何 5xx，看门狗每分钟通过）。

### 🔴 最需要优化的一点：检索链路（search/find）延迟 + VLM token 双高

这是唯一同时击中「最慢」「最烧钱」「占成本主体」三点的地方：

**延迟**（相比消息写入 22ms，慢 200–2000 倍）
- `search/search`：p50 5.2s，p90 7.0s，**p99 11.9s，max 51.4s**
- `search/find`：单次平均 **~50s**

**成本**（这才是真正的痛点）
- `auto/hy3`（VLM）累计 **38.0M input + 31.8M output** token；
- **今天只有 18 次 search，却烧掉 3.05M token ≈ 每次约 17 万 token**；
- 而且**凌晨 0–6 点每小时仍稳定消耗 ~100k+ VLM token**，与真实业务量严重脱钩 → 存在常驻/定时的 VLM 空转（很可能是记忆抽取/查询改写）。

> 今天 VLM token ≈ 全站 token 的 92%，但只对应 18 次搜索。**修检索改写策略 = 同时砍掉最大的账单和最慢的路径。**

### 🥈 次优先：消除凌晨 VLM 空转
凌晨稳定 ~100k/小时却无对应用量，若为定时抽取任务，改为按需/降频即可砍掉大半日成本。

### 🟡 错误与日志问题（真实缺陷，非致命）
- **无 5xx**；4xx 明细：`404` 22 条（16 条 `__unmatched__` 探测路径 + **5 次重复拉取不存在的 `profile.md`**）、`409` 2 条（重复 create session）、`405` 2 条（用错 HTTP 方法）。
- ⚠️ **可观测性缺口**：`find` 有 **8 次检索错误**（success 43 / error 8），但 `request_audit` 里**查不到单次详情**，只剩聚合计数 → 出问题无法定位。
- **日志卫生差**：`watchdog.log` 212KB 全是每分钟 "OK" 心跳、无轮转；`server.err.log`/`ollama.*.log` **停在 11-02 后再不更新**（服务当前根本没把运行日志落盘）；唯一在写的 `001617.log` 是二进制向量存储日志，不能当运维日志用。
- `usage_audit` 的 **WAL 曾一度膨胀到 4.2MB** 才 checkpoint（现已回落到 1B）。

完整报告（含每项证据与落地动作）已写入 [openviking-analysis-2026-11-12.md](openviking-analysis-2026-11-12.md)。

---

本轮为**只读排查，未改任何配置或代码**。若要落地优化（调 `ov.conf` 的 vlm 策略、watchdog 日志轮转、给 server 加日志重定向、WAL checkpoint），属配置/脚本改动，需要我先出实施计划再请你确认——你可以选择：

<!-- MEMORY_FIELDS
{
  "event_name": "openviking优化点确认",
  "goal": "确认最需优化项",
  "summary": "基于 usage_audit.sqlite3（2026-11-04→11-12，1032 次请求，97.2% 成功）分析，确认检索链路（search/find 延迟 p50 5.2s、max 51.4s；find 平均约 50s）与 VLM token 双高（auto/hy3 累计 38M input + 31.8M output；query_planner 每次 search 约 17 万 token）为最需优化点；报告写入 openviking-analysis-2026-11-12.md。",
  "ranges": "0-41",
  "source_extraction_id": "9e8ca7f7f70a4da68857fe4e1b86284a",
  "version": 1,
  "memory_type": "events"
}
-->