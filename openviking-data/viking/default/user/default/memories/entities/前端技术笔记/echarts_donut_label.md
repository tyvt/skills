# ECharts 环图标签与引导线异常
园区物管2.0 的 ECharts 环图在单扇区 100% 与 0 值扇区场景下，外侧标签错位、残留引导线，需关闭外侧标签改由图例承担。

## 现象
- 单扇区占 100% 时，外侧「xx 100%」标签被挤到右下角、引导线拉得很长。
- 值为 0 的扇区即使隐藏文字，仍画出残留引导线，label 显示奇怪。

## 根因
- ECharts 默认 labelLine + outer label 在极端占比（100%）和 0 值扇区上产生异常几何。
- 逐项调 label 位置压不住，需从数据源与渲染开关层面解决。

## 解决方案
- 关闭环图外侧标签与引导线（labelLine/label 不渲染，悬停仍有 tooltip），详情改由右侧图例承担。
- 环图只渲染数值 > 0 的扇区，从数据源过滤 0 值项避免异常线条。
- 图例固定显示全部类别（数量为 0 也列出）。
- 调尺寸时注意中间总数文字与外圈半径余量，先关标签再看是否需要放大容器。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue、zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js。
- 所属项目：园区物管2.0；来源会话：98ef0df4-45f3-4381-a79d-760eb1b00c62；代码基线：3965548b6。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "echarts_donut_label",
  "source_extraction_id": "f614d32fd9654c25aca3ddc2036cbb52",
  "version": 1,
  "memory_type": "entities"
}
-->
