# OpenViking 记忆系统
OpenViking（当前版本 0.5.5，端口 1933）是本地部署的记忆服务，配置位于 `~/.openviking/ov.conf`，提供会话存储、向量索引、记忆抽取，并被 DSH 用作长期记忆，由看门狗守护并在崩溃后自动拉起。

## 角色配置
- `vlm` 角色负责记忆抽取：2026-11-14 起曾为 `workbuddy/deepseek-v4.1-flash`（原 `auto/hy3`），2026-11-25 起切为 `hy4flash-free` 主模型并以 `hy4flash` 作积分兜底。
- 顶层 `query_planner` 段（类型 `Optional[VLMConfig]`）负责检索意图分析，2026-11-14 起曾配 `auto/deepseek-v4.1-flash`；未配置时回退继承 `vlm`，此前每次 search 由 vlm 兼任 planner，是单次烧 17 万 token 的元凶。
- 配置为 pydantic，`RuntimeConfigManager` 支持热重载，但改 `ov.conf` 仍建议重启 server；线上改动前备份为 `ov.conf.bak-20261114-hy3`。
- 运行时模型可看 `ov status` / `ov observer models`；服务端解析结果可用 `OpenVikingConfig.get_query_planner()` 验证。
- 抽取 VLM 在 0.5.3 时期为 `openai/auto/hy3`（经 magpie），`session_commit` 默认并发 8，VLM 为瓶颈。

## 实现与命令行
- `resolve_intent_analysis_prompt_id` 只对两个 ollama 特训模型用专用 prompt，其他模型统一走默认 `retrieval/intent_analysis.yaml`（temperature 0.0）。
- 记忆抽取走 `ExtractLoop` 的 ReAct tool-calling 管线，配 schema 驱动的多类型模板（entities/events/preferences）；完整离线复刻代价高，实践中用同源 prompt 做代理回归。
- 启动脚本 `start-server.bat` 先启 Ollama，有开机自启，冷启动 12s 内恢复；`/health` 返回 healthy 为正常；SessionCommit 队列 errors 0 表示抽取链路健康。
- 0.5.3 时期配置位于 `~/.openviking/ov.conf`、数据目录 `~/.openviking`，记忆在 `data/viking/default/user/default/memories/`（identity/soul/entities/events/preferences），`auth_mode=dev` 无鉴权；`/health` 返回 `{"status":"ok","healthy":true}`；安装于 `C:\Program Files\Python310\Lib\site-packages\openviking`。
- CLI 需 `ovcli.conf`；`add-memory` 自动分类，`mv/rm` 保持索引一致；`reindex --mode vectors_only --wait true` 异步重建（可能超时但继续）；Embedding 用 `bge-m3-ov`（1024 维，`num_batch=1024`，`num_ctx=8192`）。

## 记忆库与脚本
- 2026-11-25 记忆库约 6585 条、纯 Markdown 无 frontmatter，URI 形如 `viking://user/default/memories/{entities,preferences,_archive}/...`。
- `ov` CLI v0.5.5 支持 `ls -r/read/write/set-tags/glob`、`--output json`；Python SDK 顶层无导出，脚本只能走 CLI。
- OV 启动脚本与看门狗在 `C:\Users\Administrator\.openviking\`（git 仓 master、未配置 remote 无法 push，改动前备份 `.bak`）。

## 历史运维记录
- 2026-11-14 根因：本机无独显，`bge-m3-ov` 纯 CPU 单槽串行，40 并发延迟 avg 128.66s / max 315.26s、wait 145s，读超时后断连；历史 84 次失败含 OTHER 52（多为 11-11 Connection error.）、OLLAMA_DISCONNECT 16、EVENT_LOOP_LOCK 10、CLIENT_CLOSED 2、MEM_EXTRACT_TOKENCAP 2。
- 2026-11-14 止血：备份 `ov.conf.bak-20261114-154622`，embedding 段设 `max_concurrent: 2`（原默认 10）并重启，16 并发 0 断连、最大 103.8s、单条 6.7–16.5s，实流 90 秒 0 失败；超时与 `OLLAMA_NUM_PARALLEL` 未动。
- 0.5.5 自带 `model_retry.py` 与 `RetryEmbedder`（默认 `max_retries=3`），Server disconnected 归 TRANSIENT_NETWORK_ERROR；13:24 升级覆盖旧本地补丁，副本与 README 在 `dsh/patches/openviking-embed-retry`，本地提交 `28cc9c62` 未推送。
- 2026-11-09 `/debug/health` 与 `/observer` 误报 false：Embedding Errors=2（in_progress=1）被 `NamedQueue._has_active_errors` 计入且 `reset_status` 未调用；真实 endpoint memories=4428，Requeued 1008 属冻结非活跃失败，各队列均空。
- 修复前 VLM 并发 4 + 串行 commit 约 3min，38/39 session_commit 完成（p50 163.6s）；`_has_active_errors` 加 900s 窗口并重启（pid 14796）后 healthy，`max_concurrent` 4→8。

## 审计与成本
- 重测 8/8 成功，卡住的 `e5c4be47` 自动失败，总数 5102；2026-11-09 14:23 的 1933、VLM 3425、Ollama 11434 均 LISTENING，healthy，total_memories 5116。
- 2026-11-04→11-12 共 1032 次 API 请求（97.2% 为 200），错误 22×404、2×409、2×405、8 次 find 检索错误；search 延迟 p50 5.2s / p90 7.0s / p99 11.9s / max 51.4s，find 单次约 50s。
- VLM（`auto/hy3`）累计 38.0M in + 31.8M out token；query_planner 每次 search 改写约 17 万 token/search，为最大成本与最慢路径（ov.conf 只配 vlm=auto/hy3，query_planner 默认继承）；凌晨 0–6 点仍约 100k+ token/小时，与业务量脱钩。
- 2026-11-13 证据：插件每 turn 自动召回，凌晨每小时仍 9–26 次 search（UTC 03 时 22 次），每次同步 9k in+9k out；UTC 13 时检索为 0 仍有 hy3 38k+9.6k token，说明后台记忆抽取是第二来源；27h 窗口 hy3 共 1.84M in + 1.67M out（≈130k tok/h），按 3/15 元每 M 估 ≈¥31/天，bge-m3 本地零成本。

## 已知问题
- Ollama↔OpenViking（litellm）embedding 抖动：历史 server.log 中 `OllamaException - Server disconnected` 累计 214 次，embedding 队列积压 error 并触发 circuit breaker（约 54s 重试）。
- server 偶发崩溃（aiohttp event loop 关闭异常），依赖看门狗重启恢复。
- `auto/hy3` 历史缺陷：抽取慢且易 502、planner 输出 JSON 常被 reasoning 污染不可解析、曾把整批记忆译成葡萄牙语（语言漂移）。

<!-- MEMORY_FIELDS
{
  "category": "技术平台",
  "name": "openviking",
  "source_extraction_id": "55ec517f876a490cabd712f25c420452",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "entities"
}
-->