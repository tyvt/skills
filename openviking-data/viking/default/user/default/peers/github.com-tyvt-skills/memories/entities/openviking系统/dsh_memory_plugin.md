# dsh-memory-plugin
OpenViking 的 DSH 记忆插件，负责记忆注入（profile-inject）与召回（recall-core）。

## 架构
- 源文件：D:\repository\OpenViking\examples\memory-plugin-shared\lib\profile-inject.mjs（598行）
- 生成链：sync.mjs 将 lib/ 传播到 dsh/codex/claude-code 各插件的 scripts/shared/ 副本
- 安装副本：C:\Users\Administrator\.dsh\profiles\web\node_modules\@openviking\dsh-memory-plugin（615行）
- profile-inject.mjs 头部标注 "GENERATED FROM examples/memory-plugin-shared/lib. DO NOT EDIT."

## 关键事实
- 安装副本（615行）比仓库源（598行）更新：含 caller:"profile-inject" tagging 与 _missingProfileWarned 404 预检，直接覆盖会回退这些特性
- profile 块每会话注入一次（profileDelivered 标志），recall 块每用户轮次注入（受 minQueryLength 门控）
- AGENTS.md 位于 C:\Users\Administrator\.dsh\AGENTS.md，为 D:\repository\skills\dsh\AGENTS.md 的符号链接
- 2026-11-14 L1：profile-inject.mjs 的 render() 末尾追加 `<openviking-hint>` 固定提示行，要求排障/查历史/设计前先 mcp_gateway(server=openviking, tool=search, mode=context, detail=abstract) 再动手；计入 token 预算，块被裁空时一并丢弃
- 插件 ESM 静态 import 无 hot-reload/watch，profile-inject 改动需重启 DSH Web 进程才加载进内存（AGENTS.md 规则下个会话即生效）

<!-- MEMORY_FIELDS
{
  "category": "OpenViking系统",
  "name": "dsh_memory_plugin",
  "source_extraction_id": "afe69c83d80340cfa6bcbfe11d6701cb",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->