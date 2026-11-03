# 银行回单表格列序乱因列宽未固定
园区公共收益项目(zhi2-web-admin)中，zs-table-column 未设固定宽度时动态计算 min-width 导致 Element Table 列序打乱，需写死顺序与固定宽度重建。

## 问题根因
- zs-table-column 未设固定 width 时，Element Table 动态计算 min-width 导致列顺序被打乱
- 原列定义未固定 key，切换或重渲染时布局错乱

## 解决方案
- 改用 v-for + bankReceiptColumns 写死列顺序
- 每列固定 width，关闭合计行
- 加固定 key 触发表格重建

## 涉及文件
- src/views/benefit/pubBankDetailDay/index.vue、src/views/benefit/pubVerificationReceipts/index.vue、detail.vue
- src/mixins/detailMixins.js、form.js
- src/components/OperationBtnGroup/index.vue
- src/api/benefit/pubBankReceiptDetail.js
- src/components/zs-table/zs-table.vue

## 验证与归属
- 所属项目：园区公共收益；来源会话：94e9fe38-5ccd-4e61-8fa5-8929f8b1a0cb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_receipt_col_width",
  "source_extraction_id": "cfd7b23fcef747ecbde4acd045c019b6",
  "version": 1,
  "memory_type": "entities"
}
-->