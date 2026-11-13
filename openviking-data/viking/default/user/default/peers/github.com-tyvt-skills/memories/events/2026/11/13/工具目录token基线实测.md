# Summary
2026-11-13，为坐实 openviking 工具开销，助手对当前会话 projcache 与 OpenViking MCP 端点(127.0.0.1:1933)实测：工具目录每步固定占用 toolsTokens=16,327 tokens（systemTokens 仅 2,081，本会话 64 步/缓存读 3.71M）；OpenViking 24 个工具 JSON schema 合计 33,790 bytes ≈ 8.4k–9.7k tokens，占工具目录约 52%；重灾区为 add_resource(6.8KB)/write(3.3KB)/search(2.8KB)/add_skill(2.6KB)，低频维护工具(privacy_*/_acl/list_users/groups/cancel_watch/download)占约 8.3KB。结论：方案 A 净省约 8k tokens/步，性价比确定。文档 §2/§7 据此修正初稿低估的 1.5k–2.5k 估算。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 对现在所有dsh默认发送的工具清单做个体检，看看有什么优化空间，想给个方案
...
**assistant [peer=github.com-tyvt-skills]**: 好，先量化 baseline。这能坐实「openviking 24 工具到底占多少」，避免凭估算拍板。让我跑 `token-optimizer` 出当前会话的 catalog token 组成。

先看 token-optimizer 这个 skill 怎么用。
**assistant [peer=github.com-tyvt-skills]**: The script needs session projection cache. The most useful metric here is `contextBreakdown.breakdown.toolsTokens` — the actual per-step context cost of the tool catalog. Let me run it, but I want the *current* session's breakdown specifically. Let me run the analyzer (it scans all sessions) and also directly read the current session's contextBreakdown.
**assistant [peer=github.com-tyvt-skills]**: The most recent session (8:46:06) is likely this one. Let me read its contextBreakdown (toolsTokens is the key number).
**assistant [peer=github.com-tyvt-skills]**: **Baseline 数据坐实了。** `toolsTokens = 16327` tokens —— 这就是**这套工具目录每步固定占用的上下文**（systemTokens 只有 2081）。

Now let me decompose that 16327 into openviking 24 tools vs the rest. The projcache doesn't break down by tool. But I can estimate the openviking share precisely by measuring its tool schema size. Let me get exact schema sizes for openviking tools — measure the actual JSON schema published by the MCP server. Let me query the MCP server or measure from a session's tool definitions if stored.

Let me check if the session cache stores the raw tool definitions, or if I can get tool schema sizes another way. Actually — the cleanest: measure each tool's serialized JSON schema. The openviking tools come from a live MCP server; I can `list_mcp_resources`? No. Better: check if there's a stored tools snapshot. Let me grep the projcache for tool counts/sizes, or check `~/.dsh/storages` for a tools dump.
**assistant [peer=github.com-tyvt-skills]**: No per-tool breakdown stored. To decompose the 16327 toolsTokens by source, I need the actual tool schemas. The most reliable: query the tools exposed and measure their JSON schema bytes. Since I can't easily dump live tool schemas, let me estimate openviking's share empirically by serializing the tool definitions I *can* see — but I don't have raw schemas either.

Alternative precise route: the openviking MCP server itself. I can hit its endpoint. But simplest robust measure: sum the parameter-schema JSON of each tool from the tool bundles (host tools) — giving an exact "host tools occupy X", and openviking = 16327 − X − other MCP.

Actually, let me reconsider. A cleaner decomposition: I know toolsTokens=16327 total. I can measure the **static host tool schemas** by asking the dsh tool registry. Is there a way to dump? Let me check if `dsh --dump-config` or a debug endpoint lists tools. But 16327 is measurable-precise already at the aggregate.

For the decision the user needs (是否值得动 openviking), what matters is **openviking's share within 16327**. Let me measure it directly: probe the openviking MCP server's tool schemas. The proxy is stdio; but the endpoint 127.0.0.1:1933 is HTTP. Let me try listing tools via an MCP call or measure from the package's published schema.
**assistant [peer=github.com-tyvt-skills]**: Tool schemas live in the external MCP server (not in this plugin). Let me probe the live MCP endpoint to get actual tool schemas and measure their size. The endpoint is HTTP at 127.0.0.1:1933. Let me check the ov-http / how to call tools/list, or just probe the proxy directly via a quick MCP handshake. Simpler: run the proxy script with a tools/list request. But that's involved.

Pragmatic approach: I have the aggregate (16327 total). I can measure host tool schemas exactly by extracting `parameters`/schema JSON from bundles. Then openviking = total − host − magpie-vision − gateway − orchestrator. Let me extract the JSON-schema portion from each host tool bundle to get an exact host-side figure.

Actually, the most decision-useful and honest statement: total toolsTokens = **16,327 per step** (measured). If openviking (24 of ~67 tools, with heavier schemas) is roughly half, ~7–8k tokens/step. Let me try to actually measure openviking share by querying the proxy quickly.
**assistant [peer=github.com-tyvt-skills]**: The proxy speaks stdio MCP → forwards to HTTP. I can run it and do a `tools/list` over stdio to capture exact schemas. Let me write a tiny probe that spawns it and measures tool schema JSON sizes. But env/credential resolution may be tricky.

Simpler and robust: the tools I have ARE the schemas. I can reconstruct openviking tool schema sizes from the tool catalog that the harness sent me — but I don't have the raw JSON.

