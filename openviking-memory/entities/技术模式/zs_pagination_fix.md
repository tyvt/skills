# 弹窗分页组件全局注册修复
苏州市房地产监测V3 中 5 个弹窗的 `<pagination>` 已改为全局注册的 `<zs-pagination>`，消除 Vue 警告。

## 修改文件
- contractDialog.vue、projectDialog.vue、contractNoDialog.vue、chooseHouseDialog.vue、saleAgencyDialog.vue 均替换标签
- props（:total、:page.sync、:limit.sync）和事件 @pagination 未改动

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：上述 5 个 dialog.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：cf3b0379-9286-40e8-bc28-5a333098c2a0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_pagination_fix",
  "source_extraction_id": "b4f9b8ee9a074a1f9493bbc90de9a86f",
  "version": 1,
  "memory_type": "entities"
}
-->