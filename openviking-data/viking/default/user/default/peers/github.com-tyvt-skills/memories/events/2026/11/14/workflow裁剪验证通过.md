# Summary
2026-11-14 重启后在全新会话验证批 2 全部断言通过：standard 新会话 0f322b0c 为 38 个工具、无 workflow，toolsTokens 由 8025 降至 7177（−848，与 workflow 单项 848 精确吻合）；与批 1 基线逐工具对比唯一差异为 workflow，无额外误伤；full-tools 新会话 ce6f9448 为 46 个工具、tt=9639 且 workflow 恢复；orchestrate/session_search 均存在，dump 无 entry not found，standard=disabled、cordis/full-tools=enabled。批 1+批 2 合计约 −2,123 token/步。遗留待定：该提交是否推送，以及 Ollama↔OpenViking 的 embedding 抖动另案排查。
# 2026-11-14 (Saturday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: 批 2 完成并已提交。

## 收敛报告

**结论**：批 2（方案 B：只裁 workflow）已实施、全 6 断言验证通过并提交（commit `1c9fe34d`，未推送）。每步再省 848 token，批 1+批 2 合计约 **−2,123 token/步**。

**改动**：
- 运行时 `~/.dsh/profiles/web/cordis.patch.yml`：preset-standard 内 `tool-workflow` 加 `disabled: true`（备份 `.bak-p1b-20261114152151`）
- 同步 skills 仓受管副本 `dsh/profiles/web/cordis.patch.yml`（git diff 精确 1 行）→ 已提交 `1c9fe34d`

**验证**（重启后全新会话，非长会话中途）：
- A ✅ standard 新会话 `0f322b0c`（38 工具）无 workflow
- B ✅ toolsTokens 8025→7177（**−848**，与 workflow 848 精确吻合）
- B' ✅ 与批 1 基线逐工具对比，唯一差异=workflow，无额外误伤
- D ✅ full-tools 新会话 `ce6f9448`（46 工具、tt=9639）→ workflow 恢复
- E ✅ orchestrate/session_search 都在
- F ✅ dump 无 `entry not found`；standard=disabled、cordis/full-tools=enabled

**一个说明**：`~/.dsh/profiles/web` 实际不在任何 git 仓（批 1 计划里"受 git 管理"措辞不实），故按你选择把改动同步到 skills 仓受管副本提交。skills 仓里那份副本已是旧快照（缺 full-tools/hy4 等历史演进），我**只补了批 2 这一行**，未裹挟历史漂移。

**待定项**：
1. 是否**推送**该提交（你选"仅提交"，故未推）。
2. embedding 抖动（Ollama↔OpenViking，另起一事）——要现在起排查吗？

<!-- MEMORY_FIELDS
{
  "event_name": "workflow裁剪验证通过",
  "goal": "验证裁剪前后工具与token",
  "summary": "2026-11-14 重启后在全新会话验证批 2 全部断言通过：standard 新会话 0f322b0c 为 38 个工具、无 workflow，toolsTokens 由 8025 降至 7177（−848，与 workflow 单项 848 精确吻合）；与批 1 基线逐工具对比唯一差异为 workflow，无额外误伤；full-tools 新会话 ce6f9448 为 46 个工具、tt=9639 且 workflow 恢复；orchestrate/session_search 均存在，dump 无 entry not found，standard=disabled、cordis/full-tools=enabled。批 1+批 2 合计约 −2,123 token/步。遗留待定：该提交是否推送，以及 Ollama↔OpenViking 的 embedding 抖动另案排查。",
  "ranges": "36-42",
  "source_extraction_id": "8f195b3f72104200903c651ccab8e0e2",
  "version": 1,
  "memory_type": "events"
}
-->