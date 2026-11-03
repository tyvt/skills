# 统计卡片指标块嵌套布局
苏住房G 详情页统计卡片用「卡片→子块行→子块→标签/数值」四层结构，子块须显式 height:100% 才能等高分栏。

## 问题背景
- 每张卡浅色底+细边框+圆角，底部横向并列若干指标子块（标签上、数值下、字号加大加粗）
- 第三层块是第二层 flex 子项，默认 height:auto 只由内容撑开
- 第四层在块内 flex 纵向居中，块无确定高度时居中基准变内容自身高度，高度差暴露（含边框更明显）

## 解决方案
- 子块显式声明 height:100%，吃到父行高度
- 子块内部 display:flex + flex-direction:column + align-items:center + justify-content:center 纵向居中
- 多数值并排时在块内再加横向 flex，不写死宽度或 float
- 整卡与子块用同色系两档深浅（外层浅、内层略深），不靠加深阴影

## 验证与归属
- 涉及文件：property/feeDeclare2/detail.vue、components/feeBindScopeTable.vue、index.vue
- 所属项目：苏住房G；来源会话：bdac3433-a0bc-4d7d-95c4-8c729d67f294；代码基线：fb3e960

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "card_nested_blocks",
  "source_extraction_id": "dafee6b6ceb14a54b7ef69adae82dbce",
  "version": 1,
  "memory_type": "entities"
}
-->