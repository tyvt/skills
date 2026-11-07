# fundPanorama趋势图弹性布局修复
园区物管2.0 的 fundPanorama 页中，趋势图与横柱状图重叠的高度布局修复。

## 问题
- 趋势图设为固定高度后，外层容器仍用 flex: 1 1 0 + min-height: 0，容器高度被压成 0，图表溢出导致收入/支出趋势图重叠

## 修复方案
- 恢复趋势区块弹性布局，flex 比例从 1 调整为 0.65，趋势图比原来更小
- 趋势图外层容器修正为 flex: 1 1 auto，确保正确撑开高度
- 各区账户余额横柱状图保持 280px 高度不变

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、fundPanorama、chartConstants.js
- 所属项目：园区物管2.0；来源会话：03064ac9-644e-4263-ae50-f1c88bdea7a6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fundPanorama趋势图弹性布局修复",
  "source_extraction_id": "ef54b275d5844bb1a385651a11121c8b",
  "version": 1,
  "memory_type": "entities"
}
-->