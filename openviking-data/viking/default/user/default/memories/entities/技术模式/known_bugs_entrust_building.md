# 楼幢关联与楼幢信息已知 Bug
苏州市房地产监测V3 中委托代售选楼与工程进度变更楼幢存在两个逻辑 Bug，属典型回归风险。

## Bug 1：失败后仍提示添加成功
- 文件：zhi2-web-admin/src/views/presale/entrustSale/components/EntrustBuildingTable.vue（166-173 行）
- 类别：LOGIC_BUG；严重度：high
- 描述：`handleAddBuildings` 在循环中某次 `/presale/entrustSaleBuilding/add` 返回非 200 时会 `break` 并弹出错误，但循环结束后仍无条件调用 `msgSuccess('楼幢添加成功')`，批量选楼时会出现部分已入库却提示全部成功的误导

## Bug 2：总层数误写入地上层数
- 文件：zhi2-web-admin/src/views/supervision/progress/change/components/BuildingChangeDialog.vue（及 EntrustBuildingTable.vue 相关）
- 描述：总层数被误写入地上层数字段，导致楼幢信息数据错误

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：19988e31-ee30-4377-bf1a-971fdfe9ef96；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "known_bugs_entrust_building",
  "source_extraction_id": "a49f22e6571844eeb473d75963a3686e",
  "version": 1,
  "memory_type": "entities"
}
-->