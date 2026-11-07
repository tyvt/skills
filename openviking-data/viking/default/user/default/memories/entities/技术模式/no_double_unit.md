# 接口已换算单位数据禁止前端二次换算
园区物管2.0 大屏/图表页接口或 mock 返回已带单位（百个/万元）的数据时，前端展示层不得再套换算函数，否则数值偏小错位。

## 问题根因
- chartOptions.js 的 buildOperatingAssetsOption 对已是「百个」单位的接口 count 又调用 hundredFromCount 除以100，导致停车泊位 3.83 显示成 0.0383
- mock 里把已是万元的数再用 wanFromYuan 从元换算，导致资金收入/支出数值偏小

## 解决方案
- 约定接口/mock 返回什么单位就按什么单位直接渲染，展示层只做数值解析（parseMetric）不做单位换算
- 新增图表前先确认接口字段真实单位，不「预防性」套换算函数；换算函数只用于确认为原始单位的数据源并命名写清目标单位

## 验证与归属
- 验证：会话 2aead552 移除 hundredFromCount 二次转换；会话 756a714b 修正 mock 误用 wanFromYuan 为 7208.61/1055.63 万元
- 涉及文件：chartOptions.js、mock.js、dataHelpers.js；所属项目：园区物管2.0；代码基线：3965548b6 / fc994977f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "no_double_unit",
  "source_extraction_id": "080e089d30224d56846c26374eea4472",
  "version": 1,
  "memory_type": "entities"
}
-->