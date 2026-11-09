# 楼盘表户室格空白渲染
楼盘表图表视图户室格空白，是因后端 selectBuildHouse 返回的 7 个状态字段均无 '1' 命中，前端如实渲染无状态，非前端 bug。

## 现象
- 楼盘表图表视图中 401/301/201/101 等户室格完全空白，连"可售"绿底都没有
- 列表视图走另一接口 lpbHousePage 显示"状态"列，若该列也为空/'-' 则印证户室无状态

## 根因
- 图表视图依赖 POST /building/house/selectBuildHouse 返回的 7 个布尔标志字段
- 7 字段为 isAvailableSale、isInitial、isPreRecord、isRecord、retention、mortgage、limited，值为 '1' 才渲染对应状态
- 空白 = 7 字段均非 '1'，可能户室确无业务状态，也可能后端未回填状态字段

## 渲染逻辑
- 各状态映射：可售=isAvailableSale、合同草签=isInitial、备案申请=isPreRecord、合同备案=isRecord、自留=retention、抵押=mortgage、限制=limited
- 前端仅按标志位渲染，无默认兜底态，故全空时格子完全空白

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/projectManagement/buildingTable/、BuildingTableGrid.vue、buildingTableStatus.js
- 来源会话：2026-11-09 楼盘表空白状态排查

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_table_blank_cell",
  "source_extraction_id": "17bf40b9c7594f50a310064d8138e74a",
  "version": 1,
  "memory_type": "entities"
}
-->