# 选项表决详情决策范围数据不显示修复
太仓G 选项表决详情页「决策范围」子表格因 listMixins 缓存 key 冲突导致请求多带 `bizState=1` 而返回空数据，已修复。

## 问题根因
- 「决策范围」与「表决项」子表格都用 listMixins，搜索条件按同一路由路径缓存
- 打开「表决项」时 queryParams 带 `bizState: 1` 写入缓存
- 切换 tab 重建「决策范围」时从缓存恢复参数，请求多带 `bizState=1`，接口返回空数据

## 修复方案
- 在 listMixins 中支持可自定义的 `searchParamsKey`（默认仍为路由路径）
- 为「决策范围」设 `${route.path}#decisionRange`、「表决项」设 `${route.path}#votingItems` 独立缓存 key

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：`src/mixins/listMixins.js`、`optionDecision/components/DecisionRangeTable.vue`、`optionDecision/components/VotingItemsTable.vue`、`decisionCommon/components/DecisionRangeTable.vue`
- 所属项目：太仓G；来源会话：e0903bbe-197e-4316-9a21-245f9310dae3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_detail_range_fix",
  "source_extraction_id": "ba1b615a3ae2479ebe88a812de01811c",
  "version": 1,
  "memory_type": "entities"
}
-->