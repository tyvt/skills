# 监管协议账户详情页改造
产品2.0 项目完成 supervision/agreement/account 下 account/detail.vue 与 BankAccountTable.vue 改造。

## 主要变更
- 顶部操作区 operation-container 改为 operation-btn-group，移除 zs-attachment。
- 框架配置 moduleName: 'prefund'、businessName: 'regulatoryAccount'、primaryKey: 'accountId'。
- 权限 permsPrefix 按 opensalesType 动态返回 finance:openAccount / finance:account。
- 审批 :show-approval="form.opensalesType != 'ACCOUNT_OPEN'"。
- view 用 DetailTemplate + contentInfo/contentInfo2；edit/add 保留原表单。
- 表单容器外层改为 zs-form。
- 开户按钮等放入 operation-btn-group slot，使用 zs-button :permission。
- 打印 operation-bt（待补充）。

## 验证与归属
- 所属项目：产品2.0；来源会话：0e82149c-16e9-4beb-8408-fb6a25429487；代码基线：none
- 涉及文件：account/detail.vue、BankAccountTable.vue、detail-template.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_detail_refactor",
  "source_extraction_id": "ec764d6069214ea2adcdb6b65018e194",
  "version": 1,
  "memory_type": "entities"
}
-->