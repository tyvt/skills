# Summary
2026-11-13 提出 OpenViking 4 条优化建议（按 ROI：削 VLM 常驻消耗、把主动检索变习惯、修确定性小错、运维卫生）；主动检索变习惯落地方式含在 AGENTS.md 加规则并保留 fanoutStreakThreshold 对连续 read/grep 硬拦截兜底（本会话 glob 被拒一次已验证生效）。其中 1/3/4 属配置/插件改动，落地前先出计划送审。本轮为只读分析，未改动任何配置/代码，临时查询脚本已清理。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 检查openviking在最近的会话中实际的作用，并给出优化建议
...
**assistant [peer=github.com-tyvt-skills]**: ## OpenViking 在近期会话中的实际作用（2026-11-12 → 11-13 复查）

数据源：`usage_audit.sqlite3`（只读副本）+ [11-12 排查报告](openviking-analysis-2026-11-12.md) + 11-10 会话日志分析记忆。

### 一、实际作用：三条链路，两条在干活，一条基本闲置

| 链路 | 实际情况 | 判定 |
|---|---|---|
| **会话镜像（写入）** | 11-12 20:00 后 706 次 `sessions/{id}/messages`，p50≈17ms，零错误；这是绝对主力 | ✅ 唯一稳定发挥作用的链路 |
| **turn 开头免检索注入**（profile/events/entities） | 每轮注入有效（本次会话正是靠它直接命中 11-12 报告与 11-10 发现），但 11-10 曾出现单次注入过大的问题；且 `content/read` 对 `peers/.../profile.md` 仍稳定 404（近期又 7 次） | 🟡 有价值但有噪声和固定失效路径 |
| **Agent 主动检索（search/find）** | 近 20 次 search 平均 1062ms / max 5.7s —— **比 11-12 报告的 7325ms 明显好转**；但使用频率低：多数排障会话（如 11-10 的 6409）全程 0 次调用，宁可 grep/glob 乱翻 | 🟡 延迟改善，但“该用时不用”是更大的浪费 |

### 二、仍然存在的问题（有新证据）

1. **VLM 空转没解决**：`auto/hy3` 从 11-12 全天到 11-13 凌晨，每小时稳定烧 **~10-20 万 input + ~10-20 万 output token**（含 03:00 业务空窗期），与真实 search 次数（每小时仅几次）完全脱钩。按 11-12 报告，这是 92% 的 token 账单来源。
2. **固定 404 未修**：`content/read → peers/github.com-tyvt-skills/memories/profile.md` 持续 404。
3. **重复建会话 409**：`POST /sessions` 409 又出现 4 次（客户端应 get-or-create）。
4. 检索错误可观测性缺口仍在（find 错误只进聚合表，不落 request_audit）。

### 三、优化建议（按 ROI 排序）

1. **🥇 削 VLM 常驻消耗**：查清 hy3 凌晨空转的调用方（大概率是定时记忆抽取/快照），改为按会话活动触发；对 search 的 query_planner 改写加缓存（相同 query 复用）或默认关闭，用纯 bge-m3 向量召回兜底。这一项预计砍掉大半 token 成本。
2. **🥈 把“主动检索”变成习惯**：11-10 的教训说明注入再准，agent 排障时也想不起调 search。落地方式：在 AGENTS.md 的「禁止」节加一条——*找不到文件/翻历史结论时，先 `mcp__openviking__search`（mode=context, detail=abstract），再考虑 grep*；并保留 `fanoutStreakThreshold` 对连续 read/grep 的硬拦截作为兜底（这已经生效——本会话 glob 就被 guard 拒了一次）。
3. **🥉 修确定性小错**：注入前判 `profile.md` 存在性（或补该文件）；DSH 插件建会话改 get-or-create；find/search 错误落 request_audit 带 error_message。
4. **运维卫生**：恢复 server 运行日志按天落地（现停在 11-02）；watchdog.log 轮转；usage_audit WAL 定期 checkpoint（本次又见 4.2MB）。

本轮为只读分析，未改动任何配置/代码（临时查询脚本已清理）。1、3、4 属配置/插件改动，若要落地我会先出计划送审。

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking优化建议提出",
  "goal": "提出优化方案",
  "summary": "2026-11-13 提出 OpenViking 4 条优化建议（按 ROI：削 VLM 常驻消耗、把主动检索变习惯、修确定性小错、运维卫生）；主动检索变习惯落地方式含在 AGENTS.md 加规则并保留 fanoutStreakThreshold 对连续 read/grep 硬拦截兜底（本会话 glob 被拒一次已验证生效）。其中 1/3/4 属配置/插件改动，落地前先出计划送审。本轮为只读分析，未改动任何配置/代码，临时查询脚本已清理。",
  "ranges": "0,54-66",
  "source_extraction_id": "241e1d1d00734fc6bbf3a090b1d68b60",
  "version": 1,
  "memory_type": "events"
}
-->