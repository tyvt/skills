# Area 列与 amountFormatter 审查核对
苏州市房地产监测V3 项目中，typescript-reviewer 对 amountFormatter 及 Area 列表列的结论与当前代码一致，无需额外改动。

## 核对结论
- src/views 中带 Area 的表格 prop 均能被 isMeasureColumnProp 识别
- 「行政区划」文案替换与 tableColumnMeasure 排除规则一致
- 审查提及的裸 Area$ 误伤、align 被覆盖等问题已在现有改动里处理

## 后续说明
- 未列入白名单的新 *Area 列、全量 lint 模板缩进等属后续新增列或 CI 时再看
- 无需额外跟进，可协助写 commit

## 涉及文件与归属
- 涉及文件：zhi2-web-admin、路由信息.json、zhi2-web-admin/src/views/company/companyRegister/index.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：211494e9-a81b-4b9a-af2c-3ec7d67b86e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_formatter_review",
  "source_extraction_id": "bbd4581dcffa4b8cbd0e54040f471573",
  "version": 1,
  "memory_type": "entities"
}
-->