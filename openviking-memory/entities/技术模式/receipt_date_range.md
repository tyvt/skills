# 回单详情起止日期需拼接endDate
`pubBankReceiptApply/detail.vue`查看模式「起止日期」仅绑定`startDate`未拼`endDate`显示不全，须参考`bankReceiptApply/detail.vue`格式化为完整区间。

## 问题现象
- `pubBankReceiptApply/detail.vue`查看模式「起止日期」仅绑定`startDate`，未拼接`endDate`导致显示不全

## 修复方案
- 参考`bankReceiptApply/detail.vue`格式化为`${startDate} - ${endDate}`展示完整区间
- detail-template/detail-template.vue 按需同步调整

## 验证与归属
- 验证证据：extracted source=cursor
- 涉及文件：zhi2-web-admin/src/views/benefit/pubBankReceiptApply/detail.vue、zhi2-web-admin/src/views/property/bankReceiptApply/detail.vue、zhi2-web-admin/src/components/detail-template/detail-template.vue
- 所属项目：宜兴公共收益；代码基线：none；来源会话：382beff3-de1c-4063-8df3-46adf5d55d85

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "receipt_date_range",
  "source_extraction_id": "4c41132cc4414e02ab9756bee071929d",
  "version": 1,
  "memory_type": "entities"
}
-->