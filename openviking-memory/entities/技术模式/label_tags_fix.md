# 物业管理区域标签列遮挡修复
苏住房G项目修复物业管理区域查询列表标签列被固定操作列遮挡及列宽不足截断问题。

## 问题根因
- 标签列 min-width 仅 200px，zs-table-column 对含 el-tag 插槽转固定 width 致长标签裁切
- .label-tags__content 使用 overflow:hidden 导致标签拦腰截断
- 标签列紧邻 fixed="right" 操作列，溢出内容延伸到操作列下方

## 修复内容
- LabelTags 组件超出时改 +N 计数，移除 overflow:hidden
- Tooltip 设 append-to-body + z-index:3000 避免遮挡
- 新增 compact 模式最多展示 2 标签 + +N；增加 .label-tags-column-cell .cell{overflow:hidden}

## 验证与归属
- 所属项目：苏住房G；来源会话：cd131f8a-851c-4400-9f82-ea7bc72a8626
- 涉及 complex/index.vue、dict-tag.vue 等

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "label_tags_fix",
  "source_extraction_id": "6dfa41e409fd42828fcd0b8d43f5a968",
  "version": 1,
  "memory_type": "entities"
}
-->