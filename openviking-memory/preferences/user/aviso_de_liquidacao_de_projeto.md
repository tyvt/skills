- 在 completion/detail.vue 中，维修预算的值绑定 maintainFeeAmountY 并添加必填字段 constructionSettleAmount；切换维修项目时同步以避免残留。
- 在 final/index.vue 中，当 settleWarnFlag===true 时，数值变为红色并带有警告图标和基于 settleWarnMsg 的 tooltip；结算警告应仅依赖于后端字段，绝不依赖于前端计算。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 项目清算通知",
  "source_extraction_id": "1e3d036f52f7441c98a9201c63eb46b7",
  "version": 1,
  "memory_type": "preferences"
}
-->
