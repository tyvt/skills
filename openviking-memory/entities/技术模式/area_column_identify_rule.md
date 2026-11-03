
# Area表格列识别与排除规则
核对 `src/views` 带 `Area` 的表格 `prop` 均能被 `isMeasureColumnProp` 识别，行政区划替换与排除规则一致。

## 核对结论
- `src/views` 带 `Area` 的表格 `prop` 均能被 `isMeasureColumnProp` 识别
- 「行政区划」文案替换与 `tableColumnMeasure` 排除规则一致

## 已处理问题
- 裸 `Area$` 误伤问题已在改动中处理
- `align` 覆盖问题已在改动中处理

## 验证与归属
- 无需额外跟进新 `*Area` 列与全量 lint 缩进
- 验证证据：src=苏州市房地产监测V3/116.md
- 涉及文件：路由信息.json、companyRegister/index.vue、ListTemplate.js、zs-table-column.vue、tableColumnMeasure.js、formatters/index.js、package.json
- 所属项目：苏州市房地产监测V3；来源会话：211494e9-a81b-4b9a-af2c-3ec7d67b86e9；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "area_column_identify_rule",
  "source_extraction_id": "c0492b99adb24ccda6149da33f2e4546",
  "version": 1,
  "memory_type": "entities"
}
-->