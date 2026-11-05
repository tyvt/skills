# 设施页楼幢切换单元列表修复
泰兴小程序 facility.vue 中切换楼幢后单元列表（unitList）不刷新的问题已修复。

## 问题根因
- `changeBuilding` 里用 `currentBuilding.value`，但 ZsPicker 确认选择时先触发 `update:modelValue` 再触发 `change`。
- uni-app 中父组件 `v-model` 有时未同步完成，`change` 回调执行时 `currentBuilding` 可能仍为空字符串，于是走了 `unitList.value = []` 分支，`getUnits`（单元接口）未被调用。

## 修复内容
- 改为使用 `@change` 事件参数里的 `value`（当前选中楼幢 ID），不依赖 `v-model` 是否已更新。
- 选择楼幢后正常请求 `/property/unit/listByBuildingIdAndUnitName`。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages_facility/facility.vue、src/hooks/useAreaDict.js、src/components/ZsPicker/ZsPicker.vue、src/pages_owner/repair/chooseFacility.vue、src/pages_owner/house/verify.vue
- 来源会话ID：6a37a278-9845-42f7-b74d-370fb350d16a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "facility_changebuilding_fix",
  "source_extraction_id": "3d362587f08e485c87f954d90cef0281",
  "version": 1,
  "memory_type": "entities"
}
-->