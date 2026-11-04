# 参考设计图修改楼盘表UI
苏州市房地产监测V3 中楼盘表页面已按两张设计图改完，图表与列表视图均用真实组件配假数据验证通过。

## 页面与视图改动
- `src/views/projectManagement/buildingTable/index.vue` 重写：拆成「项目信息」与「楼盘表」两张卡片，去掉内嵌 Tab 与顶部楼幢标签行，改右上角「图表视图/列表视图」分段切换
- 图表视图：楼幢横向标签（1幢、2幢…），「楼盘状态：」图例行（可售、合同草签、备案申请、合同备案、自留、抵押、限制）+ 右侧「状态统计」弹出层 + 楼层×单元网格
- 列表视图：左侧竖排楼幢侧栏（选中蓝底高亮），右侧户室表格（序号、户室号、预测建筑面积、实测建筑面积、所属层、房屋用途、状态、操作·查看），底部带分页

## 新增状态模块
- 新增 `components/buildingTableStatus.js`：状态定义统一收口（名称、判定字段 isAvailableSale/isInitial/isPreRecord/isRecord/retention/mortgage/limited、图标配色、可售徽标）
- 含楼层排序和面积取值兜底，兼容 `predictFloorArea`

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 涉及文件：src/views/projectManagement/buildingTable/index.vue、components/buildingTableStatus.js、components/BuildingTableGrid.vue、components/BuildingTableList.vue
- 所属项目：苏州市房地产监测V3；来源会话：session_d78560c48c308d3ff1ae8629726ae3a4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_table_ui",
  "source_extraction_id": "2c072e69afdd4a59a3e7709f2e41e121",
  "version": 1,
  "memory_type": "entities"
}
-->