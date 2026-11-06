# 详情页模板头部布局修复
苏住房G 项目因全局样式 .detail-container 使用 flex-direction:column-reverse 导致模板配置页头部被反序显示到底部，已修复。

## 问题原因
- 全局样式 .detail-container 使用 flex-direction:column-reverse 反转 DOM 顺序显示
- 模板配置页将 template-header(标题+返回/保存按钮)放在内容前面，被反序显示到页面底部
- 其他详情页(如 survey/template/detail.vue)将 operation-btn-group 放在 DOM 末尾，视觉上出现在顶部

## 修改内容
- 将 template-header 移到 Headline 之后，与项目其他详情页布局约定一致

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：survey/template/detail.vue、publicQuery/monthlyReportTemplate/index.vue、TemplateTreeTable.vue
- 来源会话ID：0ccf674f-a815-4bdd-b0ea-8b4c07143b54

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_container_layout_fix",
  "source_extraction_id": "67bb936ad3174282b6da54bbc95568da",
  "version": 1,
  "memory_type": "entities"
}
-->