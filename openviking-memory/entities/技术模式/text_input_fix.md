# 阳光物业服务事项文本输入操作按钮修复（苏住房G）
苏住房G 项目修复阳光物业服务事项详情页切换为「文本输入」行类型时操作列按钮丢失的问题。

## 问题原因
- 在 `serviceItem/detail.vue` 中，行类型为「文本输入」时操作列被写死显示 `--`，加减按钮被隐藏

## 修复内容
- 去掉文本输入类型的判断分支，所有行类型（固定内容、文本输入）统一显示 `+` / `-` 操作按钮
- 切换为「文本输入」后可正常新增和删除行

## 验证与归属
- 所属项目：苏住房G；来源会话：3bbe1219-dcea-4d38-88be-160c5f1860c9；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：`zhi2-web-admin/src/views/property/serviceItem/detail.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "text_input_fix",
  "source_extraction_id": "6c711be48c694126ab487e463c9d3689",
  "version": 1,
  "memory_type": "entities"
}
-->