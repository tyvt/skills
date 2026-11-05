# 学习园地列表缺少 tab 参数修复
苏住房G项目首页 `getStudyList` 因未传 `tab` 参数报错，已在 home.js、index-v2.vue、StudyPanel.vue 修复。

## 问题根因
- 接口 `getStudyList` 要求查询参数 `tab` 不能为空，但首页仅传 `pageNum`、`pageSize`、`regionCode`
- 返回 `1105: tab不能为空`；学习园地已有 5 个 Tab（1~5）但仅 UI 切换未参与请求

## 修复内容
- `home.js`：`getStudyList` 默认带 `tab: '1'`，调用方可覆盖
- `index-v2.vue`：维护 `studyTab`，请求传入 `{ ...queryParams(), tab: this.studyTab }`，切换 Tab 重新拉取
- `StudyPanel.vue`：用 `activeTab` 属性 + `tab-change` 事件与父组件联动

## 涉及文件与归属
- 文件：`home.js`、`index-v2.vue`、`StudyPanel.vue`
- 所属项目：苏住房G；来源会话：6bf37b7b-6069-4f69-bd6d-69fac837642a
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "study_tab_fix",
  "source_extraction_id": "513adfa05f2944cc8ff76ab9dbfa86cd",
  "version": 1,
  "memory_type": "entities"
}
-->