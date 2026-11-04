# VoteRangeDialog 双层 Headline 嵌套修复
惠山二期G 业主自治线下表决 VoteRangeDialog 与 CandidateConfigTable 双层 Headline 导致「表决项+空框收起」的缺陷与修复约定。

## 现象
- 线下表决决策维护页面「表决项」区域出现两层带「收起」的框，外层标题「表决项」，内层仅剩「收起」无标题。

## 根因
- 外层 `VoteRangeDialog` 用 `<Headline title-text="表决项" :show-action="false">` 只包标题。
- 内层 `CandidateConfigTable.vue` 根节点又是 `<Headline :title-text="titleText">`，调用处未传 `titleText` 致内层标题为空，只剩折叠控件。

## 修复方案
- `CandidateConfigTable` 去掉根级 Headline，根改为 `.sub-container`，标题/折叠由外层 VoteRangeDialog 单个 Headline 统一提供。
- 外层 Headline 恢复默认 `show-action`，使「表决项 收起」与下方「弃权」区块单层内联对齐。
- 删除失效的 `titleText` prop。
- `election/../decision/CandidateConfigTable.vue` 是独立同名文件，改 option 目录不影响选举模块；`decisionType=='SORT'` 分支单独 `:show-action="false"`。

## 验证与归属
- 验证：会话 3f7e696d 用户反馈线下表决「收起多了一层框」，定位双层 Headline 并修复。
- 涉及文件：autonomy/option/components/VoteRangeDialog.vue、autonomy/option/components/CandidateConfigTable.vue、components/Headline/index.vue。
- 所属项目：惠山二期G；来源会话：3f7e696d-b4d8-436c-98fe-e297ca14cc3e；代码基线：d52a061

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_range_headline_nest",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 2,
  "memory_type": "entities"
}
-->