# standardItemType 懒加载树表删除三级刷新修复
园区物管2.0（zhi2-web-admin）中 `src/views/maintenance/standardItemType/index.vue` 删除三级节点后列表不刷新，实际数据已删除。

## 问题原因
- 右侧表格使用懒加载树表（`lazy` + `load`），`getList()` 只更新根级 `tableData`
- 删二级：行在根列表，刷新后一致
- 删三级：三级行由 `load` 拉取并缓存在 Element 表格内部 `lazyTreeNodeMap`，仅调 `getList()` 不清缓存，界面仍显示已删节点
- 重新进页面整表重建，缓存消失，数据正常

## 修复方案
- 增加 `tableRenderKey`，给 `zs-table` 绑定 `:key="tableRenderKey"`
- 删除成功后 `tableRenderKey += 1` 再 `getList()`，强制表格重新挂载清空懒加载缓存
- 弹窗保存后 `refresh()` 同样 `tableRenderKey += 1`，避免增改子级后不一致
- 思路与同仓库 `system/dept/index.vue` 清空 `lazyTreeNodeMap` 一致，用 `key` 更省事

## 涉及文件
- zhi2-web-admin/src/views/maintenance/standardItemType/index.vue
- zhi2-web-admin/src/views/system/dept/index.vue

## 验证与归属
- 所属项目：园区物管2.0（2-0）；来源会话：183f0f0d-e87d-4696-8caa-bb0bbdf0d30f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "standarditemtype_lazy_delete",
  "source_extraction_id": "f8b4f9aed74b471bb17b7829c522f1b4",
  "version": 1,
  "memory_type": "entities"
}
-->