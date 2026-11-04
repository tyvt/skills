# PropertyDetailDialog house 计算属性与面积拆分
房屋详情弹窗统一在 house 计算属性合并行数据与 record，禁止模板临时拼数字。

## 合并与拆分规则
- 有 sharedArea/indoorArea 时沿用行内分项，否则按总建筑面积走 splitBuiltArea 拆分
- 已有 totalPrice 时禁止再用 area×unitPrice 重算覆盖
- propertyHouses 与 propertyRooms 的 totalPrice=round(area×unitPrice) 与 splitBuiltArea 自洽
- house 计算属性逻辑与楼盘表路径一致

## 字段解析
- buildingNo 优先 buildingNumber，否则从 houseAddress 中「N幢」正则解析，与列表/楼盘表传入字段一致
- 预售用途区展示面积时区分 permitDisplay.area（预售总建筑面积）与户级面积，避免把幢级/预售总面积误标为「住宅」分项
- MEDIUM 项指出 permitDisplay.area 在用途「住宅」上的语义易误解

## 验证与归属
- 验证证据：会话 b0e6ea97 审查结论 propertyHouses/propertyRooms 自洽、house 逻辑一致
- 涉及文件：PropertyDetailDialog.vue、mock/properties.js（zhi2-web-admin/src/views/home/publicPortal 下）
- 所属项目：门户；来源会话ID：b0e6ea97-1dd9-4c28-84b9-b7c31ee86ee8；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_detail_house",
  "source_extraction_id": "0325262565af4ddfa2e8ba7da5315c34",
  "version": 1,
  "memory_type": "entities"
}
-->