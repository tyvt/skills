# 业委会选举未参与列表卡片样式缺失
太仓一网通办H5 的 C 端业委会选举「未参与」列表页因 `ElectionCardList.vue` 引用错误样式文件，导致卡片呈现无样式裸 HTML 布局，已修复。

## 问题根因
- `ElectionCardList.vue`（业委会选举列表卡片）引用了错误样式文件 `@/views/decision/styles/card.css`
- 该文件只包含详情页用的 `.card`、`.title` 等样式，没有列表卡片所需的 `.card-list`、`.card-item`、`.center`、`.bottom` 等布局样式
- 导致页面呈现为无样式裸 HTML：卡片无白色背景和圆角、图片标题日期垂直堆叠、「选举中」角标定位异常、「参与选举」按钮位置错乱

## 修复方案
- 在 `ElectionCardList.vue` 中补全列表卡片样式，与业主决策模块 `CardList.vue` 保持一致
- 包括：卡片容器与间距、顶部项目名称与状态角标、中间图片与标题横向布局、底部日期与操作按钮对齐
- 刷新「未参与」列表页后卡片应正常显示；若仍有异常需说明具体表现

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：`ElectionCardList.vue`、`@/views/decision/styles/card.css`、`CardList.vue`、`src/views/election/ElectionIndex.vue`、`src/views/election/components/ElectionCardList.vue`、`src/views/components/TagTrapezoid.vue`
- 所属项目：太仓一网通办H5；来源会话：69a22d86-4cf1-4cd8-b941-8efefd992b50；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "election_cardlist_bug",
  "source_extraction_id": "bfe329f96d4e43a4bc9b6e212fc09258",
  "version": 1,
  "memory_type": "entities"
}
-->