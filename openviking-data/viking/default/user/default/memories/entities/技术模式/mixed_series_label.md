# 线柱混图去 series label
数据沙盘 fundPanorama 等 ECharts 柱+双折线混图应去掉各 series label，仅保留 tooltip 避免顶部数字拥挤。

## 问题根因
- 柱与折线都设 label.show:true、position:'top' 会在图形上方叠满数字，展示型大屏只需形态对比

## 解决方案
- 统一将各 series 改为 label:{ show:false }，具体数值用 tooltip 查看
- 删除仅服务标签的 labelFmtWan/labelFmtCount 等格式化函数，避免死代码

## 验证与归属
- 验证：会话 2f483f91 用户要求线柱混色图上方不显示数值；renderFundTrendMixed 三系列 label 改 false，tooltip 仍可用
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；代码基线：f00310232；来源会话：2f483f91-4f7f-47c1-9cad-5b1a96c6ab37

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mixed_series_label",
  "source_extraction_id": "fbe34a26be854f6a8e62e198fe539062",
  "version": 1,
  "memory_type": "entities"
}
-->