# 列表列固定宽度全局清理
苏州市房地产监测V3 项目全局排查并删除列表列固定宽度（除序号列外），约 40+ 处。

## 修改内容
- `property/utilityLinkConfig/index.vue`：删除 `enableStatus` 列 `width:100`
- `property/eventReport/components/FeedbackTable.vue`：删除「点评情况」列 `width:180`
- 脚本清理 `src/views` 下列表 `columns` 里独立一行的 `width:<数字>` 及单行对象中的 `, width:xxx`（如 stock 列表、`permitSelectConstants.js`）
- 保留 `type:'index'` / `label:'序号'` 列宽（如 `width:60`）
- 恢复误触的 `chartOptions.js` 中 ECharts `axisPointer` 的 `width:1`，未动图表配置

## 排查优化
- 之前只匹配 `columns()` 会漏掉 `columns: function ()`（如 FeedbackTable）及单行列配置，本次补全

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`utilityLinkConfig/index.vue`、`property/utilityLinkConfig/index.vue`、`property/eventReport/components/FeedbackTable.vue`、列表、`permitSelectConstants.js`
- 来源会话ID：6810da4f-edf3-4007-b301-b6e6f680b954
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_column_width",
  "source_extraction_id": "446d1dc5ce95440aa4c26ec03a483ac8",
  "version": 1,
  "memory_type": "entities"
}
-->