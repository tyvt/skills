# OpenViking
本地运行的 AI 记忆与向量化系统，当前版本 0.5.3，健康检查地址为 http://127.0.0.1:1933/health。

## 架构与组件
- 主服务 openviking-server.exe 监听 127.0.0.1:1933，由看门狗与每 1 分钟计划任务 OpenViking-Watchdog 巡检拉起
- 向量化依赖本地 Ollama，监听 127.0.0.1:11434，嵌入代码位于 C:\Program Files\Python310\Lib\site-packages\openviking\models\embedder\litellm_embedders.py
- 任务目录 ~\.openviking\data\viking\default\_system\tasks\default，看门狗日志 ~\.openviking\watchdog.log
- 每日 03:00 执行记忆快照

## 已知故障模式
- session_commit 向量化失败报错 Failed to generate embedding，根因为 Ollama 断连或 httpx 客户端被关
- start-server.bat 仅在 11434 无监听时才拉起 Ollama，进程存活但不接连接时不会重启
- embedder 重试逻辑已放宽：异常链含 `client has been closed` 即清空 LiteLLM 客户端缓存并重试一次，不再限定 RuntimeError；`Server disconnected` 与 `OllamaException` 也仅重试一次（判定 stale=True、ollama=True、other=False）
- 进程崩溃后最多等 1 分钟计划任务 OpenViking-Watchdog 拉起，掉线期间 commit 会失败或丢失

## 运维要点
- 重新提交失败会话可补嵌入；无 pending/running 卡死时无需停服清队列
- 建议将 openviking-server.exe 与 Ollama 设为登录常驻（NSSM/计划任务），崩溃立即拉起

## 近期改动（2026-11-11）
- start-server.bat 改为请求 http://127.0.0.1:11434/api/tags，失败时先结束 ollama.exe 再拉起，不再只看端口；看门狗在 dsh web 存活时同样做该探测
- 看门狗认定 1933 存活必须 /health 返回 2xx，端口在听但接口挂了也会重启服务
- 升级 OpenViking 会覆盖 site-packages 里的修改文件，补丁副本存于 dsh/patches/openviking-embed-retry（含 README，升级后拷回并重启）；相关改动本地提交 f71763fe，未推送
- 2026-11-12 曾发现两个 openviking-server.exe 进程（PID 13340 来自 start-server.bat，PID 10668 实际占用 1933 端口）疑似重复启动；当日经 C4 修复（start-server.bat 在 1933 未监听时先 taskkill 清僵尸再单实例启动），复测仅 1 个实例（PID 26388 监听 15284），/health 返回 ok
- 日志卫生差：watchdog.log 212KB 全为每分钟 "OK" 心跳且无轮转；server.err.log/ollama.*.log 自 2026-11-02 起停止更新；001617.log 为二进制向量存储日志不可作运维日志。2026-11-12 经 C1 修复，start-server.bat 已加 1>>server.log 2>&1，server.log 实时落盘 INFO/WARNING（含 embedding 慢调用告警）
- usage_audit 的 WAL 曾膨胀至 4.2MB 才 checkpoint（后回落至 1B）
- 可观测性缺口：find 有 8 次检索错误（success 43/error 8），但 request_audit 仅留聚合计数、无单次详情，出问题无法定位
- 404 来源：16 条 __unmatched__ 探测路径 + 5 次重复拉取不存在的 profile.md + 1 次 POST；409 为重复 create session；405 为用错 HTTP 方法
- 2026-11-12 经 A1+A2 优化，ov.conf 新增 retrieval 段 enable_intent:false、recall_intent_timeout_s:2.0，关闭 VLM 意图改写；实测 search 延迟 5.2s→0.18s（约27×），VLM token 增量降为 0，检索结果仍正常；走 _semantic.py 原有 fail-closed 原始 query 路径，安全无报错
- 2026-11-12 新日志抓到 LiteLLM async embedding slow call duration_ms=9016（bge-m3/Ollama 首调用约 9s），属独立延迟源，超出当日 A1+A2/C1/C4 范围，留待后续 Stage A3/B 排查

<!-- MEMORY_FIELDS
{
  "category": "本地AI系统",
  "name": "openviking",
  "source_extraction_id": "f58cdd62364c405cb74d94b1cc225f9f",
  "version": 4,
  "memory_type": "entities"
}
-->