# 表决项与决策范围表格空白修复
产品2.0 项目修复自治模块表决项表格、决策范围及详情页的空白与布局问题。

## 修改文件
- autonomy/multiply/detail.vue
- autonomy/multiply/components/VotingItemsTable.vue
- autonomy/option/components/DecisionRangeTable.vue

## 主要改动
- 表决项表格：去掉 position:absolute 按钮定位，改用 Headline 的 #right 插槽放新增/删除
- 操作列取消 fixed:right 避免固定列与数据列间空白，el-table-column 改 zs-table-column
- 表格开启 auto-height 按内容高度自适应，避免多余空白行
- 决策范围：zs-search-form 新增 #actions 插槽，按钮放查询/重置正下方右侧
- 详情页去掉外层重复 Headline 包裹，避免双层标题和布局冲突

## 验证与归属
- 所属项目：产品2.0；来源会话：7a62e9a6-5f35-46c3-b3af-b44bad9ba866；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voting_decision_blank_fix",
  "source_extraction_id": "3a07d26a6e0e40bea701d7282e393f25",
  "version": 1,
  "memory_type": "entities"
}
-->