# z-paging 返回 rows:null 致列表永久加载
苏住房C 列表页用 z-paging 取数，接口返回 rows:null 时 res.rows.map() 抛错且 Promise 悬空，列表永远停在「正在加载」。

## 问题现象
- 列表/历史记录页用 z-paging 取数，接口无数据时返回 { total: "0", rows: null }
- 页面写 res.rows = res.rows.map(el => ...)，未添加数据用户点进去一直转圈，不出现「暂无数据」
- total 已是 0 说明请求成功，不能按「接口失败」方向查

## 根因
- null.map() 抛异常，发生在传给 paging 的查询函数内部，异常既没 resolve 也没 reject
- z-paging 的 completeByTotal 永远不被调用，加载态无法收敛，表现「一直加载」而非报错或空态

## 解决方案
- 取值走可选链 + 默认空数组：res.rows?.map(...) || []，并把全项目同类写法对齐（tenant/history.vue 已有正确写法，house/history.vue 漏了）
- 查询函数结尾补 .catch(reject)，保证接口异常时也能结束加载
- 修好后空数据由 ZsPaging 默认空态承接

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 d96faf99 用户诉求未添加过房屋用户点击历史添加记录页一直加载期望显示暂无数据并附接口截图；结论 pages_owner/house/history.vue 的 res.rows.map 崩溃致 completeByTotal 不被调用，已改可选链+默认空数组并补 .catch(reject)
- 涉及文件：src/pages_owner/house/history.vue、src/pages_owner/house/index.vue、src/hooks/usePaging.js
- 所属项目：苏住房C；来源会话ID：d96faf99-8932-4fca-b475-a68344311240；代码基线：d43894b

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zpaging_null_rows",
  "source_extraction_id": "d03b04d8de7b4dfa8319ee812c43be64",
  "version": 1,
  "memory_type": "entities"
}
-->