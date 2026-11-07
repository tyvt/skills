# ECharts 轴刻度上限取整约定
园区物管2.0 统计图坐标轴 max 须用 Math.ceil(峰值/步长)×步长，避免出现 2143 这类非整怪刻度。

## 问题根因
- 统计大屏余额分布柱图 X 轴出现 2143 这种非整刻度，用户认为不可读
- ECharts 默认按数据最大值自动分段，max 不是步长整数倍时末端刻度就是脏值

## 解决方案
- 约定「步长固定（如 250 万）+ 上限 = Math.ceil(峰值/步长) × 步长」，峰值 2021.68 → 上限 2250，刻度 0/250/…/2250
- 实现写在 chartOptions 构建函数里，随数据变化自动重算 max，不写死数值
- 适用于所有柱/折线统计图的坐标轴配置

## 验证与归属
- 验证：用户确认「按最大值取整 250 的间隔，最大 2250」，结论为步长 250、Math.ceil(峰值/250)×250
- 涉及文件：src/views/benefit/dataSandbox/fundPanorama/index.vue、src/views/benefit/dataSandbox/fundPanorama/mock.js
- 所属项目：园区物管2.0；代码基线：f00310232；来源会话：3c8b0e29-3780-4bce-ac03-f0c51337a673

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_axis_max_ceiling",
  "source_extraction_id": "53246eca93fe4b4fb7a3b7d493699f83",
  "version": 1,
  "memory_type": "entities"
}
-->