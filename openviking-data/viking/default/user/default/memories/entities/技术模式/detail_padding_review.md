# 详情页表单 padding 审查结论
苏州市房地产监测V3 对详情页表单 padding 的 Vue/CSS 审查已完成，并给出合并前处理建议。

## 审查结论
- 水平留白从 Headline 的 `.collapse-content` 挪到「直接子元素」白名单后，表单类（section-form、detail-template、el-row）基本能对齐标题
- Headline 里的表格（sub-container、直接 zs-table 等）和服务方案编辑页的 zs-form 容易缺左右 16px
- brand/detail 查看态从两列改成三列（FORM_COL_THREE），与改前 HALF_LAYOUT 不一致

## ESLint
- 全量 `npm run lint` 在无关 API 文件上已有历史报错，未单独证明本次改动文件有问题

## 处理建议
- 可按审查意见改 index.scss 白名单（补 sub-container / zs-form 等）并核对 companyScheme 编辑态留白

## 涉及文件与归属
- 涉及：`index.scss`、`detail-form.scss`、`Headline/index.vue`、`src/styles/index.scss`
- 所属项目：苏州市房地产监测V3；来源会话ID：e0841e83-95db-4936-a337-ee597853b74f；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_padding_review",
  "source_extraction_id": "48df189a4d5045ffbb5db9580c9d5c11",
  "version": 1,
  "memory_type": "entities"
}
-->
