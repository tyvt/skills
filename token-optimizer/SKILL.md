---
name: token-optimizer
description: 把会话 token/成本审计变成「可执行降本清单」。读取 dsh-context 插件同源的投影缓存，输出等效成本 TOP、低缓存会话、provider/模型每步未命中、上下文组成、高压力会话，并自动生成优化建议。当用户要“token 优化建议”“能不能做什么插件/脚本降本”“哪个模型最费”“复盘烧钱会话”时使用。与 token-frugal（工作流归因）互补：本 skill 偏「成本排序 + 落地建议」，token-frugal 偏「为什么烧的工作流病因」。
---

# token-optimizer — 可执行降本清单

**定位**：token-frugal 回答「为什么烧」，本 skill 回答「先治谁、怎么治、治到什么程度」。数据源与 `dsh-context` 插件的 **Context Insights / 上下文洞察** 面板完全一致（同一份 `session_projcache` 投影），因此脚本输出与界面数字对得上。

## 数据源

`~/.dsh/storages/session_projcache/sessions/session-<sid>.json`，字段路径（值包在 `{ver,seq,val}` 里）：

| 字段 | 取值路径 |
|---|---|
| token 用量 | `record.rows.tokenUsage.val.totals` → uncachedInputTokens / cacheReadTokens / outputTokens |
| 步数/轮数 | `record.rows.sessionStats.val` → steps / turns |
| 模型 | `record.rows.modelSelection.val.lastUsed` → provider / model |
| 上下文组成 | `record.rows.contextBreakdown.val.breakdown` → systemTokens / toolsTokens / messageTokens |
| 窗口压力 | `record.rows.contextPressure.val` → contextWindow / pressureTokens |
| 标题 | `record.rows.title.val` |

## 跑审计

```powershell
# 全部会话
node "$env:USERPROFILE\.dsh\skills\token-optimizer\analyze.mjs"

# 指定目录（如排查某段历史）
node "$env:USERPROFILE\.dsh\skills\token-optimizer\analyze.mjs" "C:\path\to\sessions"
```

输出五张表 + 自动建议：KPI 总览、按 provider/模型、等效成本 TOP15、低缓存会话（命中<70%）、上下文组成、高压力会话（>60% 窗口）。

## 核心口径（重要）

**等效成本 = cacheRead × 0.1 + uncached + output × 4**。只看未命中会低估——缓存读占成本大头（实测约 54%）。所以：
- 高命中率（97%+）但步数多的会话，是「总量型」烧钱（缓存读海量）；
- 低命中率（<70%）的会话，是「重算型」烧钱（每步未命中可达 5 万，健康会话约 2k）。

**降本第一抓手是「压步数 × 压每步上下文」，不是再挤命中率**（命中率已 94% 时无空间，但步数砍半≈缓存读砍半）。

## 判读阈值

| 信号 | 阈值 | 动作 |
|---|---|---|
| 缓存命中率 | <80% | 判异常，查是否用了低缓存路由（cursor/grok/trae）|
| 每步未命中 | >12k | 进 workflow-audit 找因 |
| 产出/未命中 | <5% 且 steps 大 | “读得多产出少”，拆片 |
| 单会话占比 | >20% 全量等效成本 | 单独复盘 |
| 窗口压力 | >60% | 收尾/换会话 |
| 低缓存+大未命中 | 命中<70% 且 未命中>0.5M | 重算型事故，查 goal/compaction |

## 与插件的关系

`dsh-context` 提供 UI 面板，本 skill 提供 CLI 批量排序 + 自动建议，两者同源不冲突。需要图形化逐会话下钻时开面板；需要跨会话排序找 topN 浪费时跑本脚本。
