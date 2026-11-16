---
name: token-frugal
description: 会话 token / 上下文成本的工作流归因。定位 goal 反复、compaction 失败、重复整读、大结果回灌、工具错误自愈等耗费原因，并使用 workflow-audit 做因果分析；需要按成本排序和生成行动清单时使用 token-optimizer。当用户问“为什么这么贵”“哪个操作烧掉 token”“审计会话流程”时使用。
---

# token-frugal — 会话 token / 上下文成本工作流归因

**职责：**用会话事件与用量证据解释 token 消耗来自哪些工作流行为；跨会话成本排序与行动优先级见 `token-optimizer`。

---

## 0. 先分清两个问题

- **账的问题**：哪个会话、哪个模型烧了多少未命中 → 跨会话成本排序与行动优先级见 `token-optimizer`；本 skill 只做归因。
- **每模型清单**：每个会话里**每个实际参与的模型**到底用了多少输入/输出/缓存命中，含 orchestrate 子模型 → 用 `audit-models.mjs`（见 §2.5）。
- **因的问题**：这些 token 是怎么被工作流烧掉的（goal 反复续跑、compaction 反复失败、重复整读、大结果回灌、工具错误自愈）→ 用 `templates/workflow-audit.mjs`。

脚本都在本 skill 目录（`workflow-audit.mjs` 在 `templates/` 下），**只读**，不写任何文件。

> ⚠️ `audit-tokens.mjs` 只读 projcache 的「整会话合计」，模型字段只取 `modelSelection.lastUsed` 单值——**算不出每个模型的输入/输出/缓存命中，也看不到 orchestrate 子模型消耗**。要每模型清单用 `audit-models.mjs`。

## 1. 数据源（也是最容易踩的坑）

