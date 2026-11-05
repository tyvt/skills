# 收入合同列表与详情修复
产品2.0 的 zhi2-web-admin 中按图片标注修复收入合同管理列表与详情两处问题。

## 列表说明文字竖线
- 文件：pubRevenueContract/index.vue
- 移除说明文字容器的 border-left 和 border-right，仅保留文字样式与内边距

## 详情手工输入无反应
- 文件：pubRevenueContract/detail.vue
- 根因：`showManualInput` 未在 data 中声明，Vue2 直接赋值不触发视图更新；已补充 `showManualInput: false`
- 根因：点击「手工输入」先触发输入框 @focus 打开单位选择弹窗，掩盖切换；已在 append 区域加 `@mousedown.prevent` 阻止抢焦点

## 验证与归属
- 涉及文件：pubRevenueContract/index.vue、pubRevenueContract/detail.vue、benefit/pubChangeleadershipAudit/detail.vue
- 所属项目：产品2.0；来源会话：7e50b554-a8ad-43a6-b845-69894b24519f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pubrevenuecontract_fix",
  "source_extraction_id": "6bef3604790f499d8c2e13c541cc8a34",
  "version": 1,
  "memory_type": "entities"
}
-->