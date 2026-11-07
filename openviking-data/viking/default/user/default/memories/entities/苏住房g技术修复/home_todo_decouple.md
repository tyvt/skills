# 关键数据区域切换不再刷新待办（苏住房G）
苏住房G 首页 v2 已改动，切换关键数据区域时不再触发待办数据接口。

## 改动内容
- `index-v2.vue` 的 `onKeyRegionChange` 去掉 `loadTodoPanel()`，切换关键数据区域只刷新关键数据、公共收益、报修、学习园地
- 待办与区域解耦：`loadTaskCounts` 改为 `getTaskCount({})`（不带 `regionCode`）；`loadTodoPanelList` 仅用 `{ pageNum: 1, pageSize: 4 }`
- 两处加注释说明待办按用户维度、不随关键数据区域变化

## 请求触发路径
- 首次 `loadAll()`：`taskCount` + `todoTaskList`（无 `regionCode`）
- 关键数据区域切换：无待办请求
- 待办 Tab 切换：仅列表接口

## 验证与归属
- Vue 侧 review 结论 OK，当前文件无新 lint 问题；浏览器切换关键数据区域 Tab 时 Network 不应再出现 `taskCount` / `todoTaskList`
- 所属项目：苏住房G；来源会话：9baedf91-d8d6-40c2-8e79-314e529e757a；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "home_todo_decouple",
  "source_extraction_id": "d8a74d1aab5b4d0b85d30ea4f6cc11b7",
  "version": 1,
  "memory_type": "entities"
}
-->