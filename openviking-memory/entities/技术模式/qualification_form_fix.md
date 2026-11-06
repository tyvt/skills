# 资质表单布局塌陷修复
苏州市房地产监测V3 修复资质表单变成「1行1列」的布局问题，并全局排查类似问题。

## 修改内容
- `QualificationFormSection.vue`：根节点改为 `section-form`，各字段用 `section-field` 包裹，备注用 `section-field--full`；去掉 `el-row`/`el-col`，逻辑与 `data-testid` 不变
- `DeveloperBasicInfoForm.vue`：资质区直接渲染组件，删除 `qualification-form` 包裹及 scoped 单列补丁
- `companyRegister/detail.vue`：去掉多余嵌套 `el-row`
- `detail-form.scss`：全局兜底样式调整

## 涉及文件与归属
- 涉及：`QualificationFormSection.vue`、`DeveloperBasicInfoForm.vue`、`companyRegister/detail.vue`、`detail-form.scss`
- 所属项目：苏州市房地产监测V3；来源会话ID：ae3c4552-cf65-45ec-8e81-c709ae573cb8；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_form_fix",
  "source_extraction_id": "332cc5b2c96c4093aff81c5d14018372",
  "version": 1,
  "memory_type": "entities"
}
-->