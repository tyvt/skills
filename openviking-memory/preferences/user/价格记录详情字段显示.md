- 在价格记录详情界面（recordPriceMngSuzhou）中，倾向于对可编辑字段使用 `slot`，对不可编辑字段使用带有 `autoHeight: true` 的 `text`/`textarea`，以避免截断。
- 在 `detail-template.vue` 中，添加 `isAutoHeightItem()` 以支持 `item.autoHeight`，并避免 `slot` 内的 `textarea` 被截断。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 价格记录详情字段显示",
  "source_extraction_id": "79cf24bafc744c04973bd842fa4e560f",
  "version": 1,
  "memory_type": "preferences"
}
-->
