# 表格自定义列配置刷新后丢失修复
园区物管2.0 的 global-table-config 自定义列后刷新页面列表恢复默认列顺序，而配置弹窗显示已保存顺序，两边不一致。

## 现象
- 自定义表格列后刷新页面，列表恢复默认列顺序，打开配置弹窗却看到已保存顺序，两边不一致。

## 根因
- mixin（table.js）里 columns watcher 在刷新时可能早于 columns 计算属性就绪，loadTableConfigFromStore() 未执行或失败。
- created 里 displayColumns 先写死默认顺序，后续恢复逻辑不触发就一直默认。
- Vuex 刷新后为空，列配置只存 localStorage，且只在打开弹窗时读入，列表页初始化时 Vuex 还没数据。

## 修复方案
- store/modules/table.js 模块加载时把所有 table_config_* 从 localStorage 预加载进 Vuex。
- mixin 新增统一 syncDisplayColumns()，在 created、mounted、activated（覆盖 keep-alive 回流）三处都调用。
- 用 $watch 监听列签名变化替代不可靠的 columns watcher。
- 删掉 created 里直接赋值默认 displayColumns 的逻辑，恢复失败时宁可空着等同步。

## 关联信息
- 验证点：拖拽列序→保存→刷新页面列序保持，且弹窗与列表一致。
- 涉及文件：zhi2-web-admin/src/mixins/table.js、zhi2-web-admin/src/store/modules/table.js、zhi2-web-admin/src/mixins/tableComponents.js、zhi2-web-admin/src/components/global-table-config/global-table-config.vue。
- 所属项目：园区物管2.0；来源会话：c786f6f8-75f2-49be-afbd-1827d65ba911；代码基线：551/1049 未涉及此双层同步问题。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "table_config_refresh",
  "source_extraction_id": "9147c18620be4462a8dc49a228e2758c",
  "version": 1,
  "memory_type": "entities"
}
-->