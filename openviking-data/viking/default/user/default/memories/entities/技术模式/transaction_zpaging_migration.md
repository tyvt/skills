# pages_transaction 整包迁移 z-paging 规则集
苏住房C 的 pages_transaction 分包统一将 useLoadMore/uni-load-more 列表页迁移到 z-paging，形成标准规则集与五类例外处理法。

## 背景与规则
- 基础设施统一为 src/hooks/usePaging.js 暴露 {list,pagingRef,queryList,refresh,reset,auto}，z-paging 走 easycom，空态样式统一 .paging-empty 等。
- useLoadMore→usePaging，getList 入参改 getList(pageParams) 不再用 arguments；列表外包 `<z-paging :ref="pagingRef" v-model="list" @query="queryList">`；删除 uni-load-more 与状态依赖。

## 五类例外
- 弹层内列表用 usePaging(fn,{auto:false})+:auto="false"，弹窗打开手动 refresh()。
- 自定义无更多文案改用 loading-more-no-more-text prop；手工 IntersectionObserver 分页直接删观察器改 script setup+usePaging。
- Tab 内列表与总数=0 才整页空态保留 totalSum==0 顶层空态，列表空态交 #empty；空态统一 ZsEmpty→#empty 内 ZsImage+view.paging-empty-text 保留原图与文案。
- buyHouse/myBuy.vue 原本手写分页，迁移时 total 改在 getList 内维护。

## 验证与归属
- 验证证据：会话 df586279 用户给出 11 条迁移规则并要求迁移全部 useLoadMore/uni-load-more 页，最终改动 19 文件，目录下无旧引用。
- 涉及文件：src/hooks/usePaging.js、pages.json、pages_transaction 下 stockHouse/index.vue、commonBuildings.vue、intention/popup.vue、publishHouse/index.vue、buyHouse/myBuy.vue、service/unionBank.vue 等。
- 所属项目：苏住房C；来源会话ID：df586279-57e8-4ba0-8689-fbab9df6771b；代码基线：83c4136。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "transaction_zpaging_migration",
  "source_extraction_id": "6747cc81848946ff9ebb25b2076973e8",
  "version": 1,
  "memory_type": "entities"
}
-->