# 监管协议终止表单右缘对齐
苏州市房地产监测V3 监管协议终止详情表单已完成右缘对齐与宽字段栅格优化。

## 核心改动
- 全局列间距 variables.css / detail-form.scss / index.scss：--detail-collapse-col-gap 由 24px 调为 32px，.section-form column-gap 改用该变量
- detail-form.scss 新增 .section-field--wide { grid-column: span 2 }，≤768px 与 --full 回退单列
- 本页编辑态 end/detail.vue 及 detailLayout.js 同步适配

## 涉及文件与归属
- 涉及文件：variables.css、detail-form.scss、index.scss、supervision/agreement/end/detail.vue、utils/detailLayout.js
- 所属项目：苏州市房地产监测V3
- 来源会话：c6c36197-e683-4727-86cf-a23980045e4e
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agreement_end_form_align",
  "source_extraction_id": "fd68f442701b43a49b6d854439887c52",
  "version": 1,
  "memory_type": "entities"
}
-->