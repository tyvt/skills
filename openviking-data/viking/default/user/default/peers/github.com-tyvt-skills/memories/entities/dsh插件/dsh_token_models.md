# dsh-token-models
DSH Web 的 token 模型用量面板插件，包名 dsh-token-models，代码位于 D:\repository\skills\dsh\token-models。

## 功能
- Models 标签页展示各模型 token 用量；2026-11-12 新增合并编排器（orchestrate 子进程）用量及每模型总计耗时（数据源 .costs.jsonl 的 elapsed 字段，单位秒）
- 服务端 lib/index.js 注册 GET /api/token-models/orchestrator-usage，读取 langgraph-orchestrator\.sessions\*.costs.jsonl 按模型聚合（prompt/completion/calls/roles）
- 前端 lib/client.js 追加「编排器模型」表区块，fetch 端点渲染；2026-11-12 新增 fmtDur 格式化 elapsed、rowsFromOrchestrator 聚合耗时列
- OrchestratorSection fetch 带 ?session_id=<本会话id>，服务端 aggregate() 按 session_id 过滤只读 <sessionId>.costs.jsonl；session_id 为空时记录落 anonymous.costs.jsonl 不计入
- 配置 sessionsDir 默认 D:\repository\skills\dsh\langgraph-orchestrator\.sessions，cordis.patch.yml 可覆盖；inject=["webServer"] 确保就绪后注册路由
- 宿主主区块（dsh-context 的 contextTimeline.cost）仅含 token 用量无耗时列；per-model 耗时仅在编排器区块。2026-11-12 用户确认方案 C：主区块不加耗时列（改需动第三方 dsh-context 有回归风险）

## 部署
- 安装副本 ~\.dsh\profiles\web\node_modules\dsh-token-models\lib\；改 repo 源码后须手动同步 lib/*.js 并重启 dsh web 生效
- lib/*.js 为实体拷贝（非硬链接），cordis.patch.yml 与 package.json 为硬链接
- 2026-11-12 修复：仓库提交 7a75b23f 后安装副本未同步致面板无耗时列；助手覆盖 repo lib/index.js+client.js 到副本（旧文件备 lib\_bak_20261112_152824\），用户重启 dsh web（PID 7020→10292）

## 验证（2026-11-12）
- 端点 HTTP 200，聚合 13 会话、4 编排器模型：grok-4.7@256k(41283)、auto/deepseek-v4.1-flash(9685)、workbuddy/glm-5.3-flash(9585)、workbuddy/deepseek-v4.1-flash(5376)，总计 65929 tokens / 56 次调用
- 部署后 Web 进程 12:00:11 启动加载新代码
- 本会话真实 orchestrate 生成 session-263cd962-762d-40ec-b84d-35e40bc1f249.costs.jsonl 含 cursor/grok-4.7@256k（prompt1426/completion1123/total2549/calls1），端点过滤一致
- 07:28 会话验证：重启后 PID10292 端点返回 7 模型 elapsedSec——cursor/grok-4.7@256k 1870.08s/75calls、workbuddy/deepseek-v4.1-flash 340.10s/124、workbuddy/glm-5.3-flash 721.29s/42、workbuddy/hy3 288.25s/11、auto/deepseek-v4.1-flash 80.27s/14、cursor/deepseek-v41-flash-1017 14.35s/1，合计 3314.34s
- 当前会话 session-17fbbcb2-... 在 .sessions 无 .costs.jsonl，面板按 session_id 过滤后编排器区块显示「暂无编排器用量记录」

<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "dsh_token_models",
  "source_extraction_id": "9d05edffe48542da99a2bb48bc0f94cb",
  "peer_id": "github.com-tyvt-skills",
  "version": 6,
  "memory_type": "entities"
}
-->