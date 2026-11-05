# 环图空数据与全0展示
园区物管2.0 统计地图四列卡片环形图（资产分类、车位分类、资源分类、合同分类）及资产全景环图，对空数据与全0的展示约定。

## 空数据判定
- 仅当 `assetCategories` 完全为空时才显示「暂无数据」，全为 0 时不视为空数据

## 全0场景展示
- 统计地图四列卡片环形图：仍保留所有分类项，用等分占位值（`value: 1`）绘制环形图，保证各色块可见
- 标签、tooltip 仍显示真实 `count`（0）和 `ratio`（0.0%），不使用占位值
- 统计地图四列卡片环形图：全0时隐藏扇区标签，避免分类较多时标签重叠；底部图例仍展示全部分类
- 资产全景环图（资源分类/合同分类等，assetPanorama）：去掉「全为 0 时隐藏扇区 label」判断，只要接口返回 `donutData` 不为空即显示 `0 (0.0%)` 及引导线；tooltip 与底部图例逻辑不变；分类较多（如 13 子类）时标签可能仍因 ECharts `avoidLabelOverlap` 自动避让而部分重叠

## 验证与归属
- 验证：会话 26ce6808-4e6b-41fc-88d2-b31cbed282bf（用户要求调整数据层过多影响点击拾取等交互）
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、benefit、statisticsMap/components/map.vue、benefit/dataSandbox/assetPanorama/index.vue、benefit/dataSandbox/assetPanorama/mock.js
- 所属项目：园区物管2.0；代码基线：none
- 历史：会话 6cb68a08-3eea-415d-bf9e-da0b8b216653 针对资产全景环图（assetPanorama）移除「全0隐藏扇区label」判断，改为 donutData 非空即展示 `0 (0.0%)` 与引导线；统计地图四列卡片环形图保留占位绘制与全0隐藏约定

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "donut_all_zero_label",
  "source_extraction_id": "d49d6da15178402584b12c482ee3060a",
  "version": 3,
  "memory_type": "entities"
}
-->