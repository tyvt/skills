# dsh-context
DSH 的上下文与用量采集 Web 插件（npm 包 dsh-context@0.83.0，github bowenliang123/dsh-context），安装于 ~/.dsh/profiles/web/node_modules/dsh-context，存储于 ~/.dsh/storages/dsh-context，为 tsdown 构建压缩包（lib/index.js 177KB、client.js 939KB，无本地源码）。

## 功能与结构
- 产出 contextTimeline.cost：按 provider/model 聚合的逐条 usage（输入=未命中+缓存读+缓存写、输出、命中率），仅含 token 数据、无耗时字段；服务端已聚合，客户端经 useProjection('contextTimeline') 读取
- 提供 durationCurve（耗时曲线）功能：commandStats.ms 记录工具命令耗时，requests[].activeMs 记录每步活跃耗时（含模型与工具调用），但 activeMs 不含 model 归属
- 注册投影键名 contextTimeline，含 .cost 字段（cost = {provider:{model:{peak,off:{uncached,cacheRead,cacheWrite,output}}}}）

## GUI 现状
- Token Stats 卡（Vm 组件）仅渲染聚合 donut（i.usage 合计），无逐模型表格
- 面板字符串含 Cache input/Uncached input/Output/Cache write 与 costPriceBy「Priced as listed on models.dev for {p} · {m}」

## 与其他插件关系
- dsh-token-models 宿主主区块（每模型 token 用量表）数据源为 contextTimeline.cost，故主区块默认无 per-model 耗时列
- 若要让宿主主区块显示每模型耗时，需给 dsh-context 打补丁使逐步 request 带 model 字段并在 client 按 model 聚合 activeMs（改动第三方插件，有回归风险）

## 维护注意
- client.js 为直接服务的 ES module，手写修改会被 dsh plugin update / npm install 覆盖；本机本地修改应走独立本地插件

<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "dsh_context",
  "source_extraction_id": "419d603e9752438e81392a5de052a76f",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->