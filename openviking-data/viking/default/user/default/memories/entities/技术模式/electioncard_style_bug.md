# ElectionCardList错误引入详情页样式致卡片无样式堆叠
在太仓一网通办H5中，ElectionCardList.vue 错误引入了详情页样式 @/views/decision/styles/card.css，该样式缺少 .card-list 布局类，导致卡片无样式堆叠。

## 根因
- ElectionCardList.vue 错误引入详情页样式 @/views/decision/styles/card.css
- 缺少 .card-list 布局类，导致卡片无样式堆叠

## 修复
- 新增列表容器、图文横向布局及底部对齐样式，与 CardList.vue 保持一致

## 验证
- 证据：提取来源=cursor 会话=69a22d86-4cf1-4cd8-b941-8efefd992b50
- 涉及文件：src/views/election/ElectionIndex.vue、src/views/election/components/ElectionCardList.vue、src/views/decision/styles/card.css、src/views/components/TagTrapezoid.vue、src/views/decision/components/CardList.vue、src/views/owner-decision/components/CardList.vue、src/store/election.ts
- 所属项目：太仓一网通办H5；来源会话：69a22d86-4cf1-4cd8-b941-8efefd992b50；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "electioncard_style_bug",
  "source_extraction_id": "cd662961a7984e81aae67c596fea893b",
  "version": 2,
  "memory_type": "entities"
}
-->
