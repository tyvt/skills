# fundApplyTrend 响应格式兼容
园区物管2.0 资金全景中 fundApplyTrend 接口响应格式与 leaseApplyTrend 一致，代码已原生支持。

## 格式说明
- 根节点可直接为数组：`[{ month, count, contractAmount, bookedAmount }, ...]`
- 或包在 `{ data: [...] }` 中
- 当前代码已支持 12 条按月数组，无需修改解析逻辑

## 展示映射
- 柱状图「用款申请」对应 count 字段
- 折线「合同金额」对应 contractAmount，「支出金额」由 bookedAmount 映射
- 若 1 月柱图仍显示 mock，需在 Network 确认接口 200 及响应结构

## 涉及信息
- 涉及文件：src/views/benefit/dataSandbox/fundPanorama/index.vue、mock.js、assetPanorama/index.vue
- 所属项目：园区物管2.0；来源会话：23f97ddb-0548-4b59-92be-632f21518698；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_apply_trend",
  "source_extraction_id": "9b2ff210e04c406b95120c0b33048de0",
  "version": 1,
  "memory_type": "entities"
}
-->
