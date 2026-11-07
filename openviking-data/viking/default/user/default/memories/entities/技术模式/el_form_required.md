# 表单中多余的 required 属性覆盖英文提示
在 园区公共收益 (zhi2-web-admin) 项目中，`el-form-item` 的 `required` 属性注入了不含 `message` 的规则；Element UI 使用默认的英文提示，覆盖了 `rules` 中的中文提示。

## 问题根因
- 带有 `required` 的 `el-form-item` 注入了没有 `message` 的必填规则
- Element UI 应用默认的英文提示，覆盖了 `rules` 中的中文 `message`

## 解决方案
- 从 `operatorAddDialog.vue` 和 `operatorDialog.vue` 中移除多余的 `required` 属性
- 在 `rules` 中保持必填性和中文 `message`

## 涉及的文件
- `operatorAddDialog.vue` 和 `operatorDialog.vue` (位于 src/views/company/userManagement/operator)

## 验证与归属
- 验证证据: extracted source=cursor session=f96d8adf-ae69-47ed-80a8-22928637bcaa
- 所属项目: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_form_required",
  "source_extraction_id": "421380447a664b42a4a5d20500dc7f5e",
  "version": 1,
  "memory_type": "entities"
}
-->