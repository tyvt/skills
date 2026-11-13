# dsh-token-models
DSH 独立本地客户端插件，在 Web GUI 会话视图新增「Models」标签页渲染逐模型 token 清单。

## 目的
- 满足用户逐模型 token 审计要求，在 GUI 展示每个参与模型的输入/未命中/缓存读/缓存写/输出/命中率。

## 实现
- 位于 D:\repository\skills\dsh\token-models，部署至 ~/.dsh/token-models 与 node_modules/dsh-token-models（三处一致）。
- lib/client.js 为手写 ESM factory（window.__ModuleLoader__.load），无需 tsdown 构建，注册 conversation.view 新标签页「Models」。
- lib/index.js 最小服务端挂载点；package.json 含 dsh.client 声明；cordis.patch.yml 做 bundle insert 挂载。

## 数据源
- 读 dsh-context 已算好的 contextTimeline.cost 每模型分桶（provider→model→peak/off），本插件仅渲染不重算。
- 覆盖会话内主 agent 与 teammate 每个实际参与模型；orchestrate 子模型不在会话事件日志，继续用 audit-models.mjs 网关口径。

## 部署状态
- 2026-11-12 创建并部署；已加入 ~/.dsh/profiles/web/package.json 的 dependencies 与 bundles，dsh --dump-config 确认入组合树。
- 需重启 web 服务（PID 3860）加载新 bundle 方可生效。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "插件",
  "name": "dsh_token_models",
  "source_extraction_id": "272c5dd7adf14815800ef32b6612dbdd",
  "version": 1,
  "memory_type": "entities"
}
-->