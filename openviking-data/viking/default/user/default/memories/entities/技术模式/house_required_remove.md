# 房屋详情页取消六字段前端必填校验
惠山二期G 项目房屋详情页移除六个字段前端必填校验的修改模式。

## 修改要点
- 在 houseChange/detail.vue 与 house/detail.vue 的 computed.rules 移除 floorStart、floorEnd、buildingStructure、plannedUse、buildingProperty、deliveryType 的 required: true
- 表单项 prop 与数据绑定未改动，留空时前端不再拦截保存，后端报错需同步调整接口
- 仍保持必填的字段：项目名称、楼幢号、单元名称、房号、实测建筑面积、物理层、名义层、房屋用途（预测建筑面积已改为非必填，见 floor_area_required）

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 验证证据：src=惠山二期G/006.md
- 涉及文件：views/building/houseChange/detail.vue、views/building/house/detail.vue、views/building/houseChange/index.vue、mixins/detailMixins.js、views/benefit/pubHouseDetailChange/detail.vue、mixins/form.js、package.json
- 所属项目：惠山二期G；来源会话：c5a4d977-566c-4ca9-8964-c533818a64d6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_required_remove",
  "source_extraction_id": "d00549ef770e4e9a930b1734bf53a230",
  "version": 3,
  "memory_type": "entities"
}
-->