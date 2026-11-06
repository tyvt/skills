# 委托代售楼幢表操作列按钮 UI 对齐
苏州市房地产监测V3 的委托代售楼幢表操作列已对齐预售许可楼幢表样式。

## 修改内容
- 去掉手写操作列里 `type="text"` 的「删除」链接
- 改用 `zs-operate-column`，与 `PresaleBuildingTable.vue` 一致
- 新增 `rowButtons`：`type: 'danger'`、`data-testid: 'entrust-sale-building-delete-btn'`，删除逻辑未改
- 待提交（`bizState === '0'`）详情页打开「委托楼幢列表」，行内「删除」为红色 danger 小按钮（操作列默认固定在右侧）

## 验证与归属
- 涉及文件：`zhi2-web-admin/src/views/presale/entrustSale/components/EntrustBuildingTable.vue`、`PresaleBuildingTable.vue`、`e2e/presale/entrust-sale-detail-layout.spec.js`
- 验证：无新 lint 问题，e2e 规格 1 通过
- 所属项目：苏州市房地产监测V3
- 来源会话ID：606c9465-2d74-4567-b434-869a5da9c1d8
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_building_table_ui",
  "source_extraction_id": "e69a9aaf65ce4fd18a27899f934dccdf",
  "version": 1,
  "memory_type": "entities"
}
-->