# ListTemplate + listMixins 在存款页面中

存款监管模块的列表页面已重构以使用 ListTemplate + listMixins，统一了结构。

## 背景
- 已转换 4 个页面：other_record, notice, refund, additional 和 adjustmentofAccounts
- 所属项目: zhi2-web-admin (产品 2.0)

## 关键点
- 在页面中配置了 moduleName: prefund 和 businessName: paymentNotice
- 保留了基于 paymentType 的路由和自定义的 getList
- 保留了导出按钮

## 文件
- 视图: supervision/deposit/{other_record,notice,refund,additional,adjustmentofAccounts}/index.vue
- API: api/finance/{notice,refund,additional}.js

## 验证
- cursor 会话: 5db9c51e-2b5e-440b-9222-d5a6f6452a33

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_listtemplate",
  "source_extraction_id": "738f08956f814c1794657ebf13c3e648",
  "version": 1,
  "memory_type": "entities"
}
-->