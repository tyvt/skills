# 账户分类列表操作列竖线冗余修复
业务账户分类列表因操作列固定产生多余竖线，已通过取消固定并限定列宽修复，同时规范开户明细弹窗表格样式。

## Description
- 账户分类列表操作列取消固定、限定列宽以消除多余竖线
- 开户明细弹窗采用标准表格样式，收紧分页与表单区间距
- 合并 develop/v2.6.1 等分支时保留 getTable 响应解析接口兼容

## 涉及视图文件
- zhi2-web-admin/src/views/maintenance/accountType/index.vue
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/OpenDetailDialog.vue
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue
- zhi2-web-admin/src/views/maintenance/components/ScopeSelectDialog.vue
- zhi2-web-admin/src/views/maintenance/standardItem/index.vue

## 涉及组件文件
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue
- zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue
- zhi2-web-admin/src/components/zs-table/zs-table.vue

## Relations
- 合并提交：develop/v2.6.1:87c2a03bb、develop/v2.6.2:20cf91a66、develop/v2.6.2-yulin:c58364135、develop/v2.6.2-suzhufang:88e7e284f
- 来源会话：ccecb19b-92ad-4ceb-b6a2-3ff398f7a4aa（extracted source=cursor）
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_column_fix",
  "source_extraction_id": "1361bd3813744042a98313dc80ef9a52",
  "version": 3,
  "memory_type": "entities"
}
-->