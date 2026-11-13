# OpenViking导入并发提交死锁与恢复
驱动脚本超时未中止或队列堆积导致任务死锁，停服改磁盘任务JSON标cancelled（无BOM）并重启恢复，新增preflight门禁防复发。

## 问题根因
- import-to-ov.mjs 第126行for循环超时后未break致任务堆积；同会话1个running加多个pending互相卡死
- PowerShell ConvertTo-Json 写入UTF-8 BOM，Python json.loads无法解析致服务启动崩溃
- OV session_commit 报 Connection error（VLM/Magpie链路异常或1933宕机）批量失败；Cancel API 返 403 ROOT may not cancel tasks 须重启清队列
- 队列中30个 dsh-session-* 为真实线上 Web 会话，导入占满 commit 单通道致线上会话排队

## 恢复措施
- 先停服再改文件再重启（单实例占openviking.lock）；ov-cancel-stuck-commit-tasks.mjs 将 pending/running 标 cancelled，曾一次取消111个
- 断点续跑：done文件记录已完成批次自动跳过；repair等主tail跑完再补

## 门禁与限流
- ov-import-preflight.mjs 检查1933 health + 3425探针 + 队列深度，接入 import-to-ov.mjs 每项目导入前自动preflight（--skip-preflight 可跳过）；commit_queue=0 放行
- 2026-11-05会话fe39d020撞15次RATE_LIMIT(429)，compaction反复27次产出比2.1%；建议连续429换provider同名模型继续，批量任务拆批
- 同文件同会话只整读一次后续用offset/limit切片（fe39d020重复整读38次、d47c475c重复104次）

## 2026-11-06失败实例
- import-to-ov（pwsh-4c3697f2dccf4567）10:06 exit 1；苏州市房地产监测V3 第110/168批commit失败500 INTERNAL lock I/O error（.exact.ovlock）
- 产品2.0 AUTO续跑30/43超时中止（task 7e6a6da5）done 219/282；本轮4/99项目成功：产品2.0(282)、苏住房C(382)、苏住房G(261)、苏州市房地产监测V3(669)
- 10:06失败run于14:30由 pwsh-fdd5d5130e5b4bae（exit 0）续跑收尾，随后 pwsh-be983e783496464d 全量覆盖99个Cursor项目

## 验证与归属
- 观察来源：2026-11-02~06多会话；涉及OpenViking、Ollama、Magpie/VLM
- 2026-11-09审计：debug/health=false误报源于恢复遗留Embedding Errors=2未清零；Requeued 1008为恢复重放尾巴，12:57→13:11冻结无新增

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "openviking_import_deadlock_recovery",
  "source_extraction_id": "126e610f4e3542618cf613d408628d6e",
  "version": 11,
  "memory_type": "entities"
}
-->