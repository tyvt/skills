# DSH Web
DSH Web 是部署在本机的 Web 服务，承载编排器、MCP 工具服务器与插件体系，升级后需重启进程才会加载新插件。

## 用途
- 对外提供本机 Web 控制台（监听 3080 端口，需带 token 的 URL 访问）。
- 对内挂载编排器 orchestrate 与各类插件、MCP 工具服务器。

## 组成
- 编排器 orchestrate：`op:list` 返回完整工具池与故障转移链，`op:full` 执行快路径（node v22.23.2）；参数含 shell 元字符时会被正确拒绝。
- mcp_gateway 按需拉起 MCP 工具服务器：dbx（18 个工具、9 个数据库连接）、context-mode、agent-browser、magpie-vision、OpenViking。
- 插件：agent-guard（拦截 ~/.dsh 容器的 glob 与探索型 pwsh）、token-guard（截断大日志与 skill 正文）、cost-meter（成本告警）；skill 系统可加载 tool-call-hygiene。
- 内置工具：web_fetch（401 认证响应正常）、schedule_list（250 个任务）、read/grep/pwsh 均正常。

## 运行与状态
- 2026-11-24 升级后由 PID 27060 于当日 08:38 启动并加载新插件，插件生效以实机行为判定。
- context-mode 仍为 v1.0.169，v2.2.2 已可用；doctor 全项通过（FTS5/SQLite/hooks），属版本建议而非故障。
- 日志 C:\Users\Administrator\.dsh\web-restart.log 仅记录 channel/model 事件、无独立插件凭证行，并被 llm-deepseek-account 的 “model listing loaded” 重复刷屏 129+ 条，仅影响可读性。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序",
  "name": "dsh_web",
  "source_extraction_id": "435b97bdbd9947cb9a199631d6442ff3",
  "version": 1,
  "memory_type": "entities"
}
-->