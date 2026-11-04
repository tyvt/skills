# 操作列去竖线样式勿全局写死
在 zs-operate-column 或 element-ui.scss 全局去除操作列左边框会误伤全站列表页竖线，应限定表格级 class。

## 问题背景
- 在 `zs-operate-column` 或 `element-ui.scss` 对 `.zs-operate-column-cell` 全局 `border-left: none` 并调整 `last-child` 分隔线排除操作列时，所有使用该操作列的列表页最后一列与操作列间竖线都会消失（含带小计的 zs-table）
- 斑马纹固定列 `#fafafa` 同理：全站改 element-ui 会影响所有 stripe 表格，与首页重复声明易三层维护

## 正确做法
- 若仅需首页待办表效果，应限定 `.todo-table` 或表格级 class
- HomeTodoTable + element-ui + zs-operate-column 三层 #fafafa 重复声明应避免

## 涉及文件
- zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue
- zhi2-web-admin/src/styles/element-ui.scss
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/views/home/components/HomeTodoTable.vue

## 验证与归属
- 验证证据：审查 [MEDIUM] 指出操作列左边框全站移除、全局固定列斑马纹、三层 #fafafa 重复
- 所属项目：门户；来源会话ID：c8240256-b927-47c2-8905-36e64b77e5f3；代码基线：ac6513b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operate_column_border",
  "source_extraction_id": "31f13fc945de4a1380d778018b63e80a",
  "version": 1,
  "memory_type": "entities"
}
-->