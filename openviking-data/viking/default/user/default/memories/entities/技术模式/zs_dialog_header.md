# zs-select-dialog弹窗标题对齐
维保模块初交明细选择弹窗与company侧PaymentRangeTable对齐，统一使用header而非title属性。

## 问题描述
- 园区物管维保「初交明细选择」类弹窗若写title="初交明细选择"而参考页使用header，会导致标题栏展示/样式不一致。

## 解决方案
- 与depositNotice/company/components/PaymentRangeTable.vue对齐时，两个zs-select-dialog（项目维度、楼栋维度）统一用header="初交明细选择"。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/src/views/maintenance/depositNotice/components/PaymentRangeTable.vue、zhi2-web-admin/src/views/maintenance/depositNotice/company/components/PaymentRangeTable.vue
- 所属项目：园区物管2.0（项目2-0）
- 来源会话：64df7727-22c7-4f7d-ab8e-726440dc4ed9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_header",
  "source_extraction_id": "b6e7b8a9944344a097a575400ce2397e",
  "version": 1,
  "memory_type": "entities"
}
-->