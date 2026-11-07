# 回单详情起止日期补全结束时间
宜兴公共收益项目在 `pubBankReceiptApply/detail.vue` 中参考物业模块写法，将起止日期格式化为「开始日期 - 结束日期」以补全结束时间。

## 问题背景
- 查看模式下「起止日期」只绑定 `this.form.startDate`，未拼接后端返回的 `endDate`，仅显示开始日期

## 解决方案
- 参考物业模块 `bankReceiptApply/detail.vue`，将起止日期格式化为 `开始日期 - 结束日期`
- 实现：`const dateRangeText = this.form.startDate && this.form.endDate ? `${this.form.startDate} - ${this.form.endDate}` : this.form.startDate || this.form.endDate || ''`

## 涉及文件
- zhi2-web-admin/src/views/benefit/pubBankReceiptApply/detail.vue
- zhi2-web-admin/src/views/property/bankReceiptApply/detail.vue
- zhi2-web-admin/src/components/detail-template/detail-template.vue

## 验证与归属
- 验证证据：extracted source=cursor
- 所属项目：宜兴公共收益；代码基线：none；来源会话：382beff3-de1c-4063-8df3-46adf5d55d85

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pubreceipt_daterange_fix",
  "source_extraction_id": "033c4384d3a244c9b904b7072ccc1be0",
  "version": 1,
  "memory_type": "entities"
}
-->