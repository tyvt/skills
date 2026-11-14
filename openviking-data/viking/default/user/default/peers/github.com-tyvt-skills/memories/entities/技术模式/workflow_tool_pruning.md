# DSH web 工具裁减（workflow）
在 preset-standard 中禁用 tool-workflow 以每步节省 848 token，同时保留 full-tools 预设按需恢复全部工具。

## 配置改动
- 目标文件：C:\Users\Administrator\.dsh\profiles\web\cordis.patch.yml（即 ~/.dsh/profiles/web/），批 2 备份为 .bak-p1b-20261114152151
- 在 preset-standard 内为 tool-workflow 添加 `disabled: true`，语义 diff 仅此一行，行数 1417→1418
- 预设状态：standard=disabled；cordis、full-tools=enabled；ptc=disabled（既有配置）；顶层 disabled（dsh-web-app base 既有）
- dsh web 切换预设时会重写整个 profile 文件，将 `[ text, image ]` 规范化为 `[text, image]`（22 处），selectedDefault 两处仍为 standard

## 效果与验证
- standard 新会话 0f322b0c（2026-11-14 15:24:36，38 工具）：无 workflow，toolsTokens 8025→7177（−848，与 workflow 848 token 精确吻合）
- 与批 1 基线逐工具对比，唯一差异为 workflow；session_search、session_event_*、team_task_*、spawn_teammate、orchestrate 全在，无额外误伤
- full-tools 新会话 ce6f9448（2026-11-14 15:25:56，46 工具、tt=9639）：workflow=True，schedule_*、goal 一并恢复
- 批 1（−1,275）+ 批 2（−848）合计每步约 −2,123 token

## 遗留与待定
- embedding 抖动（Ollama↔OpenViking，改动前已有 214 次 disconnect）与本次无关，待另起排查
- session_query 994 token（使用率 8.8%、无可切预设兜底）本轮认掉，待有可切预设机制再议
- 改动落于受 git 管理的目录，仅提交/提交并推送/暂不处理待用户决定

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术模式",
  "name": "workflow_tool_pruning",
  "source_extraction_id": "186dfdf1b42044a981f9a67468f2832a",
  "version": 1,
  "memory_type": "entities"
}
-->