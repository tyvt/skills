# 定金缴款列表空白修复
苏州市房地产监测V3 修复定金缴款列表有数据但不显示的问题，兼容接口返回结构并映射字段。

## 问题原因
- V3 接口 `selectDepositNoticeList` 数据置于 `data` 字段，通用 `listCallback` 只读 `response.rows` 导致表格空

## 修复内容
- 新增 `extractListData` / `extractTotal` 兼容 `data`、`data.records`、`data.list`、`data.rows` 及旧版 `rows`
- 新增 `normalizeNoticeRow` 映射字段：`noticeNo`→`payNoticeNo`、`projectName`→`regulatorProjectName`、`houseNo`→`roomNo`、`buildingNo`→`policeNo`/`constructionNo`、`noticeId`→`id` 兜底

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/supervision/deposit/notice/index.vue
- 来源会话ID：39e4c6b2-6db7-42a7-8dc7-56ade38929bc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_notice_fix",
  "source_extraction_id": "76d1d541f8e54cc298fc91be29bc6250",
  "version": 1,
  "memory_type": "entities"
}
-->