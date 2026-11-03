# zs-table合计默认复用小计值致显示一致
园区物管2.0 的 zs-table 底部文字条合计默认复用 summary-method 小计行数值，导致合计与小计显示相同。

## 问题根因
- zs-table 底部合计区默认读取 summary-method 返回的小计行数据，未区分当前页小计与全量合计。
- 多页面（rangeTable、budget 等）共用该组件，均出现合计与小计一致的异常。

## 解决方案
- 小计由 showMethod 累加当前页 data 计算。
- 合计通过 :bottom-summary-items 传入接口 summary（totalUnit、totalHouse）全量数据。
- ZsSummaryText 组件同步适配 bottom-summary-items 渲染。

## 验证与归属
- 验证：src=园区物管2.0/039.md；涉及文件 zs-table.vue、ZsSummaryText/index.vue、complex/components/rangeTable.vue、budget/index.vue 等。
- 所属项目：园区物管2.0；来源会话：4d6c0599-62a1-4620-bba9-35eec0a0c116；代码基线：none。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_summary_reuse",
  "source_extraction_id": "16416ccdf7c044efbfab91c3d016aacd",
  "version": 1,
  "memory_type": "entities"
}
-->