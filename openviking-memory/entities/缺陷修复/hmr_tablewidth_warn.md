# Vue 未注册 computed 的 HMR 警告
在 Suzhou Housing G 项目中，模板在 HMR 后引用了未注册的 computed `tableWidth`，导致警告。

## 原因与解决
- 模板使用了独立的 computed `tableWidth`，其在热更新中失败。
- 在 buildStatColumnWidths 中，返回值添加了 `tableWidth` 字段。
- 模板改为使用 `columnWidths.tableWidth`。
- 移除了冗余的 computed `tableWidth` 和 `firstColWidth`（第一列 280px 已由工具处理）。

## 涉及的文件
- src/views/publicQuery/monthlyReportStat/detail.vue
- src/utils/monthlyReport.js

## 验证
- 验证证据: 苏住房G/089.md (内部文档).
- 源会话: e2b799d6-2c74-4d75-98c4-123b9c9d51db.
- 代码基线: none.

<!-- MEMORY_FIELDS
{
  "category": "缺陷修复",
  "name": "hmr_tablewidth_warn",
  "source_extraction_id": "d932d4a67f654d5dbfff00e631306d33",
  "version": 1,
  "memory_type": "entities"
}
-->
