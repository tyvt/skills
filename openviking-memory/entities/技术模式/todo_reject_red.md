# 待办驳回标识红色【驳回】渲染
园区公共收益(zhi2-web-admin)待办主题中驳回标识需统一渲染为红色【驳回】样式。

## 问题根因
- 原 `utils/todoTask.js` 前缀 `<驳回>` 未统一红色样式，各入口视觉不一致

## 解决方案
- 新增 `TodoTaskTitle.vue` 渲染红色 `#f56c6c` 的 `【驳回】` 标识
- `zs-table-column.vue` 对 `submitTittle` 列接入该组件，首页等同步使用
- 兼容旧 `<驳回>` 前缀，避免历史数据展示异常

## 验证与归属
- 涉及文件：src/utils/todoTask.js、src/views/home/index.vue、src/views/flowable/todo.vue、src/components/zs-table-column/zs-table-column.vue、src/mixins/ListTemplate.js、src/views/flowable/process.vue、src/components/detail-template/detail-template.vue、src/views/flowable/finished.vue
- 来源会话ID：1661f2e6-92c4-4abf-9de9-02e95fd46214；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_reject_red",
  "source_extraction_id": "ff320310ed4d44fca7c9fe7878836a34",
  "version": 1,
  "memory_type": "entities"
}
-->