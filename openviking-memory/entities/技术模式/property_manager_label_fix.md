# 物业人员新增页字段标签修复
苏住房G项目propertyManager/detail.vue新增时职位未选导致字段标签误显示「姓名」，已固定为「物业服务人员姓名」。

## 问题原因
- 该字段标签原先按isProjectManager判断——只有职位为「项目经理」时才显示「物业服务人员姓名」，否则显示「姓名」；新增时职位尚未选择，因此一直显示「姓名」

## 修复内容
- 表单编辑区：标签固定为「物业服务人员姓名」
- 校验提示：由「姓名不能为空」改为「物业服务人员姓名不能为空」
- 详情查看区：标签与字段排序同步调整

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/property/propertyManager/detail.vue
- 所属项目：苏住房G；来源会话：b25bfb10-e354-4f5c-850c-a34e6dee0ec9；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_manager_label_fix",
  "source_extraction_id": "ad128491ddb047a6bbc7e9b936d4e89b",
  "version": 1,
  "memory_type": "entities"
}
-->