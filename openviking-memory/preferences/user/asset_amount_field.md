- 通知书金额仅取 `documentAmount`，移除 `noticeAmount`、`contractAmount` 兜底
- 保存后即时拉取列表并用 `listRequestSeq` 忽略过期请求防覆盖，接口 `/benefit/pubReceiptVerificationDetail/page` 须返回该字段
- 涉及文件：assetPanorama/index.vue、monitor/point/user/index.vue、property/largeScreen/index.vue、benefit/mapOverview 相关文件
- 验证证据：extracted source=cursor session=1a60b0f0-bc81-4061-9c63-39df1489f756

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "asset_amount_field",
  "source_extraction_id": "dbe48acde65445a887f08359a50f0418",
  "version": 1,
  "memory_type": "preferences"
}
-->