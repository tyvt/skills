# ECharts图例与Series同源过滤
园区物管2.0 中饼图等图表在过滤 0 值数据后，图例未同步导致 resize 报错 series not exists 的已知 bug。

## 问题根因
- 无有效数据时 series.data 过滤掉 count=0 项，但 legend.data 写死全部 13 个子分类名称
- ECharts 强制图例名称必须与 series 名称或数据项名称一致，不一致则每次 resize 报 `series not exists. Legend data should be same with series name or data name`

## 解决方案
- 图例与 series 必须同源派生：只展示 value>0 的分类，保证 legend.data 与 series.data 名称集合一致
- 无有效数据时隐藏图例，中心显示「暂无数据」
- 凡是按条件过滤 series 数据的图表（0 值过滤、状态过滤等），都用同一份过滤后数据生成 legend，不各自维护两份列表

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 adffdf74 修复为图例仅展示 value>0 分类并无数据时隐藏图例
- 涉及文件：src/views/benefit/dataSandbox/assetPanorama/index.vue、src/views/benefit/dataSandbox/assetPanorama/mock.js
- 所属项目：园区物管2.0；代码基线 3965548b6；来源会话 adffdf74-a80c-4a6c-8841-4709866ec450

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "echarts_legend_sync",
  "source_extraction_id": "79b34236c0554bfc9e14393689c2988b",
  "version": 1,
  "memory_type": "entities"
}
-->