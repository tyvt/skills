# 文本域组件全局改成一行一列（苏州市房地产监测V3）
苏州市房地产监测V3 完成文本域整行独占改造，detail 表单中文本域默认占满整行。

## 样式修改
- detail-form.scss：含 .el-textarea 或 .zs-textarea 的 .section-field 使用 grid-column: 1 / -1
- Headline 折叠区：含文本域的 el-col 强制 100% 宽
- @media (min-width: 768px) 末尾再次声明上述规则，避免被 el-col-8/12 覆盖
- el-dialog__body 内 el-row（排除 zs-search-form__field-row）同样整行

## 组件修改
- detail-template.vue：getItemSpan 中 type === 'textarea' 且未设 keepSpan: true 时固定返回 24
- 关联组件：zs-textarea.vue、zs-input.vue 同步调整

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：detail-form.scss、detail-template.vue、zs-textarea.vue、zs-input.vue
- 所属项目：苏州市房地产监测V3
- 来源会话：da5fd0f5-03c2-4036-94cd-9b0a30824bc4
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_textarea_fullrow",
  "source_extraction_id": "bf450a2d11c2459da691fafe70ea3219",
  "version": 1,
  "memory_type": "entities"
}
-->