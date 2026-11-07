# 最新楼盘页接口加载修复
苏住房C新房列表「最新楼盘」页修复加载时序与跳转URL错误，确保listRecommendProject请求正确发出。

## 问题根因
- `indexMore`在`onLoad`读取`type`前自动请求，导致`halfYearAgo`用默认值`0`（在售楼盘参数）
- 从新房首页点「最新楼盘」时URL拼成`indexMore?type=1?type=2`，参数混乱

## 修复方案
- `indexMore`改`auto: false`，在`onLoad`设置`type`后再`refresh()`
- 跳转直接使用`row.url`替代错误拼接
- 编译预览后Network应见`listRecommendProject`请求且参数`halfYearAgo: 1`

## 补充验证
- 测试环境`halfYearAgo: 1`返回0条（`halfYearAgo: 0`有132条）
- 若请求已发但列表空，可能是近半年无数据，需后端确认筛选条件

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_transaction/newHouse/index.vue、src/api、src/hooks/usePaging.js、src/api/transaction.js
- 来源会话ID：65dd03cf-f8dc-4995-a394-050462f88b56

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_list_fix",
  "source_extraction_id": "2a80a42a743244f69072321e42dbe8b8",
  "version": 1,
  "memory_type": "entities"
}
-->