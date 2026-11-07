# Area列的统一识别
带有 "Area" 的表格 Props 必须通过 `isMeasureColumnProp` 来标识，以避免意外损坏和对齐覆盖。

## 规则
- 在 `src/views` 中包含 Area 的表格 Props 必须通过 `isMeasureColumnProp` 标识
- 行政区划文本的替换必须对应于 `tableColumnMeasure` 的排除规则

## 原因
- 避免裸正则表达式 `Area$` 破坏列并覆盖 `align`

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/089.md
- 涉及文件: 路由信息.json, company/companyRegister/index.vue, mixins/ListTemplate.js, zs-table-column.vue, utils/tableColumnMeasure.js, formatters/index.js, package.json
- 会话: 211494e9-a81b-4b9a-af2c-3ec7d67b86e9; 代码库: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：211494e9-a81b-4b9a-af2c-3ec7d67b86e9


<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "area_column_recognition",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 1,
  "memory_type": "entities"
}
-->