Let me just do the stdio probe; the proxy resolves config from its own env (same as dsh sets). I'll pass the needed env. Let me check what env it needs (mcp-env forwardConnectionEnv) — endpoint is in config hardcoded to 127.0.0.1:1933. Let me try.
**assistant [peer=github.com-tyvt-skills]**: The proxy needs credential env resolution that isn't available in my shell (the dsh host injects scrubbed env). Let me check stderr to see why.
**assistant [peer=github.com-tyvt-skills]**: Health OK. MCP needs proper Accept headers + session. Let me retry with correct streamable-HTTP headers.
**assistant [peer=github.com-tyvt-skills]**: In ConstrainedLanguage/this ps edition, the hashtable got stringified. Let me use HttpClient via .NET or build dictionary explicitly.
**assistant [peer=github.com-tyvt-skills]**: Now I have **exact** openviking tool schema sizes: **24 tools, 33,790 bytes of JSON ≈ 8.4k–9.7k tokens**.

But wait — the measured `toolsTokens` in the session was 16,327 total. Openviking's raw schema is ~8.4k tokens alone. That's about **half the entire tool catalog**! This confirms the P0 is dominant. Let me sanity-check: total toolsTokens 16327 vs openviking 8448 → openviking ~52% of tool context.

Let me also quantify: if routed through gateway, that 8448 tokens → ~200 tokens (one `mcp_gateway` entry). **Net save ≈ 8k tokens/step.**

Let me compute the economics and add this precise baseline to the doc. Also compare: this session 64 steps × 8k ≈ 512k tokens saved hypothetically (though cacheRead is cheap). Let me add a baseline section.
**assistant [peer=github.com-tyvt-skills]**: Wait — I removed the one-liner summary. Let me re-add it after section 7. Also I should reconcile the earlier §2 estimate (1.5k–2.5k) with the now-measured 8.4k — the earlier estimate was too low. Let me fix §2 to point to the measured baseline and restore the summary.
**assistant [peer=github.com-tyvt-skills]**: Now re-add the summary one-liner with corrected numbers at the end.
**assistant [peer=github.com-tyvt-skills]**: Now update the execute-recommendation since baseline is done (step 1 completed). Let me refine §6.
**assistant [peer=github.com-tyvt-skills]**: Let me verify job_list is clean and finalize.
**assistant [peer=github.com-tyvt-skills]**: Baseline 跑完了，结论比我初稿的估算**更狠**——数据已经把方案 A 的价值钉死了。文档已更新 👉 [工具清单体检与优化方案-20261113.md](dsh/reports/工具清单体检与优化方案-20261113.md)。

## 量化 baseline（实测，不是估算）

**会话 projcache 实测**（本会话 `session-61be2a12-…`）：

| 项 | 实测 |
|---|---|
| **toolsTokens（工具目录每步固定占用）** | **16,327 tokens** |
| systemTokens | 2,081 |
| messageTokens | 47,340 |
| 步数 / 缓存读 | 64 步 / 3.71M |

**OpenViking 24 个工具的精确体量**——我直接对 `127.0.0.1:1933` 的 MCP `tools/list` 做了实测：

- **24 个工具，JSON schema 合计 33,790 bytes ≈ 8.4k–9.7k tokens**
- **占整个 toolsTokens(16,327) 的约 52%**
- 重灾区：`add_resource` 6.8KB、`write` 3.3KB、`search` 2.8KB、`add_skill` 2.6KB；`privacy_*` + `*_acl` + `list_users/groups` + `cancel_watch` + `download` 这些低频维护工具就占了 ~8.3KB

> 也就是：**工具目录里一半就是 openviking 的 24 个工具**。我初稿按同类估的 1.5k–2.5k 太保守，实测是 8.4k，已在文档 §2/§7 修正。

## 结论没变，但更确定

- **方案 A（openviking 走 gateway）**：24 工具 → 1 个 `mcp_gateway` 入口（≈200 tokens），**净省 ≈8k tokens/步**。按本会话 64 步 ≈ 单会话少发 0.5M tokens 的 catalog 前缀。**性价比确定，值得做。**
- 拦路事实也已查证：插件 `mountOpenVikingMcp` 无开关 → 必须 `pnpm patch` 插件 或 上游加 `toolSurface/toolFilter` 开关；记忆 capture/recall/commit 走 HTTP 端点、与工具面独立，语义上可安全剥离。

**现在的选择就清晰了**：方案 A-1（patch 插件，快见效）vs 方案 A-2（上游加开关，最干净但要等）。要我按哪个方向先起草正式实施计划（走 plan_review + 人工确认）？还是就此把方案存档、暂不动？

<!-- MEMORY_FIELDS
{
  "event_name": "工具目录token基线实测",
  "goal": "实测工具token占用",
  "summary": "2026-11-13，为坐实 openviking 工具开销，助手对当前会话 projcache 与 OpenViking MCP 端点(127.0.0.1:1933)实测：工具目录每步固定占用 toolsTokens=16,327 tokens（systemTokens 仅 2,081，本会话 64 步/缓存读 3.71M）；OpenViking 24 个工具 JSON schema 合计 33,790 bytes ≈ 8.4k–9.7k tokens，占工具目录约 52%；重灾区为 add_resource(6.8KB)/write(3.3KB)/search(2.8KB)/add_skill(2.6KB)，低频维护工具(privacy_*/_acl/list_users/groups/cancel_watch/download)占约 8.3KB。结论：方案 A 净省约 8k tokens/步，性价比确定。文档 §2/§7 据此修正初稿低估的 1.5k–2.5k 估算。",
  "ranges": "0,135-175",
  "source_extraction_id": "6cead5f3b0314ebd8c74ed045ff09064",
  "version": 1,
  "memory_type": "events"
}
-->