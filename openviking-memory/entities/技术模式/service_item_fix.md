# 阳光物业服务事项新增页修复（苏住房G）
苏住房G 项目修复阳光物业服务事项新增页顶部预览消失与类型切换不生效两个问题。

## 问题原因
- 顶部预览消失：表格重构时移除了 `contentStr` 预览区域（原在表格上方显示「服务内容：xxx」）
- 类型切换不生效：表格行内 `zs-select` 用 `:value.sync="scope.row.contentType"`，Vue 2 对嵌套属性双向绑定不稳定，切换后数据未更新

## 修复内容
- 恢复 `contentStr` 计算属性，在表格上方实时展示拼接后的服务内容（文本输入类型在新增模式显示 `[x]` 占位符）
- 类型下拉改为 `:value` + `@update:value`，通过 `handleContentTypeChange` 配合 `$set` 更新 `tableData`，确保响应式生效
- `initDefaultContentType` 同样改用 `$set`，保证字典加载后默认值正确渲染

## 涉及文件
- zhi2-web-admin/src/views/property/serviceItem/detail.vue
- zhi2-web-admin/src/views/property/serviceItem/index.vue
- zhi2-web-admin/src/views/property/complexService/detail.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：b1211693-d8a4-40e7-8ed4-eaae2280dd79；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "service_item_fix",
  "source_extraction_id": "abdb91ea921d455b818bda502a994c7b",
  "version": 1,
  "memory_type": "entities"
}
-->