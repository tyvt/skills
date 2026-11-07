# 同路由缓存搜索条件致决策范围数据为空
太仓G端 listMixins 按路由路径缓存搜索条件，表决项筛选污染决策范围请求致空。

## 问题根因
- `listMixins` 按同一路由路径缓存搜索条件
- 「表决项」的 `bizState:1` 污染「决策范围」请求致空数据

## 修复约定
- mixins 支持 `searchParamsKey` 参数
- 子表格设 `${route.path}#decisionRange` 与 `#votingItems` 独立缓存

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 e0903bbe 用户报决策范围数据为空
- 涉及文件：optionDecision/detail.vue、optionDecision/components/DecisionRangeTable.vue、VotingItemsTable.vue、mixins/listMixins.js、api/estate/decisionRange.js、ownerDecision/components/DecisionRangeTable.vue、api/estate/option.js、decisionCommon/components/VotingItemsTable.vue
- 所属项目：太仓G；来源会话：e0903bbe-197e-4316-9a21-245f9310dae3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listmixins_cache_key",
  "source_extraction_id": "e9a04a7ca7ea43b78112ca9bdb68496f",
  "version": 1,
  "memory_type": "entities"
}
-->