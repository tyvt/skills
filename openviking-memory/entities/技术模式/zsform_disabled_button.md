# zs-form禁用致回单明细按钮置灰
详情页 view 模式禁用整个 zs-form，原在表单内的「获取回单明细」按钮随之置灰不可点。

## 问题根因
- view 模式 isFormDisabled 为 true 禁用整个 zs-form
- 表单内的「获取回单明细」按钮随之被禁用置灰

## 解决方案
- 将按钮移至 Headline 的 right 插槽（不在 zs-form 内）以避开禁用
- hasQueryDetail != '1' 时可点击，获取明细后隐藏并显示列表

## 验证与归属
- 验证：extracted source=cursor session=8e746406-78d2-4b90-96da-b1cd40c82452
- 涉及文件：benefit/pubBankReceiptApply/detail.vue、property/bankReceiptApply/detail.vue、mixins/*、components/Headline/index.vue 等
- 来源会话：8e746406-78d2-4b90-96da-b1cd40c82452；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsform_disabled_button",
  "source_extraction_id": "ff6806156faa472abe330cb92a0e77f6",
  "version": 1,
  "memory_type": "entities"
}
-->