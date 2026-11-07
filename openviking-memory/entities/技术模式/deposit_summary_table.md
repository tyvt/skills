# 单位代缴主子表复用个人缴存清册汇总逻辑
园区物管2.0 中个人缴存与单位代缴共用 ScopeSelectDialog 并复用清册汇总逻辑。

## 解决方案
- 个人缴存与单位代缴共用 `company/components/ScopeSelectDialog.vue`，弹窗 Tab 列表视图默认前置
- `BuildingTable.vue` 按最大户室数动态计算列宽
- 主表 `PaymentRangeTable` 与子表 `PaymentDetailTable` 增加 `bottom-summary-variant="table"` 及小计行汇总

## 涉及文件
- depositNotice/company/components/ScopeSelectDialog.vue 等多处 ScopeSelectDialog.vue
- depositNotice/company/components/BuildingTable.vue 等多处 BuildingTable.vue
- depositNotice/company/components/PaymentRangeTable.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：7ab3d503-eead-4cf4-9a49-d05a7c4d6a39

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_summary_table",
  "source_extraction_id": "fbfd30739822481d9cd63130bdfc329b",
  "version": 1,
  "memory_type": "entities"
}
-->