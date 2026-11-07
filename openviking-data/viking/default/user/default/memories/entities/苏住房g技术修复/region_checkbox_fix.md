# 行政区域银行授权复选框字体颜色全局修复（苏住房G）
苏住房G 项目在全局样式 element-ui.scss 中为 el-checkbox 补充与 el-radio 一致的文字颜色，修复复选框文字偏淡问题。

## 问题原因
- 全局样式 element-ui.scss 已为 el-radio 设置黑色文字 #000，但 el-checkbox 仍用 Element UI 默认 #606266
- 「公共收益」「阳光物业」复选框文字比其它表单项更淡

## 修改说明
- 为 `.el-checkbox__label` 等补充 `color: #000000 !important`
- 禁用态 `.el-checkbox__input.is-disabled + .el-checkbox__label` 设为 `#666666 !important`
- 全局修复，项目中所有 el-checkbox 均受益

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：element-ui.scss（全局样式）、zhi2-web-admin/src/views/system/regionBankAuth/detail.vue、zhi2-web-admin/src/views/system/regionBankAuth/utils.js
- 来源会话ID：26801714-1ca0-4cc8-9ca1-0768cabd84a4

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "region_checkbox_fix",
  "source_extraction_id": "4f84ed465fbf45709ebc9281d8ed22a1",
  "version": 1,
  "memory_type": "entities"
}
-->