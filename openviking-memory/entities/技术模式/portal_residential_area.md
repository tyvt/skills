# 预售许可弹窗住宅面积绑定问题
许可详情双栏配置里若「住宅」用途面积取 permitDisplay.area，与「预售总建筑面积」同源，在非纯住宅项目且接口/mock 仅有 nonResidentialArea、无独立 residentialArea 时，住宅行会展示错误。

## 问题根因
- 「住宅」用途面积取 permitDisplay.area 与「预售总建筑面积」同源
- 非纯住宅项目且接口/mock 仅有 nonResidentialArea、无独立 residentialArea 时，住宅行展示错误

## 修复方向
- 应增加 residentialArea（或后端等价字段）映射
- 无值时显示 - 或明确业务规则，而不是复用总面积

## 验证与归属
- 验证证据：会话 5983c99f [HIGH] 「住宅」面积绑定总预售面积，mock 仅 nonResidentialArea 时非纯住宅会错
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue、zhi2-web-admin/src/views/home/publicPortal/mock/notices.js
- 所属项目：门户；来源会话ID：5983c99f-13e3-4b40-9938-495cc42f24ff；代码基线：门户 zhi2-web-admin @ e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_residential_area",
  "source_extraction_id": "ae068e827ad74504ac580e2a7560d494",
  "version": 1,
  "memory_type": "entities"
}
-->