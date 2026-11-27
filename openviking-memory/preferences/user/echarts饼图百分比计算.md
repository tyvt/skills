---
audit_status: invalid
last_checked: 2026-11-27T20:55:47+08:00
verdict_note: 全项目代码无 formatPiePercent；mfap_MfapOwnerVoteDetail.js 存在但所述自计算百分比函数无法证实
---
- 饼图百分比不使用 data.percent 默认截断（会致 69.56% 类误差），改为自计算。
- 在 js 中增 formatPiePercent 四舍五入保留两位小数，drawPie1/2/3 的 tooltip/label formatter 均改用自计算值。
- 涉及文件：mfap_MfapOwnerVoteDetail.js。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Echarts饼图百分比计算",
  "source_extraction_id": "9a29e76e1db34dbc832f5a873f6c0d40",
  "version": 1,
  "memory_type": "preferences"
}
-->