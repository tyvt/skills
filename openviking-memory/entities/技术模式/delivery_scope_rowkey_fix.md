# 交付范围表格多选列缺 row-key 警告修复
苏州市房地产监测V3 的 DeliveryScopeSection 中 zs-table 使用多选列未提供 row-key，数据更新时报 [Vue warn] 错，已修复。

## 问题根因
- DeliveryScopeSection 的 zs-table 使用 zs-select-column 多选列
- Element UI 的 ElTable 在有选择列且数据更新时必须提供 row-key
- loadScopePage 设置 scopeList 时因缺 row-key 报错

## 修复方案
- 表格增加 :row-key="getRowKey"
- getRowKey(row) 返回 row.deliveryScopeId || row.buildingId
- 已保存记录（服务端分页）使用 deliveryScopeId
- 草稿楼幢（新建未保存）使用 buildingId

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：supervision/projectDelivery/components/DeliveryScopeSection.vue、src/components/zs-table、src/components/zs-table/zs-table.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：a11f72ad-6551-4d69-a2d0-e12bb33736a2


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "delivery_scope_rowkey_fix",
  "source_extraction_id": "66ee6a2008f240c5a4f96b7c3e61c2fa",
  "version": 1,
  "memory_type": "entities"
}
-->