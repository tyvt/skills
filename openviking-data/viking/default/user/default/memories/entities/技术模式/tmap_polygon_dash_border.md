---
audit_status: invalid
last_checked: 2026-11-27T19:41:10+08:00
verdict_note: 全库 tmap/qqmap/polygon 路径下 PolygonStyle/showBorder/borderWidth 均为 0；命中仅来自记忆归档自引用，无真实修复代码，无法证明
---
# 腾讯地图 TMap 多边形虚线边框
腾讯地图 TMap.PolygonStyle 绘制虚线边框需特定属性组合，仅设 borderColor 不生效。

## 解决方案
- 画虚线边框需设置 showBorder: true。
- 必须设置 borderWidth 为具体数值。
- 添加 borderDashArray: [10,5]（实线长度,空段长度）。
- 仅设置 borderColor 不生效，必须配合上述属性。

## 验证与归属
- 验证：会话 772ef443（006.md）绘制多边形加边框线并改成虚线，使用 borderDashArray。
- 涉及文件：src/components/Map/index.vue
- 所属项目：园区物管2.0（zhi2-web-admin）
- 来源会话ID：772ef443-f9b3-47b5-bb4f-5f4be0ad70f4
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tmap_polygon_dash_border",
  "source_extraction_id": "b21f97ce3f0d42898d28fa313bf40a83",
  "version": 1,
  "memory_type": "entities"
}
-->