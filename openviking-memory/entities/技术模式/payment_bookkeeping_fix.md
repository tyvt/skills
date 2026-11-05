# 资金缴款与人工记账页面样式修复
产品2.0 项目按图片标注修复资金缴款与人工记账模块共 4 处样式与显示问题。

## 修改文件
- pubPaymentNotice/index.vue：资金缴款列表开启 showSummary 展示小计合计
- pubPaymentNotice/detail.vue：资金缴款详情字段居中对齐
- pubManualBookkeeping/index.vue：人工记账列表关键字 placeholder 颜色修复
- index.scss：去除人工记账详情表格固定列多余白块

## 主要改动
- 资金缴款列表开启 showSummary: true，利用已有 showMethod 合计逻辑汇总「通知书金额」「已缴款金额」
- 资金缴款详情将「通知书金额」「通知书有效日期」设 align/labelAlign 为 center，DetailTemplate 补充 labelAlign 支持
- 人工记账列表关键字搜索项补充 attrs.placeholder: '请输入关键字' 显示正常灰色
- 人工记账详情去除缴款信息表格底部「合计」行右侧固定操作列多出的 el-table__fixed-right-patch 白块

## 验证与归属
- 所属项目：产品2.0
- 来源会话：5ec6511f-7bd3-4005-a984-83b775525513
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "payment_bookkeeping_fix",
  "source_extraction_id": "4a4687e501644f5c9730ebec13b67ef5",
  "version": 1,
  "memory_type": "entities"
}
-->