# BuildingTable 表头单元仅取首层导致列空白
楼盘表视图若用 tableData[0] 推导表头 units，当各层 unitId 集合不一致时，首层没有的单元整列不渲染，表现为「某单元列全空」。

## 问题背景
- 各名义层拥有的 unitId 集合可能不一致（例如 1 单元只在 2 层及以上出现）。
- 首层没有的单元整列不渲染，易误判为接口无数据。

## 解决方案
- 遍历全部楼层按 unitId 去重汇总 units，再按 unitName 排序。
- 每行按表头顺序用 `getUnitRooms(floor, unitId)` 取户室；列宽按单元独立计算 `getUnitColumns(unitId)`，不假定各层结构相同。

## 验证与归属
- 验证证据：筹备组征集新增报名选户室时楼盘表视图 1 单元无数据，根因为表头 units 仅来自 tableData[0]。
- 涉及文件：zhi2-web-admin/src/views/components/BuildingTable.vue、zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateDialog.vue
- 所属项目：园区公共收益；来源会话ID：473e272c-6e60-4e72-b905-e02eba29cfd7；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "building_header_units",
  "source_extraction_id": "a0dff37d982d44f1904b307947a717bd",
  "version": 1,
  "memory_type": "entities"
}
-->