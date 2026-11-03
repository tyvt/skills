# 楼幢/单元/房屋链路项目改宗地号五处同步改造
将开发项目/项目名称统一改为宗地号(地号)时，单次需求横跨 building、unit、house、houseImport 及 buildingChange/unitChange 五处需同步改造。

## 改造范围
- 列表筛选项与列、导出查询参数（如 `landPlotCode`）统一由 projectName 改为宗地号
- 新增编辑表单宗地改为 zs-select-dialog 手动选择且必填
- 详情查看只展示宗地号

## 变更单特殊点
- 变更单详情用 `landPlotId` 过滤楼幢选择
- 保证 `contentInfo` 字段顺序与编辑表单一致

## 风险提示
- 漏改变更列表或导出参数会导致筛选仍带 projectName、导出列与界面不一致

## 验证与归属
- 验证证据：会话 3f1080ab 楼幢/单元/房屋备案与信息全模块去项目改宗地；单元变更 detail 宗地必选与 landPlotId 过滤楼幢
- 涉及文件：zhi2-web-admin/src/views/building/building/index.vue、unitChange/detail.vue、buildingChange/index.vue
- 所属项目：园区公共收益；来源会话：3f1080ab-31a3-4bd1-8719-29399ccf04ed；代码基线：f783ca2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_landplot_refactor",
  "source_extraction_id": "05eb26b7a0194582af009060b1946206",
  "version": 1,
  "memory_type": "entities"
}
-->