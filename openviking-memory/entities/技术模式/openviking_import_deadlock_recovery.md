# OpenViking导入并发提交死锁与恢复
驱动脚本超时未中止或队列堆积导致任务死锁，通过停服改磁盘任务JSON标cancelled（无BOM）并重启恢复，并新增preflight门禁防复发。

## 问题根因
- import-to-ov.mjs 第126行for循环超时后未break，循环结束直接进下一批，导致任务持续堆积
- 同会话出现1个running加多个pending任务互相卡死（同会话并发提交死锁）
- 用PowerShell ConvertTo-Json重写任务文件时写入UTF-8 BOM，Python json.loads无法解析，服务启动崩溃

## 队列与接口限制
- SessionCommit队列堆积（如101 pending + 8 running），与历史dsh-session commit抢VLM max_concurrent=4导致越跑越失败
- OV session_commit 报 Connection error（VLM/Magpie链路异常或1933宕机）时批量写入失败（~87s failed write:0）
- Cancel API 返回 403 ROOT may not cancel tasks，无法靠HTTP清队列，必须重启服务

## 恢复措施
- 停驱动脚本/停服，将卡死任务JSON文件标记cancelled，须先停服再改文件再重启（单实例占openviking.lock）
- 脚本 memory-migration/scripts/ov-cancel-stuck-commit-tasks.mjs 将 pending/running 的 session_commit 标为 cancelled（UTF-8 无 BOM），曾一次取消111个
- 重写任务文件须无BOM（文件头字节应为123,34,116即{"t）；OV队列持久化重放，重启不清空需手动标记cancelled
- 断点续跑：done文件记录已完成批次自动跳过断点（如园区公共收益从第56条续跑）；恢复后直接尾部续跑不再跑repair三段，repair（泰兴/2-0/园区公共收益）等主tail跑完再补

## 门禁与验证
- 导入门禁 memory-migration/scripts/ov-import-preflight.mjs 检查1933 health + 3425探针 + 队列深度，已接入 import-to-ov.mjs 每项目导入前自动preflight，可用 --skip-preflight 跳过
- SessionCommit API 侧 commit_queue=0 时 preflight 放行；Embedding 在 ov observer queue 有 backlog 属正常并行消化
- 验证：产品2.0 断点 66条done剩216条/54批，[1/54] completed 174s write:3 edit:0；恢复Job pwsh-bbde7e47853a46e4，日志 %TEMP%\import-local-sources-resume.log 标记 RECOVERY RESTART

## 限流与重算风险
- 2026-11-05会话fe39d020（导入历史会话记忆到OpenViking）撞15次供应商RATE_LIMIT(429)全集中于此，导致compaction反复跑27次、产出比仅2.1%
- 根因：单会话批量导入撞满限流重试预算→整轮重算；建议连续429时换provider同名模型(opencode-zen-free/deepseek-v4.1-flash-free)继续而非原地重试，批量任务应拆批
- 同会话重复整读38次、另一会话d47c475c重复整读104次，须同文件同会话只整读一次后续用offset/limit切片

## 验证与归属
- 观察来源：2026-11-02导入会话、2026-11-04/05恢复会话、2026-11-05排查会话fe39d020；涉及服务：OpenViking、Ollama、Magpie/VLM；驱动脚本 pwsh-d6b09e9963d649f1 等

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "openviking_import_deadlock_recovery",
  "source_extraction_id": "d6fd31ed08164228a6d170c5e5c21337",
  "version": 3,
  "memory_type": "entities"
}
-->