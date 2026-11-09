# OpenViking
开源记忆服务程序：负责会话存储、向量索引与记忆抽取，被 DeepSeek Harness 用作长期记忆（替代旧库）。

## 基本信息
- 版本 0.5.3，端口 1933，auth_mode=dev 无鉴权；/health 返回 {"status":"ok","healthy":true}
- 数据目录 ~/.openviking（含 vectordb、viking 文件层与日志）；记忆路径 data/viking/default/user/default/memories/，含 identity/soul/entities/events/preferences
- 服务装在 C:\Program Files\Python310\Lib\site-packages\openviking；配置 ~/.openviking/ov.conf，配置模型在独立 openviking_cli 包
- start-server.bat 先启 Ollama 再启 server；启动文件夹放 OpenVikingServer.lnk 开机自启；同日冷启动全杀后 12 秒内自恢复

## 组件与配置
- 嵌入模型 bge-m3-ov（litellm/ollama，dim 1024，num_batch=1024、num_ctx=8192 解决 batch 超限）
- 抽取 VLM：openai/auto/hy3（复用 magpie 网关），VLM max_concurrent=8（2026-11-09 由 4 调高，重启生效）；queue_workers.session_commit.max_concurrent 默认 8，真正共享瓶颈是 VLM
- DSH 插件 @openviking/dsh-memory-plugin 写会话镜像；allow_metadata_override:true 避免换模型后元数据不匹配拒启动
- 每轮注入记录存于会话 .recall_log.json（如 dsh-session-fe39d020 在 turn 2524 记录 10 条 URI）
- 2026-11-05 导入 dsh-session-fe39d020：pending_tokens~7459、commit_count 42、memories_extracted.total 29（本 session 回写 29 条：write 11/edit 17）

## 命令行工具
- ov CLI 需 ovcli.conf（url 字段，dev 无鉴权）连本地；ov add-memory 自动分类结构化（无 --file 走 HTTP API）
- ov mv 经 API 移动/重命名并保持向量索引一致；ov rm 删记忆及索引条目；二者处理手动改名幽灵条目（旧 URI 残留、检索返回不存在路径）
- ov reindex --mode vectors_only --wait true 重建向量索引（CLI 调 HTTP 异步，大批量易超时但后台继续）；ov wait 等待后台任务（命令超时不等同任务失败）

## 2026-11-09 审计与修复
- 误报根因：/health 200 healthy 但 /debug/health 与 /observer 误报 false；Embedding Errors=2（12:41/12:57/13:11 恒定无新增）被 NamedQueue._has_active_errors 永久判活跃（error_count>0 且 not is_complete，Embedding 常年 in_progress=1）；reset_status() 可清零但从未调用，错误计数为纯内存无现成 API 清零
- 口径 D 真实端点 console/dashboard/summary → memories=4428；Requeued 1008/1045 为 11-05/06 导入死锁恢复重放累计，12:57→13:11 冻结 1008，非活跃失败；所有队列 Pending=0、pending 0 文件、observer/lock 全 0，无积压无死锁
- 修复前吞吐：VLM max_concurrent=4 + 单 commit 串行约 3 分钟；39 个 session_commit 中 38 完成（p50 163.6s、max 498.8s），1 个 e5c4be47 从 12:21 跑约 50 分钟未结束（产出 write:3/edit:1）
- 成本：开启后每步 cacheRead 66,206→92,743（+40.1%），但平均步数 119 vs 23 且模型不同；分桶后差异 −13.3%~+40.8% 方向不一致，全局涨幅主要因会话长度/缓存 provider 混淆；长会话高注入 +110%
- 修复闭环：①补丁 queue_observer.py::_has_active_errors 仅统计 900s 窗口错误（备份 .bak-20261109-135645），重启（新 pid 14796）后 /debug/health 与 /observer/system 恢复 true、errors=[]；②VLM 4→8 复测 8 路并行 8/8 成功墙钟 3.2s；③卡滞 e5c4be47 重启后服务端自动标 failed，记忆总数 5,102 完整（重启清零内存计数属预期）
- 2026-11-09 14:23 核查：1933 LISTENING（pid 14796 仍运行），/health 与 /debug/health 均 healthy:true，/observer/system is_healthy:true errors=[]，记忆库 total_memories:5116，依赖 VLM 3425（pid 21580）与 Ollama 11434（pid 15136）均 LISTENING


<!-- MEMORY_FIELDS
{
  "category": "记忆服务程序",
  "name": "openviking",
  "source_extraction_id": "753984185c714688a65f81a7a9fd124b",
  "version": 27,
  "memory_type": "entities"
}
-->