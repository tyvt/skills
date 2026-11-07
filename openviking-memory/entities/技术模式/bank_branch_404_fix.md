# 银行网点列表路由误判走estate路径致404修复
苏州市房地产监测V3 的 zhi2-web-admin 中银行网点列表因路由名误判请求 `estate` 路径 404，统一前缀为 `/prefund/bankBranch/`。

## 问题根因
- `Supervisebank/:tableid` 路由名不含 `commercial`，原逻辑误判导致银行网点列表请求 `estate` 路径 404
- 同页删除等接口早已使用 `prefund` 前缀，存在不一致

## 关键修复
- `superviseBank/detail.vue` 与 `components/WdmcDialog.vue` 将 `bankBranchPrefixUrl` 固定为 `/prefund/bankBranch/`
- 统一请求 `/prefund/bankBranch/list`

## 涉及文件
- supervision/bank/cbyh/index.vue
- supervision/bank/jgwd/index.vue
- supervision/bank/cbyh/detail.vue
- supervision/bank/superviseBank/detail.vue
- supervision/bank/cbyh/components/YhwdTable.vue
- api/jgyh/yhwdgl.js
- mixins/listMixins.js
- mixins/table.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/190.md
- 来源会话ID：f9ae239b-1970-4f62-b9f6-43dcba0723b3
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_branch_404_fix",
  "source_extraction_id": "02e4d9002af14be89befaeb05937e6f7",
  "version": 1,
  "memory_type": "entities"
}
-->