# openviking
OpenViking 是开源记忆服务（会话存储、向量索引、记忆抽取），被 DSH 用作长期记忆。

## 部署与配置
- v0.5.3，端口 1933，auth_mode=dev 无鉴权；/health 返回 {"status":"ok","healthy":true}。
- 配置 ~/.openviking/ov.conf，数据目录 ~/.openviking；记忆在 data/viking/default/user/default/memories/（identity/soul/entities/events/preferences）。
- 安装于 C:\Program Files\Python310\Lib\site-packages\openviking；start-server.bat 先启 Ollama，有开机自启，冷启动 12s 内恢复。
- CLI 需 ovcli.conf；add-memory 自动分类，mv/rm 保持索引一致；reindex --mode vectors_only --wait true 异步重建（可能超时但继续）；Embedding 用 bge-m3-ov（1024 维，num_batch=1024，num_ctx=8192）。

## 抽取与并发
- 抽取 VLM 为 openai/auto/hy3（经 magpie）；session_commit 默认并发 8，VLM 为瓶颈。

## 审计与修复
- 2026-11-09 /debug/health 与 /observer 误报 false：Embedding Errors=2（in_progress=1）被 NamedQueue._has_active_errors 计入且 reset_status 未调用；真实 endpoint memories=4428，Requeued 1008 属冻结非活跃失败，各队列均空。
- 修复前 VLM 并发 4 + 串行 commit 约 3min，38/39 session_commit 完成（p50 163.6s）；_has_active_errors 加 900s 窗口并重启（pid 14796）后 healthy，max_concurrent 4→8。
- 重测 8/8 成功，卡住的 e5c4be47 自动失败，总数 5102；2026-11-09 14:23 的 1933、VLM 3425、Ollama 11434 均 LISTENING，healthy，total_memories 5116。

## 成本
- 2026-11-04→11-12 共 1032 次 API 请求（97.2% 为 200），错误 22×404、2×409、2×405、8 次 find 检索错误；search 延迟 p50 5.2s / p90 7.0s / p99 11.9s / max 51.4s，find 单次约 50s。
- VLM（auto/hy3）累计 38.0M in + 31.8M out token；query_planner 每次 search 改写约 17 万 token/search，为最大成本与最慢路径（ov.conf 只配 vlm=auto/hy3，query_planner 默认继承）；凌晨 0–6 点仍约 100k+ token/小时，与业务量脱钩。
- 2026-11-13 证据：插件每 turn 自动召回，凌晨每小时仍 9–26 次 search（UTC 03 时 22 次），每次同步 9k in+9k out；UTC 13 时检索为 0 仍有 hy3 38k+9.6k token，说明后台记忆抽取是第二来源；27h 窗口 hy3 共 1.84M in + 1.67M out（≈130k tok/h），按 3/15 元每 M 估 ≈¥31/天，bge-m3 本地零成本。

<!-- MEMORY_FIELDS
{
  "category": "记忆服务程序",
  "name": "openviking",
  "source_extraction_id": "1e2b4cea7fe14fe9a7d115375b59a1a3",
  "version": 39,
  "memory_type": "entities"
}
-->