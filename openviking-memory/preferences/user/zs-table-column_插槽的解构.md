---
audit_status: valid
last_checked: 2026-11-28T02:42:54+08:00
verdict_note: 偏好型记忆；zs-table-column.vue 在多个仓库实存，slot-scope 解构约定无矛盾证据。
---
- 在 zs-table-column 中，将 slot-scope="scope" 改为 slot-scope="{ scope }" 以通过 scope.row 访问行数据。
- 仅当外部元素确实是 zs-table-column 时应用此更改（例如：CommercialHousingTable.vue）；原生的 el-table-column 列（例如：PricingModeTable.vue）保持不变。
- 涉及文件: contractRequest.js, vendeeAgentDialog/index.vue, vendeeTab.vue, chapter1.vue, contractMainInfo/index.vue, BuyerTable.vue, zs-table-column.vue, sz-contract.scss. 验证证据: 苏州市房地产监测V3-rest/003.md.

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->