# 楼幢类型 buildType 字典配置修复
楼幢类型列原先显示字典编码 4 而非中文名称，根因为字典不匹配，已改用 building_type 字典。

## 问题根因
- 接口返回 buildType 值为 4（字典编码）
- 组件原用 BUILDING_TYPE 字典 + dictFormatter 转换
- 项目标准字典为 building_type（楼幢管理、综合查询等模块均如此）
- 字典不匹配时 dictFormatter 无法命中，直接显示原始值 4

## 修复方案
- AveragePriceTable.vue、BuildRecordTable.vue、historicalPrice.vue 列定义改为 type="dict" dict-url="building_type"
- 移除不再需要的 BUILDING_TYPE 字典加载逻辑
- 刷新后 4 显示为对应中文名称（如高层、多层）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0
- 来源会话ID：8a65f99f-f4d2-49e6-95b8-be726f98fc46
- 涉及文件：AveragePriceTable.vue、BuildRecordTable.vue、historicalPrice.vue、PriceTable.vue
- 代码路径：zhi2-web-admin/src/views/commercialHousingSales/priceFiling

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildingtype_dict_fix",
  "source_extraction_id": "00a25f2a044543009563b95e37f53c30",
  "version": 1,
  "memory_type": "entities"
}
-->