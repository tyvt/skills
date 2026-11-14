---
name: token-frugal
description: 会话 token / 上下文成本审计与治理。分析哪些会话烧了多少 token、为什么烧（工作流：goal 反复、compaction 失败、重复整读、大结果回灌、工具错误自愈、模型缓存命中率），并给出规则约束。当用户问“今天/本周 token 用量”“哪个会话最费”“为什么这么贵”“优化上下文成本”“审计会话效率”时使用。
---

# token-frugal — 会话 token 用量审计与治理

**一句话原则：拉开差距的不是步数，是「每步未命中（uncachedInputTokens / steps）」和「缓存命中率」。**
先把会话账算清，再定位是工作流把 token 烧掉的，最后落到规则/skill 去治。

---

## 0. 先分清两个问题

- **账的问题**：哪个会话、哪个模型烧了多少未命中 → 用 `audit-tokens.mjs`。
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

## 2. 跑审计

```powershell
# 账：按未命中排序，标 命中率/每步未命中/产出比/上下文组成/模型
node "$env:USERPROFILE\.dsh\skills\token-frugal\audit-tokens.mjs" 2026-11-02

# 因：goal 轮数、工具错误自愈、大结果、重复整读、compaction 试/成/败
node "$env:USERPROFILE\.dsh\skills\token-frugal\templates\workflow-audit.mjs" 2026-11-02

# 只深挖一个会话（最详细）
node "$env:USERPROFILE\.dsh\skills\token-frugal\templates\workflow-audit.mjs" --session ee03fc37
```

看什么：
- **命中率 &lt;80% 或 每步未命中 &gt;12k** → 记为异常会话，进第 3 步找因。
- **产出/未命中 &lt;5%** 且 steps 很大 → 典型的“读得多、产出少、被拖长”。
- **单个会话占全天未命中 &gt;20%** → 一定有工作流事故，单独复盘。

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

## 4. 规则约束（把结论落成规则，不要只报告）

对应 A–E，写进 AGENTS.md / skill 的硬规则：

1. **长任务模型锁定**：&gt;50 步只用 `workbuddy-ai/deepseek-v4.1-flash`（98%），禁用低缓存路由；会话中途不切模型。
2. **goal 轮数上限 4–6**：长文/批量任务“一批文件一个 goal + 一个会话”，禁止“全部处理完再停”式无限续跑。
3. **窗口 60% 收尾**：接近 60% 窗口主动收尾或开新会话；compaction 失败 ≥3–5 次立即换会话。
4. **错误不重试**：拿到 FS_*/INVALID_ARGS/UNKNOWN_TOOL 先取 `tool-call-hygiene` 修正，重试一次仍败就换方案，绝不原样重复。
5. **大输出先过滤**：pwsh/grep 先 Select-String/落盘分段；read 先 grep 定位再 offset/limit；同文件整篇只读一次；大内容一次 `write`，不要多次 `edit`。

## 5. 治理设施自查

```powershell
# profile 校验（含 G 项：模型纪律、配置是否比进程新未重启）
node "$env:USERPROFILE\.dsh\skills\token-frugal\verify-profile.mjs" web --port 3080
```
要看的配置项（`~/.dsh/profiles/web/cordis.patch.yml`）：
- `compaction-basic.modelPolicies` 的 `thresholdRatio`（大窗口模型钳到 0.1024≈102k，防压缩线被模型表回写成 1M）。
- `tool-result-pruner` 的 `thresholdChars:4096 / headChars:2048 / tailChars:768` —— ⚠️ 这个只做“头尾裁剪”，**结果仍整段进历史并每步重发**；`spill-policy.maxInlineTokens:3000`（≈1.2 万字符）几乎不触发溢出落盘。真正想省，得靠模型侧不产生大输出（规则 5）。
- 出现 “配置比进程新 … 未重启” 的 WARN = 改动没生效，需重启 web。

## 6. 收尾核查

- 用 `skill` 前先确认本 skill 可加载（文件被零填充会报 “unknown”）；`D:\repository\skills\*\SKILL.md` 曾整体零填充。
- 报告结论要附**具体会话 sid + 数字**，不要只说“很费”。
