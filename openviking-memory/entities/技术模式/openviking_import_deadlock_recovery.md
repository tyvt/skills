# OpenViking导入并发提交死锁与恢复
驱动脚本超时未中止导致任务堆积死锁，修复后通过标记取消并去BOM重写任务文件恢复。

## 问题根因
- import-to-ov.mjs 第126行for循环超时后未break，循环结束直接进下一批，导致任务持续堆积
- 同会话出现1个running加多个pending任务互相卡死（同会话并发提交死锁）
- 用PowerShell ConvertTo-Json重写任务文件时写入UTF-8 BOM，Python json.loads无法解析，服务启动崩溃

## 恢复措施
- 停驱动脚本，将卡死任务JSON文件标记cancelled，须先停服再改文件再重启
- 重写任务文件须无BOM（文件头字节应为123,34,116即{"t）
- OpenViking任务队列持久化并重放，重启服务不会清空卡死任务，需手动标记cancelled
- 断点续跑：done文件记录已完成批次，重启脚本自动跳过并从断点继续（如园区公共收益从第56条续跑）

## 验证与归属
- 观察来源：2026-11-02导入会话；涉及服务：OpenViking、Ollama；驱动脚本pwsh-d6b09e9963d649f1

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "openviking_import_deadlock_recovery",
  "source_extraction_id": "537e4157cb6f4532bd27bc9807705a63",
  "version": 1,
  "memory_type": "entities"
}
-->