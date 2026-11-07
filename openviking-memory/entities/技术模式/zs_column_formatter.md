# ZsTableColumn 字符串 formatter 兼容与阻断透传
在 zs-table-column 封装层中，若列配置的 formatter 为字符串，需从 @/formatters/index.js 取同名函数后传给 ElTableColumn，且禁止经 v-bind="attrs" 透传字符串 formatter。

## 问题根因
- 动态列配置或历史代码可能把 ElTableColumn 的 formatter 写成字符串（如 formatter: 'amountFormatter'），Element Plus 只接受 Function，触发 Vue prop 类型告警 `Expected Function, got String`。
- zs-table-column 使用 `v-bind="column"` 透传，字符串 formatter 进入 $attrs 并转发给 ElTableColumn；即使绑定 `:formatter="formatters[attrs.formatter]"` 警告仍先触发。

## 解决方案
- 在 zs-table-column.vue 中，若 formatter 为字符串，则从 @/formatters/index.js 取同名函数（resolvedFormatter），仅将函数传给 ElTableColumn。
- 将字符串 formatter 从透传 attrs 中剔除，禁止经 `v-bind="attrs"` 传给 ElTableColumn。
- 列配置侧应逐步改为函数引用（如 `this.formatters.amountFormatter`）；后端返回的列配置可在生成阶段做名称到函数的映射。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 ce31747c（maintenanceProject 列表 formatter 类型警告）；会话 667b9605（MaintenanceProject 等页告警 Expected Function, got String "amountFormatter"，修复 zs-table-column.vue 与 plot/index.vue 字符串用法）。
- 涉及文件：zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue；zhi2-web-admin/src/formatters/index.js；zhi2-web-admin/src/views/building/plot/index.vue；index.ts（告警出处）。
- 所属项目：2-0；来源会话ID：ce31747c-5502-4d03-83c2-364130d7d52d 与 667b9605-d636-4fd0-9033-f298688576f0；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_column_formatter",
  "source_extraction_id": "b22c5c3f66104829a41402eaeb1ba6a1",
  "version": 3,
  "memory_type": "entities"
}
-->