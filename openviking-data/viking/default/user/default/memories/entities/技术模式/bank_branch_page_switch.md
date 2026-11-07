# 银行网点列表接口 list 改为 page
苏州市房地产监测V3 中银行管理详情网点列表接口由 list 改为 page 改造已完成。

## 变更要点
- YhwdTable.vue（银行管理详情「网点列表」）：commercial 路由走 /prefund/bankBranch/page，维修资金仍用 /estate/mfBankBranch/list
- superviseBank/detail.vue：getList()（右侧网点表）改为 page；getBranch()（左侧管辖行树）仍为 list，未改动
- WdmcDialog.vue（新增网点弹窗列表）改为 page
- supervision-bank-helpers.js：isBankBranch 相关 E2E helper 适配

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：300092d4-50e7-43ba-bc1b-8411e835ef15
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：cbyh/components/YhwdTable.vue、superviseBank/detail.vue、superviseBank/components/WdmcDialog.vue、e2e/fixtures/supervision-bank-helpers.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_branch_page_switch",
  "source_extraction_id": "fd721c1979954aee919751d12eaaa0f8",
  "version": 1,
  "memory_type": "entities"
}
-->