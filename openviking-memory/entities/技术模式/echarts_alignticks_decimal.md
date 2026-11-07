# ECharts 双 Y 轴 alignTicks 无限小数刻度
园区物管2.0 中双 Y 轴混合图（左轴份数、右轴万元）开启 alignTicks 后右轴出现 2.6666666666666665 这类无限小数刻度。

## 问题现象
- 双 Y 轴 ECharts 混合图右轴刻度出现 2.6666666666666665 等无限小数，且刻度宽度测量与标签错位。
- 左轴最大 16、右轴最大 8 时右轴按 8÷3 分段产生浮点误差。

## 根因
- 开启 alignTicks: true 后 ECharts 强制左右轴刻度段数一致，浮点除法产生无限小数。

## 解决方案
- 轴标签在 axisLabel.formatter 里 toFixed(2)（金额轴）或取整（计数轴）。
- 数据非负时两轴都显式 min: 0，避免无意义负刻度。
- 按刻度文本测宽定位单位文字的逻辑，测量也按格式化后两位小数计算，保证与标签一致。
- 收入与支出趋势图共用同一渲染函数（如 renderFundTrendMixed）时改一处即同时生效。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：032.md 会话 12d47513 原因段落明确 alignTicks 致 8÷3 分段浮点误差，修改含 formatter toFixed(2)、min:0、测宽同步。
- 涉及文件：src/views/benefit/dataSandbox/fundPanorama/index.vue；所属项目：园区物管2.0；来源会话：12d47513-9d93-4058-b4a5-541ebd520733；代码基线：f00310232。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_alignTicks_decimal",
  "source_extraction_id": "88d68922b8ca46d2b8056d0afb581a2e",
  "version": 1,
  "memory_type": "entities"
}
-->