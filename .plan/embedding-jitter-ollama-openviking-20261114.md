---
status: approved
human_confirmed: true
approved_sha256: da8e83da685311dfb81c866df9f4be2ec71d44cae5f2943aea062009d3b579b5
approved_version: 1
scope_override: 用户确认本轮仅做限流止血（embedding.max_concurrent），暂不动超时/Ollama NUM_PARALLEL；提交方式=仅本地 commit 不推送。
---

# 修复 embedding 抖动（Ollama ↔ OpenViking）

## ① 前因后果

OpenViking `session_commit` 的向量化任务频繁失败（近 500 任务中 84 条 failed，今日 14:50–14:58 连发 11 条 `OllamaException - Server disconnected`），表现为健康检查都正常但嵌入"时好时坏"。根因是 `bge-m3-ov` 在本机**纯 CPU** 推理且 Ollama 单槽串行，并发一上来请求排队 2–5 分钟，超时后连接被掐，表现为抖动。

## ② 现状与证据

- 硬件：仅 Intel UHD 770 核显 + AMD R5 430，无独立算力 GPU（`Win32_VideoController`）；`ollama ps` 显示 bge-m3-ov 单实例、`size_vram` 为核显共享内存。
- 该模型 `num_batch 1024 / num_ctx 8192`，Ollama 单 slot 串行处理（`server-1.log`: `n_ctx_slot = 4096`、`all slots are idle`）。
- 压测（真实 `RetryEmbedder` 走 `127.0.0.1:11434`，1500 字文本 ×40 并发）：**OK 延迟 min/avg/max = 5.69 / 128.66 / 315.26 秒**；`wait_ms` 队列等待涨到 145891ms。
- 失败任务 `error` 均为 `Failed to generate embedding: litellm.APIConnectionError: OllamaException - Server disconnected`（读超时后连接断开）。
- 今日 13:24:50 OpenViking 升级到 0.5.5，覆盖了旧本地补丁 `litellm_embedders.py`（现 8736B，无旧重试逻辑）；但 0.5.5 已内置 `models/embedder/retry_embedder.RetryEmbedder` + `utils/model_retry.py`，且 `base.py:308` `max_retries` 默认 3，`_create_embedder`（embedding_config.py 末尾 `return RetryEmbedder(embedder)`）已包住 dense 嵌入器——即**重试已存在且生效**，`_retry_limit` 对 `Server disconnected`（分类 `TRANSIENT_NETWORK_ERROR`）返回 max_retries。
- 关键：重试对"长超时"无益——单次失败已耗时 45s，重试 3 次反而叠加放大；真正瓶颈是**并发度 vs 单槽 CPU 吞吐**不匹配。嵌入 `max_concurrent` 取默认 10（ov.conf 里两个 `"max_concurrent": 8` 属 `vlm` 与 `query_planner`，非 embedding）。`_build_kwargs` 设 `num_retries:0`、未设显式 timeout（用 litellm/httpx 默认读超时）。
- 结论：这是**配置/容量**问题，非代码缺陷。

## ③ 实施方案

按"先取证、再止血、后提吞吐"的顺序，全部为配置/运维参数改动，不改进程代码：

0. **备份与基线取证**：改 `~/.openviking/ov.conf` 前先复制为 `ov.conf.bak-<ts>`；先以并发=1 实测单次空载嵌入 P99（多次取最大），作为超时与验收基线。
1. **限流止血（ov.conf）**：在 `embedding` 段加 `"max_concurrent": 2`（先试 2，压测对比 1/2/4 取吞吐/稳定性最优），使并发嵌入低并发进入 Ollama，避免排队雪崩；改后重启 `openviking-server.exe`。若 max_concurrent 超限为排队（非拒绝），队列深度受控即可。
2. **Ollama 服务参数**：`OLLAMA_MAX_LOADED_MODELS=1`（`OLLAMA_KEEP_ALIVE=-1` 已有）。`OLLAMA_NUM_PARALLEL` 先对照 `=1`，再试 `=2`，每档确认内存不 OOM、`n_ctx_slot` 不失败、延迟不劣化后才保留，与 max_concurrent 对齐；以系统环境变量或 `start-server.bat` 注入后重启 Ollama。
3. **降低单次负载**：先核实 session_commit 分块长度；若超大记忆块致 POST 过大/`input length exceeds`，在 OV 侧减小 chunk。此项先取证再定，不盲改 `num_ctx`。
4. **超时显式化**：读超时必须 **> 第 0 步实测单次 P99**（且评估与 max_retries=3 的重试叠加上限：单次P99×(max_retries+1) 应落在可接受窗口内），写明配置文件与键名后落值，使超时即失败排空队列而非拖到 45s+ 连环重试。
5. **持久化到补丁目录**：把最终 ov.conf 关键段（含 max_concurrent、超时键）与 Ollama 启动参数记录到 `dsh/patches/openviking-embed-retry/README.md`（升级/重装后照抄），防 0.5.5 再次覆盖。

## ④ 验证计划

- 重启后 `http://127.0.0.1:1933/health` 返回 200、`http://127.0.0.1:11434/api/tags` 200。
- **经 OpenViking 嵌入入口压测**（走 `AccountBoundEmbedder`/`OV` 真实提交路径，使其受 max_concurrent 约束；勿只直连 11434 打满并发），按限流后队列重设断连验收线：要求无 `Server disconnected`、端到端 P99 落在预期窗口、队列不无界增长。
- 观察 `~/.openviking/data/.../tasks/default` 新增 `session_commit` 任务连续 30 分钟无 `Server disconnected` 失败。
- 若 1–3 步仍抖，再评估 bge-m3 换更小量化版，或 NUM_PARALLEL 提档二测。

> 变更受 git 管理（仅 README/配置记录入库），restart 类操作不可逆性低；回退：恢复 ov.conf 原值并重启。
