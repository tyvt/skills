# uni-load-more迁z-paging后tab切换分页失效
苏住房C市民端全站uni-load-more+useLoadMore换z-paging后，tab切换分页集体失效，需切tab重置第1页并重发请求。

## 问题现象
- 用户反馈“我的房源切换功能失效”“所有tab切换分页都失效”“点了没反应”“页面错乱”
- 同时“z-paging好像没有loading效果”
- 约15个页面无自定义#empty但仍走ZsPaging默认空态不会白屏

## 根因
- 旧hook把当前tab类型当分页参数一部分，切tab重置页码重发；z-paging页码由组件内部维护，切tab只改类型字段未让组件回第1页也未reload
- request回调没正确return/结束，组件拿不到加载态

## 解决方案
- 每个tab页切换处理显式调用z-paging实例reload（参数变更必须回第一页），不只改数据字段
- 清掉旧hook残留状态复位逻辑，避免两套分页状态打架错乱
- request回调必须交出请求Promise并保证结束，否则无loading
- 迁移后全局巡检：有tab切换的列表页验证“切tab→回第1页→数据与空态都刷新”

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话15b35540诉求1要求全站改z-paging移除useLoadMore；诉求2-5连续报切换失效、诉求6报无loading；结论约15页面无#empty但默认空态不白屏
- 涉及文件：src/hooks/useLoadMore.js、src/components/ListLoading/ListLoading.vue、src/pages/index/components/Project_Suzhufang.vue、src/pages/collect/index.vue、src/pages/news/index.vue、src/pages/publicNotice/publicNotice.vue
- 所属项目：苏住房C；来源会话ID：15b35540-03c7-44b7-9ef5-69b1b346d1bb；代码基线：83c4136

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zpaging_tab_switch_fail",
  "source_extraction_id": "5eb3785fb5d541bfa8151d0735437bd1",
  "version": 1,
  "memory_type": "entities"
}
-->