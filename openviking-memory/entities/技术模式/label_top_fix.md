# label_top_fix
苏住房G V3 详情页 label-top 导致表单项标签水平居中且 Headline 标题左缘错位，已通过改 align-items 与移除 margin-left 修复。
## 问题现象
- 详情页 label-top 使表单项 align-items:center 导致标签水平居中
- Headline/index.vue 中 .collapse-title 的 margin-left:6px 造成标题左缘错位
## 解决方案
- detail-form.scss 与 index.scss 改设 align-items:flex-start 并左对齐标签
- Headline/index.vue 移除 .collapse-title 的 margin-left 以对齐左缘
## 验证与归属
- 验证证据：src=苏州市房地产监测V3/015.md
- 涉及文件：scripts/remove-label-width.mjs、companyManagement/components/AgencyBasicInfoForm.vue、scripts/check-no-label-width.mjs、brand/components/FranchiseDialog.vue、companyScheme/detail.vue、components/Headline/index.vue、main.js、package.json 等
- 所属项目：苏州市房地产监测V3；来源会话：d66af6cc-b7f2-44ca-9be4-3063e22d95a8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "label_top_fix",
  "source_extraction_id": "0c7262dd765e400daf7bc9b7477a7669",
  "version": 1,
  "memory_type": "entities"
}
-->