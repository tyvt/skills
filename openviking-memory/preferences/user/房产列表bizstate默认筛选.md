- zhi2-web-admin/src/views/property/complex/index.vue: queryParams.bizState 从 '2' 改为 undefined（显示全部）。
- zhi2-web-admin/src/views/property/propertyContract/components/index.vue: buildQueryParams 中 bizState 默认为 undefined，并移除了黄色警告块和样式。
- 本地 Vuex 缓存带有旧值 '2'，需要点击 reset 或清除缓存以验证。
- 验证证据: src=苏住房G/066.md; 涉及文件: complex/index.vue, propertyContract/components/index.vue, propertyContract/index.vue, propertyContractTemporary/index.vue, listMixins.js, table.js, enums.js

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 房地产列表默认 bizState 筛选器",
  "source_extraction_id": "9afaba5dc1ac4c14af44db9460e5cd8b",
  "version": 1,
  "memory_type": "preferences"
}
-->
