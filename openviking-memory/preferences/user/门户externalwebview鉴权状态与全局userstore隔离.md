- 门户首页 externalWebview 作为独立入口时，页面内 Token、用户信息、绑房结果应与全局 userStore 及全局公共登录/请求封装分开维护，用页面级 storage（或页面内 state + 本地缓存）读写
- 涉及 userStore 的字段在本页改为页面存储，不要复用会把全局 token 注入请求的公共方法，为本页单独封装最小请求（仍可用 uni.request，但 header/参数来源只读本页状态）
- 合并页面后若出现运行时 `Cannot find module '@/store/user'`，需一并去掉 store 依赖

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "门户externalWebview鉴权状态与全局userStore隔离",
  "source_extraction_id": "2b34d842ccf94a47b62d912a34a3a9c0",
  "version": 1,
  "memory_type": "preferences"
}
-->