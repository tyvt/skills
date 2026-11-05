# zs-table 冗余代码清理
产品2.0 的 zhi2-web-admin 清理 zs-table 与 tableLayoutFix 两处冗余，功能逻辑不变。

## 清理内容
- `zs-table.vue` 移除 `mounted` 中重复的 `doLayout({ refreshBase: true })`，首次布局仍由 `data` watch（`immediate: true`）触发
- `tableLayoutFix.js` 删除未使用的 `clearBaseColumnWidths` 导出

## 验证与归属
- 验证：可照常验证侧栏收起与列宽展示
- 涉及文件：zs-table.vue、tableLayoutFix.js、guaranteeDepositAgreement/index.vue、mixins/ListTemplate.js
- 所属项目：产品2.0；来源会话：ed54ca3b-8927-46de-b31e-4658f9f285d7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_cleanup",
  "source_extraction_id": "fa91e52bec984e5cbe8148f4d9145e28",
  "version": 1,
  "memory_type": "entities"
}
-->