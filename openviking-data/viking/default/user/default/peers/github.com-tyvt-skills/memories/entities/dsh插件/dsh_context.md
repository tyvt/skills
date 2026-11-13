# dsh-context
DSH 的上下文与用量采集插件，为 DSH Web 提供 token 用量与耗时曲线数据。

## 功能与结构
- 产出 contextTimeline.cost：按 provider/model 聚合的逐条 usage（输入=未命中+缓存读+缓存写、输出、命中率），仅含 token 数据、无耗时字段
- 提供 durationCurve（耗时曲线）功能：commandStats.ms 记录工具命令耗时，requests[].activeMs 记录每步活跃耗时（含模型与工具调用），但 activeMs 不含 model 归属

## 与其他插件关系
- dsh-token-models 宿主主区块（每模型 token 用量表）数据源为 contextTimeline.cost，故主区块默认无 per-model 耗时列
- 若要让宿主主区块显示每模型耗时，需给 dsh-context 打补丁使逐步 request 带 model 字段并在 client 按 model 聚合 activeMs（改动第三方插件，有回归风险）


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "DSH插件",
  "name": "dsh_context",
  "source_extraction_id": "6b6cd69daaab4f6db42693aca24f23ae",
  "version": 1,
  "memory_type": "entities"
}
-->