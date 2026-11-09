# 多议题表决决策维护收起多一层框
线下表决决策维护的「表决项」区域因两层 Headline 嵌套且内层未传标题，渲染出多余边框，已去除内层 Headline 修复。

## 现象
- 线下表决决策维护页「表决项」区域收起时多出一层框。
- 外层 Headline 标题"表决项"内嵌套一个空标题内层框，仅剩"收起"按钮。

## 根因
- VoteRangeDialog.vue 的「表决项」区域两层 Headline 嵌套。
- 外层 Headline title-text="表决项" 无操作；内层 CandidateConfigTable.vue 根节点自带 Headline 但调用处未传 titleText，导致空标题内层框。

## 解决方案
- CandidateConfigTable.vue 去掉根节点 Headline 包裹，根节点改为 sub-container，删除失效 titleText prop。
- VoteRangeDialog.vue 外层 Headline 统一提供标题与折叠。

## 验证与归属
- 验证证据：extracted source=workbuddy project=惠山二期G。
- 涉及文件：src/views/autonomy/option/components/CandidateConfigTable.vue、src/views/autonomy/option/components/VoteRangeDialog.vue。
- 来源会话ID：3f7e696d-b4d8-436c-98fe-e297ca14cc3e；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "nested_headline_bug",
  "source_extraction_id": "e715db2dfbbd45d092aba2acf15396d8",
  "version": 1,
  "memory_type": "entities"
}
-->