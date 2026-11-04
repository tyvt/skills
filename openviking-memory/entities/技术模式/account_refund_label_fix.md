# 退款弹窗窄列标签竖排修复
AccountRefundTable.vue 弹窗左侧窄列使用默认左右标签布局，label-width:auto 宽度不足致中文逐字换行，已改为左右分栏并调整标签样式。

## 问题根因
- AccountRefundTable.vue 弹窗左侧窄列使用默认左右标签布局，label-width:auto 宽度不足导致中文逐字换行

## 解决方案
- 左右分栏（7/17 列），标签 label-position="top" 且 white-space:nowrap
- 日期选择器 width:100% 并加分隔线

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/views/maintenance/accRefund/components/AccountRefundTable.vue
- d:/repository/产品2.0/zhi2-web-admin/src/components/zs-form/zs-form.vue
- d:/repository/产品2.0/zhi2-web-admin/src/styles/element-ui.scss

## 验证与归属
- 验证证据：extracted source=cursor session=eb221aa1-2087-4199-bdaa-bad2bfefb096
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_refund_label_fix",
  "source_extraction_id": "4ca9c539b6bc40068271fdd96394dd47",
  "version": 1,
  "memory_type": "entities"
}
-->