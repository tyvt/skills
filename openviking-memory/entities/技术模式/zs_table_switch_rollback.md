# zs-table-column 开关列回滚失败：回调前已写新值
[苏房G] zs-table-column 的 handleSwitchChange 先把 row.enableStatus 写成新值再回调页面，导致页面取「旧值」实为已改新值，拦截后回滚无效。

## 现象
- 列表页用 zs-table-column 的 el-switch 列做启用/禁用，前端拦截不满足条件单据（如未备案 bizState !== '2'）。
- 提示「未备案的不能执行启用或禁用」后开关仍变为禁用，未保持原样。

## 根因
- 本项目开关列不靠 v-model 双向绑定，而是 zs-table-column 内部 handleSwitchChange 先写 row.enableStatus 新值再回调 handleEnableChange(row)。
- 页面 const prevStatus = row.enableStatus 取到的是新值（禁用 '0'），.catch 回滚到新值等于无效。

## 修复方案
- 不要从 row 读旧值，按目标状态反推：const prevStatus = statusStr === '1' ? '0' : '1'。
- 所有失败分支统一回滚：前端业务拦截、权限校验失败、参数校验失败。
- 通用教训：凡是被组件在回调前改写过的行字段，都不能当「变更前快照」用。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话 aadf551a 未备案单据启用→禁用提示后仍变禁用，根因 handleSwitchChange 先写新值。
- 涉及文件：zhi2-web-admin/src/views/system/regionBankAuth/index.vue。
- 所属项目：苏住房G；来源会话：aadf551a-5fa3-495e-9cfd-2fe0eba45d5b；代码基线：f9f3acf。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_switch_rollback",
  "source_extraction_id": "ea2994fc67214b8b8e95709cd8977d46",
  "version": 1,
  "memory_type": "entities"
}
-->