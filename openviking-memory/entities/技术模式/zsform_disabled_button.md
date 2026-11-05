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
- 补充验证：2026-11-05 完成提交并 cherry-pick 到 develop/v2.6.2（子模块提交 1b3c7f6c5），原分支 develop/v2.6.2-suzhufang 提交 1df2da437，两分支各领先远程 1 提交（来源会话 765750a0-13d8-4789-8d78-9bb82bdf1e1f，项目 苏住房G）
- 涉及文件补充：benefit/pubBankReceiptApply/components/detailTable.vue 同次提交关联

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsform_disabled_button",
  "source_extraction_id": "0fa9adadc9e847248fa4eb9235709be9",
  "version": 2,
  "memory_type": "entities"
}
-->