# 级联懒加载未载子节点致编辑回显失败修复
园区公共收益项目(zhi2-web-admin)中 projectNameExampleDialog.vue 的 el-cascader 因懒加载子节点未载，编辑时级联回退显示"请选择"，改为一次性加载全量树。

## 问题根因
- el-cascader 使用懒加载，编辑时 maintainObjTypeId 已赋值但子节点未加载，级联回退显示"请选择"
- originalOptions 原逻辑会重复 push 根节点

## 解决方案
- 改为调用 /dataProperty/facilityDefinition/listTree 一次性加载全量树并去除 lazy/lazyLoad
- originalOptions 改为全树递归扁平化以消除重复 push 根节点

## 验证与归属
- 验证证据：src=园区公共收益/033.md
- 来源会话：46d35854-cd1f-4cd4-8ffd-f3c1f8bcf2dd；代码基线：none
- 所属项目：园区公共收益
- 涉及文件：projectNameExampleDialog.vue、projectNameExampleTable.vue、dialogMixins.js、form.js、ProjectNameDialog.vue、maintenanceApplyTable.vue 等

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cascader_lazyload_fix",
  "source_extraction_id": "13c16ab160ac4869a18df923a3d00ffb",
  "version": 1,
  "memory_type": "entities"
}
-->