# 三列表页移除默认「已备案」筛选（苏住房G）
苏住房G 物业管理区域列表、前期物业合同列表、物业合同列表已移除业务状态默认「已备案」筛选。

## 改动说明
- 物业管理区域列表 `complex/index.vue`：`queryParams.bizState` 默认值由 `'2'` 改为 `undefined`
- 前期物业合同/物业合同列表 `propertyContract/components/index.vue`：`buildQueryParams` 中 `bizState` 默认值改为 `undefined`（两列表页共用此组件）
- 删除「默认仅展示已备案」黄色提示区块及对应样式

## 效果与注意
- 进入三页面时「业务状态」默认空，展示全部状态数据；手动筛选与「重置」仍正常
- 旧访客本地 Vuex 可能缓存 `bizState: '2'`，点「重置」或清缓存后验证

## 验证与归属
- 所属项目：苏住房G；来源会话：4889ef28-f63e-4638-9ed3-a412876c1062
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_bizstate_remove",
  "source_extraction_id": "860342b9e35444b492cc9a51f5ff3149",
  "version": 1,
  "memory_type": "entities"
}
-->