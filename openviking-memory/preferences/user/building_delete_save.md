- 现售（cashsale）已保存单据（含 cashsaleRecordId）删除楼幢后须调用 POST /presale/cashsale/save 并 getDetail() 刷新，草稿仅更新本地 selectedBuildings 与 form.houses。
- PresaleBuildingTable.vue 的 onRemoveBuilding/onBatchRemoveBuildings 回调删除成功后提示，批量删除仅触发一次 save 避免多次保存。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "building_delete_save",
  "source_extraction_id": "bcf0b003094a4a44a50061529cd3e1a2",
  "version": 1,
  "memory_type": "preferences"
}
-->