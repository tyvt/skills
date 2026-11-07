# bankBranch网点列表接口list改page
银行网点列表分页接口由 `list` 调整为 `page` 模式，部分路由与弹窗列表同步改造，管辖行树保留 `list`。

## 变更点
- 银行网点列表分页接口由 `list` 调整为 `page` 模式
- `YhwdTable.vue` 中 commercial 路由走 `/prefund/bankBranch/page`、维修资金仍用 `/estate/mfBankBranch/list`
- `superviseBank/detail.vue` 的 `getList()` 与 `WdmcDialog.vue` 弹窗列表改 `page`
- `getBranch()` 管辖行树保留 `list`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/149.md
- 涉及文件：YhwdTable.vue、superviseBank/detail.vue、WdmcDialog.vue、supervision-bank-helpers.js
- 所属项目：苏州市房地产监测V3；来源会话：300092d4-50e7-43ba-bc1b-8411e835ef15；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_branch_list_page",
  "source_extraction_id": "0d247d953872400cb8867fd2a9de659d",
  "version": 1,
  "memory_type": "entities"
}
-->