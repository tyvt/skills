# OpenViking
开源记忆服务程序，负责会话存储、向量索引与记忆抽取；被 DeepSeek Harness 用作长期记忆替代旧库。

## 基本信息
- 版本 0.5.3，端口 1933，auth_mode=dev 无鉴权；/health 返回 {"status":"ok","healthy":true}
- 数据目录 ~/.openviking（含 vectordb、viking 文件层与日志）；记忆文件路径 data/viking/default/user/default/memories/，含 identity/soul/entities/events/preferences
- 2026-11-05 观测导入会话 dsh-session-fe39d020：pending_tokens ~7459、commit_count 42、memories_extracted.total 29，本 session 回写 29 条（write 11/edit 17）

## 组件与配置
- 嵌入模型 bge-m3-ov（litellm/ollama，dim 1024，num_batch=1024、num_ctx=8192 解决 batch 超限）
- 抽取 VLM：openai/auto/hy3（复用 magpie 网关），VLM max_concurrent=4 限制并发提交；DSH 插件 @openviking/dsh-memory-plugin 写会话镜像
- allow_metadata_override: true 避免换模型后元数据不匹配拒绝启动
- 每轮注入记录存于会话的 .recall_log.json（如 dsh-session-fe39d020 在 turn 2524 记录 10 条 URI）
- SessionCommit 队列堆积会拖慢写回记忆（2026-11-05 观测与 bulk import 抢资源）

## 命令行工具与运行
- ov CLI 需 ovcli.conf（url 字段，dev 无鉴权）连本地；ov add-memory 自动分类结构化（无 --file 走 HTTP API）
- ov mv 经 API 移动/重命名并保持向量索引一致；ov rm 删记忆及索引条目；二者处理手动改名的幽灵条目（旧 URI 残留、检索返回不存在路径）
- ov reindex --mode vectors_only --wait true 重建向量索引（CLI 调 HTTP reindex 异步，大批量易超时但后台继续）；ov wait 等待后台任务（命令超时不等同任务失败）
- start-server.bat 先启 Ollama 再启 server，启动文件夹放 OpenVikingServer.lnk 开机自启；会话按 token 阈值或结束触发 commit，同日冷启动全杀后 12 秒内自恢复

<!-- MEMORY_FIELDS
{
  "category": "记忆服务程序",
  "name": "openviking",
  "source_extraction_id": "eaafb113f8cb4caabef70eab97ceca92",
  "version": 23,
  "memory_type": "entities"
}
-->