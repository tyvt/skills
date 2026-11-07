# 库存房列表加载与请求失败修复
苏住房C(zhi2-mobile-shimin)小程序中 `stockHouse/index.vue` 与 `hooks/useLoadMore.js` 的列表加载与请求失败处理已修复。

## 问题根因
- `getList` 使用手写 `new Promise`，`.then` 里抛错会导致 Promise 挂死
- 结构异常时 `.map` 抛错；无效 `computed.list` 读取本页从未写入的 store
- 请求失败时 `pageNum` 白占一页且 `status` 卡在 `loading`

## 修复方案
- `stockHouse/index.vue` 的 `getList` 改为 `async/await`，使用 `res?.result?.records ?? []`、`res?.result?.total ?? 0`，统一 `return { ...res, rows, total }`
- 删除无效 `computed.list` 及对 `houseStore` 的引用(模板实际用 `useLoadMore` 的 `list`)
- `hooks/useLoadMore.js` 为 `fn()` 增加 `.catch`：请求失败时将 `pageNum` 减回、把 `status` 置回 `'more'`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`stockHouse/index.vue`、`hooks/useLoadMore.js`
- 来源会话ID：c9de4a3c-a1a8-45ce-b4b9-2a181a353c95；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "stockhouse_loadmore_fix",
  "source_extraction_id": "7566ecdbf0c54726904383a9644f43fe",
  "version": 1,
  "memory_type": "entities"
}
-->