# z-paging 默认 fixed 覆盖搜索
`z-paging` 默认使用 `fixed=true`，全屏渲染并覆盖外部搜索导航。
## 上下文
- 影响文件如 `newHouse/index.vue`、`newHouse/indexMore.vue`、`newHouse/houseTypeList.vue`、`goodProject/index.vue`。
- 所属项目: zhi2-mobile-shimin.
## 解决方案
- 将搜索、导航和筛选移动到 `z-paging` 的 `#top` 插槽中，保持列表独立滚动。
## 验证
- cursor 会话 671da04e-7711-4f45-b4cb-a4bcab90d503 记录了修复。
- 涉及文件: gridNav.vue, conditionScreening.vue, ZsPaging.vue, etc.

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：671da04e-7711-4f45-b4cb-a4bcab90d503


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zpaging_fixed_obscures_search",
  "source_extraction_id": "081ef03380ad48028e0ca8b696a67f17",
  "version": 1,
  "memory_type": "entities"
}
-->
