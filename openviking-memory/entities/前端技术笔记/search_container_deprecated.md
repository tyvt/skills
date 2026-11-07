# 旧 search-container 组件已废弃
园区物管2.0 新列表页因复刻旧模板使用未注册的 <search-container> 而报 Unknown custom element，需统一改用 <zs-search-form>。
## 现象
- 新写列表页报 [Vue warn] Unknown custom element: <search-container>，伴随 Property or method not defined 等渲染警告。
- 旧页面模板直接搬运导致引用了不再注册的组件。
## 根因
- 项目已从旧 <search-container> 迁移到 <zs-search-form>（由 listMixins 自动注册），旧组件不再注册。
- 照抄旧页面模板就会得到未注册组件。
## 解决方案
- 新列表页统一写 <zs-search-form> 并提供 formItems 计算属性配置搜索项（小区/年度/状态等），配合 listMixins 使用。
- 从旧页面复刻代码时先核对组件名是否已被公共件替代，不要直接搬运旧标签。
## 关联信息
- 涉及文件：zhi2-web-admin/src/mixins/listMixins.js、zhi2-web-admin/src/views/benefit/pubElevMaintenanceNew/index.vue。
- 所属项目：园区物管2.0；来源会话：31f93d40-0b1b-4532-9404-1e8c008776f8；代码基线：fc994977f。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "search_container_deprecated",
  "source_extraction_id": "d666360db8d5471ab075b4f725e5c78b",
  "version": 1,
  "memory_type": "entities"
}
-->
