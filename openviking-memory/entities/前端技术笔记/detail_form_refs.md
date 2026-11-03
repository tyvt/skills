# 详情页仅 DetailTemplate 无编辑表单致保存无反应
产品2.0 的 zhi2-web-admin 详情页，只渲染只读 DetailTemplate 而无 zs-form 时，编辑/保存会因 $refs.form 不存在被静默拦截。

## 问题现象
- 详情页点击「编辑」后页面无任何可编辑字段，点「保存」无反应、无报错
- 保存链路 submitForm → validateForm 依赖 ref="form" 表单实例，$refs.form 为 undefined 时校验直接失败并被静默拦截

## 根因
- 该详情页只渲染了只读 DetailTemplate，没有 zs-form；formMode 变 edit 但无对应编辑分支
- 缺 $refs.form 的校验静默失败，表现为「点保存没反应」

## 修复做法
- 复用 DetailTemplate 的详情页若业务要求可编辑，必须补 formMode 分支：查看态走 DetailTemplate，编辑态渲染 zs-form（只放开允许编辑字段，其余只读）
- 补校验规则；缺 $refs.form 的静默失败可从「保存无反应且无报错」直接联想
- 排查口诀：编辑页「无字段可改」先查模板有没有 zs-form 分支，「保存无反应」先查 $refs.form 是否存在

## 验证与归属
- guaranteeDeposit/components/detail.vue 无编辑分支与 form ref，validateForm 因 $refs.form undefined 静默失败；参照 guaranteeDepositAccount/detail.vue 补 zs-form 后修复
- 涉及文件：src/views/maintenance/guaranteeDeposit/components/detail.vue、src/views/maintenance/guaranteeDeposit/deposit/detail.vue、src/mixins/detailMixins.js；来源会话 b0ca50b6-00f0-4d36-8845-29a8aaad4b5c；代码基线 b0ca50b6~f59c6be

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "detail_form_refs",
  "source_extraction_id": "dce3834ae6534892beb7c0f65614063a",
  "version": 1,
  "memory_type": "entities"
}
-->