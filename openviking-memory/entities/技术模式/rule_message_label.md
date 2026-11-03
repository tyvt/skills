# 表单项校验提示文案须与 label 逐字一致
苏住房G 物业管家等表单中，必填校验 rules.message 必须与表单项 label 文案完全复用，避免近义词造成字段误判。

## 问题现象
- employmentDate 必填提示曾写「就职日期不能为空」，而表单项标签为「入职日期」，用户以为校验对错字段
- 同业务域近义词对（就职/入职、缴款/缴纳、备案/登记）易产生此类残留

## 解决方案
- rules 里的 message 不是自由文案，必须是该字段 label 的逐字复用
- 新增字段时先按 label 文案复制粘贴再改字段名；改字段中文名时必须同步改 rules 的 message
- 只要求文案与 label 同源，不需动校验逻辑与 trigger

## 验证与归属
- 验证：会话 a4130aa3 用户要求提示显示为「入职日期不能为空」，结论将 message 改为与 label 一致
- 涉及文件：zhi2-web-admin/src/views/property/propertyManager/detail.vue
- 所属项目：苏住房G；来源会话：a4130aa3-2533-4320-b64f-86af85ae97c6；代码基线：805ea8c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rule_message_label",
  "source_extraction_id": "e51aeec6c7bc4201bc8f7a1fbfce615b",
  "version": 1,
  "memory_type": "entities"
}
-->