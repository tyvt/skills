# uni-datetime-picker 导致日期下方出现空白
在 B-end 物业管理移动端应用中，uni-datetime-picker 曾在 record/add.vue 的日期选择器下方导致空白；通过扩展 ZsDatePicker 并移除修正样式修复。

## 问题根因
- 在 src/pages_facility/record/add.vue 中的 uni-datetime-picker 导致巡检日期选择器下方出现空白

## 解决方案
- 扩展 ZsDatePicker 以支持 type="date"，替换原组件
- 移除了 onDateChange 和修正样式 :deep(.uni-calendar__content-mobile)

## 验证与归属
- 验证证据: extracted source=cursor session=348a159a-0e6d-49a3-a318-5c1a3d19e32b
- 涉及文件: src/pages_facility/record/add.vue, src/pages_facility/record/addScrap.vue, src/components/ZsDatePicker/ZsDatePicker.vue, src/pages_facility/components/FilterPopup.vue, src/components/ZsPicker/ZsPicker.vue, src/pages_facility/record/index.vue, src/styles/filter.scss
- 源会话: 348a159a-0e6d-49a3-a318-5c1a3d19e32b; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "datetime_picker_gap",
  "source_extraction_id": "926ca69557244270b1d93c4505f97348",
  "version": 1,
  "memory_type": "entities"
}
-->