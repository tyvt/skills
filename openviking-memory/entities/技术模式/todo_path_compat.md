# 待办跳转历史path数据兼容
园区公共收益(zhi2-web-admin)原待办/流程跳转未兼容历史数据 path 格式，导致路由错误。

## 问题根因
- 原待办/流程跳转未兼容历史 path 格式，路由解析错误

## 解决方案
- 在 zhi2-web-admin/src/utils/todoTask.js 新增 getTodoTaskRoutePath
- 依据 path 是否以 detailId 结尾或 / 开头判断并兼容历史数据
- 统一所有待办跳转入口

## 涉及文件
- src/views/flowable/todo.vue、finished.vue、process.vue
- src/components/ZsSubmit/index.vue、src/utils/ruoyi.js、src/utils/todoTask.js
- src/views/home/components/TodoTable.vue、src/components/OperationBtnGroup/index.vue

## 验证与归属
- 验证证据：src=园区公共收益/015.md
- 来源会话ID：83f986d1-0f52-47df-92db-9fd124710132；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_path_compat",
  "source_extraction_id": "b3c359ee43174392b704337490851bd2",
  "version": 1,
  "memory_type": "entities"
}
-->