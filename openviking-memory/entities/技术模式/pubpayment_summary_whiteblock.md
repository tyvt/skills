# 支付中的白色块遮挡与缺少居中汇总
zhi2-web-admin 项目中 pubPaymentNotice 和 pubManualBookkeeping 的 UI 异常技术模式卡片。

## 问题根因
- pubPaymentNotice/index.vue 未定义 showSummary:true，隐藏了小计。
- detail.vue 字段未居中且 DetailTemplate 缺少 labelAlign。
- pubManualBookkeeping/index.vue 关键词搜索缺少 attrs.placeholder 导致颜色异常。
- 固定列生成白色块 el-table__fixed-right-patch。

## 解决方案
- 启用 showSummary 并定义 align/labelAlign 居中，添加 labelAlign 支持。
- 补全 attrs.placeholder；index.scss 隐藏白色块。

## 文件与验证
- 涉及文件: pubPaymentNotice/index.vue, pubManualBookkeeping/index.vue, pubPaymentNotice/detail.vue, pubManualBookkeeping/detail.vue, bookDetailTable.vue, mixins/table.js, pubParkingRate/index.vue, detail-template.vue.
- 源会话: 5ec6511f-7bd3-4005-a984-83b775525513; 基线: none.

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：5ec6511f-7bd3-4005-a984-83b775525513


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pubpayment_summary_whiteblock",
  "source_extraction_id": "fbb3c51bf7d04a09abe11b116bf5d283",
  "version": 1,
  "memory_type": "entities"
}
-->
