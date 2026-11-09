# OpenViking导入并发提交死锁与恢复
驱动脚本超时未中止或队列堆积导致任务死锁，通过停服改磁盘任务JSON标cancelled（无BOM）并重启恢复，并新增preflight门禁防复发。

## 问题根因
- import-to-ov.mjs 第126行for循环超时后未break，任务持续堆积；同会话1个running加多个pending互相卡死
- PowerShell ConvertTo-Json重写任务文件写入UTF-8 BOM，Python json.loads无法解析致服务启动崩溃

## 队列与接口限制
- SessionCommit队列堆积与历史dsh-session commit抢VLM max_concurrent=4越跑越失败
- OV session_commit 报 Connection error（VLM/Magpie链路异常或1933宕机）时批量写入失败
- Cancel API 返回 403 ROOT may not cancel tasks，须重启服务清队列；ov-drain-commit-queue.mjs 亦返此错，因队列中30个 dsh-session-* 为真实线上 Web 会话，导入占满 commit 单通道致线上会话排在后面

## 恢复措施
- 停驱动脚本/停服，将卡死任务JSON标记cancelled（UTF-8 无 BOM），须先停服再改文件再重启（单实例占openviking.lock）
- 脚本 ov-cancel-stuck-commit-tasks.mjs 将 pending/running 的 session_commit 标 cancelled，曾一次取消111个
- 断点续跑：done文件记录已完成批次自动跳过断点；repair等主tail跑完再补

## 门禁与验证
- 导入门禁 ov-import-preflight.mjs 检查1933 health + 3425探针 + 队列深度，已接入 import-to-ov.mjs 每项目导入前自动preflight，--skip-preflight 可跳过
- commit_queue=0 时 preflight 放行；Embedding 在 ov observer queue 有 backlog 属正常

## 限流与重算风险
- 2026-11-05会话fe39d020撞15次RATE_LIMIT(429)，compaction反复27次、产出比2.1%；建议连续429时换provider同名模型继续而非原地重试，批量任务应拆批
- 同会话重复整读38次、会话d47c475c重复整读104次，须同文件同会话只整读一次后续用offset/limit切片

## 2026-11-06导入失败实例
- import-to-ov（pwsh-4c3697f2dccf4567）于2026-11-06约10:06 completed exit 1；苏州市房地产监测V3 第110/168批commit失败：500 INTERNAL lock I/O error（锁文件 .exact.ovlock）
- 产品2.0 AUTO续跑30/43提交超时中止（task 7e6a6da5），done 219/282
- 本轮4/99项目记为成功：产品2.0(282)、苏住房C(382)、苏住房G(261)、苏州市房地产监测V3(669)
- import-local-sources-state.json finishedAt 2026-11-06 10:06:22 +08:00；OV preflight ok但commit_queue=1，锁I/O 500说明数据目录/锁文件可能损坏或并发残留
- 上述10:06失败run已于2026-11-06 14:30由 pwsh-fdd5d5130e5b4bae（exit 0）续跑收尾完成；随后自动起 pwsh-be983e783496464d 全量覆盖99个Cursor项目

## 验证与归属
- 观察来源：2026-11-02导入会话、2026-11-04/05恢复会话、2026-11-05排查会话fe39d020、2026-11-06定时汇报；涉及服务：OpenViking、Ollama、Magpie/VLM
- 2026-11-09 审计确认：debug/health=false 误报源于此恢复遗留的 Embedding Errors=2 历史计数未清零；Requeued 1008 为本次恢复重放尾巴，12:57→13:11 冻结无新增


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "openviking_import_deadlock_recovery",
  "source_extraction_id": "c6dd1ba5977146d4b03342c85dcfb672",
  "version": 9,
  "memory_type": "entities"
}
-->