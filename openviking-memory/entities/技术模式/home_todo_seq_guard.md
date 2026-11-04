# 产品2.0首页待办消息中心并发请求序号守卫
产品2.0(zhi2-web-admin)首页 home/index.vue 中待办与消息中心面板共用同一 todos 数据源，并发请求时因响应乱序导致过期数据覆盖。

## 问题根因
- 首页待办/消息中心共用同一 todos 数据源，两个请求并发发出，接口慢时先发请求后返回，把过期列表写进 todos
- 导致「停在消息中心却显示待办数据」、点击处理跳错页面
- 异步 .then 不感知请求是否已过期，只按返回顺序写响应式数据，乱序返回必然覆盖新数据

## 解决方案
- 模块内维护自增序号 this.todoPanelFetchSeq，发请求前 ++ 并把本次序号存闭包 seq
- .then 里仅当 seq === 最新序号才赋值数据
- .finally 里同样序号匹配才关 loading（防止旧请求关掉新请求的 loading）
- 顺带给 res.rows 做 || [] 防护
- 所有「同一数据源可被多入口/多条件并发刷新」的列表都套用此 seq 守卫模式，比 AbortController 更简单且不依赖 axios 版本

## 验证与归属
- 验证：home/index.vue 增加 todoPanelFetchSeq，then/finally 中 seq === this.todoPanelFetchSeq 才写入 todos / 关 todoLoading
- 涉及文件：zhi2-web-admin/src/views/home/index.vue
- 所属项目：产品2.0；来源会话：17a66e94-0a17-42dc-94f3-4fbe933bf043；代码基线：6da8974

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_todo_seq_guard",
  "source_extraction_id": "0de41dbc8e2e4f76806309cdcb14ee8c",
  "version": 1,
  "memory_type": "entities"
}
-->