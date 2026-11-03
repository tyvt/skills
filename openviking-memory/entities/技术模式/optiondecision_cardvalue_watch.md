# 选项表决详情切到「投票信息」须 watch mainCardValue 重置 cardValue
太仓G端选项表决详情从表决项切到顶层「投票信息」时，因 cardValue 滞留导致底部区域空白，需 watch mainCardValue 强制重置。

## 问题根因
- 复现路径：基本信息 → 表决项(子 Tab cardValue=1) → 顶层「投票信息」，子 Tab 只剩「决策明细」(name:0) 但 cardValue 仍为 1。
- DecisionRangeTable(需 cardValue==0) 与 VotingItemsTable(需 mainCardValue==0) 的 v-if 都不满足，底部空白。
- 仅在 handleMainTabChange 重置 cardValue 有竞态，从表决项切过来易漏。

## 修复方案
- watch mainCardValue，切换顶层 Tab 时强制 cardValue=0 并刷新子表。
- 合并重复的 DecisionRangeTable 实例，用 mainCardValue 控制 show-search/show-vote/show-icon（对齐一般表决详情）。
- showVoteResult 等入口也应走同一重置逻辑。

## 验证与归属
- 验证：会话 f7e76921 用户报选项表决详情切换 Tab 后决策明细不显示；结论定位 cardValue 滞留与 v-if 全假，给出 watch 与组件合并方案。
- 涉及文件：zhi1-web-admin/src/views/estate/optionDecision/detail.vue、optionDecision/components/DecisionRangeTable.vue、zhi1-web-admin/src/components/zsTabs/index.vue
- 所属项目：太仓G；来源会话：f7e76921-282e-489a-956f-276a0ef62028；代码基线：cf80bc8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "optiondecision_cardvalue_watch",
  "source_extraction_id": "dc704c74760d4525ac86f3177b7c0dae",
  "version": 1,
  "memory_type": "entities"
}
-->