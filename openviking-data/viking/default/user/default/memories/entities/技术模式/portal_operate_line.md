# 门户固定列表头左侧竖线缺陷
门户首页表格「操作」固定列表头左侧仍出现竖线而数据行已去掉，根因是全局 element-ui scss 对固定列表头末列 th 的 border-left 规则误伤操作列。

## 现象
- 首页门户表格「操作」固定列表头左侧出现竖线
- 数据行已去掉该竖线，仅表头残留

## 根因
- 全局 element-ui.scss 对固定列表头「最后一列 th」的 border-left 规则命中了操作列

## 修复要点
- 选择器排除 hidden 列（th:not(.is-hidden)）并排除 zs-operate-column-cell
- 在 zs-operate-column 主表头与固定列表头的 th.zs-operate-column-cell 统一 border-left:none

## 涉及文件与关联信息
- zhi2-web-admin/src/styles/element-ui.scss
- zhi2-web-admin/src/components/zs-table/zs-operate-column.vue
- 所属项目：门户；来源会话 ID：4e65bc85-2e2e-48dd-82cd-0f971219a637；代码基线：ac6513b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_operate_line",
  "source_extraction_id": "bc404d666a8542279332f9726025d7af",
  "version": 2,
  "memory_type": "entities"
}
-->