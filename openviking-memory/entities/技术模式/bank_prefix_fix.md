# 银行详情页支行列表接口未适配路由前缀
苏州市房地产监测V3 中银行详情页支行列表接口误用 pageUnionBank 且缺类型前缀，须新增 bankBranchPrefixUrl 计算属性适配。

## 问题根因
- detail.vue 的 getList 与 WdmcDialog.vue 弹窗列表误用 pageUnionBank
- 缺类型前缀，未区分 commercial 与其他类型路由

## 解决方案
- 新增 bankBranchPrefixUrl computed（commercial→/prefund/bankBranch/，其他→/estate/mfBankBranch/）
- 列表改 POST ${bankBranchPrefixUrl}list
- detail.vue 的 row-key 改 bankBranchManageId
- 移除 isSupervisionBank: '1' 覆盖

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/031.md
- 涉及文件：supervision/bank/superviseBank/detail.vue、cbyh/components/YhwdTable.vue、api/system/unionBank.js、superviseBank/components/WdmcDialog.vue、api/jgyh/yhwdgl.js、cbyh/components/WdmcDialog.vue、superviseBank/index.vue、superviseBank/components/YhwdDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：c3f3c00e-8252-4a2c-ac62-969e7898c321；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_prefix_fix",
  "source_extraction_id": "1dd7ee5fdfbc4d55b597a754b7eaeeee",
  "version": 1,
  "memory_type": "entities"
}
-->