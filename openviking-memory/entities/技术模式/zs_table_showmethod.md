# zs-table 小计列识别失效致 summary 不渲染
园区物管2.0 中 zs-table 的 showMethod 仅用 column.type==='index' 识别小计列，遇 selection 列或字段差异时 summary 整块不渲染。

## 现象
- 配置了汇总的 zs-table（如楼盘范围 rangeTable、交付范围表）底部 summary 整块不渲染，接口数据正常。

## 根因
- 组件 showMethod 识别「小计列」只用 column.type === 'index' 单一条件；有选择列（selection）或列定义差异时匹配不到。
- 汇总字段取值又只读 column.property 不兼容 column.prop，任一取空则整行汇总为空。

## 解决方案
- showMethod 列识别做双兜底：先按 type/property 找 index 列，找不到回退到「第一个非 selection 列」。
- 汇总字段统一兼容 column.property || column.prop。
- 修法应落在 zs-table 组件层而非各页面自写 summary 方法；与「表底统计统一交给 zs-pagination」是两回事（行小计 vs 总条数）。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 5c7bbda7 改 rangeTable.vue 的 showMethod 列识别与字段兼容后 summary 正常渲染，涉及 zs-table 组件与多处 rangeTable 消费方。
- 涉及文件：src/components/zs-table/zs-table.vue、src/views/property/complex/components/rangeTable.vue、src/views/property/handover/components/deliveryRangeTable.vue。
- 所属项目：园区物管2.0；来源会话：5c7bbda7-0993-453f-a4a2-a1efa119c858；代码基线：7814a0c2a。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_showmethod",
  "source_extraction_id": "c83f42b2da4141d9b9f2031f7272f576",
  "version": 1,
  "memory_type": "entities"
}
-->