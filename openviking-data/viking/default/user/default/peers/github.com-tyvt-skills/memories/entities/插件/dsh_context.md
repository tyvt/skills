# dsh-context
DSH 的上下文与 token 统计 Web 插件（npm 包），提供会话 Context 洞察页与 Token Stats 卡。

## 基本信息
- npm 包 dsh-context@0.83.0（github bowenliang123/dsh-context），安装于 ~/.dsh/profiles/web/node_modules/dsh-context。
- 插件存储位于 ~/.dsh/storages/dsh-context；为 tsdown 构建的压缩包（lib/index.js 177KB、client.js 939KB），无本地源码。

## 数据模型
- 已支持逐模型成本用量：contextTimeline 投影含 cost = {provider:{model:{peak,off:{uncached,cacheRead,cacheWrite,output}}}}，服务端已聚合。
- 注册投影键名 contextTimeline，客户端经 useProjection('contextTimeline') 读取，含 .cost 字段。

## GUI 现状
- Token Stats 卡（Vm 组件）仅渲染聚合 donut（i.usage 合计），无逐模型表格。
- 面板字符串含 Cache input/Uncached input/Output/Cache write 与 costPriceBy「Priced as listed on models.dev for {p} · {m}」。

## 维护注意
- client.js 为直接服务的 ES module，手写修改会被 dsh plugin update / npm install 覆盖；本机本地修改应走独立本地插件。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "插件",
  "name": "dsh_context",
  "source_extraction_id": "272c5dd7adf14815800ef32b6612dbdd",
  "version": 1,
  "memory_type": "entities"
}
-->