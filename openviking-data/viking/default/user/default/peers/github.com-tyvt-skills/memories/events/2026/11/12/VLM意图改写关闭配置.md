# Summary
2026-11-12，助手修改 ov.conf 新增 retrieval 段 enable_intent:false、recall_intent_timeout_s:2.0，关闭 VLM 意图改写（A1+A2）。实测 search 延迟由 p50 5.2s 降至 0.18s（约 27×），VLM token 增量由每次约 17 万降为 0（两次测试前后总数均为 3,111,646），检索结果仍正常。改动走 _semantic.py:409 原有 fail-closed 原始 query 路径，安全无报错。备份 ov.conf.bak.20261112-202358。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 最有必要、收益最大的三件事，按顺序：

A1+A2（query_planner 的 VLM 改写） —— 这是唯一一个同时砍掉「最大成本」和「最大延迟」的动作，一次改动解决报告里排名第一和第二的两个瓶颈。

C1（server 日志重定向落盘） —— 成本极低，但没有它，A/B 两阶段做完你无法验证效果、线上再出问题也无法定位。它是所有后续优化的前提。

C4（修重复启动的双实例） —— 两个实例同时跑，token 账单和延迟数据都可能是双份污染，先修掉才能保证 A/B 的实测数据可信。
做这几件事
...
**assistant [peer=github.com-tyvt-skills]**: Now edit `ov.conf` for A2 — add the `retrieval` section.
...
**assistant [peer=github.com-tyvt-skills]**: Now verify both files are valid (JSON parses; bat content correct) before restart.
...
**assistant [peer=github.com-tyvt-skills]**: JSON valid, `enable_intent=False`, `timeout=2`. Let me grep the bat to confirm the final state without a full re-read.
...
**assistant [peer=github.com-tyvt-skills]**: All three verified working:
- **C1**: `server.log` created (983 bytes, live INFO/WARNING output streaming). ✅
- **C4**: one `openviking-server.exe` process (PID 26388 launcher / 15284 listener) — single instance. ✅
- **Health**: `{"status":"ok","healthy":true}` ✅

Now verify **A2** actually took effect: run a search and confirm latency drops below the old 5s and no intent-analysis VLM spend. Let me time a search via the API. First check how to call search (needs session or not). I'll use the search endpoint with a simple query and measure.
...
**assistant [peer=github.com-tyvt-skills]**: **A2 verified working.** Search with session completed in **0.19s** (was p50 5.2s) — a ~27× speedup — with relevant results returned. The intent/expansion VLM path is now skipped. (The earlier 400 was a PowerShell body-encoding quirk, not a config problem.)

Let me confirm the no-session call and verify VLM token didn't grow from these test searches (proving intent no longer fires).
...
**assistant [peer=github.com-tyvt-skills]**: **Decisive confirmation:** VLM token count **did not increase at all** (3,111,646 before and after both searches). Before the change, each search would burn ~170k VLM tokens; now **zero**. And both searches completed in ~0.18s.

Let me clean up the test session and finalize. Also confirm single instance is still stable.
...
**assistant [peer=github.com-tyvt-skills]**: 三项全部已落地并验证。总结：

## 已完成（已重启生效，全部实测通过）

### ✅ A1+A2 — 关闭 VLM 意图改写（成本+延迟双降）
- **根因确认**：`retrieval.enable_intent` 默认 True → 每次 search 都跑 VLM(`auto/hy3`) 意图分析，且 `recall_intent_timeout_s=5.0` 与 search p50 5.2s 吻合——**花钱买了个 5s 超时后被丢弃的结果**。
- **改动**：`ov.conf` 增 `"retrieval": {"enable_intent": false, "recall_intent_timeout_s": 2.0}`。
- **实测效果**：
  - 搜索延迟 **5.2s → 0.18s（约 27×）**
  - **VLM token 完全不再增长**（改前每次 search 约 17 万 token；两次测试搜索前后 token 总数均为 3,111,646，增量为 0）
  - 检索结果仍正常命中
- **安全性**：走的是代码里本就存在的 fail-closed 原始 query 路径（`_semantic.py:409` 的 elif 被跳过），不报错，仅失去长尾改写收益。...

<!-- MEMORY_FIELDS
{
  "event_name": "VLM意图改写关闭配置",
  "goal": "关闭VLM意图改写",
  "summary": "2026-11-12，助手修改 ov.conf 新增 retrieval 段 enable_intent:false、recall_intent_timeout_s:2.0，关闭 VLM 意图改写（A1+A2）。实测 search 延迟由 p50 5.2s 降至 0.18s（约 27×），VLM token 增量由每次约 17 万降为 0（两次测试前后总数均为 3,111,646），检索结果仍正常。改动走 _semantic.py:409 原有 fail-closed 原始 query 路径，安全无报错。备份 ov.conf.bak.20261112-202358。",
  "ranges": "0-1,32,34,37,43,53,55,61-64",
  "source_extraction_id": "f58cdd62364c405cb74d94b1cc225f9f",
  "version": 1,
  "memory_type": "events"
}
-->