# 首页待办条数独立于公示公告常量
门户首页待办与公示公告条数不必共用同一 limit，可定义独立常量并设置接口与 UI 一致。

## 实现方式
- `index-new.vue`（及 homeDataMixin 拉数）中待办与公示公告条数不必共用同一 limit
- 可定义 `HOME_TODO_LIST_LIMIT = HOME_LIST_LIMIT + 2`（示例 5 条待办、3 条公告）
- `getHomeTodos` 的 `pageSize` 与前端 `displayTodos` 截取须同一常量，避免接口多取而 UI 仍只显示 3 条

## 验证与归属
- 验证证据：用户要求待办多 2 条，新增 HOME_TODO_LIST_LIMIT，接口 pageSize 与 displayTodos 均改用该常量
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue
- 所属项目：门户；来源会话ID：29e35e50-d116-4538-956e-b0bde62451d6；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_todo_limit",
  "source_extraction_id": "31f13fc945de4a1380d778018b63e80a",
  "version": 1,
  "memory_type": "entities"
}
-->