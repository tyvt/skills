# 柱状图数值轴上限算法
园区物管2.0 数据大屏柱状图 Y 轴上限算法收敛为细刻度集合 + 峰值 1.1 倍取整，避免留白过大。
## 问题背景
- 原 computeBarAxisMax 只取 1/2/5/10 粗刻度，向上取整跨度太大，峰值 450 上限算到 1000，柱体压矮、顶部空白。
## 解决方案
- 统一到 computeBarValueAxisScale 函数，刻度步长细化为 1、1.2、1.5、2、2.5、3、4、5、6、8、10，峰值上方留 10% 空间（BAR_AXIS_PADDING_RATIO=1.1）再向上取整。
- 所有柱状图共用该函数（computeOperatingAssetsYAxis、computeHundredCountYAxis 等），横向柱状图固定 max 也改为动态计算，避免多处独立计算二次放大。
- 调整松紧只改 BAR_AXIS_PADDING_RATIO 一个常量。
## 验证与归属
- 验证：会话 706dd33e 中 chartOptions.js 统一函数，细刻度+1.1倍 padding，五处柱状图 Y/X 上限动态计算，峰值 450→500、330→400、85→100。
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js；所属项目：园区物管2.0；代码基线：fc994977f。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bar_axis_scale",
  "source_extraction_id": "fe0dde00dbf24143868b76101755b35e",
  "version": 1,
  "memory_type": "entities"
}
-->