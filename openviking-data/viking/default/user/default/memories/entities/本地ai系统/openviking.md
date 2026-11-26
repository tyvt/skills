---
audit_status: valid
last_checked: 2026-11-27T00:13:47+08:00
verdict_note: 本机 GET /health 返回 status ok、version 0.5.5；max_concurrent 等运维参数见 .dsh 会话记录，系统描述属实。
---
# OpenViking
本地 AI 记忆/向量化系统，v0.5.5，健康检查 http://127.0.0.1:1933/health。

## 架构与运行
- openviking-server.exe 监听 127.0.0.1:1933；OpenViking-Watchdog 每分钟拉起（崩溃 ≤1 分钟恢复）；每日 03:00 快照；任务目录 ~\.openviking\data\viking\default\_system\tasks\default，日志 ~\.openviking\watchdog.log。
- 向量化依赖 Ollama 127.0.0.1:11434；嵌入代码 C:\Program Files\Python310\Lib\site-packages\openviking\models\embedder\litellm_embedders.py。看门狗在 dsh web 存活时也探测；1933 存活须 /health 2xx；建议 NSSM/计划任务让 server.exe 与 Ollama 登录常驻。
- start-server.bat 仅在 11434 无监听时拉起 Ollama；进程存活但不接连接时不重启，2026-11-11 改为 /api/tags 失败先结束 ollama.exe 再拉起。
- 掉线期间 commit 会失败/丢失；失败会话可重提补嵌入，无 pending/running 卡死则无需停服清队列。

## 故障与重试
- session_commit 报 Failed to generate embedding，根因 Ollama 断连或 httpx 客户端被关；2026-11-14 13:24 升级 0.5.5 覆盖 site-packages 旧重试补丁（线上 8736 字节、无重试逻辑），补丁副本与 README 存 dsh/patches/openviking-embed-retry，本地提交 28cc9c62 未推送（早期 f71763fe）。
- 0.5.5 自带 model_retry.py/RetryEmbedder（默认 max_retries=3）；Server disconnected 属 TRANSIENT_NETWORK_ERROR，可重试。
- 抖动真因（2026-11-14）：bge-m3-ov 纯 CPU 单槽串行，40 并发排队超时断连。备份 ov.conf.bak-20261114-154622 后在 embedding 段设 max_concurrent: 2（默认 10）并重启；16 并发 0 断连、最大 103.8s。

## 运维记录
- 2026-11-12：两个 openviking-server.exe（PID 13340、10668 占 1933）修为单实例（PID 26388 监听 15284），/health ok。
- 2026-11-12 C1：start-server.bat 加 1>>server.log 2>&1；watchdog.log 曾 212KB 全为 OK 心跳无轮转，server.err.log/ollama.*.log 自 2026-11-02 停更，001617.log 为二进制不可作运维日志。
- 2026-11-12 A1+A2：ov.conf retrieval 段 enable_intent:false、recall_intent_timeout_s:2.0，关闭 VLM 意图改写；search 延迟 5.2s→0.18s（约 27×），VLM token 增量 0，走 _semantic.py fail-closed 原 query 路径。
- 2026-11-12 LiteLLM async embedding slow call duration_ms=9016（bge-m3/Ollama 首调用约 9s），待 Stage A3/B 排查；usage_audit WAL 曾膨胀至 4.2MB 才 checkpoint（后回落 1B）。

## 可观测性
- 缺口：find 8 次检索错误（success 43/error 8）；request_audit 仅聚合计数无详情；404 来自 16 条 __unmatched__ 探测路径、5 次重复拉取不存在的 profile.md 与 1 次 POST，409 为重复 create session，405 为用错 HTTP 方法。

<!-- MEMORY_FIELDS
{
  "category": "本地AI系统",
  "name": "openviking",
  "source_extraction_id": "9a23e3b04e214d1a96c862b7fb95579b",
  "version": 16,
  "memory_type": "entities"
}
-->