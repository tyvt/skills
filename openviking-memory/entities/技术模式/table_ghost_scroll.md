# 表格幽灵滚动修复
苏州市房地产监测V3 中 zs-table 修复列多总宽超出容器时被误判为「幽灵滚动」导致右侧列裁切且无法横向滚动的问题。

## 问题根因
- 旧逻辑在溢出宽度 ≤ 操作列宽度 + 48px 时就隐藏滚动条
- 品牌管理有 10+ 列，表头很长，内容最小宽度远大于可用区域，本应显示横向滚动条却被错误隐藏

## 修复内容
- 区分真实溢出与幽灵溢出：仅当「内容最小宽度 ≤ 可分配宽度」且溢出 ≤ 固定操作列宽度时，才隐藏滚动条（幽灵滚动）
- 宽表强制可滚动：内容超出可用区域时设置 overflow-x: auto
- 默认样式：表格 body-wrapper 默认 overflow-x: auto

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zs-table-column.vue、zs-table.vue
- 所属项目：苏州市房地产监测V3；来源会话：73b1d25a-7ccc-4c27-8b93-e143c1c0945f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_ghost_scroll",
  "source_extraction_id": "a43abec617b04cbbb35cf2e96893e74d",
  "version": 1,
  "memory_type": "entities"
}
-->