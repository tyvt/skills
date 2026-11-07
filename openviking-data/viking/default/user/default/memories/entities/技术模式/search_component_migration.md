# 搜索组件迁移与未使用文件清理
产品2.0 项目完成了证书相关搜索组件迁移至统一 `formItems` 计算属性，并删除未引用文件与修复按钮组。

## 搜索组件迁移
- 涉及 `certificate/conLandLic/components/SearchLand.vue`、`certificate/consLic/components/LicSearch.vue`、`certificate/planLic/components/PlanSearch.vue`、`certificate/stateLandLic/components/SearchState.vue`
- 各组件添加 `formItems` 计算属性，`resetQuery` 使用 `$options.data()` 重置后调用 `handleQuery()`
- `zs-search-form` 通过 `main.js` 全局注册

## 清理与修复
- 删除无引用的 `project/customerProjectinfo/components/search.vue`
- 修复 `AddParcelDialog.vue` 与 `SelectUnitDialog.vue` 按钮组

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：7f91916e-63e0-4f5a-adb3-32a34614d089；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_component_migration",
  "source_extraction_id": "b748adfbea38472688052e3ba8fcbc14",
  "version": 1,
  "memory_type": "entities"
}
-->