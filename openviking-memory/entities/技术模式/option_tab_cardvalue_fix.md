# 选项表决详情Tab切换内容消失修复
太仓G端选项表决详情按基本信息→表决项→投票信息切换后底部无组件渲染，根因是 cardValue 未随 tab 重置，已通过监听 mainCardValue 修复。

## 问题根因
- 复现路径：基本信息 → 表决项 → 投票信息
- 切到「投票信息」后子 tab 只剩「决策明细」（`name: 0`），但 `cardValue` 仍停留在 `1`（表决项）
- 三个 `v-if` 均不满足：`DecisionRangeTable` 需 `cardValue == 0`，`VotingItemsTable` 需 `mainCardValue == 0`
- 原先仅在 `handleMainTabChange` 重置 `cardValue`，tab 点击切换存在时序问题

## 修复方案
- 合并两个 `DecisionRangeTable` 为一个，用 `mainCardValue` 动态控制 `show-search`、`show-vote`、`show-icon`
- 监听 `mainCardValue`，切换顶层 tab 时始终将 `cardValue` 重置为 `0` 并刷新子 tab 数据
- `showVoteResult` 按钮同样走上述 watch，避免从「表决项」点「表决结果」后复现

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：optionDecision/detail.vue、components/DecisionRangeTable.vue、ownerDecision/detail.vue
- 所属项目：太仓G；来源会话：f7e76921-282e-489a-956f-276a0ef62028

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_tab_cardvalue_fix",
  "source_extraction_id": "d961989966bf414fa4cdf5a06897d486",
  "version": 1,
  "memory_type": "entities"
}
-->