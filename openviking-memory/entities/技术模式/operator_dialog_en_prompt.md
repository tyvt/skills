# 操作人员弹窗必填英文提示修复
园区公共收益项目修复新增/关联企业用户弹窗因 `el-form-item` 多余 `required` 属性导致英文校验提示覆盖中文提示的问题。

## 问题原因
- `el-form-item` 上的 `required` 属性会额外注入一条没有 `message` 的校验规则
- Element UI 默认显示英文提示（如 `phone is required`、`idNumber is required`），覆盖 `rules` 里已配置的中文提示

## 修复内容
- `operatorAddDialog.vue`（新增企业用户）移除多余 `required` 属性
- `operatorDialog.vue`（关联企业用户）移除多余 `required` 属性
- `rules` 已含 `required: true` 及中文 `message`，必填星号仍正常显示
- 修复后提示：联系电话 → 联系电话不能为空；证件号码 → 证件号码不能为空

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：f96d8adf-ae69-47ed-80a8-22928637bcaa；代码基线：none
- 涉及文件：`operatorAddDialog.vue`、`operatorDialog.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operator_dialog_en_prompt",
  "source_extraction_id": "f06685698d72453c94065c8385271862",
  "version": 1,
  "memory_type": "entities"
}
-->