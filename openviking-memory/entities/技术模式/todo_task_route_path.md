# 待办任务跳转路径兼容修复
园区公共收益项目待办/流程跳转原传路由地址改为组件路径，新增getTodoTaskRoutePath统一兼容历史数据。

## 问题根因
- 原来提交的path字段传的是路由地址，现改为组件路径
- 需兼容历史数据保证旧跳转正常

## 解决方案
- 在todoTask.js新增公共方法getTodoTaskRoutePath，所有待办/流程跳转统一调用
- 兼容逻辑：path以detailId结尾或path以/开头则作为历史路由直接使用；否则通过getRouterPathByFilePath转换并拼接detailId

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：代码逻辑审查与历史数据兼容
- 涉及文件：zhi2-web-admin/src/utils/todoTask.js、src/views/flowable/todo.vue、src/views/flowable/finished.vue
- 所属项目：园区公共收益；来源会话：83f986d1-0f52-47df-92db-9fd124710132；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_task_route_path",
  "source_extraction_id": "31fe75b5c4d544939feb0480b86197a7",
  "version": 1,
  "memory_type": "entities"
}
-->