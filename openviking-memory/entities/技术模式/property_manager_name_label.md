# 物业服务人员姓名标签修复（苏住房G）
苏住房G 项目 propertyManager/detail.vue 修复新增时字段标签误显示「姓名」问题。

## 问题原因
- 字段标签按 isProjectManager 判断：仅职位为「项目经理」时显示「物业服务人员姓名」，否则显示「姓名」
- 新增时职位尚未选择，因此一直显示「姓名」

## 修复内容
- 表单编辑区标签固定为「物业服务人员姓名」
- 校验提示由「姓名不能为空」改为「物业服务人员姓名不能为空」
- 详情查看区标签与字段排序同步调整

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/property/propertyManager/detail.vue
- 所属项目：苏住房G；来源会话：b25bfb10-e354-4f5c-850c-a34e6dee0ec9；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_manager_name_label",
  "source_extraction_id": "4c6c7dd0a2e54592ac98c4d72ad57a93",
  "version": 1,
  "memory_type": "entities"
}
-->