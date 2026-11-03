# 资产明细颜色与图例样式不符
园区物管2.0 中 operatingAssets.vue 的资产状态配色与图例样式类不一致需统一。

## 问题根因
- getStatusColorByPaymentState 对未缴款(paymentState===0)返回 #ebeef5、停车位闲置返回 #ffffff
- 图例圆点仅 is-blue 有样式，导致与图例/样式类不符

## 解决方案
- 抽取 PAYMENT_STATE_BG 常量统一配色
- 未缴款改 #f7cbcb、车位闲置 cardValue==='3' 用 #e8eaed
- 补全 is-green/red/gray 及 is-parking-idle 样式
- `statusClass()` 兼容后端“缴费”与“缴款”两种文案，图例文案统一为“缴款”
- 状态色映射：is-red(#F7CBCB)、is-orange(#FDE3D1)、is-green(#D1EFCB)、is-gray(白底浅灰描边)

## 验证与归属
- 来源会话：feb4d674-5cbe-45b6-a39d-a9818f09eacf、dccaafe5-eb52-4dbb-ad03-5a8e2e150a84
- 涉及文件：benefit/statisticsMap/operatingAssets.vue
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "asset_color_legend_mismatch",
  "source_extraction_id": "809e823a8a154bada81b29b8db7b7ffb",
  "version": 2,
  "memory_type": "entities"
}
-->