| 数据 | 路径 | 说明 |
|---|---|---|
| 会话汇总 | `~/.dsh/storages/session_projcache/sessions/session-<sid>.json` | `record.rows.tokenUsage.totals`：uncachedInputTokens / cacheReadTokens / cacheWriteTokens / outputTokens；`sessionStats`：steps/turns；`contextBreakdown.breakdown`：system/tools/message 分项；`modelSelection.lastUsed`：provider/model/reasoningEffort |
| 事件日志 | `~/.dsh/sessions/<enc-cwd>/session-<sid>/session.v4.jsonl.zstd` | 逐事件流（tool/call、tool/result、compaction/*、user/message、goal/change…）；`assistant/message.data.usage` 携每步 usage，`.message.source.{provider,model}` 携模型 → 每模型清单的来源 |
| 网关用量 | `http://127.0.0.1:3425/v1/magpie/usage/requests` · `/v1/magpie/trace` · `/v1/magpie/usage` | orchestrate 子模型每请求 provider/model/in/out/cache_read/credits；`agent` 区分 dsh vs 子模型池 |

⚠️ **`session.v4.jsonl.zstd` 是多帧追加格式**：每完成一次交互就追加一个 zstd 帧，整个文件有上千帧。`zlib.zstdDecompressSync(buf)` **只解第一帧**（只拿到 session 头一行，193 字节），会得出「0 工具错误、0 compaction」的假结论。必须按 magic `28 B5 2F FD` 切帧逐帧解：

```js
function zstdDecompressAll(buf) {
  const MAGIC = Buffer.from([0x28,0xb5,0x2f,0xfd]);
  const idxs = []; for (let i=0;(i=buf.indexOf(MAGIC,i))>=0;i+=4) idxs.push(i);
  if (idxs.length <= 1) return zlib.zstdDecompressSync(buf).toString('utf8');
  let out='';
  for (let k=0;k<idxs.length;k++){
    const s=idxs[k], e=k+1<idxs.length?idxs[k+1]:buf.length;
    try { out += zlib.zstdDecompressSync(buf.subarray(s,e)).toString('utf8'); } catch {}
  }
  return out;
}
```
（`templates/workflow-audit.mjs` 已内建此实现。）

其它数据坑：
- `tool/result` 的工具名不在 `data` 上，在 **`data.message.toolCallId`**，再回查 `tool/call` 的 `data.callId` 才能对上；`data.toolCallId` 是 undefined。
- PowerShell `ConvertFrom-Json` 处理这些 JSON 会因编码报错，用 Node `JSON.parse`；中文在控制台显示乱码不影响数据。

## 2. 工作流归因

```powershell
# 因：goal 轮数、工具错误自愈、大结果、重复整读、compaction 试/成/败
node "$env:USERPROFILE\.dsh\skills\token-frugal\templates\workflow-audit.mjs" 2026-11-02

# 只深挖一个会话（最详细）
node "$env:USERPROFILE\.dsh\skills\token-frugal\templates\workflow-audit.mjs" --session ee03fc37
```

本工具报告事件计数和工作流模式；若需判断成本严重度，结合 `token-optimizer` 的跨会话成本排序，不在此维护另一套数值阈值。

## 2.5 每模型 token 清单（`audit-models.mjs`）

```powershell
# 某天所有会话，逐会话·逐模型列 入/出/缓存命中/步数
node "$env:USERPROFILE\.dsh\skills\token-frugal\audit-models.mjs" 2026-11-12

# 单会话逐模型 + 逐轮明细（turn/step 级）
node "$env:USERPROFILE\.dsh\skills\token-frugal\audit-models.mjs" --session f46ac2bf

# 网关不可用时离线（只出事件日志口径）
node "$env:USERPROFILE\.dsh\skills\token-frugal\audit-models.mjs" 2026-11-12 --no-gateway
```

口径（两段，可信度不同）：
| 段 | 数据源 | 覆盖 | 精确度 |
|---|---|---|---|
| 会话·每模型 | 事件日志 `assistant/message.data.usage` + `.message.source.{provider,model}` | 主 agent + teammate 每轮实际模型 | **精确**（完整历史，逐 step 可回放） |
| 网关·全局每模型 | `/v1/magpie/usage/requests`（`agent` 区分 dsh vs AsyncOpenAI/OpenAI 子模型池）+ `/v1/magpie/trace` | orchestrate 子模型（plan/execute/summarize 多模型） | 全局**准确**；会话级仅「最近会话 + 时间窗」best-effort（标 ≈） |

- 入 = 未命中 + 缓存读 + 缓存写；命中% = 缓存读 / 入；每步未命中 = 未命中 / 步数。
- **为什么 orchestrate 子模型不能精确落到会话**：网关无 session_id；且 `/v1/magpie/trace` 是**最近 60 条路由的环形缓冲**（`?limit` 无效），`/usage/requests` 每次最多 500 行、无 `session` 过滤。故历史会话的子模型 token 只能看「网关·全局每模型」。
- 看什么：一个会话若出现**多个模型**（`[N个模型]` 标记）= teammate 或中途切模型；网关段 `AsyncOpenAI`/`OpenAI` 行 = orchestrator 真正在跑的子模型，若其命中率很低（如 hy3 12%）= 子模型每次都未命中，是隐藏成本大头。

## 3. 归因：五类浪费来源（2026-11-02 实测）

| 类别 | 信号 | 数据（2026-11-02） |
|---|---|---|
| A 低缓存模型长跑 | provider 是 cursor/grok/trae/opencode-free；命中 38–75% | grok-4.7@256k 两个会话吃 11.5M（58%），每步 46k+ |
| B goal 反复续跑 | `<goal_round>` 注入次数 ≥5；撞 round-limit 后再 resume | 单会话续跑 16 轮 |
| C compaction 反复失败 | compaction/start ≫ summary；"summary is not smaller than the shadowed content" | 234 试 / 141 成 / **93 败** |
| D 大结果回灌 + 重复整读 | tool/result &gt;8KB 条数；同 file_path read 次数 - 唯一文件数 | 186 条 &gt;8KB（2.2MB）；重复整读 383 次 |
| E 工具错误自愈 | FS_NOT_OBSERVED / FS_EDIT_NOT_FOUND / INVALID_ARGS / UNKNOWN_TOOL | 78 错，其中 62 本可一次避免 |

## 4. 归因结果如何落地

本 skill 负责提供会话/模型用量证据与工作流病因；将结论转成通用会话纪律时，遵循 `agent-cost-hygiene` 与 `dsh-token-policy`，不在此重复维护模型、窗口、goal 或工具调用阈值。检查和修改 profile 时，以对应插件与 profile 配置为准。

按 §3 信号触发动作：
- **A 低缓存长跑**：§3 症状（命中 38–75%、每步未命中高）的长任务，换高缓存模型（模型纪律以 `dsh-token-policy` 为准）。
- **B goal 续跑**：§3 信号 `≥5` 轮即按「一批文件一个 goal」拆片。
- **C compaction**：§3 症状「compaction/start ≫ summary」（反复失败）即换新会话，勿硬撑续压。
- **D 大结果+重复整读**：同文件整篇只读一次，后续 `offset/limit` 取片段；大输出先过滤。
- **E 工具错误自愈**：改文件前先 `read`；按 `tool-call-hygiene` 修，勿原样重试。

## 5. 报告边界

- 报告工作流原因时附**具体会话 sid + 相关事件或指标**，不要只说“很费”。
- 跨会话成本排序、等效成本排名及行动优先级由 `token-optimizer` 提供；本 skill 聚焦审计口径和工作流原因。
- 需要校验运行中的 profile 时，使用对应配置的校验工具，不在本审计 skill 中复制 profile 参数清单。
