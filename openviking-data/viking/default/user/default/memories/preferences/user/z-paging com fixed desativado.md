- 在 `pages_transaction/intention/my.vue` 中，`z-paging` 应使用 `:fixed="false"` 以避免覆盖搜索区域。
- 页面使用带 `100vh` 的垂直 flex 布局；搜索区域 `flex-1 min-w-0`，按钮 `flex-shrink-0`。
- 修复 `w-full` 与 flex 冲突导致的重叠问题。
- 文件：`pages_transaction/buyHouse/myBuy.vue`, `pages_transaction/intention/my.vue`, `pages.json` 等。
- 验证：会话 31d82de8-28b1-42cc-8741-623368194dca。

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：31d82de8-28b1-42cc-8741-623368194dca


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "z-paging com fixed desativado",
  "source_extraction_id": "081ef03380ad48028e0ca8b696a67f17",
  "version": 1,
  "memory_type": "preferences"
}
-->
