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

<!-- MEMORY_FIELDS
{
  "category": "本地AI系统",
  "name": "openviking",
  "source_extraction_id": "bc8b08c42cf742b9b15729a245549da2",
  "version": 2,
  "memory_type": "entities"
}
-->