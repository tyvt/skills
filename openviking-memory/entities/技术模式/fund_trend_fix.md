# 资金全景趋势图双Y轴格式化
园区物管2.0 资金全景页收入与支出趋势图共用 `renderFundTrendMixed`，双 Y 轴开启 `alignTicks: true` 导致浮点误差的修复。

## 问题背景
- 双 Y 轴 `alignTicks: true` 会让左右轴刻度段数一致；左侧最大 16、右侧最大 8 时，右侧按 `8÷3` 分段出现 `2.6666666666666665` 等浮点误差

## 解决方案
- 右侧万元轴 `axisLabel.formatter` 统一 `toFixed(2)`（如 `2.67` 而非无限小数）
- 左侧份数轴格式化为整数，避免对齐刻度出现小数
- 双轴均设 `min: 0`（数据非负，避免 `-2` 等无意义负刻度）
- 右侧刻度宽度测量按两位小数计算，避免单位文字与标签错位

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、benefit、api/benefit/fundPanorama.js
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：12d47513-9d93-4058-b4a5-541ebd520733

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_trend_fix",
  "source_extraction_id": "d49d6da15178402584b12c482ee3060a",
  "version": 1,
  "memory_type": "entities"
}
-->