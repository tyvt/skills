# 维修资金立项配置详情项目名称示例编辑弹框级联回显修复
园区公共收益项目维修资金立项配置详情中项目名称示例编辑弹框维修对象类别回显为请选择的根因与修复。

## 根因
- projectNameExampleDialog.vue 中维修对象类别用 el-cascader 懒加载模式（lazy+ lazyLoad 逐级加载）
- 点编辑时 maintainObjTypeId 已赋值，但子级节点未加载，cascader 找不到节点回退显示请选择
- 老组件 ProjectNameDialog.vue 一次性拉全量树一直正常

## 修复要点
- 仅改 projectNameExampleDialog.vue 一个文件
- 级联改为一次性加载 /dataProperty/facilityDefinition/listTree 全量树，去掉 lazy/lazyLoad
- originalOptions 改为全树递归扁平化，消除重复 push 根节点
- 查看弹框维修对象类别由裸 ID 改为显示名称

## 涉及文件
- zhi2-web-admin/src/views/maintenance/projectConfig/components/projectNameExampleDialog.vue
- zhi2-web-admin/src/views/maintenance/projectConfig/components/projectNameExampleTable.vue
- 参考 maintenanceProject/detail.vue、ProjectNameDialog.vue

## 验证与归属
- 验证证据：extracted source=workbuddy project=园区公共收益
- 所属项目：园区公共收益；来源会话ID：46d35854-cd1f-4cd4-8ffd-f3c1f8bcf2dd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_config_name_example_cascader_lazy",
  "source_extraction_id": "95cd5696de3f4e369b28c91aad42dc97",
  "version": 1,
  "memory_type": "entities"
}
-->