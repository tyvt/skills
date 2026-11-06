# 阳光物业服务事项默认固定内容类型改造
苏住房G 项目 serviceItem/detail.vue 服务内容默认类型改为「固定内容」并规范输入规则。

## 修改说明
- 默认类型为「固定内容」：字典加载后通过 dictLabel === '固定内容' 解析实际 dictValue 并写入默认行
- 新增行同样使用该值，下拉显示「固定内容」而非裸数字 0
- 固定内容：内容字段可编辑；文本输入：内容字段禁用（由现场填写）
- 类型为「文本输入」时操作列显示 --（不可增删行）

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/property/serviceItem/detail.vue、index.vue
- 所属项目：苏住房G；来源会话：8952d0e3-4034-4124-ad65-8547a2eaf9b5；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "service_item_default_content",
  "source_extraction_id": "4c6c7dd0a2e54592ac98c4d72ad57a93",
  "version": 1,
  "memory_type": "entities"
}
-->