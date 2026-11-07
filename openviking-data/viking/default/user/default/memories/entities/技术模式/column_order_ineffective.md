# 自定义列顺序调整失效修复
淮安物管后台自定义列显示调整顺序后未生效，已通过重建表格与本地配置恢复修复。

## 问题根因
- Element UI 的 el-table 在子组件 column 仅调换 v-for 顺序时，内部列缓存不按新顺序重排，界面看似未排序。
- displayColumns 只从 Vuex 读配置，整页刷新后 Vuex 未从 localStorage 恢复，保存顺序丢失。
- 本地旧配置可能缺 order 字段，a.order - b.order 得 NaN 致排序不稳定。

## 解决方案
- mixins/table.js 增加计算属性 tableColumnsKey（用当前列 prop 顺序拼字符串）；loadTableConfigFromStore 在 Vuex 为空时从 localStorage 读出并 commit 到 store；排序改 (a.order ?? 0)-(b.order ?? 0)。
- mixins/ListTemplate.js 在 <zs-table> 上增 :key="tableColumnsKey"，列顺序变化时重建表格。
- global-table-config.vue 等相关文件同步调整。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管。
- 涉及文件：mixins/table.js、mixins/ListTemplate.js、global-table-config.vue 等（路径 d:\repository\淮安物管\zhi2-web-admin\src\...）。
- 所属项目：淮安物管；来源会话：23259f03-6ebe-4aaa-8a85-fd3a770bfa1b；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "column_order_ineffective",
  "source_extraction_id": "786ff81f84094d8eb6aa5023f40dbe21",
  "version": 1,
  "memory_type": "entities"
}
-->