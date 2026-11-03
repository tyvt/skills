# ZsTable 对 $attrs.data 增加空值保护
靖江物管G 的 zsTable 组件在父组件传入 undefined/null 时因 watcher 无空值保护而报 TypeError，需在 watcher 与 handleSelect 中增加数组保护。

## 问题根因
- src/components/zsTable/index.vue 的 ZsTable 对 $attrs.data 的 watcher 未做空值保护
- 父组件传 undefined/null 时 watcher 直接访问触发 TypeError
- handleSelect 未防护 row 非数组场景，导致二次报错

## 解决方案
- watcher 内通过 const list = Array.isArray(newValue) ? newValue : [] 规范数组并判空
- handleSelect 增加数组保护防止 row 非数组报错
- 所有进入表格渲染的数据路径统一做空值/类型归一

## 验证与归属
- 验证证据：extracted source=cursor session=5ef01991-e3ff-4f8a-b74e-945baa6f1ef6
- 涉及文件：src/components/zsTable/index.vue
- 所属项目：靖江物管G；来源会话：5ef01991-e3ff-4f8a-b74e-945baa6f1ef6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_data_guard",
  "source_extraction_id": "07fb09c462ea44bd8382c5fb50834270",
  "version": 1,
  "memory_type": "entities"
}
-->