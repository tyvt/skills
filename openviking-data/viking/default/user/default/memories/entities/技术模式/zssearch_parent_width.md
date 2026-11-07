# 父级无宽度时百分比宽度无法展开搜索框
在项目 苏住房C (zhi2-mobile-shimin) 中，当父级没有显式宽度时，`ZsSearch` 不会展开。

## 问题根因
- `ZsSearch` 的父级（底层的 `uni-search-bar`）没有显式宽度
- 仅 `.uni-searchbar` 中的 `width: 100%` 不会展开搜索框

## 修复
- 使用 `w-660` (660rpx) 包裹搜索框
- 将 `.page-top` 修改为居中布局，对齐 `goodProject/index`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：1fdb1e84-2130-4a0e-9e11-7525a8813edf
- 所属项目: 苏住房C (zhi2-mobile-shimin)
- 源会话: 1fdb1e84-2130-4a0e-9e11-7525a8813edf
- 涉及文件: src/pages_transaction/houseVideo/index.vue, src/components/ZsSearch/ZsSearch.vue, src/pages_transaction/goodProject/index.vue, src/pages_transaction/newHouse/index.vue, src/pages_owner/community/announcement/index.vue, src/pages_transaction/intention/search.vue, src/pages_transaction/components/ZsPaging/ZsPaging.vue, src/pages_transaction/newHouse/indexMore.vue
- 代码基线: 无

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zssearch_parent_width",
  "source_extraction_id": "b438ec69459f48eabe3a9c05d4b7bd23",
  "version": 1,
  "memory_type": "entities"
}
-->