# OpenViking
OpenViking 是与会话记忆提交、任务处理和归档状态查询相关的服务。

## 接口与数据位置
- tasks API 的列表结果受 limit=100 截断，status=running 过滤可用于定位当前运行任务。
- archives 列表 API 曾返回 404，且没有可用的 archive list 端点。
- 归档状态保存在系统数据/数据库中，不在 session 目录的 archives 子目录，也不在 fs/tree 中。
- 单个归档可通过 archive GET 查询，archive_001 状态字段用于判定归档是否完成。
- .meta.json 可显示会话已写入的记忆条目，但可能与 API stats 读数不一致，不能单独判定归档状态。

## 补抽链路记录
- 2026-11-26 补抽链路的验收口径是失败归档归零或列出不可恢复项、卡死任务清理、服务健康。
- 2026-11-26 复审时三个目标归档 43e97aa4、4c686b4f、6340e208 的 archive_001 均为 completed。
- 2026-11-26 全量本地 meta 复审显示 1167 个会话，零记忆会话 94 个，与 hop1 基线一致且未恶化；tasks 中 19 条 failed 均为 2026-11-14 Ollama 断连历史记录。
- 2026-11-26 复审确认交接时 running 任务 a5cb1ce1 与 2cad5f5f 已自然完成，当前 3d40517e 为正常滚动任务，服务 /health 返回 ok。
- 2026-11-26 收尾时 hop2 文档追加 hop3 收尾段，5 个 11 月 26 日临时产物已删除，11 月 14 日历史脚本保留。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "软件服务",
  "name": "open_viking",
  "source_extraction_id": "684cedf79d92428fa171c40b9f5f691f",
  "version": 1,
  "memory_type": "entities"
}
-->