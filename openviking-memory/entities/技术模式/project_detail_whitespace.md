# 项目备案详情底部空白修复
苏州市房地产监测V3 中项目备案等详情页底部 Tab 白卡片空白过大问题已通过 CSS 调整修复。

## 原因
- 底部 Tab 白卡片被设成 flex:1 占满视口剩余高度，tabs-content 跟着拉高
- 子表实际只有几行，空白出现在 Tab 卡片内部、表格下方

## 调整
- zs-tabs / tabs-content 改为 flex:0 1 auto，高度随子表内容收缩
- detail-container 改为整页纵向滚动（overflow-y:auto）并补 padding-bottom: var(--detail-page-padding)
- detail-from-container 不再单独内滚、去掉多余 padding-bottom，区块间距仍用原 gap

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：index.scss、detail-template.vue、AppMain.vue
- 所属项目：苏州市房地产监测V3；来源会话：303fa1b4-adea-4dbe-901f-c5565f43cc2a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_detail_whitespace",
  "source_extraction_id": "2ce6e05076dc4191b626041ebd65d301",
  "version": 1,
  "memory_type": "entities"
}
-->