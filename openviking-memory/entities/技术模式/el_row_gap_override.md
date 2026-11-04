# El Row 覆盖可变 Gap
细节容器 `.detail-from-container.el-row` 带有 `gap: 0` 的特异性高于 `.detail-from-container { gap: var(--detail-block-gap) }`，取消了 Headline 块之间的间距。

## 描述
- 所属项目: Suzhou Real Estate Monitoring V3 (苏州市房地产监测V3), frontend zhi2-web-admin.
- 原始规则 `.detail-from-container.el-row { gap: 0 }` 覆盖了块的间距变量。

## 问题
- 带有 `.el-row` 的规则具有更高的特异性，使得 Headline 中的 `gap: var(--detail-block-gap)` 失效。
- 全局搜索显示仅此一处受影响。

## 解决方案
- 调整优先级（特异性），使间距来自容器的 flex gap 或 `.detail-from-container > .el-form` 中的 `row-gap`。
- 调整后，块之间的间距被正确提供。

## 验证
- 验证证据: src=苏州市房地产监测V3/060.md
- 涉及文件: Headline/index.vue; styles/detail-form.scss; styles/index.scss; companyManagement/components/AgencyBasicInfoForm.vue; AgencyBasicInfoDetail.vue; vite.config.js; e2e/fixtures/company-menu-config.js; e2e/company/institution-register-real-api-flow.spec.js
- 会话: 5180d428-0584-4329-9241-d8565c0dbc3e; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_row_gap_override",
  "source_extraction_id": "4874608f104944719aa2f486c341f696",
  "version": 2,
  "memory_type": "entities"
}
-->