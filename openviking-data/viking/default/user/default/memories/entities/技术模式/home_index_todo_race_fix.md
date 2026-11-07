
# home/index.vue 待办消息竞态修复
产品2.0 的 zhi2-web-admin 修复待办与消息共用 `todos` 因请求乱序返回导致展示与跳转不一致的问题。

## 问题原因
- 待办和消息共用同一个 `todos`，`getList` 与 `getMessageList` 各自发请求
- 先发后到的响应会覆盖界面，导致数据过期且 `handleProcess` 按 `currentIndex` 分支跳转不一致

## 修复内容
- 增加 `todoPanelFetchSeq`，每次发起请求前自增，闭包 `seq` 记录本次序号
- `.then` 仅当 `seq === this.todoPanelFetchSeq` 才赋值 `todos`
- `.finally` 同样仅当序号匹配才置 `todoLoading = false`
- 对 `res.rows` 做 `|| []` 防护避免空数据 `map` 报错

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/views/home/index.vue`
- 所属项目：产品2.0；来源会话：17a66e94-0a17-42dc-94f3-4fbe933bf043；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_index_todo_race_fix",
  "source_extraction_id": "da9bca3f195c4fd8a5e10c92635c7b91",
  "version": 1,
  "memory_type": "entities"
}
-->
