# flex 子项缺最小宽致长文本截断
昆山市民审批详情页 flex 横向布局中长文本因缺 min-width:0 不收缩而横向溢出截断，需改 flex:1 与 min-width:0 实现换行。

## 问题根因
- flex 横向布局中 `.text` 设 `flex-grow: 0` 且缺 `min-width: 0`，长文本不收缩而横向溢出截断。

## 解决方案
- 改为 `flex: 1` 与 `min-width: 0`，增设 `word-break: break-all` 与 `align-items: flex-start` 实现完整换行显示。

## 验证与归属
- 涉及文件：d:/repository/昆山市民/src/pages_examine/examineDetail.vue、d:/repository/昆山市民/src/static/style/common.scss
- 来源会话ID：c9e0ab1a-d943-488e-93f3-b7fa5f8cd74e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "flex_text_truncate",
  "source_extraction_id": "9f5ed67ac35144b098b3ed9d8f44d21c",
  "version": 1,
  "memory_type": "entities"
}
-->