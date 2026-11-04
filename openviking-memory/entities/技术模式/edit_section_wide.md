# 两列地址字段避免网格错位
在编辑状态下，字段"项目坐落"在 `el-row` 内占据了16列，留下8列给其余部分，并将"统一社会信用代码"推到了不对齐的第三列。

## 解决方案
- 将编辑状态改为采用 `section-form` 的三列网格
- 普通字段使用 `section-field`
- "项目坐落" 使用 `section-field--wide` 占据两列
- "预售描述" 使用 `section-field--full` 占据整行

## 涉及的文件
- detail.vue, PermitInfoPanel.vue, permitConstants.js
- detail-template.vue, permitExtendConstants.js, permitSelectConstants.js, surveyChangeConstants.js

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/140.md
- 来源会话: f7e32c84-3538-433f-bf02-d17f353e9e06; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "edit_section_wide",
  "source_extraction_id": "11e2b1a202ee409c843bf7caaf319a48",
  "version": 1,
  "memory_type": "entities"
}
-->