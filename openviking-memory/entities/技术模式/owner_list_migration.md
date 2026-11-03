# 市民端列表页批量迁移usePaging+z-paging套路
苏住房C的pages_owner下26个列表页混用两套分页实现，需统一为usePaging+z-paging固定套路。

## 背景
- pages_owner下26个列表页混用老useLoadMore+uni-load-more与新usePaging+z-paging
- 老实现页面自维护page/pageSize/loading并用arguments透传，存在reload()未定义、空态各写一套

## 迁移规则
- useLoadMore→usePaging，返回{list,pagingRef,queryList,refresh,reset,auto}
- 取数函数签名改getList(pageParams)，从入参取值而非arguments
- 列表区包`<z-paging v-model="list" @query="queryList">`，空态类paging-empty放uni.scss
- 删除所有uni-load-more；ZsEmpty换z-paging的#empty插槽（ZsImage+paging-empty-text，路径文案原样保留）
- 散落reload()修正为refresh()（tenant、income等）；building/info两useLoadMore合并为单z-paging按Tab切query

## 验证与归属
- 会话7024cb11用户给出完整迁移规则，最终列出26个迁移文件并顺带修复reload()→refresh()
- 涉及文件：src/hooks/usePaging.js、pages_owner/building/info/index.vue、company/service/index.vue、tenant/index.vue、authentication/family/index.vue、uni.scss
- 所属项目：苏住房C；来源会话ID：7024cb11-2918-467a-b059-55fd7409fdbc；代码基线：83c4136

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "owner_list_migration",
  "source_extraction_id": "789f39094ad64ddc97500806c533c5b4",
  "version": 1,
  "memory_type": "entities"
}
-->