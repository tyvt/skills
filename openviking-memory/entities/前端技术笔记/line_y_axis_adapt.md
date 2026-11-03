# 多系列折线图 Y 轴自适应刻度
大屏多系列折线图 Y 轴禁止写死 max，需取全系列最大值 ×1.08 后规整到 1/2/3/5/7/10×10ⁿ 自适应。

## 现象
- 大屏折线图（多系列，如合同金额/入账金额）把 Y 轴 max 写成固定常量，数值一变曲线被压在顶部成直线，看起来怪。

## 根因
- 固定 max/interval 无法随数据量级伸缩，且任意 max 产生杂乱小数刻度。

## 解决方案
- 抽公共函数 computeFundLineYAxis(seriesArrays, splitCount=4)：合并多条 series 所有点取最大值 → 乘 1.08 留顶 → 上限规整到 1/2/3/5/7/10×10ⁿ 好看刻度 → interval = max/splitCount（默认 4 段网格）。
- init 图表时用返回 min/max/interval 配 yAxis；数据源变化无需手改轴常量，调 splitCount 或 1.08 即可调网格或顶边距。
- 套路：大屏所有数值图表坐标轴一律做「取数据极值 → 留顶系数 → 规整刻度档位」自适应计算，禁止写死 max。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue、chartOptions.js。
- 所属项目：园区物管2.0；来源会话：9d49e543-6329-4f54-ada3-6194a556fc91；代码基线：3353ef164。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "line_y_axis_adapt",
  "source_extraction_id": "5219c7a7105248f8b4405359a4b162dd",
  "version": 1,
  "memory_type": "entities"
}
-->