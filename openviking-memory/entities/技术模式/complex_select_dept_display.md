# 首页切换小区行政区域不显示修复
物业手持B端首页切换小区时行政区域（部门树）不显示，但接口有数据。

## 问题根因
- `src/pages/complex-select/index.vue` 部门树节点字段未归一化，仅兼容 `label`/`id`，不兼容接口返回的 `deptName`/`deptId`

## 解决方案
- 新增 `getDeptNodeId` / `getDeptNodeLabel` 归一化字段，兼容 `deptName`/`deptId` 与 `label`/`id`/`name`
- `toPickerItems` 映射为 `{ text, value }` 并过滤空值；`findDepartment` 按归一化 ID 查找

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/pages/complex-select/index.vue、src/pages/home/index.vue、src/components/ZsPicker/ZsPicker.vue、src/store/user.js、src/pages/organization/index.vue
- 来源会话ID：53a1b5a9-a0bb-43b5-969a-34c78dd71d66
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_select_dept_display",
  "source_extraction_id": "c99b5f6c19b841578a10f18af3a609aa",
  "version": 1,
  "memory_type": "entities"
}
-->