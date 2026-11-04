# 选项表决详情Tab切换表格布局修复
太仓G 选项表决详情切到「投票信息」后表格体为空（分页有数据），因 el-table 列变化后未重新布局。

## 问题根因
- 复现路径：基本信息 → 表决项 → 投票信息，`showSearch`/`showVote` 变 true 多出「表决状态」「表决方式」等列
- `getList` 已返回数据（86 条）但 el-table 未 `doLayout()`，表体高度 0 行不显示
- 相比一般表决详情缺 tab 切换后的 `doLayout` 与 `pageNum` 重置逻辑

## 修复方案
- `optionDecision/detail.vue` 用 `div` 包裹 `DecisionRangeTable`，与一般表决详情结构一致
- 增加 `:key="'decision-range-'+mainCardValue"`，切换顶层 tab 强制重建表格
- `handleMainTabChange` 切到「投票信息」重置 `cardValue` 并刷新
- `refreshSubTabData` 重置 `pageNum`、调 `getList()` 与 `doLayout`

## 验证与归属
- 涉及文件：`optionDecision/detail.vue`、`DecisionRangeTable.vue`、`mixins/listMixins.js`、`ownerDecision/detail.vue`
- 所属项目：太仓G；来源会话：642bb8f5-b288-4d41-8b2a-f3c3c981319f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_tab_layout",
  "source_extraction_id": "2dd7391766cd43be9516f6aa2465c206",
  "version": 1,
  "memory_type": "entities"
}
-->