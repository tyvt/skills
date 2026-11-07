# 表决明细建筑面积列固定列宽居中
业主自治各模块 DecisionRangeTable 中「建筑面积(㎡)」列过宽且被 amountFormatter 默认右对齐，需固定列宽并显式居中覆盖。

## 问题根因
- 建筑面积列被弹性列宽拉得过宽。
- amountFormatter 使金额/面积列默认右对齐，仅改 align 无效。

## 解决方案
- 对该列设固定 width（如 130，表头挤可改 140），并同时设 align 与 headerAlign: 'center'。
- 一般/议题/多选/维修表决及业委会选举等多份 DecisionRangeTable/DecisionDetailTable 需同步改。
- 「选择户室」子弹窗内 buildArea 列保持右对齐不动。

## 验证与归属
- 验证：建筑面积(㎡)列统一固定宽度 130px、表头与单元格居中；width:130 列不再参与弹性拉伸；align/headerAlign:'center' 覆盖 amountFormatter 默认右对齐。
- 涉及文件：zhi2-web-admin/src/views/autonomy/general/components/DecisionRangeTable.vue 等多处 DecisionRangeTable.vue
- 所属项目：惠山二期G；来源会话：c7c8aad3-9140-4aaf-b908-9e7f763dc5a3；代码基线：b6d054d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_col_center",
  "source_extraction_id": "66a2e2029661484ebfefac8efb7a3328",
  "version": 1,
  "memory_type": "entities"
}
-->