# 监管账户详情重构采用 zs-form 动态权限
account/detail.vue 顶部操作区由 operation-container 替换为 operation-btn-group 并移除 zs-attachment，外层表单容器改用 zs-form。

## 关键变更
- 顶部操作区由 operation-container 替换为 operation-btn-group 并移除 zs-attachment
- 外层表单容器改用 zs-form
- view 模式接入 DetailTemplate 配合 contentInfo 展示
- permsPrefix 依据 opensalesType 动态返回 finance:openAccount 或 finance:account 权限

## 验证与来源
- 验证证据：src=产品2.0/070.md
- 涉及文件：zhi2-web-admin/src/views/supervision/agreement/account/detail.vue、BankAccountTable.vue、detail-template.vue、allocation/detail.vue、detailMixins.js、deposit/refund/detail.vue、jgxm/detail.vue、deposit/additional/detail.vue
- 所属项目：产品2.0；来源会话：0e82149c-16e9-4beb-8408-fb6a25429487；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "account_detail_zsform",
  "source_extraction_id": "fa9fbf6cda8447e593386f0779b08270",
  "version": 1,
  "memory_type": "entities"
}
-->