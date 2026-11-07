- 当提交 `/benefit/pubHouse` 时，缺少 `regionCode`，且 `subdistrict`/`community` 被转换成了名称；后端需要代码。
- 在 `index.vue` 和 `detail.vue` 中添加了 `regionCode`；选择物业管理区域时直接赋予代码。
- 在 B 端（B-end），默认使用 `project.region` 填充 `regionCode`。
- 文件：benefit/pubHouse/index.vue, benefit/pubHouse/components/pubHouseDialog.vue, benefit/pubHouse/detail.vue, benefit/pubVenue/detail.vue, benefit/pubParkingSpace/detail.vue
- 源会话：b86fe772-d48c-4f14-83ed-0fae40ff6861 (extracted source=cursor)

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Preenchimento de regionCode em pubHouse",
  "source_extraction_id": "e2f9b184d03c46b897d5805a40ca2bc8",
  "version": 1,
  "memory_type": "preferences"
}
-->