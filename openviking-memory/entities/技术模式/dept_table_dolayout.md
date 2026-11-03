# 部门列表去tableTr调用doLayout防留白
苏州市房地产监测V3 中 dept/index.vue 与 DeptDialog.vue 删除重复「状态」列，去掉 tableTr='12' 使表格高度自适应，加载/展开后调用 doLayout() 避免操作列错位与右侧留白。

## 变更要点
- dept/index.vue 与 DeptDialog.vue 删除重复「状态」列并恢复顶部及行内增删改按钮
- 去掉 tableTr='12' 使表格高度自适应
- 设置列宽并于加载/展开后调用 doLayout() 避免操作列错位与右侧留白

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/046.md
- 涉及文件：detailLayout.js、dept/index.vue、menu/index.vue、Headline/index.vue、table.js、subTableMixins.js、DeptDialog.vue、zs-table.vue
- 所属项目：苏州市房地产监测V3；来源会话：c0dd69e9-f8fe-4d3f-bdb9-61cb55b5b94b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dept_table_dolayout",
  "source_extraction_id": "193aaf4ba64b42d4a62ba98bf6ee8d2d",
  "version": 1,
  "memory_type": "entities"
}
-->