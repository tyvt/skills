# 巡检记录筛选日期弹窗悬浮显示异常修复
物业手持B端工作台巡检/维保/年检/报废记录筛选的日期类条件因原生 picker 与顶部筛选弹层嵌套冲突导致悬浮显示异常。

## 问题根因
- `src/components/ZsDatePicker/ZsDatePicker.vue` 使用原生 `<picker mode="date">`，与顶部筛选弹层 `ZsDialog` 嵌套冲突

## 解决方案
- `ZsDatePicker.vue` 移除原生 picker，改为点击开始/结束日期触发底部 `uni-popup` + `picker-view` 三列（年/月/日）
- 保持 API：`v-model:start`、`v-model:end`、`type="range"`、placeholder，输出格式 `YYYY-MM-DD`
- 范围约束开始≤结束，年/月/日列随边界动态联动（含闰年、2月）
- 清理 `src/pages_facility/record/index.vue` 中无用 `uni-datetime-picker` / `uni-calendar` 深度样式

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 影响范围：巡检/维保/年检/报废记录共用 `record/index.vue`
- 涉及文件：src/components/ZsDatePicker/ZsDatePicker.vue、src/pages_facility/record/index.vue、src/components/ZsPicker/ZsPicker.vue、src/components/ZsDialog/ZsDialog.vue
- 来源会话ID：05daaa96-3842-4bb4-9e0a-d1a9a0fc93a1
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsdatepicker_range_refactor",
  "source_extraction_id": "c99b5f6c19b841578a10f18af3a609aa",
  "version": 1,
  "memory_type": "entities"
}
-->