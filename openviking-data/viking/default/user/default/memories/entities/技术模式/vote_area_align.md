# 淮安表决建筑面积列与惠山对齐
淮安物管表决范围/明细表「建筑面积(㎡)」列已与惠山 41b5c0e67 对齐同步。

## 变更内容
- zs-table-column.vue 金额列 amountFormatter 仅未传入 align/headerAlign 时默认右对齐；列显式写 center 生效。
- 六个表决表「建筑面积(㎡)」统一 width:130、align:'center'、headerAlign:'center'（repair 模板用 header-align="center"）。

## 涉及表格
- autonomy/option/components/DecisionRangeTable.vue
- autonomy/general/components/DecisionRangeTable.vue
- autonomy/multiply/components/DecisionRangeTable.vue
- autonomy/election/components/decision/DecisionRangeTable.vue
- autonomy/election/components/decision/DecisionDetailTable.vue
- autonomy/repair/components/DecisionRangeTable.vue

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管；来源会话：51317350-fbe8-4ba5-8ad7-1e8ca1e088d0；代码基线：none。
- 涉及文件：zs-table-column.vue 及上述六表。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_area_align",
  "source_extraction_id": "497161ffec374c01b7ea3b1bbc9a358c",
  "version": 1,
  "memory_type": "entities"
}
-->