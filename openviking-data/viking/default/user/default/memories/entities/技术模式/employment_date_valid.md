# 物业管家入职日期校验文案修复（苏住房G）
苏住房G 项目 propertyManager/detail.vue 中 employmentDate 校验文案与标签不一致已修复。
## 问题根因
- 校验文案原写「就职日期不能为空」，表单项标签为「入职日期」
## 修复内容
- 修改校验规则 message 为「入职日期不能为空」
- 位置：zhi2-web-admin/src/views/property/propertyManager/detail.vue 230-235行
## 验证与归属
- 所属项目：苏住房G；来源会话：a4130aa3-2533-4320-b64f-86af85ae97c6；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "employment_date_valid",
  "source_extraction_id": "74129eda8d3f40a694d895ddf91ed661",
  "version": 1,
  "memory_type": "entities"
}
-->