# 首页待办数量字段修复（苏住房G）
苏住房G 项目修复首页待办数量显示错误。

## 问题根因
- 后端待办数量字段为 todoNum，而 loadTaskCounts 只读 todo、todoCount，解析不到当成 0。
- finishedNum、myProcessNum 已在映射，故正常。

## 修复方案
- 在 index-v2.vue 待办字段列表增加 todoNum：pickTaskCountField(counts, ['todo','todoCount','todoNum'])
- E2E mock 改为使用 todoNum 与接口一致
- 刷新后待办卡片显示 3409

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：home/index-v2.vue、api/portal/home.js、home/v2/components/TodoPanel.vue
- 所属项目：苏住房G；来源会话：360057ae-d967-41ed-b07f-792998bb09db

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_todo_count_fix",
  "source_extraction_id": "fcdaef81ba1e46148b85f174762cf478",
  "version": 1,
  "memory_type": "entities"
}
-->