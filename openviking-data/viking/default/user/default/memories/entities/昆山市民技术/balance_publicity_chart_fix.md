# 经营性收支公示图表修复
昆山市民小程序「经营性收支公示」柱状图因 encode 配置错乱与实例未销毁导致重影，已修复为标准横向柱状图。

## 问题根因
- 柱状图用了 `encode: { x: 'amount', y: 'product' }` 但无 `dataset`，坐标轴映射错乱、文字重叠。
- `option` 变更即重新 `echarts.init`，旧实例未销毁致 canvas 重复绘制重影乱码。

## 改动方案
- `balancePublicity/index.vue`：改标准横向柱状图（`yAxis.data`+`series.data`），金额标柱右侧；有数据才 `v-if` 挂载避免宽高0。
- `echarts-uniapp.vue`：已有实例仅 `setOption(..., {notMerge:true})`；卸载 `dispose`；宽高0时短暂重试。
- 关联文件：`pages_vote/vote/components/BarOption.js`。

## 验证与归属
- 所属项目：昆山市民；来源会话ID：fa8264ba-ca5d-4343-b44e-a4907db958f0。
- 验证证据：extracted source=cursor project=昆山市民。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "balance_publicity_chart_fix",
  "source_extraction_id": "359960c73745441f8aff7633ed613feb",
  "version": 1,
  "memory_type": "entities"
}
-->