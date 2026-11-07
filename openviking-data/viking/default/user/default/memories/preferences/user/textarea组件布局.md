- textarea 组件（.el-textarea 或 .zs-textarea）应在 detail-form.scss 中通过 grid-column: 1 / -1 全局占据整行整列。
- 在 Headline 折叠区域和对话框中，el-col 必须具有强制宽度 100%。
- 在 @media (min-width: 768px) 中，在末尾重新声明以避免覆盖。
- 在 detail-template.vue 中，当 keepSpan 不为 true 时，getItemSpan 对 type === 'textarea' 返回固定值 24。
- 涉及文件: detail-form.scss, element-ui.scss, companyBasicInfoShared.js, Step1BasicInfo.vue, detail.vue, index.scss, package.json, detailLayout.js. 验证证据: 苏州市房地产监测V3-rest/002.md.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Layout de componente textarea",
  "source_extraction_id": "772b51dcf2dd4e5b954bbf2076058ae6",
  "version": 1,
  "memory_type": "preferences"
}
-->