# 预售面积字段改用 amount-input 组件
苏州市房地产监测V3 的 PermitInfoPanel.vue 将预售面积输入框改为 amount-input 组件并统一两位小数格式化。

## 改动内容
- 编辑态：zs-input 替换为 amount-input，disabled 只读，unit="㎡"，:dot="2" 两位小数，通过 v-money 自动格式化（如 1205.4499999999996 → 1,205.45）
- 查看态：presaleAreaText 使用 formatFixedDecimal 格式化，DetailTemplate 中同样显示两位小数
- 空值处理：编辑态 presaleAreaValue 返回 '' 显示空白；查看态 presaleAreaText 返回 '-'

## 涉及文件
- zhi2-web-admin/src/views/presale/permit/components/PermitInfoPanel.vue
- zhi2-web-admin/src/views/presale/permit/components/detail.vue
- zhi2-web-admin/src/views/presale/permit/permitConstants.js

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话ID：52e97276-20ef-4050-8053-34217a106e19；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_amount_input",
  "source_extraction_id": "81fd5c6810e94dd89c3a540e5bf7f87d",
  "version": 1,
  "memory_type": "entities"
}
-->