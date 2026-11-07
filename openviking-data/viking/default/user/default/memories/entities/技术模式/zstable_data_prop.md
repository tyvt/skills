# zs-table数据prop化高度计算
园区物管2.0 的 zs-table 把 data 从 $attrs 改成显式 prop 后，$attrs.data 恒为 undefined 导致表格高度只算 1 行。
## 问题背景
- 重构时 data 从透传 attr 改显式 prop，但 getBaseTableHeight() 仍读 this.$attrs.data?.length，prop 声明后不再出现在 $attrs，恒为 undefined、长度按 0，displayRows 算成 max(0,1)=1。
- 原监听 $attrs.data 变化的 calculateTableHeight() 随之失效，改成 watch data prop 后只调 doLayout()，异步数据后高度不再重算。
## 解决方案
- 从 $attrs 迁移为显式 prop 的字段，必须全量排查组件内所有 this.$attrs.xxx 引用并改为直接访问 prop。
- 数据 prop 的 watcher 除 doLayout 外要恢复 calculateTableHeight()、observeTableResize()、syncFixedColumnOffset() 等派生动作。
- Vue prop/attr 边界通用坑：声明即从 $attrs 消失，静默返回 undefined 不报错。
## 验证与归属
- 验证：会话 8733f1c6 中 zs-table.vue 重构 data 为 prop 后高度失效，修复为读 tableData.length 并在 data watcher 恢复三个派生方法。
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue；所属项目：园区物管2.0；代码基线：736a824e7。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_data_prop",
  "source_extraction_id": "fe0dde00dbf24143868b76101755b35e",
  "version": 1,
  "memory_type": "entities"
}
-->