# OpenViking 记忆系统
DSH 使用的 OpenViking 记忆库与 dsh-memory-plugin 插件。

## 插件与部署
- dsh-memory-plugin：profile-inject 注入 + 主动检索。
- 启动脚本与看门狗在 C:\Users\Administrator\.openviking\（git 仓 master、未配置 remote 无法 push，改动前备份 .bak）。
- 2026-11-25 起两处 LLM 切为 hy4flash-free 主 + hy4flash 积分兜底。

## 记忆库
- 约 6585 条，纯 Markdown 无 frontmatter。
- URI 形如 viking://user/default/memories/{entities,preferences,_archive}/...。

## 命令行
- ov CLI v0.5.5：ls -r/read/write/set-tags/glob、--output json。
- Python SDK 顶层无导出，脚本只能走 CLI。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "知识库",
  "name": "OpenViking 记忆系统",
  "source_extraction_id": "39f47e941bc2409e8b998b592259bf89",
  "version": 1,
  "memory_type": "entities"
}
-->