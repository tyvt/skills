# mainCardValue==0 致明细页决策明细区域隐藏
mainCardValue == 0 条件仅在「基本信息」页显示，隐藏业主决策明细/投票信息页的明细区域。

## 问题根因
- mainCardValue == 0 的条件判断仅在「基本信息」页触发显示，导致业主决策明细/投票信息页的明细区域被隐藏

## 解决方案
- 一般表决与选项表决明细页改用完整版 DecisionRangeTable
- VoteView 合并 getVoteResult 与 listOption 展示全部表决项，占比保留 2 位小数

## 验证与归属
- 验证证据：extracted source=cursor session=e13c8223-12b6-4281-8230-5e3a8484ebd6
- 涉及文件：zhi1-web-admin/src/views/estate/decisionCommon/config.js、generalDecision/detail.vue、maintainDecision/detail.vue、optionDecision/detail.vue、ownerDecision/detail.vue、decisionCommon/components/VoteView.vue；昆山/src/views/estate/ownerDecision/detail.vue、optionDecision/detail.vue
- 所属项目：太仓G/昆山；来源会话：e13c8223-12b6-4281-8230-5e3a8484ebd6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maincardvalue_hide",
  "source_extraction_id": "afc8268d11fc4ff59123fa7eb053001d",
  "version": 1,
  "memory_type": "entities"
}
-->