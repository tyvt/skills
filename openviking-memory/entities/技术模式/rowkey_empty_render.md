# 表格行键空值重复致tbody不渲染高度异常
苏州市房地产监测V3 中预售历史表格 row-key 依赖 presalePermitId 空值或重复致 tbody 不渲染，Tab 懒加载高度计算异常。

## 问题根因
- 预售历史表格 row-key 依赖的 presalePermitId 为空或重复，导致 tbody 不渲染
- Tab 懒加载高度计算逻辑异常

## 解决方案
- 在 PermitHistoryPanel.vue 新增 normalizeHistoryRows() 生成 _rowKey 绑定 row-key
- 数据加载后调用 doLayout() 重算表格高度

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/049.md
- 涉及文件：PermitHistoryPanel.vue、detail.vue、permitConstants.js、2026-09-11.md、PermitEntrustPanel.vue、index.vue、request.js、package.json
- 所属项目：苏州市房地产监测V3；来源会话：8800fd20-adfa-49a7-b6f1-4d05b99a2454；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rowkey_empty_render",
  "source_extraction_id": "7297edb7fc6144aeb1a7dca1c1581165",
  "version": 1,
  "memory_type": "entities"
}
-->