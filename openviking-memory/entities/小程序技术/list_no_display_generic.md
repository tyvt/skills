# 列表接口返回但无展示通用排查
苏住房C 小程序列表页出现「接口正常返回但数据不展示」，根因通常为响应结构硬解、无效 computed 遮蔽、useLoadMore 无 catch 三处叠加。

## 问题现象
- pages_transaction/stockHouse/index.vue 可能出现接口正常返回但列表不展示、loading 卡死
- 模板真正用 useLoadMore 的 list，但存在读未写入 store 的同名 computed.list 带偏排查

## 根因
- getList 用手写 new Promise 包 $.then 并直接 res.result.records.map/.total，结构异常时 then 抛错挂死 Promise，loading 永不完
- 页面 computed.list 读 houseStore.stockHouseList，本页从未写入该 store，属同名遮蔽型死代码
- hooks/useLoadMore 里 fn() 无 catch，请求失败 pageNum 已自增白占一页、status 卡 loading，后续下拉不再触发

## 解决方案
- 改 async/await + res?.result?.records ?? [] / res?.result?.total ?? 0，结构异常按空数组而非 throw，统一 return { ...res, rows, total }
- 删掉不写入 store 的镜像 computed；useLoadMore 给 fn() 补 .catch（pageNum 回退、status 复位 more）
- padList/refreshList 用 res.rows || res.data || [] 防 undefined 展开；同类「有返回无展示」优先按这三顺序查

## 验证与归属
- 验证：会话 c9de4a3c 结论改为 async/await、可选链取值、去掉无效 computed.list、useLoadMore 补 .catch、padList 用 res.rows||res.data||[]
- 涉及文件：pages_transaction/stockHouse/index.vue、hooks/useLoadMore.js、api/v1Instance.js、utils/ui.js
- 所属项目：苏住房C；来源会话ID：c9de4a3c-a1a8-45ce-b4b9-2a181a353c95；代码基线：e383380

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "list_no_display_generic",
  "source_extraction_id": "6effc7066ae1427b831acada34d3612d",
  "version": 1,
  "memory_type": "entities"
}
-->