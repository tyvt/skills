# missing_subaccount_options
全局 dictFormatter 按列查找 {prop}Options；缺失的详情页导致列空白。

## 问题根因
- depositNotice/components/detail.vue 和 company/components/detail.vue 仅加载了 yesOrNoOptions，缺少 hasSubAccountOptions
- 全局 dictFormatter 根据列的 prop 查找 {prop}Options；缺失会使列空白

## 解决方案
- 在 data 中添加 hasSubAccountOptions 并通过 initDict 赋值为 sys_yes_no

## 涉及的文件
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/depositNotice/components/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/depositNotice/company/components/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/settlementAccount/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/main.js
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/components/DepositTypeDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/settlementAccount/index.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/mixins/detailMixins.js

## 验证
- 验证证据: src=园区公共收益/020.md
- 源会话: 7e4c18c0-5ce0-41ce-b4dd-d28988df5d00; 代码库: none
- 所属项目: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "missing_subaccount_options",
  "source_extraction_id": "ccbd39c039a14bdfb4f33ad7c92e7d5f",
  "version": 1,
  "memory_type": "entities"
}
-->