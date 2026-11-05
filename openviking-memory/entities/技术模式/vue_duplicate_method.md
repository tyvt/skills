# 园区物管2.0 Vue methods 重复定义致 pre-commit 失败
园区物管2.0 中两个 Vue 文件在 `methods` 里重复定义同名方法，触发 `duplicate-attributes/no-duplicate-vue-options` 规则导致提交失败。

## 问题原因
- `assetLeaseApply/index.vue` 与 `resourcesLeaseContractFiling/index.vue` 各自在 `methods` 中定义了两次 `getQueryParams`
- 后一个定义覆盖前一个，触发 ESLint 重复选项规则

## 解决方案
- 将两个 `getQueryParams` 合并为一个方法
- 保留原有业务参数逻辑（`applyType` / `contractTypes` 等）
- 在同一方法内补充 `parentDeptId = this.$store.state.user.currentProjectId`
- 删除重复的第二处定义，执行 `eslint --fix` 通过

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/assetLeaseApply/index.vue、zhi2-web-admin/src/views/benefit/resourcesLeaseContractFiling/index.vue
- 所属项目：园区物管2.0；来源会话：38ac27d7-c45f-4497-b949-64781b2d3118

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_duplicate_method",
  "source_extraction_id": "e290f9ca93584316ad96adb46810389a",
  "version": 1,
  "memory_type": "entities"
}
-->