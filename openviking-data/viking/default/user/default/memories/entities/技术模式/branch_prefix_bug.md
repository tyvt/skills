# 银行详情页支行列表接口前缀未分业态
苏州市房地产监测V3 中银行名单详情页支行列表原误用 pageUnionBank 且未按业态区分前缀，导致接口路径错误。

## 问题根因
- 银行名单详情页 detail.vue 与 WdmcDialog.vue 支行列表原误用 pageUnionBank
- 未按业态区分前缀，且覆盖 isSupervisionBank: '1'

## 修复方案
- 新增 bankBranchPrefixUrl 计算属性（commercial 映射 /prefund/bankBranch/，其他 /estate/mfBankBranch/）
- getList 改 POST ${bankBranchPrefixUrl}list 并移除 isSupervisionBank: '1' 覆盖
- row-key 改 bankBranchManageId，左侧树 getBranch() 不变

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/231.md
- 涉及文件：supervision/bank/superviseBank/detail.vue、supervision/bank/cbyh/components/YhwdTable.vue、api/system/unionBank.js、supervision/bank/superviseBank/components/WdmcDialog.vue、api/jgyh/yhwdgl.js、supervision/bank/cbyh/components/WdmcDialog.vue、supervision/bank/superviseBank/index.vue、supervision/bank/superviseBank/components/YhwdDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：c3f3c00e-8252-4a2c-ac62-969e7898c321；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_prefix_bug",
  "source_extraction_id": "eedd71c4edcc4cedbfdf3ec5cf02cc9a",
  "version": 1,
  "memory_type": "entities"
}
-->