# ECharts 地图去高亮三态禁用
园区物管2.0 的 ECharts 地图要求鼠标移入和点击都不出现高亮，只保留代码控制的轮播高亮。

## 问题根因
- ECharts 高亮有两套独立机制：emphasis 是悬停态，select 是点击选中态（selectedMode 控制），此外还有 blur 焦点态
- 只关 emphasis 不够，点一下地图区域触发 select，关了 emphasis 点击仍会高亮

## 解决方案
- geo 设 silent:true 彻底不响应鼠标事件，并加 select:{disabled:true}、blur:{disabled:true}
- map 系列设 selectedMode:false 并同样禁用 emphasis/select/blur 三态
- 代码驱动的轮播 regions 高亮走 regions 数据控制，与鼠标态无关，不要误伤

## 套路
- 想「彻底去交互态」时要三态（emphasis/select/blur）一起禁，而不是只盯 emphasis

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue、chartOptions.js
- 所属项目：园区物管2.0；来源会话：ec2f2919-958c-46a4-9979-f0e697d4c8c7；代码基线：fc994977f→736a824e7

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_map_dehighlight",
  "source_extraction_id": "28000d8f11724e7d8c4f29352de82f49",
  "version": 1,
  "memory_type": "entities"
}
-->
