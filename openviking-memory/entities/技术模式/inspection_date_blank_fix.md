# 巡检记录日期选择下方留白
物业手持B端巡检记录添加页巡检日期选择下方留白的问题及修复方案。

## 问题根因
- 巡检/维保/年检第二步使用 `uni-datetime-picker`，下方存在留白

## 解决方案
- 扩展 `ZsDatePicker` 单日期模式：新增 `type="date"`，支持 `v-model` / `placeholder`，单行文本触发器，点击弹出底部年月日三列滚轮，popup 与 range 模式共用，单日期使用全量年份范围（当前年 ±20/1）
- `src/pages_facility/record/add.vue` 巡检/维保/年检第二步的 `uni-datetime-picker` 改为 `ZsDatePicker type="date"`，删除 `onDateChange` 和 `:deep(.uni-calendar__content-mobile)` 补丁，添加表单样式与 `form-row-value` 对齐
- `src/pages_facility/record/addScrap.vue` 同步替换日期组件

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/components/ZsDatePicker/ZsDatePicker.vue、src/pages_facility/record/add.vue、src/pages_facility/record/addScrap.vue
- 来源会话ID：348a159a-0e6d-49a3-a318-5c1a3d19e32b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_date_blank_fix",
  "source_extraction_id": "859dfcfb9ffe4d1d902c1e904f6715fb",
  "version": 1,
  "memory_type": "entities"
}
-->