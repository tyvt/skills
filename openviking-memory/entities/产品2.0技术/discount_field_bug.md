# 账单优惠双模式共用输入框缺陷
账单优惠弹窗按金额与按比例共用同一输入字段，导致选金额无框、选比例填金额。

## 问题现象
- 优惠方式要求按金额输入减免金额（元，≤应收）或按比例输入 0-100 百分数
- 首版切换优惠方式只改 label 不改字段，用户连报两轮「输入交互还是不对」

## 根因分析
- 折扣行本质是一个类型枚举 + 一个数值 + 派生金额，混用字段致旧值被误解释
- 只有存原始输入值 + 显式 discountType，派生金额才能正反算

## 解决方案
- 表单放 discountType（金额/比例）+ 原始输入值两字段
- 控件随类型切换 placeholder、后缀（元/%）与上下限（金额≤应收、比例≤100）
- 优惠额用 computed 派生不回写输入框；提交按百分数口径回传
- 优惠总额变化时应收做成可重算展示值（应收=原始应收−优惠总额），不依赖接口刷新

## 验证与归属
- 来源会话 d093c203 用户指出选择金额无输入框、选择比例输入优惠金额，要求应收实时更新
- 涉及文件：zhi2-web-admin/src/views/property/spFeeBill/components/discountDialog.vue、discountTable.vue、enums.js、detail.vue
- 所属项目：产品2.0；代码基线：a5e7e78

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "discount_field_bug",
  "source_extraction_id": "023be684d29240b38dd4e584c076013b",
  "version": 1,
  "memory_type": "entities"
}
-->