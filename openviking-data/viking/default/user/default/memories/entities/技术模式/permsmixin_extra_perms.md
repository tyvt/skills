# permsMixin 缺 extraPerms 展开导致警告
产品2.0 中 permsMixins.js 的 perms 计算属性展开 `...this.extraPerms`，部分列表页未实现该字段触发 Vue warn，已补默认空对象。

## 问题根因
- `permsMixins.js` 的 `perms` 计算属性通过 `...this.extraPerms` 展开混入字段
- 部分列表页（如 `AnnouncementMsg`）未在组件中声明 `extraPerms` 字段
- 访问未定义字段触发 Vue warn 警告

## 解决方案
- 于 `permsMixins.js` 增补默认 `extraPerms(){return{}}`，提供安全兜底
- 组件内 computed 同名字段可覆盖 mixin 默认值，保持灵活扩展

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：src=2-0/018.md
- 涉及文件：permsMixins.js
- 所属项目：2-0；来源会话ID：2f8cc0e9-9cb1-43cb-af76-79b01f8f468f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permsmixin_extra_perms",
  "source_extraction_id": "5735c2b524dc4e538e7180fc8a41d720",
  "version": 1,
  "memory_type": "entities"
}
-->