# 预警管理统计筛选不同步修复
苏住房G项目 zhi2-web-admin 中预警管理页面点击搜索时统计未跟随筛选条件更新，已修复。

## 问题根因
- 点击「搜索」仅刷新列表接口 `getList`，未带筛选条件重新请求统计接口 `getStatistics`
- 顶部卡片始终显示全量数据，与列表筛选不一致

## 修复内容
- 提交 `91de1a4a9` 新增 `getStatisticsParams()` 返回 `complexName`、`region`、`subdistrict`、`community` 等筛选参数
- 新增 `fetchStatistics()` 调用 `/benefit/warningAnalysis/getStatistics` 并传入参数
- `handleQuery()` 中在刷新列表同时调用统计刷新，使顶部卡片随筛选更新

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/views/benefit/alert/index.vue`
- 所属项目：苏住房G；来源会话：dbb0c0ef-f315-40f4-91ff-be2fa77843f3
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "alert_stats_fix",
  "source_extraction_id": "513adfa05f2944cc8ff76ab9dbfa86cd",
  "version": 1,
  "memory_type": "entities"
}
-->