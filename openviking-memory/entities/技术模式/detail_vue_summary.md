# detail.vue 缺 summary 定义致 zs-table 表格警告
detail.vue 中 zs-table 绑定 :summary-method 与 :show-summary，但 PlanDetail 仅用 detailMixins 未提供这两个成员致表格警告。

## 问题根因
- detail.vue 的 zs-table 绑定 :summary-method 与 :show-summary
- PlanDetail 仅使用 detailMixins，未提供 summary-method 与 show-summary 对应成员
- 列表页经 listMixins→table.js 提供，故 detail 页缺失

## 解决方案
- 在 data 添加 showSummary: false
- 在 methods 添加空实现 showMethod({columns, data}) {}

## 验证与归属
- 所属项目：bugfix
- 验证证据：extracted source=cursor project=bugfix
- 验证证据：src=bugfix/003.md
- 涉及文件：detail.vue；table.js
- 来源会话ID：f6fa84f3-a7b5-454e-a756-e51303a42d72
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_vue_summary",
  "source_extraction_id": "429aaedba67c4a77a524e32086f608a8",
  "version": 1,
  "memory_type": "entities"
}
-->