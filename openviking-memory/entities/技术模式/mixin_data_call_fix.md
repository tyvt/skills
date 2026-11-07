# 全局Mixin重置this.$options.data调用修复
苏州市房地产监测V3 修复了 mixin 及多处直接调用点中 `this.$options.data()` 未绑定组件实例的高风险问题。

## Mixin根因修复（2处）
- `zhi2-web-admin/src/mixins/table.js`：`resetQuery()` 改为 `this.$options.data.call(this).queryParams`
- `zhi2-web-admin/src/mixins/dialogMixins.js`：`reset()` 改为 `this.$options.data.call(this).form`
- 所有继承这两个 mixin 的列表/弹窗在重置时都会正确绑定组件实例

## 直接调用点修复（11个文件）
- 以下文件中 `this.$options.data()` 均改为 `this.$options.data.call(this)`
- `benefit/alert/index.vue`
- `company/staffManagement/components/certificatesDialog.vue`
- `company/staffManagement/personnelRecord/certificatesDialog.vue`
- `projectManagement/houseinfo/index.vue`
- 其余文件在来源会话中未完整列出，合计 11 个文件

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3
- 来源会话：4c019747-1395-4046-9803-28a9f73b6493

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mixin_data_call_fix",
  "source_extraction_id": "f096da90f9b54af4ad0fcc8abdafe82d",
  "version": 1,
  "memory_type": "entities"
}
-->