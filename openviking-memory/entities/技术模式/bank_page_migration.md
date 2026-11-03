# 银行网点列表接口由 list 迁移至 page 分页路径
苏州市房地产监测V3 中 bankBranch 列表接口分页路径由 /list 迁移至 /page 的前端调整。

## 变更要点
- bankBranch 列表接口分页路径由 /list 迁移至 /page
- YhwdTable.vue 中 commercial 路由与 WdmcDialog.vue 弹窗列表走 /prefund/bankBranch/page
- superviseBank/detail.vue 仅 getList() 改用 page，getBranch() 保留 list

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/104.md
- 涉及文件：supervision/bank/cbyh/components/YhwdTable.vue、supervision/bank/superviseBank/detail.vue、supervision/bank/superviseBank/components/WdmcDialog.vue、e2e/fixtures/supervision-bank-helpers.js
- 所属项目：苏州市房地产监测V3；来源会话：300092d4-50e7-43ba-bc1b-8411e835ef15；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_page_migration",
  "source_extraction_id": "5ef47723b89e4bcab4d342f6dc3a4700",
  "version": 1,
  "memory_type": "entities"
}
-->