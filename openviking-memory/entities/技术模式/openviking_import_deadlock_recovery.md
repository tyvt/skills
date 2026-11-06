# OpenViking导入并发提交死锁与恢复
驱动脚本超时未中止或队列堆积导致任务死锁，通过停服改磁盘任务JSON标cancelled（无BOM）并重启恢复，并新增preflight门禁防复发。

## 问题根因
- import-to-ov.mjs 第126行for循环超时后未break，循环结束直接进下一批，任务持续堆积
- 同会话1个running加多个pending任务互相卡死（同会话并发提交死锁）
- PowerShell ConvertTo-Json重写任务文件写入UTF-8 BOM，Python json.loads无法解析致服务启动崩溃

## 队列与接口限制
- SessionCommit队列堆积（如101 pending + 8 running），与历史dsh-session commit抢VLM max_concurrent=4越跑越失败
- OV session_commit 报 Connection error（VLM/Magpie链路异常或1933宕机）时批量写入失败（~87s failed write:0）
- Cancel API 返回 403 ROOT may not cancel tasks，须重启服务清队列；ov-drain-commit-queue.mjs 亦返此错，因队列中30个 dsh-session-* 为真实线上 Web 会话（非导入残留），每次 ~200s 串行、30个≈100分钟；导入占满 commit 单通道致线上会话排在后面

## 恢复措施
- 停驱动脚本/停服，将卡死任务JSON标记cancelled，须先停服再改文件再重启（单实例占openviking.lock）
- 脚本 ov-cancel-stuck-commit-tasks.mjs 将 pending/running 的 session_commit 标 cancelled（UTF-8 无 BOM），曾一次取消111个
- 重写任务文件须无BOM（文件头字节123,34,116即{\"t）；OV队列持久化重放，重启不清空需手动标记cancelled
- 断点续跑：done文件记录已完成批次自动跳过断点（如园区公共收益从第56条续跑）；repair（泰兴/2-0/园区公共收益）等主tail跑完再补

## 门禁与验证
- 导入门禁 ov-import-preflight.mjs 检查1933 health + 3425探针 + 队列深度，已接入 import-to-ov.mjs 每项目导入前自动preflight，--skip-preflight 可跳过
- commit_queue=0 时 preflight 放行；Embedding 在 ov observer queue 有 backlog 属正常
- 验证：产品2.0 断点66条done剩216条/54批，[1/54] completed 174s write:3

## 限流与重算风险
- 2026-11-05会话fe39d020撞15次RATE_LIMIT(429)，compaction反复27次、产出比2.1%
- 根因：单会话批量导入撞满限流重试预算→整轮重算；建议连续429时换provider同名模型继续而非原地重试，批量任务应拆批
- 同会话重复整读38次、会话d47c475c重复整读104次，须同文件同会话只整读一次后续用offset/limit切片

## 2026-11-06导入失败实例
- import-to-ov（pwsh-4c3697f2dccf4567）于2026-11-06约10:06 completed exit 1
- 苏州市房地产监测V3 第110/168批commit失败：500 INTERNAL lock I/O error（锁文件 .exact.ovlock），日志停在[109/168] completed，done约360/669条
- 产品2.0 AUTO续跑30/43提交超时中止（task 7e6a6da5），done 219/282
- 本轮4/99项目记为成功：产品2.0(282)、苏住房C(382)、苏住房G(261)、苏州市房地产监测V3(669)
- import-local-sources-state.json finishedAt 2026-11-06 10:06:22 +08:00；OV preflight ok但commit_queue=1，锁I/O 500说明数据目录/锁文件可能损坏或并发残留
- 建议：低峰单实例OV、处理锁文件/重启服务；续跑 --from-project 指定项目 --skip-distill-if-ready；暂勿全量snapshot
- 上述10:06失败run已于2026-11-06 14:30由 pwsh-fdd5d5130e5b4bae（exit 0）续跑收尾完成：产品2.0 done 265/282、苏住房C 337、苏住房G 247、V3 61/61→done 554/669；state finishedAt 2026-11-06 06:28:50Z 记 4/99 成功约1594条记忆；随后自动起 pwsh-be983e783496464d 全量覆盖99个Cursor项目

## 验证与归属
- 观察来源：2026-11-02导入会话、2026-11-04/05恢复会话、2026-11-05排查会话fe39d020、2026-11-06定时汇报；涉及服务：OpenViking、Ollama、Magpie/VLM

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "openviking_import_deadlock_recovery",
  "source_extraction_id": "c64bd2469e134b1ba893e72e0a24d2a5",
  "version": 7,
  "memory_type": "entities"
}
-->