# 详情页标题按钮因column-reverse跑到页面底部
套用全局 .detail-container 的详情/配置页若把操作区写在 DOM 前面，会因 flex-direction:column-reverse 被反序推到页面底部。

## 问题根因
- 全局样式 .detail-container 使用 flex-direction: column-reverse，视觉顺序与 DOM 顺序相反
- 项目内其它详情页遵循隐藏约定：operation-btn-group/template-header 写在 DOM 末尾，反序后才在顶部
- 物业管理信息月报表模板配置页（monthlyReportTemplate）把 template-header 放在内容之前，被反序推到最底部

## 解决方案
- 新建详情/配置页套 .detail-container 时，操作按钮组、页头操作区一律写在 DOM 末尾
- 若必须让某块保持顶部，把它放到 Headline 之后而非最前面
- 排查时先用 getComputedStyle 看容器 flex-direction，不要先调 margin/padding
- 看到「标题/按钮位置反了」要先怀疑 DOM 顺序而非间距

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 0ccf674f（2026-09-15，基线 320507d）将 template-header 移到 Headline 之后即修复
- 涉及文件：zhi2-web-admin/src/views/publicQuery/monthlyReportTemplate/index.vue、TemplateTreeTable.vue、survey/template/detail.vue、publicQuery/monthlyReport/detail.vue
- 所属项目：苏住房G；来源会话ID：0ccf674f-a815-4bdd-b0ea-8b4c07143b54；代码基线：320507d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_column_reverse",
  "source_extraction_id": "d232d627a6c741e59b90b3a2003fb294",
  "version": 1,
  "memory_type": "entities"
}
-->