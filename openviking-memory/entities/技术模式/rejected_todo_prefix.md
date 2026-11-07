# 园区公共收益待办驳回前缀规范
园区公共收益项目(zhi2-web-admin)中，被驳回后回到待提交的单据需在待办主题展示层统一加「<驳回>」前缀。

## 识别与抽取
- 识别驳回单据：comment.type === '3' 或 comment.comment === '驳回'
- 列表是否收录由后端查询决定，前端仅在展示层加前缀
- 新增 utils/todoTask.js，导出 isRejectedTodoTask、formatTodoTaskTitle、normalizeTodoTaskRows

## 规范入口
- flowable/todo.vue 的 listCallback
- home/index.vue 拉待办后
- home/components/TodoTable.vue 三处入口须同步规范化，避免首页与工作中心不一致
- flowable/process.vue（我发起的流程）通过 mixins/listMixins.js 的 listCallback 对 response.rows 规范化后再赋表格数据，统一复用 normalizeTodoTaskRows，避免单独复制字符串规则导致与待办列表视觉不一致

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：接口返回 comment.type === '3' 或 comment.comment === '驳回'；新增 todoTask.js 并改三处入口
- 涉及文件：src/utils/todoTask.js、src/views/flowable/todo.vue、src/views/home/index.vue、src/views/home/components/TodoTable.vue、src/views/flowable/process.vue、src/mixins/listMixins.js
- 所属项目：园区公共收益；来源会话：35f936a1-c453-4bbf-9d57-01b517ff7164、1b62db88-88d8-4a66-9497-8fe956659bab；代码基线：0c9b8c2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rejected_todo_prefix",
  "source_extraction_id": "20c68d54ca9a417f9c53b7e4b8c7bb11",
  "version": 2,
  "memory_type": "entities"
}
-->