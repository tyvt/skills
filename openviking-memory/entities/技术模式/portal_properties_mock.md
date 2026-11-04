# 门户可售房屋 mock 须与详情/项目字段同源生成
publicPortal 模块用 mock/properties.js 驱动可售列表与 PropertyDetailDialog 时，需保证坐落、幢号、楼层与 projectName/所选幢行同源生成，避免演示穿帮。

## 常见断点
- houseAddress 写死小区名而 projectName 已是另一项目，列表进详情后坐落语义对不上
- propertyHouses 缺 floor/naturalFloor 时详情仍展示「层次/自然层」，楼盘表路径有值、列表路径为空
- 全表统一 buildingNumber 与 propertyPermits/propertyBuildings 幢号体系不一致，演示「项目→幢→户」会穿帮
- PropertyPages.vue 用 buildingNumber || '14' 会在 record 丢失时一律显示 14 幢

## 修复方向
- 坐落、幢号、楼层与 projectName/所选幢行同源生成或从 roomNumber 推导
- 无 buildingNumber 时不硬编码兜底，改为校验路由/导航 state

## 验证与归属
- 验证证据：会话 b0e6ea97 数据一致性审查：HIGH 可售列表坐落与项目名不一致、列表进详情缺楼层；MEDIUM 幢号 mock 未关联、PropertyPages 硬编码 '14' 兜底
- 楼盘表路径内部面积/总价计算自洽（会话 b0e6ea97 审查）
- 涉及文件：mock/properties.js、PropertyDetailDialog.vue、PropertyPages.vue、mock/notices.js（均在 zhi2-web-admin/src/views/home/publicPortal 下）
- 来源会话ID：b0e6ea97-1dd9-4c28-84b9-b7c31ee86ee8；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_properties_mock",
  "source_extraction_id": "d6fc5a08c1a44421b65f7e1e6fe22d0d",
  "version": 2,
  "memory_type": "entities"
}
-->