# DSH Web会话持久化
跨请求的会话记忆机制：以 session_id 为 key 将 environment_context 落本地 JSON，实现 DSH Web 多轮对话的状态保留与安全隔离。

## 实现方式
- 不使用 LangGraph 的 MemorySaver（仅存进程内存，jsonbridge.py 每次是新进程，退出即丢），改为按 session_id 写项目下 .sessions/<id>.json
- api.py 提供 load_environment / save_environment：run_full 编排前调用 load，结束后调用 save
- 持久化内容仅含 cwd 与命令写过的 env，不保存整份系统环境变量
- save_environment 写完当前会话后扫描 .sessions，删除修改时间超过 7 天的 .json；清理出错不影响本次保存

## 会话ID与安全隔离
- session_id 由插件从宿主上下文读取（exec.sessionId / exec.session.id / exec.session.sessionId），不接受模型在参数里传入，防止模型指定他人会话
- ID 须匹配 ^[A-Za-z0-9_-]{8,128}$，否则视为无效不读写文件；无 ID 时不落盘，每次从项目根目录开始
- 新或未知 session_id 从项目根目录（config.yaml 所在目录）启动
- 读回的 cwd 必须位于项目根内，跑到外面（如 C:\Windows）则重置回根目录

## 重置口令与串行排队
- 请求含「重置环境」或「回到根目录」时，本次编排从项目根目录开始且清空 current session 的 env（不带入已保存 env）
- 插件层 lib/index.js 对同一个 session_id 的 op=full 调用串行执行（Promise 排队 Mutex）；无会话 ID 的调用不排队，前一个调用失败不会卡住后续调用

## 验证与上线
- 本地验证三场景：会话A恢复到 src 并带回变量 X；会话B保存的 C:\Windows 被重置回根；从未出现的会话也从项目根开始
- 插件 lib/index.js 改动需重启 DSH Web 才会加载，Python 侧下次调用即生效
- TTL 清理验证：8 天未改动的会话文件在保存时被删，当天写入的文件保留

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dsh_session_persistence",
  "source_extraction_id": "c43a40f8955a4813aec8cbf97885d335",
  "peer_id": "deepseek-harness-default-workspace",
  "version": 2,
  "memory_type": "entities"
}
-->