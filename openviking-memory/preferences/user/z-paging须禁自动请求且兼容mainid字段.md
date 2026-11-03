- `detail.vue` 中 `z-paging` 设 `:auto="false"`，在 `onLoad` 的 `nextTick` 后调用 `reload()`
- `queryList` 缺失 `mainId` 时调用 `complete([])` 避免无效请求
- `index.vue` 跳转取 `row.mainId || row.maintenanceId` 兼容接口字段差异
- 涉及文件：pages_benefit/elevatorPubEngCons/detail.vue、index.vue、pages_benefit/assetsPublicity/index.vue、pages_owner/payment/index.vue、api/benefit.js、pages_owner/repair/index.vue
- 验证：src=无锡市区小程序嵌入H5/014.md；来源会话 18d36ae9-021f-4f26-8bea-d76327f2b6e8

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "z-paging须禁自动请求且兼容mainId字段",
  "source_extraction_id": "b743329be02845368645a88e947afc1c",
  "version": 1,
  "memory_type": "preferences"
}
-->