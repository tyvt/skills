# 物业管理区域备案列表自定义排序保存后不生效修复
园区公共收益项目修复 `property/complex/index.vue` 自定义排序保存后列表字段顺序界面未变化的问题。

## 问题根因
- `property/complex/index.vue` 使用自定义模板而非通用 `ListTemplate.js`
- 保存列配置后 `displayColumns` 顺序已更新，但表格缺少 `:key="tableColumnsKey"`
- Element UI 的 `el-table` 会缓存列顺序，仅改变 `v-for` 顺序不会触发重排

## 修复要点
- 通用列表模板 `ListTemplate.js` 已通过 `<zs-table :key="tableColumnsKey">` 处理列重排
- 自定义页需补充 `:key="tableColumnsKey"` 以在保存后触发表格重排

## 验证与归属
- 所属项目：园区公共收益；来源会话：4b2a6426-193d-4d85-9729-2061d23f61d0；代码基线：none
- 涉及文件：`property/complex/index.vue`、`ListTemplate.js`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_column_sort",
  "source_extraction_id": "1dabda6ae60c49ba9b0b0e9ad1f7dc61",
  "version": 1,
  "memory_type": "entities"
}
-->