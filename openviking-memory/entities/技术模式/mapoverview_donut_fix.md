# 资产全景环图标签与引导线处理
园区物管2.0 的 benefit/mapOverview 资产全景环图在合并资金收入支出后，对外侧标签与引导线做了收敛处理。

## 问题背景
- 100% 单扇区时外侧「欠租预警 100%」标签被挤到右下角，引导线拉得很长
- 值为 0 的扇区虽隐藏文字，仍会画出残留引导线

## 解决方案
- 关闭环图外侧标签和引导线，详情由右侧图例展示，悬停仍有 tooltip
- 环图只渲染数值 > 0 的扇区，避免 0 值扇区产生异常线条
- 图例固定显示四类，数量仍为 0 也会列出

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue、chartOptions.js
- 所属项目：园区物管2.0；来源会话：98ef0df4-45f3-4381-a79d-760eb1b00c62；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mapoverview_donut_fix",
  "source_extraction_id": "36621e6addfb4001a7f9fe8c070ff065",
  "version": 1,
  "memory_type": "entities"
}
-->