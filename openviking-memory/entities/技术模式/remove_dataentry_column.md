# 物业企业录入情况统计前端移除表格列
江阴侧无法统计物业企业录入情况，前端移除 dataEntryDetail 表格列并清理合计逻辑。

## 问题背景
- 江阴侧无法统计物业企业录入情况，原 dataEntryDetail 表格列及合计逻辑失去意义

## 修改内容
- 修改 zhi2-web-admin/src/views/property/dataEntryDetail/index.vue，删除该列及子列
- 从 COUNT_PROPS、RATE_CONFIG 移除 enterpriseEntryCount、enterpriseEntryRate
- 导出接口 /property/dataEntryDetail/export 若含该列需后端同步调整

## 验证与归属
- 验证证据：src=江阴公共收益/001.md
- 涉及文件：zhi2-web-admin/src/views/property/dataEntryDetail/index.vue
- 所属项目：江阴公共收益；来源会话：b9b7af23-2eb0-46dd-a358-fe3486c2fad1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remove_dataentry_column",
  "source_extraction_id": "72e6d9f6bfc04519b4929a1ff2767368",
  "version": 1,
  "memory_type": "entities"
}
-->