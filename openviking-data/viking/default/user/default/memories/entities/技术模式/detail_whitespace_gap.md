# 表格和 zs-form 缺少 16px 空白间距
在将 .collapse-content 的水平内边距移动到直接子元素白名单时，表格和 zs-form 丢失了 16px 的左右边距。

## 问题原因
- 水平内边距白名单未包含 sub-container、zs-table 和 zs-form
- 导致这些区域缺少 16px 的左右空白间距

## 所需修正
- 在 index.scss 中补充白名单，加入 sub-container 和 zs-form
- 检查 brand/detail 中 FORM_COL_THREE 和 HALF_LAYOUT 的差异

## 涉及文件
- src/styles/detail-form.scss, Headline/index.vue, index.scss
- companyScheme/detail.vue, AgencyBasicInfoForm.vue, brand/detail.vue, repairFunds/finance/rec/detail.vue, detail-template.vue

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/129.md
- 所属项目: 苏州市房地产监测V3; 会话: e0841e83-95db-4936-a337-ee597853b74f; baseline: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：e0841e83-95db-4936-a337-ee597853b74f


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_whitespace_gap",
  "source_extraction_id": "b54e474b6aa74ee0b9f522a7fb39bc63",
  "version": 1,
  "memory_type": "entities"
}
-->
