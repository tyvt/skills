# 选项表决投票信息占比小数位过长修复
太仓G 选项表决详情页「投票信息」占比显示过长小数位（如 1.1627906976744187），已修复为保留两位小数。

## 问题根因
- 「投票信息」使用 VoteViewLite.vue，三个占比计算属性直接返回浮点运算结果
- `v-money:2` 指令仅对输入框初始值和交互生效，对异步加载后更新的计算属性不自动格式化

## 修复方案
- 在 VoteViewLite.vue 中将「参与户数占比」「参与权利数占比」「参与面积占比」三个计算属性改为 `.toFixed(2)` 保留两位小数
- 与同目录 VoteView.vue 处理方式一致

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：`decisionCommon/components/VoteViewLite.vue`、`VoteView.vue`、`optionDecision/components/VoteView.vue`、`optionDecision/components/VotingItemsTable.vue`、`optionDecision/detail.vue`
- 所属项目：太仓G；来源会话：b1f6d756-0df5-4c21-989e-f70ed877907d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voteviewlite_percent_fix",
  "source_extraction_id": "ba1b615a3ae2479ebe88a812de01811c",
  "version": 1,
  "memory_type": "entities"
}
-->