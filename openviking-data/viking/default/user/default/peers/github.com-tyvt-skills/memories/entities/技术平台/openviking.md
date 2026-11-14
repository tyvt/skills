# OpenViking 记忆系统

OpenViking（版本 0.5.5，端口 1933）是用户本地部署的记忆服务，配置位于 ~/.openviking/ov.conf，由看门狗进程守护并在崩溃后自动拉起。

## 角色配置
- `vlm` 角色负责记忆抽取，2026-11-14 起为 `workbuddy/deepseek-v4.1-flash`（原 `auto/hy3`）
- 顶层 `query_planner` 段（类型 `Optional[VLMConfig]`）负责检索意图分析，2026-11-14 起配 `auto/deepseek-v4.1-flash`；未配置时回退继承 `vlm`，此前每次 search 由 vlm 兼任 planner，是单次烧 17 万 token 的元凶
- 配置为 pydantic，`RuntimeConfigManager` 支持热重载，但改 ov.conf 仍建议重启 server；线上改动前备份为 `ov.conf.bak-20261114-hy3`
- 运行时模型可看 `ov status` / `ov observer models`；服务端解析结果可用 `OpenVikingConfig.get_query_planner()` 验证

## 实现与运维
- `resolve_intent_analysis_prompt_id` 只对两个 ollama 特训模型用专用 prompt，其他模型统一走默认 `retrieval/intent_analysis.yaml`（temperature 0.0）
- 记忆抽取走 `ExtractLoop` 的 ReAct tool-calling 管线，配 schema 驱动的多类型模板（entities/events/preferences）；完整离线复刻代价高，实践中用同源 prompt 做代理回归
- 启动脚本 `start-server.bat`，`/health` 返回 healthy 为正常；SessionCommit 队列 errors 0 表示抽取链路健康

## 已知问题
- Ollama↔OpenViking（litellm）embedding 抖动：历史 server.log 中 `OllamaException - Server disconnected` 累计 214 次，embedding 队列积压 error 并触发 circuit breaker（约 54s 重试）
- 2026-11-14 根因：本机无独显，bge-m3-ov 纯 CPU 单槽串行，40 并发延迟 avg 128.66s / max 315.26s、wait 145s，读超时后断连；历史 84 次失败含 OTHER 52（多为 11-11 Connection error.）、OLLAMA_DISCONNECT 16、EVENT_LOOP_LOCK 10、CLIENT_CLOSED 2、MEM_EXTRACT_TOKENCAP 2
- 2026-11-14 止血：备份 ov.conf.bak-20261114-154622，embedding 段设 max_concurrent: 2（原默认 10）并重启，16 并发 0 断连、最大 103.8s、单条 6.7–16.5s，实流 90 秒 0 失败；超时与 OLLAMA_NUM_PARALLEL 未动
- 0.5.5 自带 model_retry.py 与 RetryEmbedder（默认 max_retries=3），Server disconnected 归 TRANSIENT_NETWORK_ERROR；13:24 升级覆盖旧本地补丁，副本与 README 在 dsh/patches/openviking-embed-retry，本地提交 28cc9c62 未推送
- server 偶发崩溃（aiohttp event loop 关闭异常），依赖看门狗重启恢复
- `auto/hy3` 历史缺陷：抽取慢且易 502、planner 输出 JSON 常被 reasoning 污染不可解析、曾把整批记忆译成葡萄牙语（语言漂移）

<!-- MEMORY_FIELDS
{
  "category": "技术平台",
  "name": "openviking",
  "source_extraction_id": "6918e6043fcc4daa9872921ea3761dca",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->